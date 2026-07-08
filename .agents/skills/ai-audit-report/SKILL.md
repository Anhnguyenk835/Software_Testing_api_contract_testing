---
name: ai-audit-report
description: >
  Tạo hoặc cập nhật file AI Audit Report (AI_Audit_Report.md) theo chuẩn AI Usage Guidelines
  của khoa CNTT - ĐHKHTN. Skill này nhận bằng chứng sử dụng AI từ người dùng (prompt log,
  export chat, hoặc kể lại), luôn xác nhận đủ thông tin bắt buộc trước khi ghi, và tạo ra
  Entry chuẩn hoá gồm: prompt, AI output, human review, thống kê tổng hợp và compliance
  checklist. Dùng cho dự án API & Contract Testing (Nhóm 3 - SEBros).
---

# AI Audit Report Generator

## Mục đích

Skill này giúp các thành viên nhóm SEBros tự động tạo và cập nhật file `AI_Audit_Report.md`
tuân thủ đúng chuẩn **AI Usage Guidelines** của khoa CNTT – ĐHKHTN (HW02 §9), dựa trên
bằng chứng sử dụng AI mà người dùng cung cấp.

Mỗi khi thành viên sử dụng AI (ChatGPT, Claude, Gemini, Copilot,...) để hỗ trợ làm task trong tuần,
skill này sẽ ghi lại một **Entry** mới vào file audit, đảm bảo minh bạch và đầy đủ minh chứng —
đúng với nguyên tắc **Transparency** và **Understanding** trong AI Usage Guidelines gốc.

## Khi nào sử dụng

- Khi bắt đầu một task mới có sử dụng AI → tạo file `AI_Audit_Report.md` mới (mode: **GENERATE**).
- Khi tiếp tục sử dụng AI cho task khác trong cùng tuần → thêm Entry mới (mode: **APPEND**).
- Khi cần kiểm tra, phản biện nội dung đã viết bằng AI → ghi lại kết quả audit (mode: **APPEND**).

## Thông tin nhóm (Member Mapping)

| MSSV     | Họ tên                | Tên folder |
| :------- | :-------------------- | :--------- |
| 23127115 | Mạch Quốc Tấn         | QuocTan    |
| 23127065 | Ngô Nguyễn Thế Khoa   | KhoaNgo    |
| 23127211 | Nguyễn Lê Hồ Anh Khoa | KhoaNguyen |
| 23127148 | Ân Tiến Nguyên An     | NguyenAn   |
| 23127152 | Nguyễn Tuấn Anh       | TuanAnh    |

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

---

## Nguồn bằng chứng (Evidence Sources)

Người dùng có thể cung cấp bằng chứng sử dụng AI theo các hình thức sau. Skill xử lý theo
**thứ tự ưu tiên**, không tự ý chọn nguồn khác nếu nguồn ưu tiên hơn đã có sẵn:

1. **File log có sẵn** (`PromptLog.md`, export chat, `.md`/`.txt` khác) — nếu người dùng đưa
   đường dẫn file hoặc paste nội dung file, đây là nguồn chính xác nhất. Đọc trực tiếp, không
   diễn giải lại nội dung prompt.
2. **Paste nguyên văn prompt/output** trong tin nhắn — dùng nguyên văn cho phần **Prompt người dùng**.
3. **Kể lại bằng lời** (mô tả tự do) — chỉ dùng để soạn phần "Chi tiết thực thi" và "AI Output"
   (tóm tắt). **Không được tự bịa nội dung cho ô "Prompt người dùng"** khi người dùng chỉ kể lại
   mà không cung cấp prompt gốc — đây là mục bắt buộc phải hỏi lại (xem phần dưới).

Nguyên tắc: phần **Prompt người dùng** trong mỗi Entry là bằng chứng, không phải diễn giải.
Nếu không có nguyên văn, phải hỏi người dùng cung cấp, không được tự viết hộ.

---

## Xác nhận thông tin bắt buộc trước khi ghi Entry

Trước khi tạo hoặc thêm bất kỳ Entry nào, skill phải kiểm tra đủ các field bắt buộc sau.
Nếu **thiếu bất kỳ field nào**, skill **dừng lại và hỏi người dùng một lần duy nhất**,
gộp toàn bộ các field còn thiếu thành **một danh sách** — không hỏi từng câu rời rạc,
không tự suy luận hay điền giá trị mặc định thay người dùng.

Các field bắt buộc:

- **AI Tool** (tên + version, ví dụ: Claude Sonnet 4.6, Gemini 3.5 Flash)
- **Date/Time** chính xác (ngày giờ, múi giờ +07:00)
- **Prompt gốc nguyên văn** (không phải tóm tắt)
- **Feature/module** đang làm (task này phục vụ phần nào của đồ án)
- **Quality rating** (Excellent/Good/Acceptable/Poor — đánh giá của người dùng sau khi review)
- **Issues found** (liệt kê vấn đề cụ thể, hoặc xác nhận rõ ràng "None")

Ví dụ cách hỏi gộp khi thiếu nhiều field:

```
Để ghi Entry này đầy đủ theo chuẩn HW02 §9, mình cần bạn bổ sung thêm:
1. Tool AI dùng là bản nào (ví dụ: Claude Sonnet 4.6, ChatGPT-4o)?
2. Prompt gốc bạn đã gửi cho AI (nguyên văn)?
3. Sau khi review, bạn đánh giá chất lượng output thế nào (Excellent/Good/Acceptable/Poor)?
4. Có phát hiện lỗi/vấn đề gì trong output không, hay "None"?
```

Chỉ sau khi có đủ toàn bộ field bắt buộc mới tiến hành ghi Entry vào file.

---

## Cấu trúc bắt buộc của AI_Audit_Report.md

File AI Audit Report **phải bao gồm đầy đủ** các phần sau theo đúng thứ tự. Lưu ý: skill này
**không nhóm Entry theo Feature** — mọi Entry được liệt kê tuần tự theo thứ tự thời gian sử dụng
AI, đơn giản và dễ theo dõi.

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

| #   | AI Tool | Task Category | Feature   | Date   | Bloom-AI Level |
| --- | ------- | ------------- | --------- | ------ | -------------- |
| 1   | [Tool]  | [Category]    | [Feature] | [Date] | [Level]        |
```

**Bloom-AI Level** sử dụng thang đo:

- G9.1 (Remember) — Tra cứu thông tin cơ bản
- G9.2 (Apply) — Áp dụng template, format, sinh code mẫu
- G9.3 (Analyse) — Phân tích, phản biện, đánh giá nội dung
- G9.4 (Create) — Tổng hợp và tạo nội dung mới phức tạp

### 4. Chi tiết từng lần sử dụng AI (Entries)

Mỗi Entry ghi lại **một lần tương tác AI**, theo thứ tự thời gian, với cấu trúc sau:

````markdown
### Entry N — [Mô tả ngắn gọn việc đã làm]

| Field              | Value                           |
| ------------------ | ------------------------------- |
| **AI Tool**        | [Tên tool + version]            |
| **Date/Time**      | [YYYY-MM-DD HH:MM:SS +07:00]    |
| **Task**           | [Mô tả chi tiết task]           |
| **Feature**        | [Tên tính năng/module đang làm] |
| **Bloom-AI Level** | [Level] — [Giải thích ngắn]     |

#### Prompt

**Prompt người dùng:**

​`text
[Nội dung prompt gốc, nguyên văn — không tóm tắt, không diễn giải]
​`

**Chi tiết thực thi:**

​```text
Skill: ai-audit-report
Mode: GENERATE / APPEND

Các bước AI đã thực hiện:

1. [Bước 1]
2. [Bước 2]
   ...
   ​```

#### AI Output

​`text
[Tóm tắt kết quả AI trả về — không copy nguyên văn toàn bộ output,
chỉ ghi các điểm chính và danh sách file/nội dung đã tạo]
​`

#### Human Review

| Aspect           | Detail                               |
| ---------------- | ------------------------------------ |
| Reviewed by      | [Họ tên người review]                |
| Review date      | [YYYY-MM-DD]                         |
| Corrections made | [Có/Không — mô tả chi tiết nếu có]   |
| Quality rating   | [Excellent/Good/Acceptable/Poor]     |
| Issues found     | [Liệt kê vấn đề cụ thể, hoặc "None"] |
````

**Lưu ý quan trọng cho Entry:**

- Nếu AI tạo ra nội dung có lỗi → ghi rõ trong Human Review, sau đó tạo Entry mới để sửa lỗi.
- Nếu dùng AI để phản biện/kiểm tra nội dung → cũng phải ghi thành 1 Entry riêng.
- Mỗi Entry phải có **đầy đủ cả 3 phần**: Prompt, AI Output, Human Review.
- Nếu Quality rating của một Entry thay đổi sau khi phát hiện lỗi ở Entry sau (ví dụ: hạ từ
  Excellent xuống Good), ghi rõ lý do trong ô Detail, ví dụ:
  `Good (hạ từ Excellent sau khi phát hiện lỗi kỹ thuật — xem chi tiết tại Entry N)`.
- **Không dùng cú pháp `**[Tên nhãn]**` (ngoặc vuông ngay sau in đậm)** cho các nhãn như
  "Prompt người dùng", "Chi tiết thực thi" — cú pháp này bị một số trình kiểm tra Markdown
  hiểu nhầm thành reference-link shortcut, gây lỗi linter `No link definition found`. Luôn dùng
  `**Nhãn:**` (dấu hai chấm trong ngoặc đậm, không có ngoặc vuông).

### 5. Thống kê tổng hợp

Bảng bắt buộc tối thiểu gồm các dòng sau. Nếu tuần đó phát sinh thêm loại kết quả cụ thể
(ví dụ: số lượng test case, số diagram, số đoạn code mẫu), có thể **thêm dòng tuỳ chỉnh**
phía dưới các dòng bắt buộc — không giới hạn cứng theo 1 khuôn duy nhất.

```markdown
## Thống kê tổng hợp (Summary Statistics)

| Metric                                               | Value                     |
| ---------------------------------------------------- | ------------------------- |
| Total AI interactions                                | [Số lần tương tác]        |
| AI tools used                                        | [Danh sách tool]          |
| Features covered                                     | [Danh sách features]      |
| Documents created / updated                          | [Danh sách file]          |
| Issues found by audit                                | [Số vấn đề]               |
| Issues resolved                                      | [Số đã giải quyết / tổng] |
| [Metric tuỳ chỉnh nếu có, ví dụ: Diagrams generated] | [Value]                   |
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

---

## Quy tắc quan trọng

1. **Không copy nguyên văn toàn bộ AI output** vào phần AI Output. Chỉ tóm tắt các điểm chính,
   danh sách file đã tạo và các thay đổi quan trọng. Nếu output quá dài, ghi
   "Xem chi tiết tại [tên file]".

2. **Luôn ghi rõ Bloom-AI Level** cho mỗi Entry để phân biệt mức độ sử dụng AI:
   tra cứu cơ bản (G9.1) khác với phân tích phản biện (G9.3).

3. **Human Review là bắt buộc** — không được bỏ trống, và không được tự đoán thay người dùng.
   Nếu người dùng chưa cung cấp đủ (Quality rating, Issues found), phải hỏi lại trước
   (xem phần "Xác nhận thông tin bắt buộc" phía trên) — không ghi "Chưa review" như một cách
   để bỏ qua việc hỏi.

4. **Mỗi cuộc trò chuyện AI riêng biệt = 1 Entry riêng**. Không gộp nhiều cuộc
   hội thoại vào cùng một Entry.

5. **Timestamp phải chính xác** — sử dụng múi giờ +07:00 (Việt Nam). Nếu người dùng không
   cung cấp giờ chính xác, đây là field bắt buộc phải hỏi lại, không tự điền giờ hiện tại.

6. **File chỉ dùng Markdown thuần** — không dùng emoji/icon, không dùng HTML phức tạp.

7. **Prompt gốc là bằng chứng, không phải diễn giải** — không tự soạn hộ nội dung ô
   "Prompt người dùng" khi người dùng chỉ mô tả ý định bằng lời. Xem phần "Nguồn bằng chứng".

## Ví dụ prompt để kích hoạt skill

### Tạo mới (GENERATE) — có sẵn prompt log

```
Tạo AI Audit Report cho tuần W05, thành viên Mạch Quốc Tấn (23127115).
Task: Nghiên cứu lý thuyết API Testing chuyên sâu.
Tool đã dùng: Claude Sonnet 4.6 (Thinking)
Thời gian: 09:00 - 11:30 ngày 08/07/2026
Prompt đã dùng: "Tìm kiếm thật kĩ và toàn diện, hãy viết cho tôi một file..."
AI đã làm: Tạo file API_Testing_Theory.md gồm 12 chương lý thuyết.
Human review: Đã kiểm tra, phát hiện 4 lỗi kỹ thuật cần sửa. Quality: Good.
```

### Tạo mới (GENERATE) — chỉ kể lại bằng lời, thiếu thông tin

```
User: "Tạo AI Audit Report tuần W05 giúp tôi, lúc nãy tôi dùng Claude để viết
theory API Testing."

Skill phản hồi (hỏi gộp trước khi ghi):
"Để ghi Entry này đầy đủ theo chuẩn HW02 §9, mình cần bạn bổ sung thêm:
1. Claude bản nào (ví dụ: Sonnet 4.6)?
2. Prompt gốc bạn đã gửi (nguyên văn)?
3. Thời gian thực hiện (ngày giờ)?
4. Sau khi review, bạn đánh giá chất lượng output thế nào?
5. Có phát hiện lỗi/vấn đề gì không, hay None?"
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
