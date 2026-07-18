# Bộ dữ liệu Data-Driven — API Đọc (Read)

**Task:** Chuẩn bị dữ liệu data-driven cho `GET /products` và `GET /product/:id`  
**Thành viên:** Mạch Quốc Tấn (23127115)  
**Tuần:** W06 — 2026-07-13 → 2026-07-18

---

## 1. Tổng quan kịch bản

| Endpoint           | Kịch bản                | Điều kiện                                  | Status kỳ vọng |
| :----------------- | :---------------------- | :----------------------------------------- | :------------- |
| `GET /products`    | Happy path              | Token hợp lệ (ISO-8601, trong vòng 1h)     | `200`          |
| `GET /products`    | Auth fail — no token    | Không có header `Authorization`            | `401`          |
| `GET /products`    | Auth fail — bad token   | Token sai định dạng / hết hạn              | `401`          |
| `GET /product/:id` | Happy path — id tồn tại | Token hợp lệ, id = `09`/`10`/`11`          | `200`          |
| `GET /product/:id` | Not found — id = `99`   | Token hợp lệ, id không tồn tại             | `404`          |
| `GET /product/:id` | Auth fail — no token    | Không có header `Authorization`, id = `10` | `401`          |
| `GET /product/:id` | Auth fail — expired     | Token đã hết hạn (> 1h), id = `10`         | `401`          |

---

## 2. Dataset dạng JSON

### 2.1 `get-products.data.json` — dữ liệu cho `GET /products`

Lưu tại: `src/postman/data/get-products.data.json`

```json
[
  {
    "tc_id": "GET_PRODUCTS_01",
    "description": "Happy path — token hợp lệ, trả về danh sách sản phẩm",
    "auth_header": "{{validToken}}",
    "expected_status": 200,
    "expect_array": true,
    "expect_min_length": 1
  },
  {
    "tc_id": "GET_PRODUCTS_02",
    "description": "Auth fail — không có header Authorization",
    "auth_header": "",
    "expected_status": 401,
    "expect_array": false,
    "expect_error_field": "error"
  },
  {
    "tc_id": "GET_PRODUCTS_03",
    "description": "Auth fail — token sai định dạng (chuỗi rác)",
    "auth_header": "Bearer INVALID_TOKEN_STRING",
    "expected_status": 401,
    "expect_array": false,
    "expect_error_field": "error"
  },
  {
    "tc_id": "GET_PRODUCTS_04",
    "description": "Auth fail — Bearer timestamp đã hết hạn (> 1 giờ trước)",
    "auth_header": "Bearer 2020-01-01T00:00:00.000Z",
    "expected_status": 401,
    "expect_array": false,
    "expect_error_field": "error"
  }
]
```

### 2.2 `get-product-by-id.data.json` — dữ liệu cho `GET /product/:id`

Lưu tại: `src/postman/data/get-product-by-id.data.json`

```json
[
  {
    "tc_id": "GET_BY_ID_01",
    "description": "Happy path — id=09 (Gem Visa) tồn tại",
    "product_id": "09",
    "auth_header": "{{validToken}}",
    "expected_status": 200,
    "expect_field_id": "09",
    "expect_field_type": "CREDIT_CARD",
    "expect_field_name": "Gem Visa"
  },
  {
    "tc_id": "GET_BY_ID_02",
    "description": "Happy path — id=10 (28 Degrees) tồn tại",
    "product_id": "10",
    "auth_header": "{{validToken}}",
    "expected_status": 200,
    "expect_field_id": "10",
    "expect_field_type": "CREDIT_CARD",
    "expect_field_name": "28 Degrees"
  },
  {
    "tc_id": "GET_BY_ID_03",
    "description": "Happy path — id=11 (MyFlexiPay) tồn tại",
    "product_id": "11",
    "auth_header": "{{validToken}}",
    "expected_status": 200,
    "expect_field_id": "11",
    "expect_field_type": "PERSONAL_LOAN",
    "expect_field_name": "MyFlexiPay"
  },
  {
    "tc_id": "GET_BY_ID_04",
    "description": "Not found — id=99 không tồn tại trong repository",
    "product_id": "99",
    "auth_header": "{{validToken}}",
    "expected_status": 404,
    "expect_message_field": "message"
  },
  {
    "tc_id": "GET_BY_ID_05",
    "description": "Not found — id=abc (chuỗi không phải số)",
    "product_id": "abc",
    "auth_header": "{{validToken}}",
    "expected_status": 404,
    "expect_message_field": "message"
  },
  {
    "tc_id": "GET_BY_ID_06",
    "description": "Auth fail — không có header Authorization",
    "product_id": "10",
    "auth_header": "",
    "expected_status": 401,
    "expect_error_field": "error"
  },
  {
    "tc_id": "GET_BY_ID_07",
    "description": "Auth fail — Bearer timestamp đã hết hạn",
    "product_id": "10",
    "auth_header": "Bearer 2020-06-01T10:00:00.000Z",
    "expected_status": 401,
    "expect_error_field": "error"
  }
]
```

---

## 3. Dataset dạng CSV

### 3.1 `get-products.data.csv`

Lưu tại: `src/postman/data/get-products.data.csv`

```csv
tc_id,description,auth_header,expected_status,expect_array,expect_min_length,expect_error_field
GET_PRODUCTS_01,Happy path — token hợp lệ,{{validToken}},200,true,1,
GET_PRODUCTS_02,Auth fail — không có Authorization,,401,false,,error
GET_PRODUCTS_03,Auth fail — token sai định dạng,Bearer INVALID_TOKEN_STRING,401,false,,error
GET_PRODUCTS_04,Auth fail — Bearer timestamp hết hạn,Bearer 2020-01-01T00:00:00.000Z,401,false,,error
```

### 3.2 `get-product-by-id.data.csv`

Lưu tại: `src/postman/data/get-product-by-id.data.csv`

```csv
tc_id,description,product_id,auth_header,expected_status,expect_field_id,expect_field_name,expect_field_type,expect_message_field,expect_error_field
GET_BY_ID_01,Happy path id=09,09,{{validToken}},200,09,Gem Visa,CREDIT_CARD,,
GET_BY_ID_02,Happy path id=10,10,{{validToken}},200,10,28 Degrees,CREDIT_CARD,,
GET_BY_ID_03,Happy path id=11,11,{{validToken}},200,11,MyFlexiPay,PERSONAL_LOAN,,
GET_BY_ID_04,Not found id=99,99,{{validToken}},404,,,,message,
GET_BY_ID_05,Not found id=abc,abc,{{validToken}},404,,,,message,
GET_BY_ID_06,Auth fail no token,10,,401,,,,,error
GET_BY_ID_07,Auth fail expired token,10,Bearer 2020-06-01T10:00:00.000Z,401,,,,,error
```

---

## 4. Giải thích cột dữ liệu

| Cột                    | Mục đích                                                                        |
| :--------------------- | :------------------------------------------------------------------------------ |
| `tc_id`                | ID test case — dùng trong log assertion để dễ truy vết khi Runner báo lỗi       |
| `description`          | Mô tả kịch bản — hiện trong Postman Runner results                              |
| `product_id`           | Giá trị `:id` trong URL `GET /product/:id` — map vào path variable              |
| `auth_header`          | Giá trị header `Authorization` — `{{validToken}}` resolve từ Pre-request script |
| `expected_status`      | HTTP status code kỳ vọng — script so sánh `pm.response.code`                    |
| `expect_array`         | `true` = response body phải là array (dùng cho `GET /products`)                 |
| `expect_min_length`    | Độ dài tối thiểu của mảng response                                              |
| `expect_field_id`      | Giá trị `id` kỳ vọng trong response body (happy path)                           |
| `expect_field_name`    | Giá trị `name` kỳ vọng trong response body                                      |
| `expect_field_type`    | Giá trị `type` kỳ vọng trong response body                                      |
| `expect_message_field` | Tên field trong error body kỳ vọng (404: `"message"`)                           |
| `expect_error_field`   | Tên field trong error body kỳ vọng (401: `"error"`)                             |

---

## 5. Seed data trong repository

```json
[
  { "id": "09", "type": "CREDIT_CARD", "name": "Gem Visa", "version": "v1" },
  { "id": "10", "type": "CREDIT_CARD", "name": "28 Degrees", "version": "v1" },
  { "id": "11", "type": "PERSONAL_LOAN", "name": "MyFlexiPay", "version": "v2" }
]
```

> Provider dùng in-memory store — restart server sẽ reset về seed data trên.

---

## 6. Tham khảo

- Auth middleware: `provider/middleware/auth.middleware.js` — Bearer token phải là ISO-8601, trong vòng 1h.
- Controller: `provider/product/product.controller.js`
- Repository: `provider/product/product.repository.js`
- Test script động: [`postman-test-scripts.md`](./postman-test-scripts.md)
- Dataset ghi API: [`data-driven-write-api.md`](./data-driven-write-api.md)
