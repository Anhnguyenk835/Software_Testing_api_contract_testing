# AI Audit Report — Seminar W06 Pact Consumer Interactions

## Thông tin sinh viên (Student Information)

| Field                          | Value                                    |
| ------------------------------ | ---------------------------------------- |
| **MSSV (Student ID)**          | 23127065                                 |
| **Họ tên (Full Name)**         | Ngô Nguyễn Thế Khoa                      |
| **Mã bài tập (Assignment)**    | Seminar W06 — Pact Consumer Interactions |
| **Ngày nộp (Submission Date)** | 2026-07-15                               |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để phân tích contract Product Service, hoàn thiện API client, xây dựng Pact Consumer interactions cho các API CRUD, chạy kiểm thử consumer, xuất pact JSON và cập nhật hướng dẫn bàn giao contract cho provider verification."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool               | Task Category                | Feature                    | Date       | Bloom-AI Level |
| --- | --------------------- | ---------------------------- | -------------------------- | ---------- | -------------- |
| 1   | Codex CLI GPT 5.6-sol | Contract Test Implementation | Pact Consumer Interactions | 2026-07-15 | G9.4 (Create)  |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Hoàn thiện Pact Consumer interactions cho Product Service

| Field              | Value                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Codex CLI GPT 5.6-sol                                                                                |
| **Date/Time**      | 2026-07-15 23:50:23 +07:00                                                                           |
| **Task**           | Viết và kiểm tra Pact Consumer interactions cho các API đọc, tạo, cập nhật và xóa sản phẩm           |
| **Feature**        | Pact Consumer Interactions                                                                           |
| **Bloom-AI Level** | G9.4 (Create) — Phân tích contract hiện có, tổng hợp và tạo mới bộ consumer contract CRUD hoàn chỉnh |

#### Prompt

**Prompt người dùng:**

```text
trong ./src, hãy:
- Viết/hoàn thiện Pact Consumer interactions cho các API **đọc**: `GET /products`, `GET /product/:id` (payload, status, header `Authorization` với matcher phù hợp).
- Viết Pact Consumer interactions cho API **tạo**: `POST /products` (request body, response `201`/body sản phẩm, case lỗi validation hoặc `401` nếu nằm trong design).
- Viết Pact Consumer interactions cho API **cập nhật và xóa**: `PUT /product/:id`, `DELETE /product/:id` (status và body/header kỳ vọng theo contract đã thống nhất).
- Chạy consumer tests thành công, xuất file pact JSON; ghi lệnh chạy test và đường dẫn file pact để phía provider verification sử dụng.
use context7
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Khảo sát API consumer, provider routes, controller, repository, auth middleware
   và các test hiện có để xác định contract Product Service đã thống nhất.
2. Dùng Context7 tra cứu tài liệu Pact-JS về PactV3, MatchersV3, header matcher,
   request/response body và cách sinh pact file.
3. Mở rộng API client với các method createProduct, updateProduct và deleteProduct;
   dùng chung cấu hình Authorization Bearer timestamp ISO-8601.
4. Xây dựng 10 Pact interactions cho GET, POST, PUT và DELETE, gồm các trường hợp
   thành công, danh sách rỗng, validation 400 và resource không tồn tại 404.
5. Dùng regex matcher cho Authorization và type matcher cho payload sản phẩm.
6. Cài dependencies theo package-lock, chạy Pact consumer tests và API unit tests.
7. Kiểm tra nội dung pact JSON, xác nhận đủ 10 interactions và 10 Authorization matchers.
8. Cập nhật tài liệu với lệnh chạy test và đường dẫn pact JSON cho provider verification.
```

#### AI Output

```text
Đã cập nhật:
- src/sample-api/pact-workshop-js/consumer/src/api.js
- src/sample-api/pact-workshop-js/consumer/src/api.pact.spec.js
- src/pact/README.md

Đã tạo pact JSON:
- src/sample-api/pact-workshop-js/consumer/pacts/FrontendWebsite-ProductService.json

Contract bao phủ:
- GET /products: 200 với danh sách sản phẩm và 200 với danh sách rỗng
- GET /product/:id: 200 và 404
- POST /products: 201 với sản phẩm được tạo và 400 khi validation thất bại
- PUT /product/:id: 200 và 404
- DELETE /product/:id: 204 và 404

Kết quả kiểm tra:
- Pact consumer tests: 10/10 pass
- API unit tests: 2/2 pass
- Pact specification: 2.0.0
- Authorization regex matchers: 10/10 interactions
```

#### Human Review

| Aspect           | Detail                                                             |
| ---------------- | ------------------------------------------------------------------ |
| Reviewed by      | Ngô Nguyễn Thế Khoa                                                |
| Review date      | 2026-07-15                                                         |
| Corrections made | Không — kết quả đã được kiểm tra bằng consumer tests và unit tests |
| Quality rating   | Good                                                               |
| Issues found     | None                                                               |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                      | Value                                                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total AI interactions       | 1                                                                                                                                                                                   |
| AI tools used               | Codex CLI GPT 5.6-sol                                                                                                                                                               |
| Features covered            | Pact Consumer Interactions cho Product Service CRUD                                                                                                                                 |
| Documents created / updated | consumer/src/api.js, consumer/src/api.pact.spec.js, src/pact/README.md, consumer/pacts/FrontendWebsite-ProductService.json, docs/reports/week06/AI Usage/KhoaNgo/AI_Audit_Report.md |
| Issues found by audit       | 0                                                                                                                                                                                   |
| Issues resolved             | N/A — không có vấn đề được phát hiện trong Human Review                                                                                                                             |
| Pact interactions generated | 10                                                                                                                                                                                  |
| Tests passing               | 12/12 (10 Pact consumer tests và 2 API unit tests)                                                                                                                                  |

### AI Contribution Breakdown

| Task                               | AI Contribution | Human Contribution |
| ---------------------------------- | --------------- | ------------------ |
| Contract & Codebase Analysis       | 90%             | 10%                |
| Consumer API Client Implementation | 90%             | 10%                |
| Pact Interaction Writing           | 95%             | 5%                 |
| Test Execution & Pact Validation   | 90%             | 10%                |
| Documentation                      | 90%             | 10%                |
| Review & Quality Assessment        | 20%             | 80%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
