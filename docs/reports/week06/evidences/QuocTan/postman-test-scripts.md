# Postman Test Scripts Động — Data-Driven Testing

**Task:** Viết test script động để map data vào path/header/body và assert theo từng iteration  
**Thành viên:** Mạch Quốc Tấn (23127115)  
**Tuần:** W06 — 2026-07-13 → 2026-07-18

---

## 1. Tổng quan kiến trúc script

```
Collection Runner → data file (JSON/CSV)
       │
       ├── Pre-request Script   ← sinh Bearer token + map request data
       ├── Request URL/Header   ← tham chiếu variables từ iteration data
       └── Tests Script         ← assert status code + response fields
```

**Nguyên tắc:**

- Mỗi row của data file = 1 iteration.
- Pre-request Script đọc `pm.iterationData` và set `pm.variables` (scope = request).
- URL, Header, Body tham chiếu `{{variable}}` — Postman resolve trước khi gửi.
- Test Script đọc `pm.iterationData` và so sánh với `pm.response`.

---

## 2. Pre-request Script — Sinh Bearer Token hợp lệ

Đặt tại **Collection level** (áp dụng toàn bộ request):

```javascript
// ─── Pre-request Script (Collection level) ───────────────────────────────────
// Sinh Bearer token là ISO-8601 timestamp hiện tại (múi giờ UTC)
// Auth middleware yêu cầu timestamp trong vòng 1 giờ so với server clock.

const now = new Date().toISOString(); // vd: "2026-07-18T05:00:00.000Z"
pm.variables.set("validToken", `Bearer ${now}`);

// Map auth_header từ iteration data:
// - Nếu auth_header rỗng  → không gắn Authorization header (negative case)
// - Nếu auth_header = "{{validToken}}" → resolve thành Bearer <now>
// - Nếu auth_header là giá trị cụ thể (expired/invalid) → dùng nguyên văn

const authFromData = pm.iterationData.get("auth_header");

if (
  authFromData !== undefined &&
  authFromData !== null &&
  authFromData !== ""
) {
  // Resolve {{validToken}} nếu data dùng placeholder
  const resolved = authFromData.replace("{{validToken}}", `Bearer ${now}`);
  pm.variables.set("currentAuthHeader", resolved);
  // Gắn header Authorization
  pm.request.headers.upsert({
    key: "Authorization",
    value: resolved,
  });
} else {
  // auth_header rỗng → xóa header Authorization — giả lập thiếu token
  pm.variables.set("currentAuthHeader", "");
  pm.request.headers.remove("Authorization");
}
```

---

## 3. Script cho `GET /products`

### Request Setup

```
Method: GET
URL:    {{baseUrl}}/products
Header: Authorization: {{currentAuthHeader}}
```

### Test Script

```javascript
// ─── Tests — GET /products ────────────────────────────────────────────────────
const tcId = pm.iterationData.get("tc_id") || "(no tc_id)";
const desc = pm.iterationData.get("description") || "";
const expectedStatus = parseInt(pm.iterationData.get("expected_status"));
const expectArray =
  pm.iterationData.get("expect_array") === true ||
  pm.iterationData.get("expect_array") === "true";
const expectMinLen = parseInt(pm.iterationData.get("expect_min_length")) || 0;
const expectErrField = pm.iterationData.get("expect_error_field");

// ── Test 1: Status Code ──────────────────────────────────────────────────────
pm.test(`[${tcId}] Status code = ${expectedStatus} | ${desc}`, () => {
  pm.expect(pm.response.code).to.equal(expectedStatus);
});

// ── Test 2: Happy path — response là array ────────────────────────────────────
if (expectArray) {
  pm.test(
    `[${tcId}] Response là array với ít nhất ${expectMinLen} phần tử`,
    () => {
      const body = pm.response.json();
      pm.expect(body).to.be.an("array");
      pm.expect(body.length).to.be.at.least(expectMinLen);
    },
  );

  pm.test(`[${tcId}] Mỗi sản phẩm có đủ fields: id, type, name`, () => {
    const body = pm.response.json();
    body.forEach((product, idx) => {
      pm.expect(product, `product[${idx}]`).to.have.property("id");
      pm.expect(product, `product[${idx}]`).to.have.property("type");
      pm.expect(product, `product[${idx}]`).to.have.property("name");
    });
  });
}

// ── Test 3: Error response có đúng field ─────────────────────────────────────
if (expectErrField) {
  pm.test(`[${tcId}] Error response có field "${expectErrField}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property(expectErrField);
  });
}
```

---

## 4. Script cho `GET /product/:id`

### Request Setup

```
Method: GET
URL:    {{baseUrl}}/product/{{productId}}
Header: Authorization: {{currentAuthHeader}}
```

**Pre-request Script (Request level — thêm sau Collection pre-request):**

```javascript
// Map product_id từ iteration data vào URL variable
// Nếu data file không có cột product_id (ví dụ: get-products.data.json),
// skip request này để tránh gửi GET /product/ (URL không hợp lệ).
const pid = pm.iterationData.get("product_id");
if (pid === undefined || pid === null || pid === "") {
  pm.execution.skipRequest();
} else {
  pm.variables.set("productId", String(pid));
}
```

### Test Script

```javascript
// ─── Tests — GET /product/:id ─────────────────────────────────────────────────
const tcId = pm.iterationData.get("tc_id") || "(no tc_id)";
const desc = pm.iterationData.get("description") || "";
const expectedStatus = parseInt(pm.iterationData.get("expected_status"));
const expectId = pm.iterationData.get("expect_field_id");
const expectName = pm.iterationData.get("expect_field_name");
const expectType = pm.iterationData.get("expect_field_type");
const expectMsgField = pm.iterationData.get("expect_message_field");
const expectErrField = pm.iterationData.get("expect_error_field");

// ── Test 1: Status Code ──────────────────────────────────────────────────────
pm.test(`[${tcId}] Status code = ${expectedStatus} | ${desc}`, () => {
  pm.expect(pm.response.code).to.equal(expectedStatus);
});

// ── Test 2: Happy path — kiểm tra fields product ─────────────────────────────
if (expectedStatus === 200) {
  pm.test(`[${tcId}] Response có đủ fields: id, type, name`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property("id");
    pm.expect(body).to.have.property("type");
    pm.expect(body).to.have.property("name");
  });

  if (expectId) {
    pm.test(`[${tcId}] id = "${expectId}"`, () => {
      pm.expect(pm.response.json().id).to.equal(expectId);
    });
  }
  if (expectName) {
    pm.test(`[${tcId}] name = "${expectName}"`, () => {
      pm.expect(pm.response.json().name).to.equal(expectName);
    });
  }
  if (expectType) {
    pm.test(`[${tcId}] type = "${expectType}"`, () => {
      pm.expect(pm.response.json().type).to.equal(expectType);
    });
  }
}

// ── Test 3: 404 — message field ──────────────────────────────────────────────
if (expectMsgField && expectedStatus === 404) {
  pm.test(`[${tcId}] 404 body có field "${expectMsgField}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property(expectMsgField);
  });
}

// ── Test 4: 401 — error field ─────────────────────────────────────────────────
if (expectErrField) {
  pm.test(`[${tcId}] 401 body có field "${expectErrField}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property(expectErrField);
  });
}
```

---

## 5. Script cho `POST /products`

### Request Setup

```
Method: POST
URL:    {{baseUrl}}/products
Header: Authorization: {{currentAuthHeader}}
        Content-Type: application/json
Body (raw JSON): {{requestBody}}
```

**Pre-request Script (Request level):**

```javascript
// Ghép body từ các cột CSV hoặc object trong JSON
const bodyType = pm.iterationData.get("body_type");
const bodyName = pm.iterationData.get("body_name");
const bodyVersion = pm.iterationData.get("body_version");

// Nếu data là JSON (có field "body" là object), dùng trực tiếp
const bodyObj = pm.iterationData.get("body");
if (bodyObj && typeof bodyObj === "object") {
  pm.variables.set("requestBody", JSON.stringify(bodyObj));
} else {
  // Từ CSV — ghép từng cột
  const body = {};
  if (bodyType) body.type = bodyType;
  if (bodyName) body.name = bodyName;
  if (bodyVersion) body.version = bodyVersion;
  pm.variables.set("requestBody", JSON.stringify(body));
}
```

### Test Script

```javascript
// ─── Tests — POST /products ───────────────────────────────────────────────────
const tcId = pm.iterationData.get("tc_id") || "(no tc_id)";
const desc = pm.iterationData.get("description") || "";
const expectedStatus = parseInt(pm.iterationData.get("expected_status"));
const expectHasId =
  pm.iterationData.get("expect_has_id") === true ||
  pm.iterationData.get("expect_has_id") === "true";
const expectType = pm.iterationData.get("expect_field_type");
const expectName = pm.iterationData.get("expect_field_name");
const expectMsg = pm.iterationData.get("expect_message");
const expectErrField = pm.iterationData.get("expect_error_field");

// ── Test 1: Status Code ──────────────────────────────────────────────────────
pm.test(`[${tcId}] Status code = ${expectedStatus} | ${desc}`, () => {
  pm.expect(pm.response.code).to.equal(expectedStatus);
});

// ── Test 2: 201 Created — kiểm tra resource trả về ───────────────────────────
if (expectedStatus === 201) {
  pm.test(`[${tcId}] 201: Response có field "id" (auto-generated)`, () => {
    const body = pm.response.json();
    if (expectHasId) {
      pm.expect(body).to.have.property("id");
      pm.expect(body.id).to.be.a("string");
    }
  });

  if (expectType) {
    pm.test(`[${tcId}] 201: type = "${expectType}"`, () => {
      pm.expect(pm.response.json().type).to.equal(expectType);
    });
  }
  if (expectName) {
    pm.test(`[${tcId}] 201: name = "${expectName}"`, () => {
      pm.expect(pm.response.json().name).to.equal(expectName);
    });
  }
}

// ── Test 3: 400 — validation error message ───────────────────────────────────
if (expectedStatus === 400 && expectMsg) {
  pm.test(`[${tcId}] 400: message = "${expectMsg}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property("message");
    pm.expect(body.message).to.equal(expectMsg);
  });
}

// ── Test 4: 401 — error field ─────────────────────────────────────────────────
if (expectErrField) {
  pm.test(`[${tcId}] 401: body có field "${expectErrField}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property(expectErrField);
  });
}
```

---

## 6. Script cho `PUT /product/:id`

### Request Setup

```
Method: PUT
URL:    {{baseUrl}}/product/{{productId}}
Header: Authorization: {{currentAuthHeader}}
        Content-Type: application/json
Body (raw JSON): {{requestBody}}
```

**Pre-request Script:** Tương tự POST — map `product_id` + ghép body từ cột CSV.

### Test Script

```javascript
// ─── Tests — PUT /product/:id ─────────────────────────────────────────────────
const tcId = pm.iterationData.get("tc_id") || "(no tc_id)";
const desc = pm.iterationData.get("description") || "";
const expectedStatus = parseInt(pm.iterationData.get("expected_status"));
const expectFieldId = pm.iterationData.get("expect_field_id");
const expectFieldName = pm.iterationData.get("expect_field_name");
const expectFieldVersion = pm.iterationData.get("expect_field_version");
const expectMsg = pm.iterationData.get("expect_message");
const expectErrField = pm.iterationData.get("expect_error_field");

// ── Test 1: Status Code ──────────────────────────────────────────────────────
pm.test(`[${tcId}] Status code = ${expectedStatus} | ${desc}`, () => {
  pm.expect(pm.response.code).to.equal(expectedStatus);
});

// ── Test 2: 200 OK — product đã cập nhật ─────────────────────────────────────
if (expectedStatus === 200) {
  pm.test(`[${tcId}] 200: Response có đủ fields: id, type, name`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property("id");
    pm.expect(body).to.have.property("type");
    pm.expect(body).to.have.property("name");
  });

  if (expectFieldId) {
    pm.test(`[${tcId}] 200: id = "${expectFieldId}"`, () => {
      pm.expect(pm.response.json().id).to.equal(String(expectFieldId));
    });
  }
  if (expectFieldName) {
    pm.test(`[${tcId}] 200: name = "${expectFieldName}" (đã update)`, () => {
      pm.expect(pm.response.json().name).to.equal(expectFieldName);
    });
  }
  if (expectFieldVersion) {
    pm.test(`[${tcId}] 200: version = "${expectFieldVersion}"`, () => {
      pm.expect(pm.response.json().version).to.equal(expectFieldVersion);
    });
  }
}

// ── Test 3: 404 — not found ───────────────────────────────────────────────────
if (expectedStatus === 404 && expectMsg) {
  pm.test(`[${tcId}] 404: message = "${expectMsg}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property("message");
    pm.expect(body.message).to.equal(expectMsg);
  });
}

// ── Test 4: 401 — error field ─────────────────────────────────────────────────
if (expectErrField) {
  pm.test(`[${tcId}] 401: body có field "${expectErrField}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property(expectErrField);
  });
}
```

---

## 7. Script cho `DELETE /product/:id`

### Request Setup

```
Method: DELETE
URL:    {{baseUrl}}/product/{{productId}}
Header: Authorization: {{currentAuthHeader}}
```

### Test Script

```javascript
// ─── Tests — DELETE /product/:id ─────────────────────────────────────────────
const tcId = pm.iterationData.get("tc_id") || "(no tc_id)";
const desc = pm.iterationData.get("description") || "";
const expectedStatus = parseInt(pm.iterationData.get("expected_status"));
const expectEmpty =
  pm.iterationData.get("expect_empty_body") === true ||
  pm.iterationData.get("expect_empty_body") === "true";
const expectMsg = pm.iterationData.get("expect_message");
const expectErrField = pm.iterationData.get("expect_error_field");

// ── Test 1: Status Code ──────────────────────────────────────────────────────
pm.test(`[${tcId}] Status code = ${expectedStatus} | ${desc}`, () => {
  pm.expect(pm.response.code).to.equal(expectedStatus);
});

// ── Test 2: 204 No Content — body rỗng ───────────────────────────────────────
if (expectedStatus === 204 && expectEmpty) {
  pm.test(`[${tcId}] 204: Response body rỗng (No Content)`, () => {
    pm.expect(pm.response.text()).to.equal("");
  });
}

// ── Test 3: 404 — message field ──────────────────────────────────────────────
if (expectedStatus === 404 && expectMsg) {
  pm.test(`[${tcId}] 404: message = "${expectMsg}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property("message");
    pm.expect(body.message).to.equal(expectMsg);
  });
}

// ── Test 4: 401 — error field ─────────────────────────────────────────────────
if (expectErrField) {
  pm.test(`[${tcId}] 401: body có field "${expectErrField}"`, () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property(expectErrField);
  });
}
```

---

## 8. Cách chạy Collection Runner

### Bước 1: Import collection và environment

1. Mở Postman → **Import** → chọn file collection JSON của nhóm.
2. Import Environment `local` (có `baseUrl = http://localhost:8080`).

### Bước 2: Khởi động Provider Service

```bash
cd src/sample-api/pact-workshop-js
npm install
npm start   # Provider chạy tại http://localhost:8080
```

### Bước 3: Chạy Collection Runner với data file

1. Mở **Collection Runner** (nút Run ở góc collection).
2. Chọn folder cần chạy (vd: `GET — Happy Path`).
3. Bật **Data** → chọn file `.json` hoặc `.csv` tương ứng.
4. Set **Iterations** = số rows trong file (Postman tự detect nếu dùng JSON).
5. Nhấn **Run**.

### Bước 4: Đọc kết quả

| Cột trong Runner | Ý nghĩa                              |
| :--------------- | :----------------------------------- |
| Name             | Tên test assertion (bao gồm `tc_id`) |
| Passed/Failed    | Kết quả assertion                    |
| Duration (ms)    | Thời gian phản hồi                   |
| Status           | HTTP status code thực tế nhận được   |

---

## 9. Tham khảo

- Dataset đọc API: [`data-driven-read-api.md`](./data-driven-read-api.md)
- Dataset ghi API: [`data-driven-write-api.md`](./data-driven-write-api.md)
- Tổ chức collection: [`collection-organization.md`](./collection-organization.md)
- Auth middleware: `provider/middleware/auth.middleware.js`
