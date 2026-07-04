# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-06-29 – 2026-07-04

## Tasks Completed This Week

### 23127115 – Mạch Quốc Tấn

- Nghiên cứu lý thuyết API Testing: khái niệm API, các loại request/response, phân biệt API có authenticate và không authenticate.
- Xác định phạm vi nội dung seminar (các kỹ thuật/test case cần trình bày trong chủ đề API & Contract Testing) để làm cơ sở phân công cho cả nhóm.

Evidence: [Output documents](https://drive.google.com/drive/folders/18EuHV6r_Gzqf5uQrJhlT9rzd_y88hqmx?usp=drive_link)

### 23127065 – Ngô Nguyễn Thế Khoa

- Nghiên cứu lý thuyết Contract Testing: khái niệm, mô hình consumer-provider, phân biệt với API testing thông thường.
- Tổng hợp tài liệu tham khảo về Contract Testing (concept, lợi ích, khi nào nên áp dụng).

Evidence: [Output documents](https://drive.google.com/drive/folders/1KsyOwPu4-tC7bQkgwtswyPCMfd-r902T?usp=drive_link)

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Khảo sát công cụ Postman: các chức năng chính cần trình bày gồm Environment, Collection, Variable, Script, Data-driven testing.
- Khảo sát công cụ test API trực tiếp trên VS Code (file .http / .rest) như phương án thay thế.

Evidence: [Output documents](https://drive.google.com/drive/folders/1P2TrQNy9ruGZEnvL20lqkF2GlLJvOigA?usp=drive_link)

### 23127148 – Ân Tiến Nguyên An

- Khảo sát lý thuyết và quy trình triển khai Contract Testing sử dụng công cụ Pact (quy trình Consumer-driven, cách tạo & xác minh contract, chia sẻ qua Pact Broker).
- Nghiên cứu giải pháp tự động hóa kiểm thử API bằng Newman và Postman CLI, bao gồm việc tích hợp chạy test tự động trong luồng CI/CD (GitHub Actions) để thiết lập cổng kiểm soát chất lượng (quality gate) khi đẩy mã nguồn mới.
- Tổng hợp, phân loại và biên soạn danh sách các công cụ AI (Postman Postbot, Keploy, Kusho AI) cùng các cấu trúc prompt hữu ích hỗ trợ tự động viết kịch bản test API và contract testing.

Evidence: [Output documents](https://drive.google.com/drive/folders/1rl-E7qVuIIXReSxu6dkRUto5RahVJ1TM?usp=drive_link)

### 23127152 – Nguyễn Tuấn Anh

- Khởi tạo repository GitHub cho dự án (khung sườn ban đầu) để các bạn trong lớp clone về thực hành sau này.
- Tìm hiểu sơ bộ phương án tích hợp CI/CD đơn giản (GitHub Actions) để tự động chạy lại test khi có commit/PR.
- Lập outline cho slide trình bày, bố cục báo cáo (mục lục các phần: API Testing, Contract Testing, Demo Postman, Automation/CI-CD) và phác thảo danh sách các kịch bản demo dự kiến (multiple demo videos).

Evidence: [Output documents](https://drive.google.com/drive/folders/1odM2m8QBpRgbn6ku1qxDFU3iARiPdmpZ?usp=drive_link)

## AI Usage Declaration

- Nhóm đã sử dụng AI (Claude & Gemini & ChatGPT) hỗ trợ nghiên cứu và tổng hợp các báo cáo chi tiết của từng task.

| Thành viên                              | Công cụ AI                                      | Thời gian truy cập                    | Mục đích sử dụng                                                                                                                                                                        | Minh chứng                                                                                              |
| :-------------------------------------- | :---------------------------------------------- | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| **Mạch Quốc Tấn**<br>(23127115)         | Claude Sonnet 4.6 (Thinking) & Gemini 3.5 Flash | Từ 13:00 đến 16:00<br>ngày 04/07/2026 | Tra cứu và tổng hợp lý thuyết API Testing, cấu trúc tài liệu Markdown, phân tích so sánh các cơ chế Authentication, lập checklist kiểm thử API và tự động ghi log nhật ký tương tác AI. | [Google Drive](https://drive.google.com/drive/folders/1LsoMqkoshgka8E6yJaA7I2PdPLDHN_KU?usp=drive_link) |
| **Ân Tiến Nguyên An**<br>(23127148)     | Claude Sonnet 5                                 | 10:30 ngày 03/07/2026                 | Khảo sát lý thuyết, quy trình triển khai Contract Testing (Pact), tự động hóa kiểm thử API bằng Newman và Postman CLI, tổng hợp công cụ AI hỗ trợ kiểm thử API.                         | [Google Drive](https://drive.google.com/drive/folders/1VRpE_Wx6GTTf2kk7ko7fb111Rekwb-x6?usp=drive_link) |
| **Ngô Nguyễn Thế Khoa**<br>(23127065)   | ChatGPT                                         | 16:10 ngày 02/07/2026                 | Nghiên cứu lý thuyết Contract Testing (khái niệm, mô hình consumer-provider, phân biệt với API testing thông thường) và tổng hợp tài liệu tham khảo về Contract Testing.                | [Google Drive](https://drive.google.com/drive/folders/1LQgv5AaahX_BSlsKcNnvWCdVimleOgcJ?usp=drive_link) |
| **Nguyễn Lê Hồ Anh Khoa**<br>(23127211) | Claude Sonnet 5                                 | 20:50:55 ngày 02/07/2026              | Hỗ trợ tìm hiểu tính năng Environment, Collection, Script trong Postman và so sánh với VS Code REST Client.                                                                             | [Google Drive](https://drive.google.com/drive/folders/1mw_m2NoS5aTnvFEclz6ygC5Pe0sEMxma?usp=drive_link) |
| **Nguyễn Tuấn Anh**<br>(23127152)       | Claude Sonnet 5                                 | 15:30 ngày 03/07/2026                 | Hỗ trợ viết cấu trúc file YAML cho GitHub Actions CI/CD và lập dàn ý slide báo cáo tuần.                                                                                                | [Google Drive](https://drive.google.com/drive/folders/13ZMp6OA_XgkM7H_vhOcUBeAwKizT6zrP?usp=drive_link) |

## Tasks Planned for Next Week

- Hoàn thiện chi tiết phần lý thuyết API Testing (các loại test case, cách thiết kế test case theo từng loại API).
- Bắt đầu xây dựng slide thuyết trình cho phần API Testing.
- Dựng hoặc lựa chọn ứng dụng API mẫu (mã nguồn mở hoặc tự build) để làm đối tượng minh họa xuyên suốt phần thực hành của seminar.
- Thiết lập thử nghiệm các test case Postman đầu tiên và chuẩn bị kịch bản thử nghiệm Contract Testing (sử dụng Pact) dựa trên API mẫu đã chọn.

## Issues

- Không có vấn đề phát sinh trong tuần này.
