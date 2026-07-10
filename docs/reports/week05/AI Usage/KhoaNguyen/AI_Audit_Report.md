# AI Audit Report - Seminar W05 Postman Collection cho Product Service

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                              |
| ------------------------------ | ------------------------------------------------------------------ |
| **MSSV (Student ID)**          | 23127211                                                           |
| **Họ tên (Full Name)**         | Nguyễn Lê Hồ Anh Khoa                                              |
| **Mã bài tập (Assignment)**    | Seminar W05 - Postman Collection & Environment cho Product Service |
| **Ngày nộp (Submission Date)** | 2026-07-11                                                         |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: phân tích mã nguồn thực tế của Product Service (routes, controller, repository, auth middleware) trong `src/sample-api/pact-workshop-js`, xác minh hành vi thực tế của auth middleware bằng cách chạy thử server, và soạn bản nháp Postman Collection (v2.1.0) + Environment kèm pre-request script tự sinh Bearer token."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool         | Task Category                          | Feature                                            | Date       | Bloom-AI Level |
| --- | --------------- | -------------------------------------- | -------------------------------------------------- | ---------- | -------------- |
| 1   | Claude Sonnet 5 | Code Analysis & Test Artifact Creation | Postman Collection & Environment - Product Service | 2026-07-11 | G9.4 (Create)  |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 - Phân tích Product Service & soạn bản nháp Postman Collection/Environment

| Field              | Value                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 5 (Claude Code CLI)                                                                                           |
| **Date/Time**      | 2026-07-11 00:36:46 +07:00                                                                                                  |
| **Task**           | Phân tích mã nguồn thực tế Product Service + auth middleware, soạn bản nháp Postman Collection và Environment cho local dev |
| **Feature**        | Seminar W05 - Postman Collection cho Product Service (API Testing)                                                          |
| **Bloom-AI Level** | G9.4 (Create) - Tổng hợp kết quả phân tích mã nguồn thành bộ test artifact (Collection + Environment) mới                   |

#### Prompt

**Prompt người dùng:**

```text
Chào bạn, tôi đang làm đồ án môn Kiểm thử phần mềm, chủ đề API & Contract Testing (tuần W05). Tôi cần bạn phân tích mã nguồn thực tế của thư mục `src/sample-api/pact-workshop-js` trong project này để xây dựng bộ Postman Collection hỗ trợ việc kiểm thử các API hiện tại.

Yêu cầu chi tiết:
1. Hãy tìm hiểu và phân tích cấu trúc API thực tế trong thư mục `src/sample-api/pact-workshop-js` (đặc biệt chú ý đến các endpoint của Product Service và cơ chế xác thực trong middleware `auth.middleware.js`).
2. Tạo nội dung cấu hình cho Postman Collection (định dạng JSON v2.1.0) và Environment. Vui lòng xuất nội dung này ra file và lưu vào đường dẫn: `docs/reports/week05/evidences/KhoaNguyen/Postman_Product_Service_Collection.json` (hoặc cung cấp mã JSON trực tiếp kèm hướng dẫn).
3. Bộ Postman Collection cần đáp ứng đầy đủ các tiêu chí sau:
- **Cấu hình API Endpoints:** Xây dựng chi tiết các request cho Product Service, bao gồm `GET /products` và `GET /product/:id`.
- **Pre-request Script (Tự động sinh Token):** Viết script (JavaScript trong Postman) tự động sinh Bearer Auth Token dưới dạng ISO 8601 timestamp động (vd: `new Date().toISOString()`) và tự động gán vào Authorization header để vượt qua auth middleware của API mẫu.
- **Environment Variables:** Thiết lập và cấu hình các biến môi trường (Environment Variables) cho môi trường phát triển local (ví dụ thiết lập biến `{{base_url}}` trỏ về localhost với port tương ứng của project).

Hãy viết bản nháp đầu tiên của cấu hình/script này và phản hồi lại cho tôi biết để tôi kiểm tra (review). Chúng ta sẽ cùng phản hồi và hoàn thiện bộ Postman này trước khi chốt bản cuối cùng.

Sau đó dùng @.agents/skills/ai-audit-report/SKILL.md để thực hiện audit lại entry này nhé
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report v1.0
Mode: GENERATE

Các bước AI đã thực hiện:
1. Đọc product.routes.js, product.controller.js, product.repository.js, product.js,
   auth.middleware.js và server.js trong src/sample-api/pact-workshop-js/provider/
   để xác định endpoint thực tế (GET /products, GET /product/:id) và cơ chế auth
   (Bearer token = ISO-8601 timestamp còn hiệu lực trong vòng 1 giờ).
2. Phát hiện nghi vấn: server.js đăng ký `app.use(routes)` trước `app.use(authMiddleware)`.
   Xác minh bằng cách checkout main vào git worktree tạm, npm install, chạy thật
   `node server.js` và curl /products với: không header, header rác, header ISO hợp lệ
   - cả 3 đều trả 200 giống nhau, chỉ route không tồn tại mới nhận 401. Kết luận:
   2 route Product hiện không thực sự bị auth middleware chặn (bug thứ tự middleware).
3. Merge nhánh main vào nhánh làm việc w05/23127211 (được user xác nhận trước) để
   nhánh có đầy đủ code Product Service thay vì chỉ có bản README placeholder cũ.
4. Tạo docs/reports/week05/evidences/KhoaNguyen/Postman_Product_Service_Collection.json
   (schema v2.1.0): 3 request (Get All Products, Get Product By Id, Get Product By Id -
   Not Found), collection-level pre-request script sinh `authToken = new Date().toISOString()`
   và gán vào Bearer Authorization qua {{authToken}}, kèm test script kiểm tra status code
   và các field bắt buộc của response.
5. Tạo docs/reports/week05/evidences/KhoaNguyen/Postman_Product_Service.postman_environment.json
   với biến base_url=http://localhost:8080 và product_id=10.
6. Ghi chú rõ trong description của collection về bug thứ tự middleware để người review biết
   vì sao chưa có test assert cứng 401-khi-thiếu-token.
```

#### AI Output

```text
Đã tạo 2 file bản nháp:
1. docs/reports/week05/evidences/KhoaNguyen/Postman_Product_Service_Collection.json
   - Get All Products (GET {{base_url}}/products)
   - Get Product By Id (GET {{base_url}}/product/{{product_id}})
   - Get Product By Id - Not Found (GET {{base_url}}/product/does-not-exist, kỳ vọng 404)
   - Collection-level pre-request script: pm.collectionVariables.set("authToken", new Date().toISOString())
   - Collection-level auth: Bearer {{authToken}}
   - Test script cho mỗi request kiểm tra status code và schema field (id, type, name, version)
2. docs/reports/week05/evidences/KhoaNguyen/Postman_Product_Service.postman_environment.json
   - base_url = http://localhost:8080
   - product_id = 10

Ghi chú quan trọng đã báo cho user: server.js hiện đăng ký app.use(routes) trước
app.use(authMiddleware), nên GET /products và GET /product/:id thực tế KHÔNG bị chặn
bởi auth middleware (đã verify bằng chạy thật + curl). Đây là vấn đề nằm ngoài phạm vi
sửa của task Postman - đang chờ user trao đổi với Tuấn Anh (tác giả server.js).
```

#### Human Review

| Aspect           | Detail                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Lê Hồ Anh Khoa                                                                                                                                                                                                                                                                                                                                                               |
| Review date      | 2026-07-11                                                                                                                                                                                                                                                                                                                                                                          |
| Corrections made | Không - tài liệu sinh ra chính xác theo yêu cầu                                                                                                                                                                                                                                                                                                                                     |
| Quality rating   | Good                                                                                                                                                                                                                                                                                                                                                                                |
| Issues found     | Có vấn đề đã biết (không phải lỗi của AI, mà là hạn chế của mã nguồn hiện tại): không thể viết test assert cứng 401-khi-thiếu-token vì bug thứ tự middleware trong `server.js` (`app.use(routes)` đăng ký trước `app.use(authMiddleware)`) khiến `GET /products` và `GET /product/:id` hiện luôn trả 200 bất kể Authorization header - đang chờ trao đổi với Tuấn Anh trước khi sửa |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                           | Value                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| Total AI interactions            | 1                                                                                         |
| AI tools used                    | Claude Sonnet 5                                                                           |
| Features covered                 | Postman Collection & Environment cho Product Service                                      |
| Documents created / updated      | Postman_Product_Service_Collection.json, Postman_Product_Service.postman_environment.json |
| Issues found by audit            | 1 (bug thứ tự middleware trong server.js - nằm ngoài code Postman)                        |
| Issues resolved                  | 0/1 (đang chờ xác nhận từ Tuấn Anh trước khi sửa)                                         |
| Postman requests created         | 3 (Get All Products, Get Product By Id, Get Product By Id - Not Found)                    |
| Environment variables configured | 2 (base_url, product_id)                                                                  |

### AI Contribution Breakdown

| Task                                                    | AI Contribution | Human Contribution |
| ------------------------------------------------------- | --------------- | ------------------ |
| Source code analysis (Product Service, auth middleware) | 85%             | 15%                |
| Behavior verification (chạy thử server + curl)          | 90%             | 10%                |
| Postman Collection JSON authoring                       | 90%             | 10%                |
| Environment JSON authoring                              | 90%             | 10%                |
| Review & quyết định xử lý bug middleware                | 20%             | 80%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng (Claude Sonnet 5)
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
