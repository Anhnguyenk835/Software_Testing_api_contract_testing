# API mẫu (Sample API) — Consumer App & Provider Service

API mẫu dùng **xuyên suốt** các demo Postman / Newman / Pact của nhóm.

Gồm 2 dịch vụ độc lập, nằm trong `pact-workshop-js/` (clone từ repo chính chủ
[`pact-foundation/pact-workshop-js`](https://github.com/pact-foundation/pact-workshop-js)):

| Dịch vụ | Vai trò | Thư mục | Port mặc định |
| :--- | :--- | :--- | :--- |
| **Consumer App** | Frontend React, gọi Provider để hiển thị danh sách sản phẩm | `pact-workshop-js/consumer/` | `3000` |
| **Provider Service** | Backend API (Express) | `pact-workshop-js/provider/` | `8080` |

> Repo gốc dùng domain "Product" (danh mục sản phẩm) làm ví dụ minh hoạ cho
> consumer-driven contract testing. Nhóm giữ nguyên nội dung gốc để tận dụng
> luôn phần Pact test / auth middleware / Pact Broker (`docker-compose.yaml`)
> có sẵn cho các tuần sau, thay vì viết lại từ đầu.

## Yêu cầu

- **Node.js** (đã test với v26) và npm.

## Cài đặt & khởi chạy (khuyên dùng — 1 lệnh cho cả 2 service)

```bash
cd src/sample-api/pact-workshop-js
pnpm install     # cài dependencies cho cả consumer/ và provider/ (script postinstall)
pnpm start       # chạy đồng thời consumer (:3000) và provider (:8080)
```

Sau khi chạy, mở `http://localhost:3000` để xem giao diện Consumer App (danh
sách sản phẩm lấy từ Provider).

## Chạy riêng từng service (nếu cần)

```bash
# Terminal 1 — Provider Service
cd src/sample-api/pact-workshop-js/provider
pnpm install
pnpm start        # http://localhost:8080

# Terminal 2 — Consumer App
cd src/sample-api/pact-workshop-js/consumer
pnpm install
pnpm start         # http://localhost:3000, gọi API qua REACT_APP_API_BASE_URL (consumer/.env)
```

## Auth (Provider Service)

**toàn bộ** endpoint của Provider đều yêu cầu header:

    Authorization: Bearer <timestamp ISO-8601, vd: 2026-07-15T10:00:00.000Z>

Timestamp phải nằm trong vòng 1 giờ so với đồng hồ server. Thiếu header hoặc
token sai định dạng/hết hạn → `401 Unauthorized`, body `{"error":"Unauthorized"}`.


## Danh sách Endpoint (Provider)

| Method | Path | Auth | Thành công | Lỗi |
| :--- | :--- | :---: | :--- | :--- |
| GET | `/products` | Có | `200` + mảng sản phẩm | `401` |
| GET | `/product/:id` | Có | `200` + sản phẩm | `401`, `404` |
| POST | `/products` | Có | `201` + sản phẩm vừa tạo | `400` (thiếu `type`/`name`), `401` |
| PUT | `/product/:id` | Có | `200` + sản phẩm đã cập nhật | `401`, `404` |
| DELETE | `/product/:id` | Có | `204` (không có body) | `401`, `404` |

Cấu trúc một sản phẩm (`Product`):

```json
{ "id": "10", "type": "CREDIT_CARD", "name": "28 Degrees", "version": "v1" }
```

## Mã trạng thái (Status code)

| Mã | Ý nghĩa | Khi nào |
| :--- | :--- | :--- |
| 200 | OK | `GET`/`PUT` thành công |
| 201 | Created | `POST /products` thành công, trả về sản phẩm vừa tạo |
| 204 | No Content | `DELETE /product/:id` thành công, không có body |
| 400 | Bad Request | Body của `POST`/`PUT` thiếu `type`/`name` |
| 401 | Unauthorized | Thiếu header `Authorization` hoặc Bearer timestamp không hợp lệ/hết hạn (kiểm tra trước khi vào route handler) |
| 404 | Not Found | `GET`/`PUT`/`DELETE` với `:id` không tồn tại |

## Kiểm tra nhanh Provider bằng curl

```bash
# GET danh sách sản phẩm
curl http://localhost:8080/products \
  -H "Authorization: Bearer 2026-07-15T10:00:00.000Z"

# GET 1 sản phẩm theo id
curl http://localhost:8080/product/10 \
  -H "Authorization: Bearer 2026-07-15T10:00:00.000Z"

# POST tạo sản phẩm mới
curl -X POST http://localhost:8080/products \
  -H "Authorization: Bearer 2026-07-15T10:00:00.000Z" \
  -H "Content-Type: application/json" \
  -d '{"type":"CREDIT_CARD","name":"New Card","version":"v1"}'

# PUT cập nhật sản phẩm
curl -X PUT http://localhost:8080/product/10 \
  -H "Authorization: Bearer 2026-07-15T10:00:00.000Z" \
  -H "Content-Type: application/json" \
  -d '{"type":"CREDIT_CARD","name":"Updated Name","version":"v2"}'

# DELETE xoá sản phẩm
curl -X DELETE http://localhost:8080/product/10 \
  -H "Authorization: Bearer 2026-07-15T10:00:00.000Z"
```

Kết quả mẫu (`GET /products`):

```json
[{"id":"09","type":"CREDIT_CARD","name":"Gem Visa","version":"v1"},
 {"id":"10","type":"CREDIT_CARD","name":"28 Degrees","version":"v1"},
 {"id":"11","type":"PERSONAL_LOAN","name":"MyFlexiPay","version":"v2"}]
```

Kết quả mẫu khi lỗi:

```json
// 401 - thiếu hoặc sai Authorization
{ "error": "Unauthorized" }

// 400 - POST/PUT thiếu type hoặc name
{ "message": "type and name are required" }

// 404 - :id không tồn tại
{ "message": "Product not found" }
```

## Lưu ý làm rõ

Repo gốc là một workshop nhiều bước nên còn kèm theo:
- `provider/test/` — test đơn vị (unit test) cho `server.js`, `product.controller.js`, `product.repository.js` (thêm ở tuần 06, 20 test).
- `consumer/src/api.spec.js`, `consumer/src/api.pact.spec.js`, `provider/product/product.pact.test.js` — test đơn vị & Pact test mẫu.
- `provider/middleware/auth.middleware.js` — middleware kiểm tra Bearer token; từ tuần 06 đã gắn **trước** routes nên áp dụng cho toàn bộ endpoint (xem mục Auth ở trên).
- `provider/Dockerfile` và service `provider` trong `docker-compose.yaml` — build/chạy Provider bằng Docker, dùng chung với Postgres + Pact Broker khi demo publish/verify contract qua broker.

Các phần này sẽ được nhóm khai thác dần ở các tuần Contract Testing với Pact
(`src/pact/`) và khi triển khai Auth JWT ở các tuần sau — không cần đụng tới
để chỉ chạy API mẫu.

