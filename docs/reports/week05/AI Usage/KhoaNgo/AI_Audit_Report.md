# AI Audit Report — Nghiên cứu lý thuyết Contract Testing

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                |
| ------------------------------ | ---------------------------------------------------- |
| **MSSV (Student ID)**          | 23127065                                             |
| **Họ tên (Full Name)**         | Ngô Nguyễn Thế Khoa                                  |
| **Mã bài tập (Assignment)**    | Seminar W05 — Nghiên cứu lý thuyết Contract Testing  |
| **Ngày nộp (Submission Date)** | 2026-07-11                                           |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: tìm kiếm tài liệu tham khảo và soạn thảo nội dung lý thuyết chi tiết về Contract Testing."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                    | Task Category         | Feature                      | Date       | Bloom-AI Level  |
| --- | -------------------------- | --------------------- | ---------------------------- | ---------- | --------------- |
| 1   | Gemini 3.5 Flash (Medium)  | Research & Documenting| Lý thuyết Contract Testing   | 2026-07-08 | G9.4 (Create)   |

---

## Chi tiết từng lần sử dụng AI (Entries)

### Entry 1 — Soạn thảo tài liệu lý thuyết Contract Testing

| Field              | Value                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| **AI Tool**        | Gemini 3.5 Flash (Medium)                                                                                    |
| **Date/Time**      | 2026-07-08 21:15:17 +07:00                                                                                   |
| **Task**           | Soạn thảo tài liệu lý thuyết chi tiết về Contract Testing, so sánh với Integration & E2E Testing, và mô hình CDCT |
| **Feature**        | Lý thuyết Contract Testing                                                                                   |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp thông tin và viết tài liệu hướng dẫn hoàn chỉnh                                      |

#### Prompt

**Prompt người dùng:**

```text
Soạn thảo tài liệu lý thuyết chi tiết về Contract Testing: so sánh chi tiết giữa Integration Testing, End-to-End (E2E) Testing và Contract Testing; cách áp dụng mô hình Consumer-driven.
use context7
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Nhận yêu cầu và thực hiện tra cứu thư viện Pact trên Context7 MCP (`websites/pact_io`) về so sánh kiểm thử và mô hình Consumer-driven.
2. Tìm kiếm thêm thông tin trên Web về sự khác biệt giữa Integration Testing, E2E Testing, Contract Testing và hoạt động của lệnh `can-i-deploy`.
3. Biên soạn tài liệu lý thuyết chi tiết tại docs/reports/week05/evidences/KhoaNgo/contract-testing.md.
4. Nhận phản hồi review từ người dùng và hoàn thiện báo cáo AI Audit Report.
```

#### AI Output

```text
Tạo file lý thuyết tại docs/reports/week05/evidences/KhoaNgo/contract-testing.md chứa:
- So sánh chi tiết các loại kiểm thử (bảng so sánh 8 tiêu chí).
- Lý thuyết Consumer-Driven Contract Testing (triết lý, so sánh với Provider-Driven, các thành phần chính).
- Chu trình hoạt động của Pact (4 bước kèm sơ đồ Mermaid và mã ví dụ Pact JS).
- Vai trò của `can-i-deploy` trong CI/CD.
- Lợi ích và thách thức khi áp dụng.
```

#### Human Review

| Aspect           | Detail                                                               |
| ---------------- | -------------------------------------------------------------------- |
| Reviewed by      | Ngô Nguyễn Thế Khoa                                                  |
| Review date      | 2026-07-08                                                           |
| Corrections made | Có — Loại bỏ phần giới thiệu cá nhân ở dòng đầu tiên của tài liệu.    |
| Quality rating   | Good                                                                 |
| Issues found     | None                                                                 |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                                               | Value                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| Total AI interactions                                | 1                                                               |
| AI tools used                                        | Gemini 3.5 Flash (Medium)                                       |
| Features covered                                     | Lý thuyết Contract Testing                                      |
| Documents created / updated                          | docs/reports/week05/evidences/KhoaNgo/contract-testing.md       |
| Issues found by audit                                | 0                                                               |
| Issues resolved                                      | 0/0                                                             |

### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ----------------------- | --------------- | ------------------ |
| Research & Synthesizing | 80%             | 20%                |
| Document Structuring    | 90%             | 10%                |
| Document Editing        | 10%             | 90%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
