# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-07-20 – 2026-07-25

## Tasks Completed This Week

### 23127115 – Mạch Quốc Tấn

- Thiết lập tệp kịch bản (shell script) để thực thi Postman Collection tự động bằng Newman và Postman CLI tại local.
- Cấu hình xuất các báo cáo kết quả kiểm thử API dưới dạng HTML (sử dụng newman-reporter-htmlextra) và tệp JSON phục vụ ghi nhận kết quả.

### 23127065 – Ngô Nguyễn Thế Khoa

- Cấu hình GitHub Actions CI/CD workflow để tự động chạy các bài kiểm tra Pact Verification cho cả dịch vụ Consumer và Provider khi đẩy mã nguồn mới lên nhánh chính.
- Tự động hóa quá trình xác minh hợp đồng Pact khi phát sinh commit hoặc Pull Request từ các thành viên.

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Viết tệp cấu hình YAML và tích hợp Newman vào GitHub Actions CI/CD pipeline để chạy tự động kiểm thử toàn bộ API endpoints sau mỗi lần build hoặc triển khai (deploy).
- Cấu hình hệ thống lưu trữ (artifacts upload) của GitHub Actions để lưu giữ báo cáo kết quả test của Newman sau mỗi lượt chạy.

### 23127148 – Ân Tiến Nguyên An

- Tích hợp cổng kiểm soát chất lượng bằng lệnh `can-i-deploy` của Pact CLI trong GitHub Actions.
- Thiết lập cơ chế chặn (block) không cho phép merge Pull Request hoặc deploy nếu kết quả xác thực giữa Consumer và Provider vi phạm hợp đồng (quality gate).

### 23127152 – Nguyễn Tuấn Anh

- Thử nghiệm sinh test case tự động bằng Postman Postbot và biên soạn tài liệu đánh giá tính thực tiễn của công cụ AI này.
- Xây dựng bộ cẩm nang prompts thông minh cho ChatGPT và Claude nhằm hướng dẫn các bạn cùng lớp viết test script cho Postman và tạo cấu trúc kiểm thử hợp đồng tự động.

## AI Usage Declaration

## Tasks Planned for Next Week

- Thiết kế, biên soạn nội dung và hoàn thiện slide thuyết trình chính thức của seminar.
- Biên soạn kịch bản chi tiết và tiến hành quay dựng Video 1 (Trình bày lý thuyết) và Video 2 (Hướng dẫn cài đặt công cụ).
- Quay dựng Video 3 (Demo hướng dẫn thực hành viết test trên Postman, Data-driven và CI/CD GitHub Actions).
- Quay dựng Video 4 (Demo thực hành Pact Contract Testing) và viết tài liệu hướng dẫn thực hành (Lab Manual / README.md) trên GitHub.

## Issues

- Không có vấn đề phát sinh trong tuần này.
