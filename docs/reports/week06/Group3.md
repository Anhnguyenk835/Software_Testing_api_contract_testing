# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-07-13 – 2026-07-18

## Tasks Completed This Week

### 23127115 – Mạch Quốc Tấn

- Hiện thực hóa kỹ thuật Data-driven testing trên Postman: chuẩn bị tệp dữ liệu đầu vào dưới dạng JSON và CSV chứa các trường dữ liệu kiểm thử bình thường và dữ liệu biên.
- Viết các test script động trong Postman để tự động ánh xạ và kiểm tra phản hồi từ API tương ứng với từng dòng dữ liệu trong tệp.

### 23127065 – Ngô Nguyễn Thế Khoa

- Viết mã nguồn cho các Pact Consumer Tests trên ứng dụng Consumer app, thiết lập các kỳ vọng (expectations/interactions) về payload và HTTP status.
- Khởi chạy Pact Mock Provider, chạy các kịch kịch bản kiểm thử và xuất thành công tệp hợp đồng kiểm thử Pact (định dạng JSON) đầu tiên.

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Viết Pre-request scripts và Test scripts trong Postman để tự động trích xuất token JWT sau khi gọi API Login thành công, lưu token vào biến môi trường (Environment Variable) và tự động gắn vào Header Authorization ở các request kế tiếp (API Chaining).
- Soạn thảo và viết tệp kịch bản kiểm thử API thay thế dạng `.http` trên công cụ VS Code REST Client.

### 23127148 – Ân Tiến Nguyên An

- Viết mã nguồn cho Pact Provider Verification trên ứng dụng Provider service để thực hiện đối soát tự động dịch vụ thật với file hợp đồng pact đã sinh ra.
- Thực hiện cấu hình CLI tự động đẩy (publish) tệp tin hợp đồng pact lên Pactflow Broker để phục vụ cho việc chia sẻ hợp đồng giữa Consumer và Provider.

### 23127152 – Nguyễn Tuấn Anh

- Phát triển mở rộng backend ứng dụng mẫu: cài đặt middleware JWT Authentication, viết các API endpoints nâng cao hỗ trợ nhận diện dữ liệu động và mô phỏng phản hồi mã lỗi HTTP chuẩn (400, 401, 403, 404, 500) để phục vụ cho các kịch bản kiểm thử biên.
- Thiết lập tệp cấu hình Docker Compose đóng gói đồng thời cả Consumer app, Provider service và một Pact Broker cục bộ để dễ dàng chạy thử nghiệm local bằng một câu lệnh duy nhất.

## AI Usage Declaration

## Tasks Planned for Next Week

- Viết script chạy bộ kiểm thử Postman qua Newman/Postman CLI và cấu hình báo cáo tự động.
- Cấu hình chạy Pact Verification tự động trong GitHub Actions workflow cho cả Consumer và Provider.
- Tích hợp Newman vào GitHub Actions CI/CD pipeline và cấu hình lưu trữ kết quả kiểm thử.
- Tích hợp cổng kiểm soát chất lượng bằng lệnh `can-i-deploy` của Pact CLI vào luồng CI/CD.
- Nghiên cứu tích hợp các công cụ AI (Postman Postbot) và xây dựng bộ prompts thông minh hỗ trợ sinh test script.

## Issues

- Không có vấn đề phát sinh trong tuần này.
