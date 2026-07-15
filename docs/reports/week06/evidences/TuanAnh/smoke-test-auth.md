# Smoke Test — Auth Middleware + CRUD (23127152)

**Ngày:** 2026-07-15
**Môi trường:** Provider chạy qua Docker Compose (`docker compose up --build provider`, thư mục `src/sample-api/pact-workshop-js`), cổng `8080`.
**Tài liệu endpoint:** xem `src/sample-api/README.md` (mục Auth / Danh sách Endpoint / Mã trạng thái) — nguồn freeze cho Postman & Pact tuần 06.

## Kết quả

| # | Case | Kỳ vọng | Thực tế |
| :-: | --- | :-: | :-: |
| 1 | `GET /products` — không có `Authorization` | 401 | 401 |
| 2 | `GET /products` — Bearer timestamp hợp lệ | 200 | 200 |
| 3 | `POST /products` — không có `Authorization` | 401 | 401 |
| 4 | `POST /products` — body hợp lệ | 201 | 201 |
| 5 | `POST /products` — thiếu `type`/`name` | 400 | 400 |
| 6 | `PUT /product/10` — id tồn tại | 200 | 200 |
| 7 | `PUT /product/khong-ton-tai` | 404 | 404 |
| 8 | `DELETE /product/11` — id tồn tại | 204 | 204 |
| 9 | `DELETE /product/khong-ton-tai` | 404 | 404 |

**9/9 case khớp kỳ vọng** — `authMiddleware` (đã chuyển lên trước `routes` trong `server.js`) chặn đúng request thiếu/sai token; CRUD (`GET`/`POST`/`PUT`/`DELETE`) trả đúng status code sau khi qua auth.

## Ảnh minh chứng

- `smoke-test-auth-crud-screenshot.png` — terminal chạy `curl` thật vào Provider (Docker Compose), bảng Expected/Actual cho 9 case trên.
- `smoke-test-jest-20tests.png` — `npx jest` chạy 20 test tự động, toàn bộ PASS.

## Test tự động liên quan

`provider/test/server.test.js` (9 test), `provider/test/product/product.repository.test.js` (5 test), `provider/test/product/product.controller.test.js` (6 test) — tổng 20 test, chạy bằng:

```bash
npx jest --testPathIgnorePatterns=pact.test.js
```
