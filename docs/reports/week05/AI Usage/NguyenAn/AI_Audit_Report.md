# AI Audit Report — Pact Contract Design

## Thông tin sinh viên (Student Information)

| Field                          | Value                    |
| ------------------------------ | ------------------------ |
| **MSSV (Student ID)**          | 23127148                 |
| **Họ tên (Full Name)**         | Ân Tiến Nguyên An        |
| **Mã bài tập (Assignment)**    | Seminar W05 — Thiết kế kịch bản kiểm thử hợp đồng Pact (Pact Contract Design) cho Product Service |
| **Ngày nộp (Submission Date)** | 2026-07-10               |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: phân tích cấu trúc mã nguồn API mẫu thực tế (thư mục `src/sample-api/pact-workshop-js`), và hỗ trợ soạn thảo tài liệu thiết kế kịch bản kiểm thử hợp đồng Pact (Pact Contract Design) cho các API của Product Service."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool          | Task Category     | Feature              | Date       | Bloom-AI Level  |
| --- | ---------------- | ----------------- | -------------------- | ---------- | --------------- |
| 1   | Gemini 3.5 Flash | Design / Planning | Pact Contract Design | 2026-07-10 | G9.4 (Create)   |

---

## Chi tiết từng lần sử dụng AI (Entries)

### Entry 1 — Phân tích mã nguồn và thiết kế kịch bản kiểm thử hợp đồng Pact

| Field              | Value                           |
| ------------------ | ------------------------------- |
| **AI Tool**        | Gemini 3.5 Flash                |
| **Date/Time**      | 2026-07-10 10:57:23 +07:00      |
| **Task**           | Phân tích mã nguồn Pact (Consumer/Provider) và thiết kế kịch bản kiểm thử hợp đồng Pact chi tiết cho GET /products và GET /product/:id |
| **Feature**        | Pact Contract Design            |
| **Bloom-AI Level** | G9.4 (Create) — Phân tích mã nguồn và tổng hợp thiết kế tài liệu kịch bản kiểm thử |

#### Prompt

**Prompt người dùng:**

```text
Chào bạn, tôi đang làm đồ án môn Kiểm thử phần mềm, chủ đề API & Contract Testing (tuần W05). Tôi cần bạn phân tích mã nguồn thực tế của thư mục `src/sample-api/pact-workshop-js` trong project này để viết tài liệu thiết kế kịch bản kiểm thử hợp đồng Pact (Pact Contract Design).

Yêu cầu chi tiết:
1. Hãy tìm hiểu và phân tích cấu trúc API thực tế trong thư mục `src/sample-api/pact-workshop-js` (đặc biệt là các router/controller của Provider, middleware xác thực auth.middleware.js, và file test Pact mẫu api.pact.spec.js ở Consumer).
2. Tạo mới và viết nội dung tài liệu thiết kế này dưới dạng Markdown vào đường dẫn: `docs/reports/week05/evidences/NguyenAn/Pact_Contract_Design.md`.
3. Nội dung tài liệu cần có các phần chính sau:
   - Các Pact Matchers chính được sử dụng (like, eachLike...) và ý nghĩa đối với dự án.
   - Thiết kế kịch bản chi tiết cho từng Endpoint thực tế (GET /products và GET /product/:id), xác định rõ Request (Method, Path, Authorization Header dạng timestamp) và Response mong đợi ở kịch bản thành công (200 OK kèm cấu trúc dữ liệu cụ thể), kịch bản lỗi (401 Unauthorized khi thiếu token, 404 Not Found khi sai ID).
   - Bảng tổng hợp bản đồ dữ liệu mong đợi (Consumer Expectation Schema Map).

Hãy viết bản nháp đầu tiên của tài liệu này vào file và phản hồi lại cho tôi biết để tôi kiểm tra (review). Chúng ta sẽ cùng phản hồi và hoàn thiện tài liệu này trước khi chốt bản cuối cùng.
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Duyệt cấu trúc thư mục src/sample-api/pact-workshop-js/ để định vị các file liên quan.
2. Đọc và phân tích file api.pact.spec.js ở phía Consumer để xác định các matcher (like, eachLike) và các kịch bản kiểm thử đã viết.
3. Đọc file api.js ở phía Consumer để đối chiếu logic gọi API và tạo header Authorization.
4. Đọc mã nguồn phía Provider bao gồm router, controller, repository, product model, và auth.middleware.js.
5. So sánh cấu trúc kiểm thử hợp đồng ở Provider (product.pact.test.js) với file cấu hình server chạy thật (server.js), phát hiện lỗi thiết kế bảo mật do sai thứ tự đăng ký middleware.
6. Soạn thảo bản nháp đầy đủ cho tài liệu Pact_Contract_Design.md theo cấu trúc được yêu cầu và lưu vào file.
```

#### AI Output

```text
Tạo mới file docs/reports/week05/evidences/NguyenAn/Pact_Contract_Design.md bao gồm:
- Mô tả các Pact Matchers chính (like, eachLike) cùng ý nghĩa.
- Thiết kế chi tiết cho 2 Endpoint: GET /products và GET /product/:id với đầy đủ các kịch bản thành công và lỗi (thiếu auth, sai ID).
- Bảng Consumer Expectation Schema Map cho các trường dữ liệu và header.
- Phân tích cơ chế requestFilter của Provider và cảnh báo về lỗi bảo mật trong server.js.
```

#### Human Review

| Aspect           | Detail                               |
| ---------------- | ------------------------------------ |
| Reviewed by      | Ân Tiến Nguyên An                    |
| Review date      | 2026-07-10                           |
| Corrections made | Không — tài liệu nháp đầy đủ và chính xác theo yêu cầu. |
| Quality rating   | Good                                 |
| Issues found     | None                                 |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                                               | Value                     |
| ---------------------------------------------------- | ------------------------- |
| Total AI interactions                                | 1                         |
| AI tools used                                        | Gemini 3.5 Flash          |
| Features covered                                     | Pact Contract Design      |
| Documents created / updated                          | docs/reports/week05/evidences/NguyenAn/Pact_Contract_Design.md |
| Issues found by audit                                | 0                         |
| Issues resolved                                      | 0/0                       |

### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ----------------------- | --------------- | ------------------ |
| Research & Synthesizing | 85%             | 15%                |
| Document Structuring    | 90%             | 10%                |
| Code/Document Writing   | 90%             | 10%                |
| Verification & Testing  | 10%             | 90%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
