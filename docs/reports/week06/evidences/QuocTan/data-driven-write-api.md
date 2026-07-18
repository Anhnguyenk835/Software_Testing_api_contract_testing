# Bộ dữ liệu Data-Driven — API Ghi (Write)

**Task:** Chuẩn bị dữ liệu data-driven cho `POST /products`, `PUT /product/:id`, `DELETE /product/:id`  
**Thành viên:** Mạch Quốc Tấn (23127115)  
**Tuần:** W06 — 2026-07-13 → 2026-07-18

---

## 1. Tổng quan kịch bản

### POST /products

| Kịch bản                    | Body                             | Auth      | Status | Response body kỳ vọng                  |
| :-------------------------- | :------------------------------- | :-------- | :----- | :-------------------------------------- |
| Happy path — body đầy đủ    | `{type, name, version}`          | Hợp lệ    | `201`  | `{id, type, name, version}` (resource)  |
| Missing field — thiếu `type`| `{name: "Card X"}`               | Hợp lệ    | `400`  | `{message: "type and name are required"}` |
| Missing field — thiếu `name`| `{type: "CREDIT_CARD"}`          | Hợp lệ    | `400`  | `{message: "type and name are required"}` |
| Empty body                  | `{}`                             | Hợp lệ    | `400`  | `{message: "type and name are required"}` |
| Auth fail — no token        | `{type, name, version}`          | Không có  | `401`  | `{error: "Unauthorized"}`               |
| Auth fail — expired token   | `{type, name, version}`          | Hết hạn   | `401`  | `{error: "Unauthorized"}`               |

### PUT /product/:id

| Kịch bản                | id  | Body                    | Auth    | Status | Response body kỳ vọng                  |
| :---------------------- | :-- | :---------------------- | :------ | :----- | :-------------------------------------- |
| Happy path — id tồn tại | `10`| `{type, name, version}` | Hợp lệ  | `200`  | `{id, type, name, version}` (updated)   |
| Not found — id không tồn tại | `99`| `{type, name}`    | Hợp lệ  | `404`  | `{message: "Product not found"}`        |
| Auth fail — no token    | `10`| `{type, name}`          | Không có| `401`  | `{error: "Unauthorized"}`               |

### DELETE /product/:id

| Kịch bản                | id  | Auth    | Status | Response body kỳ vọng         |
| :---------------------- | :-- | :------ | :----- | :----------------------------- |
| Happy path — id tồn tại | `11`| Hợp lệ  | `204`  | (body rỗng — No Content)      |
| Not found — id không tồn tại | `99`| Hợp lệ | `404` | `{message: "Product not found"}` |
| Auth fail — no token    | `11`| Không có| `401`  | `{error: "Unauthorized"}`      |

---

## 2. Dataset dạng JSON

### 2.1 `post-products.data.json` — dữ liệu cho `POST /products`

Lưu tại: `src/postman/data/post-products.data.json`

> **Lưu ý:** JSON dataset dùng **flat columns** (`body_type`, `body_name`, `body_version`) thay vì nested object `body` để nhất quán với CSV và Pre-request Script — không cần phân nhánh xử lý.

```json
[
  {
    "tc_id": "POST_01",
    "description": "Happy path — body hợp lệ đầy đủ (type, name, version)",
    "auth_header": "{{validToken}}",
    "body_type": "CREDIT_CARD",
    "body_name": "SEBros Test Card",
    "body_version": "v1",
    "expected_status": 201,
    "expect_field_type": "CREDIT_CARD",
    "expect_field_name": "SEBros Test Card",
    "expect_has_id": true
  },
  {
    "tc_id": "POST_02",
    "description": "Happy path — body hợp lệ thiếu version (optional field)",
    "auth_header": "{{validToken}}",
    "body_type": "PERSONAL_LOAN",
    "body_name": "Quick Loan",
    "body_version": "",
    "expected_status": 201,
    "expect_field_type": "PERSONAL_LOAN",
    "expect_field_name": "Quick Loan",
    "expect_has_id": true
  },
  {
    "tc_id": "POST_03",
    "description": "Missing field — thiếu type (required)",
    "auth_header": "{{validToken}}",
    "body_type": "",
    "body_name": "No Type Card",
    "body_version": "v1",
    "expected_status": 400,
    "expect_message": "type and name are required"
  },
  {
    "tc_id": "POST_04",
    "description": "Missing field — thiếu name (required)",
    "auth_header": "{{validToken}}",
    "body_type": "CREDIT_CARD",
    "body_name": "",
    "body_version": "v1",
    "expected_status": 400,
    "expect_message": "type and name are required"
  },
  {
    "tc_id": "POST_05",
    "description": "Missing field — body rỗng {}",
    "auth_header": "{{validToken}}",
    "body_type": "",
    "body_name": "",
    "body_version": "",
    "expected_status": 400,
    "expect_message": "type and name are required"
  },
  {
    "tc_id": "POST_06",
    "description": "Auth fail — không có header Authorization",
    "auth_header": "",
    "body_type": "CREDIT_CARD",
    "body_name": "Unauthorized Card",
    "body_version": "",
    "expected_status": 401,
    "expect_error_field": "error"
  },
  {
    "tc_id": "POST_07",
    "description": "Auth fail — Bearer timestamp đã hết hạn",
    "auth_header": "Bearer 2020-01-01T00:00:00.000Z",
    "body_type": "CREDIT_CARD",
    "body_name": "Expired Token Card",
    "body_version": "",
    "expected_status": 401,
    "expect_error_field": "error"
  }
]
```

### 2.2 `put-product.data.json` — dữ liệu cho `PUT /product/:id`

Lưu tại: `src/postman/data/put-product.data.json`

```json
[
  {
    "tc_id": "PUT_01",
    "description": "Happy path — cập nhật id=10 với body hợp lệ",
    "product_id": "10",
    "auth_header": "{{validToken}}",
    "body": {
      "type": "CREDIT_CARD",
      "name": "28 Degrees Updated",
      "version": "v2"
    },
    "expected_status": 200,
    "expect_field_id": "10",
    "expect_field_name": "28 Degrees Updated",
    "expect_field_version": "v2"
  },
  {
    "tc_id": "PUT_02",
    "description": "Happy path — cập nhật chỉ name (partial update)",
    "product_id": "09",
    "auth_header": "{{validToken}}",
    "body": {
      "type": "CREDIT_CARD",
      "name": "Gem Visa Renewed"
    },
    "expected_status": 200,
    "expect_field_id": "09",
    "expect_field_name": "Gem Visa Renewed"
  },
  {
    "tc_id": "PUT_03",
    "description": "Not found — id=99 không tồn tại",
    "product_id": "99",
    "auth_header": "{{validToken}}",
    "body": {
      "type": "CREDIT_CARD",
      "name": "Ghost Product"
    },
    "expected_status": 404,
    "expect_message": "Product not found"
  },
  {
    "tc_id": "PUT_04",
    "description": "Not found — id=abc (không phải số)",
    "product_id": "abc",
    "auth_header": "{{validToken}}",
    "body": {
      "type": "PERSONAL_LOAN",
      "name": "Invalid ID Product"
    },
    "expected_status": 404,
    "expect_message": "Product not found"
  },
  {
    "tc_id": "PUT_05",
    "description": "Auth fail — không có header Authorization",
    "product_id": "10",
    "auth_header": "",
    "body": {
      "type": "CREDIT_CARD",
      "name": "No Auth Update"
    },
    "expected_status": 401,
    "expect_error_field": "error"
  },
  {
    "tc_id": "PUT_06",
    "description": "Auth fail — Bearer timestamp hết hạn",
    "product_id": "10",
    "auth_header": "Bearer 2020-01-01T00:00:00.000Z",
    "body": {
      "type": "CREDIT_CARD",
      "name": "Expired Auth Update"
    },
    "expected_status": 401,
    "expect_error_field": "error"
  }
]
```

### 2.3 `delete-product.data.json` — dữ liệu cho `DELETE /product/:id`

Lưu tại: `src/postman/data/delete-product.data.json`

```json
[
  {
    "tc_id": "DELETE_01",
    "description": "Happy path — xóa id=11 (MyFlexiPay) tồn tại",
    "product_id": "11",
    "auth_header": "{{validToken}}",
    "expected_status": 204,
    "expect_empty_body": true
  },
  {
    "tc_id": "DELETE_02",
    "description": "Not found — xóa id=99 không tồn tại",
    "product_id": "99",
    "auth_header": "{{validToken}}",
    "expected_status": 404,
    "expect_message": "Product not found"
  },
  {
    "tc_id": "DELETE_03",
    "description": "Not found — xóa id=abc (không hợp lệ)",
    "product_id": "abc",
    "auth_header": "{{validToken}}",
    "expected_status": 404,
    "expect_message": "Product not found"
  },
  {
    "tc_id": "DELETE_04",
    "description": "Auth fail — không có header Authorization",
    "product_id": "10",
    "auth_header": "",
    "expected_status": 401,
    "expect_error_field": "error"
  },
  {
    "tc_id": "DELETE_05",
    "description": "Auth fail — Bearer timestamp đã hết hạn",
    "product_id": "10",
    "auth_header": "Bearer 2020-01-01T00:00:00.000Z",
    "expected_status": 401,
    "expect_error_field": "error"
  }
]
```

---

## 3. Dataset dạng CSV

### 3.1 `post-products.data.csv`

Lưu tại: `src/postman/data/post-products.data.csv`

```csv
tc_id,description,auth_header,body_type,body_name,body_version,expected_status,expect_has_id,expect_message,expect_error_field
POST_01,Happy path đầy đủ,{{validToken}},CREDIT_CARD,SEBros Test Card,v1,201,true,,
POST_02,Happy path thiếu version,{{validToken}},PERSONAL_LOAN,Quick Loan,,201,true,,
POST_03,Missing type — thiếu type,{{validToken}},,No Type Card,v1,400,,type and name are required,
POST_04,Missing name — thiếu name,{{validToken}},CREDIT_CARD,,,400,,type and name are required,
POST_05,Empty body,{{validToken}},,,,400,,type and name are required,
POST_06,Auth fail no token,,CREDIT_CARD,Unauthorized Card,,401,,,error
POST_07,Auth fail expired,Bearer 2020-01-01T00:00:00.000Z,CREDIT_CARD,Expired Card,,401,,,error
```

### 3.2 `put-product.data.csv`

Lưu tại: `src/postman/data/put-product.data.csv`

```csv
tc_id,description,product_id,auth_header,body_type,body_name,body_version,expected_status,expect_field_name,expect_message,expect_error_field
PUT_01,Happy path id=10,10,{{validToken}},CREDIT_CARD,28 Degrees Updated,v2,200,28 Degrees Updated,,
PUT_02,Happy path id=09 partial,09,{{validToken}},CREDIT_CARD,Gem Visa Renewed,,200,Gem Visa Renewed,,
PUT_03,Not found id=99,99,{{validToken}},CREDIT_CARD,Ghost Product,,404,,Product not found,
PUT_04,Not found id=abc,abc,{{validToken}},PERSONAL_LOAN,Invalid ID,,404,,Product not found,
PUT_05,Auth fail no token,10,,CREDIT_CARD,No Auth Update,,401,,,error
PUT_06,Auth fail expired,10,Bearer 2020-01-01T00:00:00.000Z,CREDIT_CARD,Expired Update,,401,,,error
```

### 3.3 `delete-product.data.csv`

Lưu tại: `src/postman/data/delete-product.data.csv`

```csv
tc_id,description,product_id,auth_header,expected_status,expect_empty_body,expect_message,expect_error_field
DELETE_01,Happy path id=11,11,{{validToken}},204,true,,
DELETE_02,Not found id=99,99,{{validToken}},404,,Product not found,
DELETE_03,Not found id=abc,abc,{{validToken}},404,,Product not found,
DELETE_04,Auth fail no token,10,,401,,,error
DELETE_05,Auth fail expired,10,Bearer 2020-01-01T00:00:00.000Z,401,,,error
```

---

## 4. Giải thích cột dữ liệu (Write APIs)

| Cột                   | Mục đích                                                                          |
| :-------------------- | :-------------------------------------------------------------------------------- |
| `tc_id`               | ID test case — truy vết khi Runner báo lỗi                                       |
| `description`         | Mô tả kịch bản — hiện trong Runner results                                        |
| `product_id`          | Giá trị `:id` trong URL (PUT/DELETE) — map vào path variable                     |
| `auth_header`         | Giá trị header `Authorization` — resolve từ Pre-request script                   |
| `body_type`           | Field `type` trong request body (CSV split body thành nhiều cột)                 |
| `body_name`           | Field `name` trong request body                                                   |
| `body_version`        | Field `version` trong request body (optional)                                    |
| `expected_status`     | HTTP status code kỳ vọng                                                          |
| `expect_has_id`       | `true` = response body 201 phải có field `id` (POST happy path)                  |
| `expect_field_name`   | Giá trị `name` kỳ vọng trong response (PUT happy path)                            |
| `expect_message`      | Giá trị `message` kỳ vọng trong error body (400/404)                             |
| `expect_error_field`  | Tên field `error` kỳ vọng trong error body (401)                                 |
| `expect_empty_body`   | `true` = response 204 không có body (DELETE happy path)                           |

---

## 5. Lưu ý quan trọng khi dùng CSV cho Write APIs

1. **Body là nested object** — CSV không hỗ trợ object lồng nhau. Giải pháp: tách body thành các cột riêng (`body_type`, `body_name`, `body_version`) và ghép lại trong Pre-request Script:

   ```javascript
   // Pre-request Script — POST /products
   const bodyType = pm.iterationData.get("body_type");
   const bodyName = pm.iterationData.get("body_name");
   const bodyVersion = pm.iterationData.get("body_version");
   
   const body = {};
   if (bodyType) body.type = bodyType;
   if (bodyName) body.name = bodyName;
   if (bodyVersion) body.version = bodyVersion;
   
   pm.variables.set("requestBody", JSON.stringify(body));
   ```

   Sau đó trong request Body (raw JSON): `{{requestBody}}`

2. **JSON dataset** giữ nguyên cấu trúc object — không cần ghép lại, dễ đọc hơn cho debug.

3. **DELETE 204 không có body** — script kiểm tra `pm.response.text() === ""` hoặc `pm.response.size().body === 0`.

---

## 6. Tham khảo

- Controller: `provider/product/product.controller.js` — logic validate `type` và `name` bắt buộc
- Repository: `provider/product/product.repository.js` — in-memory Map, auto-increment ID từ `12`
- Dataset đọc API: [`data-driven-read-api.md`](./data-driven-read-api.md)
- Test script động: [`postman-test-scripts.md`](./postman-test-scripts.md)
