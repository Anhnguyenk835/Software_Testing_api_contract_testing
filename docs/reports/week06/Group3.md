# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-07-13 – 2026-07-18

## Tasks Completed This Week

### 23127115 – Mạch Quốc Tấn

- Chuẩn bị bộ dữ liệu data-driven (JSON và CSV) cho kịch bản **đọc** API: `GET /products`, `GET /product/:id` (id hợp lệ, id không tồn tại, thiếu/sai token).
- Chuẩn bị bộ dữ liệu data-driven (JSON và CSV) cho kịch bản **ghi** API: `POST /products` (body hợp lệ / thiếu field), `PUT /product/:id` và `DELETE /product/:id` (id hợp lệ / id không tồn tại / lỗi auth).
- Viết test script động trên Postman để map từng dòng data vào path, header và body; assert status code (và field phản hồi chính) theo từng iteration khi chạy Collection Runner.
- Gắn data-driven vào đúng folder collection dùng chung của nhóm (theo method và happy/negative); soạn ghi chú ngắn cách tổ chức nhiều test case đa method cho nội dung demo/seminar.

### 23127065 – Ngô Nguyễn Thế Khoa

- Viết/hoàn thiện Pact Consumer interactions cho các API **đọc**: `GET /products`, `GET /product/:id` (payload, status, header `Authorization` với matcher phù hợp).
- Viết Pact Consumer interactions cho API **tạo**: `POST /products` (request body, response `201`/body sản phẩm, case lỗi validation hoặc `401` nếu nằm trong design).
- Viết Pact Consumer interactions cho API **cập nhật và xóa**: `PUT /product/:id`, `DELETE /product/:id` (status và body/header kỳ vọng theo contract đã thống nhất).
- Chạy consumer tests thành công, xuất file pact JSON; ghi lệnh chạy test và đường dẫn file pact để phía provider verification sử dụng.

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Chuẩn hóa Postman Collection theo folder theo **method** (`GET` / `POST` / `PUT` / `DELETE`) và theo nhóm kịch bản (happy path, negative, auth fail); thống nhất Environment Variables cho local.
- Viết Pre-request scripts sinh Bearer token hợp lệ theo auth API mẫu, lưu Environment variable và gắn tự động vào Header `Authorization` cho toàn bộ request cần bảo vệ (API Chaining — áp dụng cho cả đọc và ghi).
- Viết Test scripts assert status và field body cốt lõi cho happy path của `GET`, `POST`, `PUT`, `DELETE` (ví dụ `id`, `name`, `type` hoặc confirmation xóa tùy response API).
- Soạn file `.http` (VS Code REST Client) cover đủ bốn method với ít nhất các case chính: thành công, `401`, `404` (và `400` cho `POST`/`PUT` nếu API trả về).

### 23127148 – Ân Tiến Nguyên An

- Cấu hình Pact Provider Verification trên Product Service để verify toàn bộ interactions trong file pact (đủ `GET`, `POST`, `PUT`, `DELETE`), không chỉ các case đọc.
- Thiết lập provider states phục vụ cả kịch bản đọc và ghi (ví dụ: products exist, no products, product by id tồn tại/không tồn tại, state sau khi tạo/cập nhật/xóa) khớp tên state với phía consumer.
- Chạy provider verification pass với Provider local sau khi có file pact từ consumer; xử lý lệch contract (nếu có) phối hợp Thế Khoa / Tuấn Anh để chốt một bản ổn định.
- Publish pact lên Pactflow Broker (W05); lưu hướng dẫn CLI/script (không commit secret) và minh chứng pact đa method hiển thị trên broker UI; Broker local Docker chỉ optional lab.

### 23127152 – Nguyễn Tuấn Anh

- Sửa lỗi gắn middleware authentication trên Provider: hiện `authMiddleware` đang đứng **sau** `routes` trong `server.js` nên các API product không bị chặn; chuyển/gắn auth **trước** khi vào route (hoặc gắn trên từng route) để request thiếu token / token không hợp lệ trả **401**, token hợp lệ mới vào handler.
- Kiểm tra xác nhận sau khi sửa: gọi `GET /products` (và các method khác khi đã có) **không** kèm `Authorization` → 401; kèm Bearer timestamp hợp lệ → không bị 401 vì auth; ghi ngắn kết quả smoke test auth vào evidence/README.
- Mở rộng Provider: implement `POST /products` (tạo sản phẩm, validate body cơ bản, trả `201` + resource; `400` khi body không hợp lệ).
- Mở rộng Provider: implement `PUT /product/:id` (cập nhật) và `DELETE /product/:id` (xóa), kèm `404` khi id không tồn tại; toàn bộ `GET`/`POST`/`PUT`/`DELETE` đều đi qua auth đã sửa ở trên.
- Cập nhật tài liệu endpoints (README hoặc file ngắn): method, path, header auth, ví dụ request/response và bảng status code — làm nguồn freeze cho Postman và Pact trong tuần; giữ cơ chế auth hiện tại của API mẫu (Bearer timestamp ISO-8601), không đổi JWT/Login giữa tuần.
- Hoàn thiện Docker Compose (Pact Broker local và Provider nếu kịp), ghi lệnh khởi chạy + smoke test nhanh cho đủ method chính để cả nhóm kiểm tra local.

## AI Usage Declaration

## Tasks Planned for Next Week

- Viết script chạy bộ kiểm thử Postman qua Newman/Postman CLI và cấu hình báo cáo tự động.
- Cấu hình chạy Pact Verification tự động trong GitHub Actions workflow cho cả Consumer và Provider.
- Tích hợp Newman vào GitHub Actions CI/CD pipeline và cấu hình lưu trữ kết quả kiểm thử.
- Tích hợp cổng kiểm soát chất lượng bằng lệnh `can-i-deploy` của Pact CLI vào luồng CI/CD.
- Nghiên cứu tích hợp các công cụ AI (Postman Postbot) và xây dựng bộ prompts thông minh hỗ trợ sinh test script.

## Issues

- Không có vấn đề phát sinh trong tuần này.
