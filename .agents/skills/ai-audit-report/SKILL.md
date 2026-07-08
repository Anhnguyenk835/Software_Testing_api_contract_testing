---
name: ai-audit-report
description: >
  Tạo hoặc cập nhật file AI Audit Report (AI_Audit_Report.md) theo chuẩn AI Usage Guidelines
  của khoa CNTT - ĐHKHTN. Skill này ghi lại chi tiết từng lần sử dụng AI trong quá trình làm
  đồ án seminar, bao gồm: prompt, AI output, human review, thống kê tổng hợp và compliance checklist.
  Dùng cho dự án API & Contract Testing (Nhóm 3 - SEBros).
---

# AI Audit Report Generator

## Mục đích

Skill này giúp các thành viên nhóm SEBros tự động tạo và cập nhật file `AI_Audit_Report.md`
tuân thủ đúng chuẩn **AI Usage Guidelines** của khoa CNTT – ĐHKHTN (HW02 §9).

Mỗi khi thành viên sử dụng AI (ChatGPT, Claude, Gemini, Copilot,...) để hỗ trợ làm task trong tuần,
skill này sẽ ghi lại một **Entry** mới vào file audit, đảm bảo minh bạch và đầy đủ minh chứng.

## Khi nào sử dụng

- Khi bắt đầu một task mới có sử dụng AI → tạo file `AI_Audit_Report.md` mới (mode: **GENERATE**).
- Khi tiếp tục sử dụng AI cho task khác trong cùng tuần → thêm Entry mới (mode: **APPEND**).
- Khi cần kiểm tra, phản biện nội dung đã viết bằng AI → ghi lại kết quả audit (mode: **APPEND**).

## Thông tin nhóm (Member Mapping)

| MSSV     | Họ tên               | Tên folder   |
| :------- | :-------------------- | :----------- |
| 23127115 | Mạch Quốc Tấn         | QuocTan      |
| 23127065 | Ngô Nguyễn Thế Khoa   | KhoaNgo      |
| 23127211 | Nguyễn Lê Hồ Anh Khoa | KhoaNguyen   |
| 23127148 | Ân Tiến Nguyên An      | NguyenAn     |
| 23127152 | Nguyễn Tuấn Anh        | TuanAnh      |

## Đường dẫn output

```
docs/reports/weekXX/AI Usage/<TenFolder>/AI_Audit_Report.md
```

Ví dụ: `docs/reports/week05/AI Usage/QuocTan/AI_Audit_Report.md`

## Hai chế độ hoạt động

### Mode: GENERATE (Tạo mới)
Tạo file `AI_Audit_Report.md` mới với đầy đủ các phần cấu trúc và Entry đầu tiên.

### Mode: APPEND (Bổ sung)
Đọc file `AI_Audit_Report.md` hiện có, thêm Entry mới vào cuối phần "Chi tiết từng lần sử dụng AI"
và cập nhật lại bảng "Tổng quan sử dụng AI", "Thống kê tổng hợp" và "AI Contribution Breakdown".

## Cấu trúc bắt buộc của AI_Audit_Report.md

File AI Audit Report **phải bao gồm đầy đủ** các phần sau theo đúng thứ tự:

### 1. Tiêu đề & Thông tin sinh viên

```markdown
# AI Audit Report — [Tên task/Assignment]

## Thông tin sinh viên (Student Information)

| Field                          | Value                    |
| ------------------------------ | ------------------------ |
| **MSSV (Student ID)**          | [MSSV]                   |
| **Họ tên (Full Name)**         | [Họ tên đầy đủ]          |
| **Mã bài tập (Assignment)**    | Seminar WXX — [Tên task] |
| **Ngày nộp (Submission Date)** | [YYYY-MM-DD]             |
```

### 2. Tuyên bố sử dụng AI

```markdown
## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: [liệt kê ngắn gọn các việc đã dùng AI]."
```

### 3. Tổng quan sử dụng AI (Bảng tóm tắt)

```markdown
## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool  | Task Category | Feature      | Date       | Bloom-AI Level |
| --- | -------- | ------------- | ------------ | ---------- | -------------- |
| 1   | [Tool]   | [Category]    | [Feature]    | [Date]     | [Level]        |
```

**Bloom-AI Level** sử dụng thang đo:
- G9.1 (Remember) — Tra cứu thông tin cơ bản
- G9.2 (Apply) — Áp dụng template, format, sinh code mẫu
- G9.3 (Analyse) — Phân tích, phản biện, đánh giá nội dung
- G9.4 (Create) — Tổng hợp và tạo nội dung mới phức tạp

### 4. Chi tiết từng lần sử dụng AI (Entries)

Mỗi Entry ghi lại **một lần tương tác AI** với cấu trúc sau:

```markdown
### Entry N — [Mô tả ngắn gọn việc đã làm]

| Field              | Value                              |
| ------------------ | ---------------------------------- |
| **AI Tool**        | [Tên tool + version]               |
| **Date/Time**      | [YYYY-MM-DD HH:MM:SS +07:00]      |
| **Task**           | [Mô tả chi tiết task]             |
| **Feature**        | [Tên tính năng/module đang làm]   |
| **Bloom-AI Level** | [Level] — [Giải thích ngắn]       |

#### Prompt

**Prompt người dùng:**

​```text
[Nội dung prompt gốc đã gửi cho AI]
​```

**Chi tiết thực thi:**

​```text
Skill: ai-audit-report-generator v1.0
Mode: GENERATE / APPEND

Các bước AI đã thực hiện:
1. [Bước 1]
2. [Bước 2]
...
​```

#### AI Output

​```text
[Tóm tắt kết quả AI trả về — không copy nguyên văn toàn bộ output,
chỉ ghi các điểm chính và danh sách file/nội dung đã tạo]
​```

#### Human Review

| Aspect           | Detail                                |
| ---------------- | ------------------------------------- |
| Reviewed by      | [Họ tên người review]                 |
| Review date      | [YYYY-MM-DD]                          |
| Corrections made | [Có/Không — mô tả chi tiết nếu có]   |
| Quality rating   | [Excellent/Good/Acceptable/Poor]      |
| Issues found     | [Liệt kê vấn đề hoặc "None"]        |
```

**Lưu ý quan trọng cho Entry:**
- Nếu AI tạo ra nội dung có lỗi → ghi rõ trong Human Review, sau đó tạo Entry mới để sửa lỗi.
- Nếu dùng AI để phản biện/kiểm tra nội dung → cũng phải ghi thành 1 Entry riêng.
- Mỗi Entry phải có **đầy đủ cả 3 phần**: Prompt, AI Output, Human Review.

### 5. Thống kê tổng hợp

```markdown
## Thống kê tổng hợp (Summary Statistics)

| Metric                              | Value                         |
| ----------------------------------- | ----------------------------- |
| Total AI interactions               | [Số lần tương tác]            |
| AI tools used                       | [Danh sách tool]              |
| Features covered                    | [Danh sách features]          |
| Documents created / updated         | [Danh sách file]              |
| Issues found by audit               | [Số vấn đề]                   |
| Issues resolved                     | [Số đã giải quyết / tổng]    |
```

### 6. AI Contribution Breakdown

```markdown
### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ----------------------- | --------------- | ------------------ |
| Research & Synthesizing | [XX]%           | [XX]%              |
| Document Structuring    | [XX]%           | [XX]%              |
| Code Writing            | [XX]%           | [XX]%              |
| ...                     | ...             | ...                |
```

### 7. Compliance Checklist

```markdown
## Compliance Checklist (HW02 §9)

- [ ] Tuyên bố sử dụng AI
- [ ] Tên công cụ AI sử dụng
- [ ] Ngày và giờ của từng tương tác
- [ ] Prompt chi tiết của người dùng
- [ ] Kết quả phản hồi của AI
- [ ] Nhật ký đánh giá của sinh viên (Human Review)
- [ ] Định dạng Markdown chuẩn
```

## Quy tắc quan trọng

1. **Không copy nguyên văn toàn bộ AI output** vào phần AI Output. Chỉ tóm tắt các điểm chính,
   danh sách file đã tạo và các thay đổi quan trọng. Nếu output quá dài, ghi
   "Xem chi tiết tại [tên file]".

2. **Luôn ghi rõ Bloom-AI Level** cho mỗi Entry để phân biệt mức độ sử dụng AI:
   tra cứu cơ bản (G9.1) khác với phân tích phản biện (G9.3).

3. **Human Review là bắt buộc** — không được bỏ trống. Nếu chưa review, ghi
   "Chưa review — cần kiểm tra trước khi nộp".

4. **Mỗi cuộc trò chuyện AI riêng biệt = 1 Entry riêng**. Không gộp nhiều cuộc
   hội thoại vào cùng một Entry.

5. **Timestamp phải chính xác** — sử dụng múi giờ +07:00 (Việt Nam).

6. **File chỉ dùng Markdown thuần** — không dùng emoji/icon, không dùng HTML phức tạp.

## Ví dụ prompt để kích hoạt skill

### Tạo mới (GENERATE)
```
Tạo AI Audit Report cho tuần W05, thành viên Mạch Quốc Tấn (23127115).
Task: Nghiên cứu lý thuyết API Testing chuyên sâu.
Tool đã dùng: Claude Sonnet 4.6 (Thinking)
Thời gian: 09:00 - 11:30 ngày 08/07/2026
Prompt đã dùng: "Tìm kiếm thật kĩ và toàn diện, hãy viết cho tôi một file..."
AI đã làm: Tạo file API_Testing_Theory.md gồm 12 chương lý thuyết.
Human review: Đã kiểm tra, phát hiện 4 lỗi kỹ thuật cần sửa.
```

### Bổ sung (APPEND)
```
Thêm Entry mới vào AI Audit Report tuần W05 của Mạch Quốc Tấn.
Task: Kiểm tra và phản biện nội dung API_Testing_Theory.md.
Tool: Claude Sonnet 4.6 (Thinking)
Thời gian: 13:43 ngày 08/07/2026
[Mô tả chi tiết prompt, output và human review]
```

## Tham khảo

- Mẫu AI Audit Report hoàn chỉnh: xem file `examples/sample_audit_report.md` trong skill này.
- AI Usage Guidelines gốc: xem file `references/ai_usage_guidelines_summary.md` trong skill này.
