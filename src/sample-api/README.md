# API mẫu (Sample API) — Consumer App & Provider Service

API mẫu dùng **xuyên suốt** các demo Postman / Newman / Pact của nhóm.

Gồm 2 dịch vụ độc lập, nằm trong `pact-workshop-js/` (fork từ repo chính chủ
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
npm install     # cài dependencies cho cả consumer/ và provider/ (script postinstall)
npm start       # chạy đồng thời consumer (:3000) và provider (:8080)
```

Sau khi chạy, mở `http://localhost:3000` để xem giao diện Consumer App (danh
sách sản phẩm lấy từ Provider).

## Chạy riêng từng service (nếu cần)

```bash
# Terminal 1 — Provider Service
cd src/sample-api/pact-workshop-js/provider
npm install
npm start        # http://localhost:8080

# Terminal 2 — Consumer App
cd src/sample-api/pact-workshop-js/consumer
npm install
npm start         # http://localhost:3000, gọi API qua REACT_APP_API_BASE_URL (consumer/.env)
```

## Kiểm tra nhanh Provider bằng curl

```bash
curl http://localhost:8080/products
curl http://localhost:8080/product/10
```

Kết quả mẫu:

```json
[{"id":"09","type":"CREDIT_CARD","name":"Gem Visa","version":"v1"},
 {"id":"10","type":"CREDIT_CARD","name":"28 Degrees","version":"v1"},
 {"id":"11","type":"PERSONAL_LOAN","name":"MyFlexiPay","version":"v2"}]
```

## Đã có sẵn trong repo (chưa dùng đến ở bước này)

Repo gốc là một workshop nhiều bước nên còn kèm theo:
- `consumer/src/api.spec.js`, `consumer/src/api.pact.spec.js`, `provider/product/product.pact.test.js` — test đơn vị & Pact test mẫu.
- `provider/middleware/auth.middleware.js` — middleware kiểm tra Bearer token mẫu.
- `docker-compose.yaml` — Postgres + Pact Broker, dùng khi demo publish/verify contract qua broker.

Các phần này sẽ được nhóm khai thác dần ở các tuần Contract Testing với Pact
(`src/pact/`) và khi triển khai Auth JWT — không cần đụng tới để chỉ chạy API mẫu.

## Nguồn gốc

Fork nguyên trạng từ [`pact-foundation/pact-workshop-js`](https://github.com/pact-foundation/pact-workshop-js)
(giấy phép & tài liệu gốc xem tại `pact-workshop-js/README.md`).
