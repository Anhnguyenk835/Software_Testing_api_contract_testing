# AI Audit Report — Seminar W06: Pact Provider Verification & Pactflow Publish

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                       |
| ------------------------------ | ----------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127148                                                    |
| **Họ tên (Full Name)**         | Ân Tiến Nguyên An                                           |
| **Mã bài tập (Assignment)**    | Seminar W06 — Pact Provider Verification & Pactflow Publish |
| **Ngày nộp (Submission Date)** | 2026-07-18                                                  |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: soạn thảo tài liệu hướng dẫn publish pact lên Pactflow Broker và tích hợp npm script publish:pact vào provider/package.json."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                      | Task Category             | Feature                             | Date       | Bloom-AI Level |
| --- | ---------------------------- | ------------------------- | ----------------------------------- | ---------- | -------------- |
| 1   | Claude Sonnet 4.6 (Thinking) | Documentation & Scripting | Pactflow Publish Guide & npm Script | 2026-07-18 | G9.2 (Apply)   |

---

## Chi tiết từng lần sử dụng AI (Entries)

### Entry 1 — Thiết lập script publish và viết tài liệu hướng dẫn Pactflow

| Field              | Value                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 4.6 (Thinking)                                                             |
| **Date/Time**      | 2026-07-18 00:16:39 +07:00                                                               |
| **Task**           | Tạo tài liệu hướng dẫn publish pact lên Pactflow và cấu hình npm script publish:pact     |
| **Feature**        | Pact Provider Verification & Pactflow Publish                                            |
| **Bloom-AI Level** | G9.2 (Apply) — Áp dụng các kiến thức thực tế về CLI và tích hợp npm script xuyên thư mục |

#### Prompt

**Prompt người dùng:**

```text
Bạn là senior engineer hỗ trợ tôi hoàn thành task W06 của Nguyên An (23127148)
— dự án API & Contract Testing, Nhóm 3 SEBros.

## Bối cảnh

Workspace: d:\Project\Software_Testing_api_contract_testing
Provider: src/sample-api/pact-workshop-js/provider/
Consumer: src/sample-api/pact-workshop-js/consumer/

- Provider đã implement đủ GET/POST/PUT/DELETE, authMiddleware đúng thứ tự.
- product.pact.test.js đã có Verifier config + stateHandlers đủ và khớp tên với consumer.
- Consumer (api.pact.spec.js) đã viết đủ interactions cho cả 5 routes.
- Tôi sẽ tự chạy consumer test + provider verification và chụp screenshot minh chứng.

## Việc cần AI làm

Soạn hướng dẫn publish pact lên Pactflow Broker:

1. Tạo file docs/reports/week06/AI Usage/NguyenAn/pactflow-publish-guide.md
   ghi rõ:
   - Các biến môi trường cần set (PACT_BROKER_URL, PACT_BROKER_TOKEN,
     GIT_BRANCH, GIT_COMMIT) — không hardcode giá trị thật
   - Lệnh publish cụ thể (dùng npm script hoặc pact-broker CLI)
   - Cách đọc kết quả trên Pactflow UI để chụp minh chứng

2. Thêm npm script publish:pact vào provider/package.json
   để chạy publish bằng một lệnh duy nhất.

Đọc code thực tế trước khi viết, đảm bảo lệnh khớp với version
@pact-foundation/pact đang dùng (13.1.4).
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc và phân tích cấu trúc dự án thực tế tại `src/sample-api/pact-workshop-js/provider/package.json` và `consumer/package.json`.
2. Phát hiện `@pact-foundation/pact-cli` phiên bản `16.0.4` đã được cài đặt sẵn ở thư mục `consumer`.
3. Soạn thảo tài liệu hướng dẫn chi tiết tại `docs/reports/week06/AI Usage/NguyenAn/pactflow-publish-guide.md` hướng dẫn cấu hình biến môi trường, chạy CLI và đọc kết quả giao diện Pactflow.
4. Thêm npm script `publish:pact` vào `provider/package.json` sử dụng cú pháp `npx --prefix ../consumer` để tái sử dụng CLI có sẵn mà không làm phình to dependencies của provider.
```

#### AI Output

```text
Các kết quả chính được tạo ra:

Tệp tạo mới:
- docs/reports/week06/AI Usage/NguyenAn/pactflow-publish-guide.md (Tài liệu hướng dẫn publish 7 phần)

Tệp cập nhật:
- src/sample-api/pact-workshop-js/provider/package.json (Cấu hình script npm "publish:pact")
```

#### Human Review

| Aspect           | Detail            |
| ---------------- | ----------------- |
| Reviewed by      | Ân Tiến Nguyên An |
| Review date      | 2026-07-18        |
| Corrections made | Không             |
| Quality rating   | Excellent         |
| Issues found     | None              |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                      | Value                                   |
| --------------------------- | --------------------------------------- |
| Total AI interactions       | 1                                       |
| AI tools used               | Claude Sonnet 4.6 / Gemini 3.5 Flash    |
| Features covered            | Pactflow Integration                    |
| Documents created / updated | pactflow-publish-guide.md, package.json |
| Issues found by audit       | 0                                       |
| Issues resolved             | 0 / 0                                   |

### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ----------------------- | --------------- | ------------------ |
| Research & Synthesizing | 90%             | 10%                |
| Document Structuring    | 95%             | 5%                 |
| Code Writing (Scripts)  | 90%             | 10%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
