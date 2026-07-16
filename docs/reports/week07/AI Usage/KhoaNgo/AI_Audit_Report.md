# AI Audit Report — Seminar W07 Pact CI/CD

## Thông tin sinh viên (Student Information)

| Field                          | Value                                 |
| ------------------------------ | ------------------------------------- |
| **MSSV (Student ID)**          | 23127065                              |
| **Họ tên (Full Name)**         | Ngô Nguyễn Thế Khoa                   |
| **Mã bài tập (Assignment)**    | Seminar W07 — Pact Verification CI/CD |
| **Ngày nộp (Submission Date)** | 2026-07-16                            |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để phân tích mã nguồn Pact Consumer và Provider, tra cứu tài liệu Pact bằng Context7, cấu hình GitHub Actions và kiểm thử quy trình Pact Verification."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool             | Task Category                 | Feature                                | Date       | Bloom-AI Level |
| --- | ------------------- | ----------------------------- | -------------------------------------- | ---------- | -------------- |
| 1   | Codex (GPT 5.6-sol) | CI/CD Configuration & Testing | Pact Consumer/Provider CI Verification | 2026-07-16 | G9.4 (Create)  |

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Cấu hình GitHub Actions cho Pact Verification

| Field              | Value                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **AI Tool**        | Codex (GPT 5.6-sol)                                                                      |
| **Date/Time**      | 2026-07-16 07:23:14 +07:00                                                               |
| **Task**           | Tự động chạy Pact Consumer tests và Provider verification khi push hoặc tạo Pull Request |
| **Feature**        | Seminar W07 — Pact Consumer/Provider CI Verification                                     |
| **Bloom-AI Level** | G9.4 (Create) — Phân tích dự án và xây dựng quy trình CI hoàn chỉnh                      |

#### Prompt

**Prompt người dùng:**

```text
- Cấu hình GitHub Actions CI/CD workflow để tự động chạy các bài kiểm tra Pact Verification cho cả dịch vụ Consumer và Provider khi đẩy mã nguồn mới lên nhánh chính (main).
- Tự động hóa quá trình xác minh hợp đồng Pact khi phát sinh commit mới/Pull Request từ các thành viên (collaborators).

use context7
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Khảo sát cấu trúc repository, package scripts, Consumer Pact tests, Provider verifier và workflow mẫu.
2. Dùng Context7 tra cứu hướng dẫn Pact về consumer contract generation, provider verification và CI workflow.
3. Tạo GitHub Actions workflow chạy khi push lên main hoặc có Pull Request hướng vào main.
4. Tách pipeline thành Consumer job và Provider job; truyền Pact JSON bằng GitHub Actions artifact.
5. Cập nhật Provider verifier để đọc Pact file trong CI hoặc kết nối Pact Broker khi được cấu hình.
6. Bổ sung đầy đủ provider state handlers theo các interaction hiện có.
7. Cập nhật tài liệu hướng dẫn CI và chạy kiểm thử end-to-end.
```

#### AI Output

```text
Đã tạo/cập nhật các file:

1. .github/workflows/pact-verification.yml
   - Kích hoạt khi push lên main và khi có Pull Request hướng vào main.
   - Consumer job sinh Pact JSON và upload workflow artifact.
   - Provider job tải artifact và xác minh contract với Provider thực.
   - Giới hạn quyền workflow ở contents: read và hủy run cũ khi có commit mới.

2. src/sample-api/pact-workshop-js/provider/product/product.pact.test.js
   - Hỗ trợ xác minh trực tiếp từ Pact file khi không dùng Broker.
   - Giữ khả năng kết nối Pact Broker qua biến môi trường.
   - Bổ sung các provider state còn thiếu.

3. src/pact/README.md
   - Bổ sung hướng dẫn kích hoạt, cấu trúc pipeline và cấu hình Pact Broker tùy chọn.

Kết quả kiểm thử:
- Consumer Pact tests: 10/10 interactions passed.
- Provider Pact verification: passed toàn bộ interactions.
- Workflow YAML và git diff validation: passed.
```

#### Human Review

| Aspect           | Detail                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Reviewed by      | Ngô Nguyễn Thế Khoa                                                                            |
| Review date      | 2026-07-16                                                                                     |
| Corrections made | Không — kết quả cuối đã được kiểm tra bằng Consumer tests, Provider verification và YAML parse |
| Quality rating   | Good                                                                                           |
| Issues found     | None                                                                                           |

## Thống kê tổng hợp (Summary Statistics)

| Metric                      | Value                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------- |
| Total AI interactions       | 1                                                                                       |
| AI tools used               | Codex (GPT 5.6-sol), Context7                                                           |
| Features covered            | GitHub Actions CI, Consumer Pact generation, Provider Pact verification                 |
| Documents created / updated | `.github/workflows/pact-verification.yml`, `product.pact.test.js`, `src/pact/README.md` |
| Issues found by audit       | 0                                                                                       |
| Issues resolved             | 0/0                                                                                     |
| Pact interactions verified  | 10                                                                                      |

### AI Contribution Breakdown

| Task                      | AI Contribution | Human Contribution |
| ------------------------- | --------------- | ------------------ |
| Documentation research    | 90%             | 10%                |
| CI workflow design        | 85%             | 15%                |
| Code writing              | 85%             | 15%                |
| Testing and validation    | 80%             | 20%                |
| Review and final approval | 30%             | 70%                |

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
