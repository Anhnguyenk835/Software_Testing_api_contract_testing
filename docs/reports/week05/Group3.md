# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-07-06 – 2026-07-11

## Tasks Completed This Week

### 23127115 – Mạch Quốc Tấn

- Hoàn thiện phần nghiên cứu lý thuyết API Testing chuyên sâu: các phương thức HTTP, HTTP Status Codes, cơ chế Token-based JWT Authentication, và các kịch bản kiểm thử biên phổ biến.

Evidence: [Output documents](https://drive.google.com/drive/folders/1zEm1R7j-A8NHxjjxnREWpmuy61t4CG1d?usp=drive_link)

### 23127065 – Ngô Nguyễn Thế Khoa

- Soạn thảo tài liệu lý thuyết chi tiết về Contract Testing: so sánh chi tiết giữa Integration Testing, End-to-End (E2E) Testing và Contract Testing; cách áp dụng mô hình Consumer-driven.

Evidence: [Output documents](https://drive.google.com/drive/folders/1tjOqf0cJAqYXaFbSkDn9jwvULwOWjvg7?usp=drive_link)

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Xây dựng Postman Collection cho các API hiện tại của Product Service (gồm GET `/products` và GET `/product/:id`).
- Viết script tự động sinh Bearer Auth Token (dưới dạng ISO 8601 timestamp động) trong Postman để vượt qua auth middleware của API mẫu.
- Thiết lập và cấu hình các biến môi trường (Environment Variables) trong Postman cho môi trường phát triển local.

Evidence: [Output documents](https://drive.google.com/drive/folders/1pxr7m1stIavGbRE-d-FPienQQzI9aBgc?usp=drive_link)

### 23127148 – Ân Tiến Nguyên An

- Hoàn thiện skill ai-audit-report để cho cả nhóm cùng sử dụng cho mục AI USAGE
- Thiết kế kịch bản kiểm thử hợp đồng Pact cho Product Service (xác định rõ cấu trúc dữ liệu, kiểu dữ liệu, các trường bắt buộc mà Consumer kỳ vọng ở Provider cho các endpoint GET `/products` và GET `/product/:id`).
- Đăng ký và cấu hình tài khoản Pactflow Broker để quản lý hợp đồng trực tuyến.

Evidence: [Output documents](https://drive.google.com/drive/folders/1jTkozNRdzZYyCY9U9PwKe25V2b8iZM0z?usp=drive_link)

### 23127152 – Nguyễn Tuấn Anh

- Xây dựng mã nguồn ban đầu cho ứng dụng API mẫu gồm 2 dịch vụ: Consumer App (Frontend/Gateway đơn giản gọi API) và Provider Service (Backend API dịch vụ người dùng) sử dụng Node.js/Express.
- Soạn tài liệu README hướng dẫn các bước cài đặt và khởi chạy dự án API mẫu trên môi trường local.

Evidence: [Output documents](https://drive.google.com/drive/folders/1zKlZ0E2BB6-foCBHl8r0B-r-lBVqSnky?usp=drive_link)

## AI Usage Declaration

- Các thành viên nhóm đã sử dụng các công cụ AI (Gemini, Claude, ChatGPT,...) để hỗ trợ nghiên cứu tài liệu, thiết kế kịch bản kiểm thử và soạn thảo nội dung báo cáo.

| Thành viên                              | Công cụ AI                                    | Thời gian truy cập    | Mục đích sử dụng                                                                                                                                                           | Minh chứng                                                                                              |
| :-------------------------------------- | :-------------------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| **Mạch Quốc Tấn**<br>(23127115)         | Claude Opus 4.6 (Thinking) & Gemini 3.5 Flash | 17:15 ngày 11/07/2026 | Hoàn thiện nghiên cứu lý thuyết API Testing chuyên sâu (HTTP Methods, Status Codes, JWT Authentication, Boundary Value Analysis), tạo sơ đồ Mermaid và tự động ghi log AI. | [AI Audit Report](https://drive.google.com/drive/folders/1eXwon2-0EvuTEBCD4Igemvi79u4o9pjd?usp=sharing) |
| **Ngô Nguyễn Thế Khoa**<br>(23127065)   | Gemini 3.5 Flash (Medium)                     | 21:15 ngày 08/07/2026 | Tra cứu tài liệu và soạn thảo tài liệu lý thuyết chi tiết về Contract Testing (so sánh với Integration & E2E Testing, mô hình Consumer-driven).                            | [AI Audit Report](https://drive.google.com/drive/folders/11_DQY0hgA_Ph65803eGd4VzzG09PzAVo?usp=sharing) |
| **Nguyễn Lê Hồ Anh Khoa**<br>(23127211) | Claude Sonnet 5 (Claude Code CLI)             | 00:36 ngày 11/07/2026 | Phân tích mã nguồn Product Service & auth middleware, soạn bản nháp Postman Collection và Environment cho local dev.                                                       | [AI Audit Report](https://drive.google.com/drive/folders/1XfUmUyx4JqfcLWwgGEEb-zNus5D8dSRF?usp=sharing) |
| **Ân Tiến Nguyên An**<br>(23127148)     | Gemini 3.5 Flash                              | 10:57 ngày 10/07/2026 | Phân tích mã nguồn Pact và thiết kế kịch bản kiểm thử hợp đồng Pact chi tiết cho GET /products và GET /product/:id.                                                        | [AI Audit Report](https://drive.google.com/drive/folders/1IeErmYudsB154HhRO4PwQZWxMu_aeLOJ?usp=sharing) |
| **Nguyễn Tuấn Anh**<br>(23127152)       | Claude Sonnet 5 (Claude Code CLI)             | 14:05 ngày 09/07/2026 | Research repo GitHub, thiết kế cấu trúc Consumer App & Provider Service, soạn README hướng dẫn cài đặt/khởi chạy API mẫu.                                                  | [AI Audit Report](https://drive.google.com/drive/folders/1r9QyQql_p9hbISgNGSmI_iujBn4YjjN1?usp=sharing) |

## Tasks Planned for Next Week

- Triển khai kỹ thuật kiểm thử API nâng cao trên Postman (Data-driven testing bằng file JSON/CSV, cơ chế API Chaining tự động lưu và đính kèm JWT token) và thiết lập kịch bản kiểm thử thay thế `.http` bằng VS Code REST Client.
- Xây dựng mã nguồn kiểm thử hợp đồng Pact (Pact Consumer Tests, Pact Provider Verification) để xuất file contract JSON và cấu hình CLI tự động publish/xác minh hợp đồng qua Pactflow Broker.
- Phát triển các API endpoints nâng cao cho backend (cấu hình middleware JWT Authentication, xử lý mã lỗi HTTP chuẩn phục vụ test case biên) và thiết lập Docker Compose đóng gói toàn bộ dự án local.

## Issues

- Không có vấn đề phát sinh trong tuần này.
