# AI Audit Report — Seminar W06 Provider Auth Fix & CRUD Implementation

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                          |
| ------------------------------- | --------------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127152                                                       |
| **Họ tên (Full Name)**         | Nguyễn Tuấn Anh                                                |
| **Mã bài tập (Assignment)**    | Seminar W06 — Provider Auth Fix & CRUD Implementation (Product Service) |
| **Ngày nộp (Submission Date)** | 2026-07-15                                                     |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: lập kế hoạch triển khai (implementation plan) theo TDD cho việc sửa lỗi thứ tự auth middleware và bổ sung CRUD (POST/PUT/DELETE) cho Product Service provider, và thực thi toàn bộ kế hoạch đó (sửa bug, viết test, bổ sung endpoint, viết tài liệu API, cấu hình Docker Compose)."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool          | Task Category                  | Feature                                              | Date       | Bloom-AI Level |
| --- | ---------------- | ------------------------------- | ----------------------------------------------------- | ---------- | -------------- |
| 1   | Claude Sonnet 5  | Implementation Planning         | Provider Auth Fix & CRUD (Product Service)             | 2026-07-15 | G9.4 (Create)  |
| 2   | Claude Sonnet 5  | TDD Implementation & Execution  | Provider Auth Fix & CRUD (Product Service)             | 2026-07-15 | G9.2 (Apply)   |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Lập kế hoạch triển khai (Implementation Plan)

| Field              | Value                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **AI Tool**        | Claude Sonnet 5                                                                          |
| **Date/Time**      | 2026-07-15 14:00:00 +07:00                                                               |
| **Task**           | Viết implementation plan chi tiết theo TDD để fix bug auth middleware và bổ sung CRUD (POST/PUT/DELETE) cho Product Service provider |
| **Feature**        | Provider Auth Fix & CRUD Implementation (Product Service) — Week06, 23127152             |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp yêu cầu từ report cùng với khảo sát codebase thực tế để tạo ra một plan hoàn chỉnh, có cấu trúc file, ranh giới task và các bước TDD cụ thể |

#### Prompt

**Prompt người dùng:**

```text
lên kế hoạch thực hiện task và chuẩn bị execute task:
1. Fix bug authentication middleware – lỗi cụ thể: authMiddleware đang bị gắn sau routes trong server.js nên middleware không có tác dụng chặn request. Cần chuyển lên trước routes (hoặc gắn theo từng route) để đảm bảo: thiếu/sai token -> 401, token hợp lệ -> cho qua.
2. Verify lại sau khi sửa – smoke test thủ công: gọi GET /products không có Authorization phải trả 401, có Bearer token hợp lệ thì không bị chặn; ghi kết quả vào evidence/README.
3. Implement POST /products – tạo sản phẩm mới, validate body cơ bản, trả 201 (kèm resource) hoặc 400 nếu body sai.
3. Implement PUT /product/:id và DELETE /product/:id – cập nhật/xóa sản phẩm, trả 404 khi id không tồn tại; tất cả 4 method (GET/POST/PUT/DELETE) đều phải đi qua auth đã fix ở bước 1.
5. Cập nhật tài liệu endpoint (method, path, header auth, ví dụ request/response, bảng status code) – đây là nguồn dữ liệu đóng băng (freeze) để Postman (Tần, Anh Khoa) và Pact (Thế Khoa, Tiền Nguyên An) dùng chung trong tuần. Giữ nguyên cơ chế auth Bearer timestamp ISO-8601, không đổi sang JWT/Login giữa tuần.
6. Hoàn thiện Docker Compose (Pact Broker local + Provider nếu kịp) kèm hướng dẫn khởi chạy và smoke test nhanh cho cả nhóm dùng local.
```

**Chi tiết thực thi:**

```text
Skill: superpowers:writing-plans
Mode: GENERATE

Các bước AI đã thực hiện:
1. Đọc lại yêu cầu task của 23127152 trong docs/reports/week06/Group3.md.
2. Khảo sát mã nguồn thực tế tại src/sample-api/pact-workshop-js/provider/
   (server.js, middleware/auth.middleware.js, product/*.js) để xác định
   chính xác vị trí bug thứ tự middleware và cấu trúc hiện có.
3. Xác định 7 task theo nguyên tắc TDD: fix auth middleware order, mở rộng
   repository, mở rộng controller, wiring routes + test full-stack,
   evidence smoke-test, tài liệu endpoint, Docker Compose (stretch).
4. Viết plan chi tiết với code cụ thể cho từng bước, lưu tại
   docs/superpowers/plans/2026-07-15-week06-tuananh-provider-crud-auth.md.
5. Tự review lại plan theo checklist (spec coverage, placeholder scan,
   type consistency).
```

#### AI Output

```text
Đã tạo file docs/superpowers/plans/2026-07-15-week06-tuananh-provider-crud-auth.md
gồm 7 task:
1. Fix auth middleware ordering bug + refactor server.js thành createApp()/init()
2. Extend repository (create/update/remove)
3. Extend controller (create/update/remove handlers)
4. Wire routes + full-stack auth/CRUD tests
5. Auth smoke-test evidence
6. Endpoint documentation (API.md)
7. Docker Compose cho provider (stretch, đánh dấu tùy chọn theo report)

Mỗi task có đầy đủ code cụ thể, bước viết test trước khi implement, lệnh
chạy và kết quả kỳ vọng — không có placeholder.
```

#### Human Review

| Aspect           | Detail                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Tuấn Anh                                                           |
| Review date      | 2026-07-15                                                                |
| Corrections made | plan được duyệt gần như nguyên trạng, chỉ chỉnh sửa 1 ít về convention |
| Quality rating   | Excellent                                                                 |
| Issues found     | None                                                                      |

---

### Entry 2 — Thực thi kế hoạch (TDD Implementation & Execution)

| Field              | Value                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **AI Tool**        | Claude Sonnet 5                                                                          |
| **Date/Time**      | 2026-07-15 14:30:00 +07:00                                                               |
| **Task**           | Thực thi toàn bộ 7 task trong plan theo TDD: fix bug auth, bổ sung CRUD, viết test, viết tài liệu API, cấu hình Docker Compose |
| **Feature**        | Provider Auth Fix & CRUD Implementation (Product Service) — Week06, 23127152             |
| **Bloom-AI Level** | G9.2 (Apply) — Áp dụng plan có sẵn để viết code/test theo đúng đặc tả; có xử lý một trường hợp phát sinh ngoài kế hoạch (port conflict cục bộ) |

#### Prompt

**Prompt người dùng:**

```text
execute task theo cach 2
```

**Chi tiết thực thi:**

```text
Skill: superpowers:executing-plans
Mode: APPEND

Các bước AI đã thực hiện:
1. Tạo branch feature/week06-provider-auth-crud để cô lập thay đổi khỏi main.
2. Task 1: Viết test thất bại cho createApp(), xác nhận thất bại, sau đó sửa
   server.js để authMiddleware chạy trước routes; loại bỏ code wiring
   trùng lặp trong product.pact.test.js (dùng lại createApp()).
3. Task 2: Viết test cho repository (5 test), xác nhận thất bại, thêm
   create/update/remove vào product.repository.js, xác nhận test pass.
4. Task 3: Viết test cho controller (6 test), xác nhận thất bại, thêm
   create/update/remove handler vào product.controller.js, xác nhận test pass.
5. Task 4: Viết thêm test full-stack cho POST/PUT/DELETE vào server.test.js,
   xác nhận thất bại, wiring routes trong product.routes.js, xác nhận toàn
   bộ 9 test trong server.test.js pass.
6. Task 5: Chạy provider thật để lấy bằng chứng smoke-test; phát hiện port
   8080 bị một container Docker/Airflow khác trên máy chiếm dụng, chuyển
   sang port 8081 cho riêng phiên smoke-test (không đổi cấu hình mặc định
   trong code), thu thập transcript curl thật (9 lượt gọi) và ghi vào
   docs/reports/week06/evidences/TuanAnh/smoke-test-auth.md.
7. Task 6: Viết tài liệu endpoint đóng băng (method/path/auth/status/ví dụ)
   tại provider/API.md.
8. Task 7 (stretch, thực hiện theo xác nhận của người dùng): Thêm Dockerfile
   cho provider và service "provider" vào docker-compose.yaml; build image
   và chạy thử trong container riêng (cổng 8082) để xác nhận app hoạt động
   đúng bên trong Docker mà không ảnh hưởng dịch vụ khác đang chạy trên máy.
9. Sau mỗi task, chạy lại toàn bộ test suite
   (npx jest --testPathIgnorePatterns=pact.test.js) để xác nhận không có
   regression trước khi chuyển sang task kế tiếp.
```

#### AI Output

```text
Sửa: server.js, product.pact.test.js, product.repository.js,
     product.controller.js, product.routes.js, docker-compose.yaml

Tạo mới: server.test.js, product.repository.test.js,
         product.controller.test.js, API.md, Dockerfile,
         docs/reports/week06/evidences/TuanAnh/smoke-test-auth.md

Kết quả test: 20/20 pass
  - server.test.js: 9 test (auth + CRUD full-stack qua HTTP thật)
  - product.repository.test.js: 5 test
  - product.controller.test.js: 6 test

Docker: build thành công, container chạy đúng (auth middleware chặn
request không token ngay trong container), đã dọn dẹp image/container
sau khi xác nhận.
```

#### Human Review

| Aspect           | Detail                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Tuấn Anh                                                                                                           |
| Review date      | 2026-07-15                                                                                                                |
| Corrections made | Không cần sửa code — chỉ điều chỉnh 1 điểm ngoài kế hoạch: chạy smoke-test qua port 8081 thay vì 8080 do máy cục bộ đã có container Docker/Airflow khác chiếm port 8080 (không phải lỗi của code hay của AI) |
| Quality rating   | Excellent                                                                                                                 |
| Issues found     | None đáng kể — riêng ghi chú: port 8080 bị chiếm cục bộ bởi container Docker/Airflow khác trên máy, đã xử lý bằng port thay thế (8081) chỉ cho phiên smoke-test; cấu hình mặc định trong server.js vẫn giữ nguyên cổng 8080 theo đúng đặc tả |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                       | Value                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Total AI interactions        | 2                                                                                                                                       |
| AI tools used                 | Claude Sonnet 5                                                                                                                         |
| Features covered               | Auth Middleware Fix, CRUD Implementation (POST/PUT/DELETE), TDD Test Suite, Endpoint Documentation (API.md), Docker Compose            |
| Documents created / updated  | docs/superpowers/plans/2026-07-15-week06-tuananh-provider-crud-auth.md, server.js, product.pact.test.js, product.repository.js, product.controller.js, product.routes.js, server.test.js, product.repository.test.js, product.controller.test.js, API.md, Dockerfile, docker-compose.yaml, docs/reports/week06/evidences/TuanAnh/smoke-test-auth.md |
| Issues found by audit          | 0 (chỉ có 1 trở ngại môi trường ngoài phạm vi code: port 8080 bị chiếm cục bộ)                                                          |
| Issues resolved                | N/A — không có lỗi code cần sửa                                                                                                        |
| Tests written & passing        | 20/20                                                                                                                                   |
| Tasks completed                | 7/7 (bao gồm 1 task stretch — Docker Compose)                                                                                           |

### AI Contribution Breakdown

| Task                                                | AI Contribution | Human Contribution |
| ----------------------------------------------------- | ---------------- | -------------------- |
| Research & Codebase Analysis                        | 90%              | 10%                 |
| Implementation Plan Writing                          | 90%              | 10%                 |
| Code Writing (TDD)                                   | 95%              | 5%                  |
| Test Writing                                         | 95%              | 5%                  |
| Documentation (API.md, evidence)                     | 90%              | 10%                 |
| Docker Configuration                                 | 90%              | 10%                 |
| Review & Decision Making (branch/commit strategy, scope) | 20%           | 80%                 |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
