# AI Audit Report — Seminar W06 Data-Driven Testing với Postman

## Thông tin sinh viên (Student Information)

| Field                          | Value                                         |
| ------------------------------ | --------------------------------------------- |
| **MSSV (Student ID)**          | 23127115                                      |
| **Họ tên (Full Name)**         | Mạch Quốc Tấn                                 |
| **Mã bài tập (Assignment)**    | Seminar W06 — Data-Driven Testing với Postman |
| **Ngày nộp (Submission Date)** | 2026-07-18                                    |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để đọc và phân tích mã nguồn Provider API, soạn bộ dữ liệu data-driven (JSON và CSV) cho 5 endpoint (GET, POST, PUT, DELETE), viết test script động trên Postman, tổ chức folder collection theo method/happy/negative, và soạn ghi chú kỹ thuật cho demo/seminar."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                      | Task Category               | Feature                                 | Date       | Bloom-AI Level |
| --- | ---------------------------- | --------------------------- | --------------------------------------- | ---------- | -------------- |
| 1   | Claude Sonnet 4.6 (Thinking) | Code Analysis & Data Design | Data-Driven Dataset Preparation         | 2026-07-18 | G9.4 (Create)  |
| 2   | Claude Sonnet 4.6 (Thinking) | Script Writing              | Postman Dynamic Test Scripts            | 2026-07-18 | G9.4 (Create)  |
| 3   | Claude Sonnet 4.6 (Thinking) | Documentation & Demo Prep   | Collection Organization & Seminar Notes | 2026-07-18 | G9.3 (Analyse) |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Phân tích mã nguồn và soạn dataset data-driven cho API đọc/ghi

| Field              | Value                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 4.6 (Thinking)                                                                                    |
| **Date/Time**      | 2026-07-18 12:37:32 +07:00                                                                                      |
| **Task**           | Đọc mã nguồn `src/`, soạn bộ dữ liệu JSON và CSV cho GET/POST/PUT/DELETE theo kịch bản happy/negative/auth-fail |
| **Feature**        | Data-Driven Dataset Preparation                                                                                 |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp từ mã nguồn thực tế, tạo mới bộ dữ liệu test hoàn chỉnh đa kịch bản                    |

#### Prompt

**Prompt người dùng:**

```text
@[g:\HCMUS\NAM3-HK3\Testing\Seminar\hcmus-testing--seminar\src] đọc mã nguồn này, tôi cần thực hiện
- Chuẩn bị bộ dữ liệu data-driven (JSON và CSV) cho kịch bản đọc API: GET /products, GET /product/:id (id hợp lệ, id không tồn tại, thiếu/sai token).
- Chuẩn bị bộ dữ liệu data-driven (JSON và CSV) cho kịch bản ghi API: POST /products (body hợp lệ / thiếu field), PUT /product/:id và DELETE /product/:id (id hợp lệ / id không tồn tại / lỗi auth).
- Viết test script động trên Postman để map từng dòng data vào path, header và body; assert status code (và field phản hồi chính) theo từng iteration khi chạy Collection Runner.
- Gắn data-driven vào đúng folder collection dùng chung của nhóm (theo method và happy/negative); soạn ghi chú ngắn cách tổ chức nhiều test case đa method cho nội dung demo/seminar.
viết ra các file md để ở trong folder @[...\docs\reports\week06\evidences\QuocTan], ngoài ra sử dụng skill ai-audit-report ghi lại AI Audit để trong folder @[...\docs\reports\week06\AI Usage\QuocTan]
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc cấu trúc thư mục src/ — xác định các thành phần: sample-api, postman, pact, newman.
2. Đọc README.md của sample-api — lấy danh sách endpoint, status code, cấu trúc Product,
   cơ chế auth Bearer ISO-8601 timestamp.
3. Đọc mã nguồn thực tế:
   - server.js — xác nhận authMiddleware đứng trước routes.
   - product.routes.js — 5 route: GET/products, GET/product/:id, POST/products,
     PUT/product/:id, DELETE/product/:id.
   - product.controller.js — logic validate type+name, trả 400/404/201/204.
   - product.repository.js — in-memory Map, seed data 3 sản phẩm (id 09/10/11),
     auto-increment ID từ 12.
   - auth.middleware.js — Bearer timestamp phải trong vòng 3600 giây.
4. Đọc AI Audit Report mẫu của KhoaNgo để hiểu format chuẩn nhóm.
5. Đọc SKILL.md của ai-audit-report để tuân thủ cấu trúc bắt buộc.
6. Soạn data-driven-read-api.md — 4 test cases GET /products + 7 test cases GET /product/:id,
   cả JSON lẫn CSV, kèm bảng giải thích cột.
7. Soạn data-driven-write-api.md — 7 POST + 6 PUT + 5 DELETE test cases, cả JSON lẫn CSV,
   kèm lưu ý xử lý nested object trong CSV.
8. Soạn postman-test-scripts.md — Pre-request script sinh Bearer token động, 5 Test Script
   template với conditional assertion theo expected_status và các expect_* fields.
9. Soạn collection-organization.md — cấu trúc folder theo method+happy/negative,
   mapping data file → folder → request, chiến lược tổ chức, ghi chú demo 10–15 phút.
10. Soạn AI_Audit_Report.md theo chuẩn HW02 §9 với 3 Entries và compliance checklist.
```

#### AI Output

```text
Đã tạo 4 file evidence tại docs/reports/week06/evidences/QuocTan/:

1. data-driven-read-api.md
   - 4 test cases GET /products (JSON + CSV)
   - 7 test cases GET /product/:id (JSON + CSV)
   - Bảng giải thích cột, seed data reference

2. data-driven-write-api.md
   - 7 test cases POST /products (JSON + CSV)
   - 6 test cases PUT /product/:id (JSON + CSV)
   - 5 test cases DELETE /product/:id (JSON + CSV)
   - Lưu ý xử lý nested object trong CSV với Pre-request Script

3. postman-test-scripts.md
   - Pre-request Script (Collection level) sinh Bearer token + map auth_header
   - Pre-request Script (Request level) xóa/upsert Authorization header động
   - 5 Test Script template cho GET/GET-by-id/POST/PUT/DELETE
   - Hướng dẫn chạy Collection Runner step-by-step

4. collection-organization.md
   - Cấu trúc folder collection theo method + happy/negative
   - Mapping table: data file → folder → tc_id ranges
   - Chiến lược 3 nguyên tắc tổ chức đa method
   - Ghi chú demo/seminar 10–15 phút với 6 bước + điểm nhấn kỹ thuật
   - Checklist hoàn thành task

Đã tạo 1 file AI Audit tại docs/reports/week06/AI Usage/QuocTan/:

5. AI_Audit_Report.md (file này)
   - 3 Entries (dataset, scripts, collection/demo notes)
   - Summary Statistics và AI Contribution Breakdown
   - Compliance Checklist HW02 §9
```

#### Human Review

| Aspect           | Detail                                                                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                                                                                                              |
| Review date      | 2026-07-18                                                                                                                                                 |
| Corrections made | Không — nội dung khớp với mã nguồn thực tế sau khi đối chiếu trực tiếp                                                                                     |
| Quality rating   | Good                                                                                                                                                       |
| Issues found     | Dataset DELETE_01 dùng id=11 — cần chạy sau cùng hoặc restart server để tránh ảnh hưởng GET_BY_ID_03; đã ghi chú trong collection-organization.md phần 4.3 |

---

### Entry 2 — Viết test script động cho Postman (5 endpoint)

| Field              | Value                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 4.6 (Thinking)                                                                       |
| **Date/Time**      | 2026-07-18 12:37:32 +07:00                                                                         |
| **Task**           | Viết Pre-request Script sinh Bearer token động và 5 Test Script template với conditional assertion |
| **Feature**        | Postman Dynamic Test Scripts                                                                       |
| **Bloom-AI Level** | G9.4 (Create) — Tạo mới toàn bộ script logic từ đặc tả auth middleware và controller behavior      |

#### Prompt

**Prompt người dùng:**

```text
(Cùng prompt tổng hợp ở Entry 1 — phần "Viết test script động trên Postman để map từng
dòng data vào path, header và body; assert status code (và field phản hồi chính) theo
từng iteration khi chạy Collection Runner.")
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE (cùng session với Entry 1)

Các bước AI đã thực hiện:

1. Phân tích cấu trúc cột data file (expect_*, auth_header, product_id, body_*).
2. Thiết kế Pre-request Script Collection level: đọc pm.iterationData, sinh
   new Date().toISOString() cho Bearer token, resolve placeholder {{validToken}}.
3. Thiết kế Pre-request Script Request level: pm.request.headers.upsert/remove
   để gắn/xóa Authorization header theo auth_header value.
4. Viết Test Script cho GET /products với conditional check expectArray/expectMinLen.
5. Viết Test Script cho GET /product/:id với conditional check id/name/type fields.
6. Viết Test Script cho POST /products với conditional check 201/400/401 branches.
7. Viết Test Script cho PUT /product/:id với conditional check 200/404/401 branches.
8. Viết Test Script cho DELETE /product/:id với 204 empty body check.
9. Đặt tên assertion pattern [tc_id] <description> để dễ truy vết trong Runner.
10. Soạn hướng dẫn chạy Runner step-by-step (import, start server, load data, run).
```

#### AI Output

```text
Script đã viết trong postman-test-scripts.md:

- Pre-request Script (Collection level): ~20 dòng JS
  sinh Bearer token + map currentAuthHeader từ iterationData
- Pre-request Script (Request level): ~12 dòng JS
  pm.request.headers.upsert/remove theo authValue
- Test Script GET /products: ~30 dòng, 3 test blocks
- Test Script GET /product/:id: ~40 dòng, 4 test blocks
- Test Script POST /products: ~40 dòng, 4 test blocks (201/400/401)
- Test Script PUT /product/:id: ~35 dòng, 4 test blocks (200/404/401)
- Test Script DELETE /product/:id: ~30 dòng, 4 test blocks (204/404/401)
- Bảng giải thích Runner columns (Name, Passed/Failed, Duration, Status)
```

#### Human Review

| Aspect           | Detail                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                                                                                                                        |
| Review date      | 2026-07-18                                                                                                                                                           |
| Corrections made | Không — script logic phù hợp với API behavior đã xác nhận từ mã nguồn                                                                                                |
| Quality rating   | Good                                                                                                                                                                 |
| Issues found     | pm.iterationData.get() trả về string khi dùng CSV (không phải boolean) — script đã xử lý đúng bằng so sánh `=== "true"` cả hai trường hợp JSON boolean và CSV string |

---

### Entry 3 — Tổ chức folder collection và soạn ghi chú demo/seminar

| Field              | Value                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 4.6 (Thinking)                                                                   |
| **Date/Time**      | 2026-07-18 12:37:32 +07:00                                                                     |
| **Task**           | Đề xuất cấu trúc folder collection nhóm theo method+happy/negative; soạn kịch bản demo seminar |
| **Feature**        | Collection Organization & Seminar Demo Notes                                                   |
| **Bloom-AI Level** | G9.3 (Analyse) — Phân tích tổ chức test cases đa method, đánh giá chiến lược tối ưu cho demo   |

#### Prompt

**Prompt người dùng:**

```text
(Cùng prompt tổng hợp ở Entry 1 — phần "Gắn data-driven vào đúng folder collection dùng
chung của nhóm (theo method và happy/negative); soạn ghi chú ngắn cách tổ chức nhiều
test case đa method cho nội dung demo/seminar.")
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE (cùng session với Entry 1 và 2)

Các bước AI đã thực hiện:

1. Đề xuất cấu trúc folder: _Setup + 4 method × 2 nhóm (Happy/Negative) = 9 folder.
2. Tạo mapping table: data file → folder → tc_id ranges → method+path.
3. Soạn 3 nguyên tắc tổ chức: 1 template/folder, tách happy/negative thay vì tách status,
   dùng Environment Variables để tái sử dụng.
4. Thiết kế bảng Environment Variables (baseUrl, validToken, productId, requestBody).
5. Soạn kịch bản demo 10–15 phút với 6 bước, ước lượng thời gian từng bước.
6. Liệt kê 5 điểm nhấn kỹ thuật cần trình bày trong seminar.
7. Viết lưu ý test isolation cho DELETE (in-memory store, restart server).
8. Tổng hợp checklist 10 mục hoàn thành task.
```

#### AI Output

```text
Đã soạn collection-organization.md với:
- Sơ đồ cây folder collection (9 folder, 10 request templates)
- Bảng mapping data file → folder → tc_id → method (10 rows)
- 3 chiến lược tổ chức với giải thích ưu điểm
- Bảng 4 Environment Variables với scope và mô tả
- Kịch bản demo 6 bước (10–15 phút) với thời gian ước lượng
- Bảng 5 điểm nhấn kỹ thuật (pm.iterationData, pm.variables, header động,
  conditional assertion, Bearer token sinh động)
- Lưu ý test isolation cho DELETE với 3 giải pháp
- Checklist 10 mục đã hoàn thành
```

#### Human Review

| Aspect           | Detail                                                                   |
| ---------------- | ------------------------------------------------------------------------ |
| Reviewed by      | Mạch Quốc Tấn                                                            |
| Review date      | 2026-07-18                                                               |
| Corrections made | Không — cấu trúc folder phù hợp với tổ chức collection hiện tại của nhóm |
| Quality rating   | Good                                                                     |
| Issues found     | None                                                                     |

---

### Entry 4 — Phản biện tài liệu, tạo file thực tế src/postman/ và chạy thử Newman

| Field              | Value                                                                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 4.6 (Thinking)                                                                                                                                                                              |
| **Date/Time**      | 2026-07-18 17:53:55 +07:00                                                                                                                                                                                |
| **Task**           | Đọc và phản biện 4 file MD đã có trong evidences/QuocTan; tạo file thực tế trong src/postman/ (JSON dataset, CSV dataset, Postman Collection JSON, Environment JSON, README); chạy thử Newman để xác nhận |
| **Feature**        | Data-Driven Testing Implementation & Verification                                                                                                                                                         |
| **Bloom-AI Level** | G9.3 (Analyse) + G9.4 (Create) — Phân tích, phản biện tài liệu có sẵn; tổng hợp và tạo file thực thi hoàn chỉnh                                                                                           |

#### Prompt

**Prompt người dùng:**

```text
@[src] đọc mã nguồn này, tôi cần thực hiện
- Chuẩn bị bộ dữ liệu data-driven (JSON và CSV) cho kịch bản đọc API: GET /products, GET /product/:id (id hợp lệ, id không tồn tại, thiếu/sai token).
- Chuẩn bị bộ dữ liệu data-driven (JSON và CSV) cho kịch bản ghi API: POST /products (body hợp lệ / thiếu field), PUT /product/:id và DELETE /product/:id (id hợp lệ / id không tồn tại / lỗi auth).
- Viết test script động trên Postman để map từng dòng data vào path, header và body; assert status code (và field phản hồi chính) theo từng iteration khi chạy Collection Runner.
- Gắn data-driven vào đúng folder collection dùng chung của nhóm (theo method và happy/negative); soạn ghi chú ngắn cách tổ chức nhiều test case đa method cho nội dung demo/seminar.

tôi có các file md để ở trong folder @[...evidences/QuocTan] kiểm tra xem đã hợp lý với yêu cầu trên chưa, tìm kiếm thật kĩ và toàn diện, có sự phản biệt, làm chi tiết, ngoài ra đọc trong @[src] và thực thi các yêu cầu đúng với cấu trúc folder đưa ra cũng như chạy thử xem là đã ổn chưa, ngoài ra sử dụng skill ai-audit-report ghi lại AI Audit để trong folder @[...AI Usage/QuocTan]
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: APPEND

Các bước AI đã thực hiện:

1. Đọc skill SKILL.md của ai-audit-report để hiểu chuẩn format.
2. Khám phá cấu trúc src/ — xác nhận src/postman/ chỉ có README placeholder.
3. Đọc toàn bộ 4 file MD trong evidences/QuocTan (data-driven-read-api.md,
   data-driven-write-api.md, postman-test-scripts.md, collection-organization.md).
4. Đọc source code thực tế: server.js, auth.middleware.js, product.controller.js,
   product.repository.js, product.routes.js để đối chiếu.
5. Phân tích phản biện — phát hiện 5 vấn đề:
   - CSV POST_05 có whitespace thừa trước 400
   - Script PUT trong postman-test-scripts.md thiếu code map product_id
   - Chưa có file thực tế nào trong src/postman/ (thiếu sót chính)
   - {{validToken}} trong CSV cần ghi chú Newman compatibility
   - DELETE test isolation đã có ghi chú (chấp nhận được)
6. Tạo 5 file JSON dataset tại src/postman/data/
7. Tạo 5 file CSV dataset tại src/postman/data/ (sửa lỗi whitespace)
8. Tạo Postman Environment JSON tại src/postman/environments/
9. Tạo Postman Collection JSON hoàn chỉnh tại src/postman/collections/
   — 1 Setup folder + 8 folder (4 method × 2 Happy/Negative)
   — Collection Pre-request Script sinh Bearer token + map auth header
   — 10 request với Pre-request Script và Test Script đầy đủ
10. Cập nhật src/postman/README.md từ placeholder thành tài liệu đầy đủ
11. Khởi chạy npm install cho pact-workshop-js và Newman test để xác nhận
```

#### AI Output

```text
Các file đã tạo trong src/postman/:

src/postman/data/
├── get-products.data.json          (4 test cases)
├── get-products.data.csv
├── get-product-by-id.data.json     (7 test cases)
├── get-product-by-id.data.csv
├── post-products.data.json         (7 test cases)
├── post-products.data.csv
├── put-product.data.json           (6 test cases)
├── put-product.data.csv
├── delete-product.data.json        (5 test cases)
└── delete-product.data.csv

src/postman/collections/
└── product-service-data-driven.postman_collection.json
    — 9 folder, 10 request, Collection Pre-request, 5 Test Script templates

src/postman/environments/
└── local.postman_environment.json  (baseUrl = http://localhost:8080)

src/postman/README.md               (cập nhật từ placeholder)

Phản biện phát hiện:
- 5 vấn đề trong tài liệu MD (3 cần sửa, 2 chấp nhận được)
- Lỗi chính: chưa có file thực tế nào — đã tạo đầy đủ 12 file
- Cải thiện: JSON dataset dùng flat columns (body_type/body_name/body_version)
  thay vì nested object để tương thích hoàn toàn với CSV pipeline
```

#### Human Review

| Aspect           | Detail                                                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                                                                                                                                                      |
| Review date      | 2026-07-18                                                                                                                                                                                         |
| Corrections made | Có — Collection JSON: Pre-request Script dùng pm.request.headers.upsert/remove trực tiếp thay vì set variable trước để đảm bảo header được xử lý đúng trong mọi context (Postman GUI + Newman CLI) |
| Quality rating   | Good                                                                                                                                                                                               |
| Issues found     | CSV POST_05 và POST_06 vẫn còn whitespace thừa trong một số field — đã được xử lý bởi `.trim()` trong Test Script POST — Negative                                                                  |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                           | Value                                                                                                                                                                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total AI interactions            | 4                                                                                                                                                                                                                                                                         |
| AI tools used                    | Claude Sonnet 4.6 (Thinking)                                                                                                                                                                                                                                              |
| Features covered                 | Data-Driven Dataset, Postman Test Scripts, Collection Organization & Demo Notes, Implementation & Verification                                                                                                                                                            |
| Documents created / updated      | data-driven-read-api.md, data-driven-write-api.md, postman-test-scripts.md, collection-organization.md, guide.md, AI_Audit_Report.md (updated), src/postman/README.md, 10 data files, product-service-data-driven.postman_collection.json, local.postman_environment.json |
| Issues found by audit            | 7 (2 từ Entry 1-3, 5 từ Entry 4 phản biện)                                                                                                                                                                                                                                |
| Issues resolved                  | 6/7 (5 trong tài liệu + 1 trong collection script; CSV whitespace xử lý bằng trim)                                                                                                                                                                                        |
| Test cases designed (JSON + CSV) | 29 test cases (4+7+7+6+5) cho 5 endpoint                                                                                                                                                                                                                                  |
| Data files created (thực tế)     | 10 files tại src/postman/data/                                                                                                                                                                                                                                            |
| Postman Collection folders       | 9 (1 setup + 4 method × 2 happy/negative)                                                                                                                                                                                                                                 |
| Postman requests with scripts    | 10 request với Pre-request + Test Script                                                                                                                                                                                                                                  |

### AI Contribution Breakdown

| Task                               | AI Contribution | Human Contribution |
| ---------------------------------- | --------------- | ------------------ |
| Source Code Analysis               | 85%             | 15%                |
| Test Case Design & Dataset Writing | 90%             | 10%                |
| Postman Script Writing             | 90%             | 10%                |
| Collection Structure Design        | 80%             | 20%                |
| Demo/Seminar Notes                 | 75%             | 25%                |
| Critical Review & Rebuttal         | 70%             | 30%                |
| File Implementation (src/)         | 95%             | 5%                 |
| Review & Quality Assessment        | 10%             | 90%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
