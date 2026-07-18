# Tổ chức Collection và Ghi chú Demo/Seminar — Data-Driven Testing

**Task:** Gắn data-driven vào folder collection nhóm; soạn ghi chú cho demo/seminar  
**Thành viên:** Mạch Quốc Tấn (23127115)  
**Tuần:** W06 — 2026-07-13 → 2026-07-18

---

## 1. Cấu trúc folder Collection đề xuất

```
Product Service - Data Driven Tests (Collection)
│
├── 🔧 _Setup (Pre-flight)
│   └── GET /products [smoke test]          ← kiểm tra server đang chạy
│
├── 📂 GET — Happy Path
│   ├── GET /products [list all]            ← data: get-products.data.json (row 01)
│   └── GET /product/:id [by id]            ← data: get-product-by-id.data.json (rows 01-03)
│
├── 📂 GET — Negative
│   ├── GET /products [auth fail]           ← data: get-products.data.json (rows 02-04)
│   └── GET /product/:id [not found / auth fail]  ← data: get-product-by-id.data.json (rows 04-07)
│
├── 📂 POST — Happy Path
│   └── POST /products [create]             ← data: post-products.data.json (rows 01-02)
│
├── 📂 POST — Negative
│   └── POST /products [missing field / auth fail]  ← data: post-products.data.json (rows 03-07)
│
├── 📂 PUT — Happy Path
│   └── PUT /product/:id [update]           ← data: put-product.data.json (rows 01-02)
│
├── 📂 PUT — Negative
│   └── PUT /product/:id [not found / auth fail]  ← data: put-product.data.json (rows 03-06)
│
├── 📂 DELETE — Happy Path
│   └── DELETE /product/:id [remove]        ← data: delete-product.data.json (row 01)
│
└── 📂 DELETE — Negative
    └── DELETE /product/:id [not found / auth fail]  ← data: delete-product.data.json (rows 02-05)
```

**Nguyên tắc phân folder:**

| Tiêu chí        | Happy Path                             | Negative                                     |
| :-------------- | :------------------------------------- | :------------------------------------------- |
| Auth            | Token hợp lệ (ISO-8601, trong vòng 1h) | Không có token hoặc token hết hạn            |
| Resource ID     | ID tồn tại (09, 10, 11)                | ID không tồn tại (99, abc) hoặc ID sẽ bị xóa |
| Request Body    | Đủ `type` và `name`                    | Thiếu `type` và/hoặc `name`, hoặc body rỗng  |
| Expected Status | `200`, `201`, `204`                    | `400`, `401`, `404`                          |

---

## 2. Mapping data file → folder → request

| Folder              | Data File                     | Rows (tc_id)       | Method + Path         |
| :------------------ | :---------------------------- | :----------------- | :-------------------- |
| GET — Happy Path    | `get-products.data.json`      | GET_PRODUCTS_01    | `GET /products`       |
| GET — Negative      | `get-products.data.json`      | GET_PRODUCTS_02–04 | `GET /products`       |
| GET — Happy Path    | `get-product-by-id.data.json` | GET_BY_ID_01–03    | `GET /product/:id`    |
| GET — Negative      | `get-product-by-id.data.json` | GET_BY_ID_04–07    | `GET /product/:id`    |
| POST — Happy Path   | `post-products.data.json`     | POST_01–02         | `POST /products`      |
| POST — Negative     | `post-products.data.json`     | POST_03–07         | `POST /products`      |
| PUT — Happy Path    | `put-product.data.json`       | PUT_01–02          | `PUT /product/:id`    |
| PUT — Negative      | `put-product.data.json`       | PUT_03–06          | `PUT /product/:id`    |
| DELETE — Happy Path | `delete-product.data.json`    | DELETE_01          | `DELETE /product/:id` |
| DELETE — Negative   | `delete-product.data.json`    | DELETE_02–05       | `DELETE /product/:id` |

---

## 3. Chiến lược tổ chức nhiều test case đa method

### 3.1 Một data file — nhiều rows — một request template

Mỗi folder có **một request duy nhất** (template), dữ liệu được feed từ data file.  
Ưu điểm: dễ maintain, chỉ sửa script một chỗ khi API thay đổi.

```
POST — Negative/
  └── POST /products [negative template]
        Pre-request Script: ghép body từ {body_type, body_name, body_version}
        Test Script:        assert dựa trên {expected_status, expect_message, expect_error_field}
        Data file:          post-products.data.json rows 03–07 (5 iterations)
```

### 3.2 Tách folder Happy/Negative thay vì tách theo status code

Không dùng folder `401 Tests` hay `404 Tests` — thay vào đó:

- **Happy Path**: tập trung assert business logic (fields trả về đúng, id tự sinh, name đã update).
- **Negative**: tập trung assert error body và status code lỗi.

Lợi ích: khi chạy smoke test nhanh, chỉ cần run folder `Happy Path`; CI có thể run toàn bộ.

### 3.3 Sử dụng Environment Variables để tái sử dụng

| Variable      | Scope       | Giá trị                     | Mô tả                                  |
| :------------ | :---------- | :-------------------------- | :------------------------------------- |
| `baseUrl`     | Environment | `http://localhost:8080`     | Đổi sang staging/prod mà không sửa URL |
| `validToken`  | Collection  | Sinh động trong Pre-request | Bearer ISO-8601 hiện tại               |
| `productId`   | Request     | Từ `pm.iterationData`       | Map vào path variable `:id`            |
| `requestBody` | Request     | Từ Pre-request Script       | JSON body đã ghép từ CSV columns       |

### 3.4 Đặt tên assertion có tc_id

Tên assertion theo pattern `[tc_id] <mô tả>`:

```javascript
pm.test(`[POST_03] Status code = 400 | Missing type — thiếu type`, () => { ... });
pm.test(`[POST_03] 400: message = "type and name are required"`, () => { ... });
```

Postman Runner hiện đủ tc_id trong kết quả → dễ tìm ra row nào fail khi debug.

---

## 4. Ghi chú nội dung Demo/Seminar

### 4.1 Luồng demo đề xuất (10–15 phút)

**Bước 1 — Giới thiệu bộ data (2 phút)**

- Mở file `get-product-by-id.data.json` — 7 rows, 3 loại kịch bản: happy, 404, 401.
- Giải thích: 1 row = 1 test case; script đọc từng row theo iteration.

**Bước 2 — Chạy Collection Runner: GET Happy Path (3 phút)**

- Chọn folder `GET — Happy Path`, load `get-product-by-id.data.json`, 3 iterations.
- Chạy → hiện kết quả 3 iterations passed, highlight cột tc_id và status code.

**Bước 3 — Chạy GET Negative để thấy 401/404 (2 phút)**

- Chọn folder `GET — Negative`, load cùng data file, filter rows 04–07.
- Chạy → 4 iterations, đều pass (assert status 401 hoặc 404 đúng).

**Bước 4 — Chạy POST Negative để thấy validation 400 (3 phút)**

- Folder `POST — Negative`, load `post-products.data.json`.
- Chạy → 5 iterations, highlight test `[POST_03] 400: message = "type and name are required"`.

**Bước 5 — Chạy DELETE Happy Path rồi GET lại để thấy 404 (3 phút)**

- Folder `DELETE — Happy Path` (DELETE_01 xóa id=11) → 204 pass.
- Sau đó manual GET /product/11 → 404 (resource đã bị xóa).
- Điểm nhấn: in-memory store bị ảnh hưởng → tầm quan trọng của test isolation / reset state.

**Bước 6 — Tóm tắt kiến trúc script (2 phút)**

- Sơ đồ: Data file → Collection Runner → Pre-request → Request → Tests.
- Nhấn mạnh: một script template phục vụ nhiều test case chỉ bằng thay đổi data file.

### 4.2 Điểm nhấn kỹ thuật cần trình bày

| Điểm                     | Giải thích ngắn                                                                      |
| :----------------------- | :----------------------------------------------------------------------------------- |
| `pm.iterationData.get()` | Đọc giá trị từng cột của data file theo iteration hiện tại                           |
| `pm.variables.set()`     | Lưu giá trị vào scope request để URL/Header/Body tham chiếu qua `{{variable}}`       |
| Header động              | `pm.request.headers.upsert()` / `.remove()` — thêm/xóa header theo kịch bản          |
| Conditional assertion    | `if (expectedStatus === 200) { ... }` — tránh false positive khi assert              |
| Bearer token sinh động   | `new Date().toISOString()` — token luôn hợp lệ trong Pre-request, không cần hardcode |

### 4.3 Lưu ý test isolation cho DELETE

> Provider dùng **in-memory store** — dữ liệu reset khi restart server.  
> Để tránh DELETE_01 ảnh hưởng các test case sau, nên:
>
> 1. Chạy DELETE trong folder riêng cuối cùng trong run.
> 2. Hoặc restart Provider service giữa các run để reset về seed data.
> 3. Về lâu dài: triển khai endpoint `POST /reset` (provider states) cho mục đích testing.

---

## 5. Checklist hoàn thành task

- [x] Dataset JSON cho `GET /products` — 4 test cases (happy + 3 auth fail)
- [x] Dataset JSON cho `GET /product/:id` — 7 test cases (happy + not found + auth fail)
- [x] Dataset JSON cho `POST /products` — 7 test cases (happy + missing field + auth fail)
- [x] Dataset JSON cho `PUT /product/:id` — 6 test cases (happy + not found + auth fail)
- [x] Dataset JSON cho `DELETE /product/:id` — 5 test cases (happy + not found + auth fail)
- [x] Dataset CSV tương ứng cho tất cả 5 endpoint
- [x] Pre-request Script: sinh Bearer token + map iteration data vào variables
- [x] Test Script động cho 5 endpoint với conditional assertion theo `expected_status`
- [x] Tổ chức folder collection theo method + happy/negative
- [x] Ghi chú demo/seminar và điểm nhấn kỹ thuật

---

## 6. Tham khảo

- Dataset đọc: [`data-driven-read-api.md`](./data-driven-read-api.md)
- Dataset ghi: [`data-driven-write-api.md`](./data-driven-write-api.md)
- Test scripts: [`postman-test-scripts.md`](./postman-test-scripts.md)
- Postman data files location: `src/postman/data/`
- Provider README: `src/sample-api/README.md`
