# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-07-06 – 2026-07-11

## Tasks Completed This Week

### 23127115 – Mạch Quốc Tấn

- Hoàn thiện phần nghiên cứu lý thuyết API Testing chuyên sâu: các phương thức HTTP, HTTP Status Codes, cơ chế Token-based JWT Authentication, và các kịch bản kiểm thử biên phổ biến.

### 23127065 – Ngô Nguyễn Thế Khoa

- Soạn thảo tài liệu lý thuyết chi tiết về Contract Testing: so sánh chi tiết giữa Integration Testing, End-to-End (E2E) Testing và Contract Testing; cách áp dụng mô hình Consumer-driven.

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Xây dựng Postman Collection cho các API hiện tại của Product Service (gồm GET `/products` và GET `/product/:id`).
- Viết script tự động sinh Bearer Auth Token (dưới dạng ISO 8601 timestamp động) trong Postman để vượt qua auth middleware của API mẫu.
- Thiết lập và cấu hình các biến môi trường (Environment Variables) trong Postman cho môi trường phát triển local.

### 23127148 – Ân Tiến Nguyên An

- Hoàn thiện skill ai-audit-report để cho cả nhóm cùng sử dụng cho mục AI USAGE
- Thiết kế kịch bản kiểm thử hợp đồng Pact cho Product Service (xác định rõ cấu trúc dữ liệu, kiểu dữ liệu, các trường bắt buộc mà Consumer kỳ vọng ở Provider cho các endpoint GET `/products` và GET `/product/:id`).
- Đăng ký và cấu hình tài khoản Pactflow Broker để quản lý hợp đồng trực tuyến.

### 23127152 – Nguyễn Tuấn Anh

- Xây dựng mã nguồn ban đầu cho ứng dụng API mẫu gồm 2 dịch vụ: Consumer App (Frontend/Gateway đơn giản gọi API) và Provider Service (Backend API dịch vụ người dùng) sử dụng Node.js/Express.
- Soạn tài liệu README hướng dẫn các bước cài đặt và khởi chạy dự án API mẫu trên môi trường local.

## AI Usage Declaration

- Các thành viên nhóm đã sử dụng các công cụ AI (Gemini, Claude, ChatGPT,...) để hỗ trợ nghiên cứu tài liệu, thiết kế kịch bản kiểm thử và soạn thảo nội dung báo cáo.

| Thành viên                            | Công cụ AI                | Thời gian truy cập    | Mục đích sử dụng                                                                                                                                | Minh chứng                                                                    |
| :------------------------------------ | :------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **Ngô Nguyễn Thế Khoa**<br>(23127065) | Gemini 3.5 Flash (Medium) | 21:15 ngày 08/07/2026 | Tra cứu tài liệu và soạn thảo tài liệu lý thuyết chi tiết về Contract Testing (so sánh với Integration & E2E Testing, mô hình Consumer-driven). | [AI Audit Report](/docs/reports/week05/AI%20Usage/KhoaNgo/AI_Audit_Report.md) |

## Tasks Planned for Next Week

- Triển khai kỹ thuật API testing nâng cao (Data-driven, chaining API) và viết mã nguồn kiểm thử Contract Testing với Pact (Consumer & Provider).
- Phát triển các endpoint API nâng cao (Auth JWT, error handling) và cấu hình Docker Compose cho dự án local.

## Issues

- Không có vấn đề phát sinh trong tuần này.
