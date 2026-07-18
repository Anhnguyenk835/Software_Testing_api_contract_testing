# Pact Consumer Interactions — Evidence (23127065)

**Thành viên:** Ngô Nguyễn Thế Khoa

**Tuần:** Week 06

**Ngày xác nhận:** 2026-07-18

**Consumer:** `FrontendWebsite`

**Provider:** `ProductService`

## Phạm vi thực hiện

Hoàn thiện Pact Consumer contract cho toàn bộ API Product Service được phân công:

- `GET /products`
- `GET /product/:id`
- `POST /products`
- `PUT /product/:id`
- `DELETE /product/:id`

Mã nguồn chính:

- [Consumer API client](../../../../../src/sample-api/pact-workshop-js/consumer/src/api.js)
- [Pact consumer test](../../../../../src/sample-api/pact-workshop-js/consumer/src/api.pact.spec.js)
- [Hướng dẫn chạy Pact](../../../../../src/pact/README.md)

## Contract đã tạo

| # | Method | Path | Provider state / case | Status kỳ vọng |
| :-: | :----: | ---- | --------------------- | :------------: |
| 1 | GET | `/products` | Có sản phẩm | 200 |
| 2 | GET | `/products` | Không có sản phẩm | 200, body `[]` |
| 3 | GET | `/product/10` | Product ID 10 tồn tại | 200 |
| 4 | GET | `/product/99` | Product ID 99 không tồn tại | 404 |
| 5 | POST | `/products` | Request body hợp lệ | 201 |
| 6 | POST | `/products` | Thiếu `type` và `name` | 400 |
| 7 | PUT | `/product/10` | Product ID 10 tồn tại | 200 |
| 8 | PUT | `/product/99` | Product ID 99 không tồn tại | 404 |
| 9 | DELETE | `/product/10` | Product ID 10 tồn tại | 204 |
| 10 | DELETE | `/product/99` | Product ID 99 không tồn tại | 404 |

Tổng cộng: **10 interactions**, bao phủ đầy đủ GET, POST, PUT và DELETE.

## Authorization matcher

Tất cả 10 request yêu cầu header `Authorization` theo cơ chế Bearer timestamp ISO-8601 của provider:

```text
Authorization: Bearer 2019-01-14T11:34:18.045Z
```

Regex matcher được lưu trong pact:

```regex
^Bearer \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$
```

Kết quả kiểm tra pact JSON: **10/10 interactions có Authorization regex matcher**.

## Payload chính

Product response được match theo kiểu dữ liệu cho đầy đủ các field:

```json
{
  "id": "10",
  "type": "CREDIT_CARD",
  "name": "28 Degrees",
  "version": "v1"
}
```

Request tạo/cập nhật sản phẩm:

```json
{
  "type": "CREDIT_CARD",
  "name": "New Rewards Card",
  "version": "v1"
}
```

Các response lỗi validation hoặc không tìm thấy resource có body tương ứng:

```json
{ "message": "type and name are required" }
```

```json
{ "message": "Product not found" }
```

## Kết quả consumer test

Lệnh chạy từ repository root:

```bash
npm run test:pact --prefix src/sample-api/pact-workshop-js/consumer
```

Kết quả chạy lại ngày 2026-07-18:

```text
PASS src/api.pact.spec.js

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Exit code:   0
```

Chi tiết theo nhóm API:

```text
GET /products          2 passed
GET /product/:id       2 passed
POST /products         2 passed
PUT /product/:id       2 passed
DELETE /product/:id    2 passed
```

## Pact JSON bàn giao cho provider

Consumer test sinh pact specification `2.0.0` tại:

```text
src/sample-api/pact-workshop-js/consumer/pacts/FrontendWebsite-ProductService.json
```

Provider verification có thể dùng file local này trực tiếp hoặc publish lên Pactflow Broker.
Vì thư mục `pacts/` được ignore, cần chạy lại lệnh consumer test trước khi verify nếu file chưa có
trên máy.

## Kết luận

- Đủ **10/10 Pact Consumer interactions** theo phạm vi Week 06.
- Header `Authorization` dùng regex matcher phù hợp với Bearer ISO-8601 timestamp.
- Contract bao phủ payload thành công, validation `400`, not found `404` và delete `204`.
- Consumer test pass và pact JSON sẵn sàng cho provider verification.
