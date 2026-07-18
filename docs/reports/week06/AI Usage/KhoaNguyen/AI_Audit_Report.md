# AI Audit Report - Chuẩn hóa Postman Collection & REST Client cho Product Service

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                            |
| ------------------------------ | ---------------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127211                                                         |
| **Họ tên (Full Name)**         | Nguyễn Lê Hồ Anh Khoa                                            |
| **Mã bài tập (Assignment)**    | Seminar W06 - Chuẩn hóa Postman Collection, Test Scripts & .http |
| **Ngày nộp (Submission Date)** | 2026-07-16                                                       |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: đọc và phân tích mã nguồn provider của Product Service để rút ra hợp đồng API thực tế; sinh Postman Collection chuẩn hóa theo folder HTTP Method và nhóm kịch bản (Happy Path / Negative / Auth Fail); viết Pre-request script sinh Bearer token động và cấu hình auth kế thừa cấp Collection; viết Test scripts assert status code và field response cho bốn method CRUD; soạn file `.http` cho VS Code REST Client; và tự phản biện độc lập lại chính output đã sinh."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                       | Task Category                     | Feature                                  | Date       | Bloom-AI Level |
| --- | ----------------------------- | --------------------------------- | ---------------------------------------- | ---------- | -------------- |
| 1   | Claude Opus 4.8 (Claude Code) | Code generation & source analysis | Postman Collection + Environment + .http | 2026-07-16 | G9.4 (Create)  |
| 2   | Claude Opus 4.8 (Claude Code) | Critique & verification           | Independent review bộ test đã sinh       | 2026-07-16 | G9.3 (Analyse) |

---

## Chi tiết từng lần sử dụng AI

### Entry 1 - Sinh Postman Collection chuẩn hóa, Test Scripts và file .http

| Field              | Value                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AI Tool**        | Claude Opus 4.8 (Claude Code, VS Code extension)                                                                                                             |
| **Date/Time**      | 2026-07-16 09:30:00 +07:00                                                                                                                                   |
| **Task**           | Tái cấu trúc Collection theo folder HTTP Method và nhóm kịch bản; hoàn thiện Pre-request script sinh Bearer token; viết Test scripts CRUD; soạn file `.http` |
| **Feature**        | API Testing - Product Service (`src/sample-api/pact-workshop-js/provider`)                                                                                   |
| **Bloom-AI Level** | G9.4 (Create) - tổng hợp hợp đồng API từ mã nguồn rồi tạo mới bộ test hoàn chỉnh                                                                             |

#### Prompt

**Prompt người dùng:**

```text
Chào bạn, tiếp nối công việc của đồ án Kiểm thử phần mềm (tuần W05) cho API tại thư mục
`src/sample-api/pact-workshop-js`, tôi cần bạn giúp mở rộng và chuẩn hóa bộ kịch bản kiểm thử
API cho hệ thống Product Service.

**[NGỮ CẢNH CÁC TASK ĐÃ HOÀN THÀNH]**
- Chúng ta đã xây dựng xong bản nháp Postman Collection và Environment ban đầu cho các endpoint
  `GET /products` và `GET /product/:id`.
- Đã thiết lập thành công Pre-request script sinh Bearer Token động (dưới dạng ISO 8601 timestamp).
- Đã phát hiện và ghi nhận một lỗi thực tế trong mã nguồn: file `server.js` của Provider đang đăng ký
  `app.use(routes)` TRƯỚC `app.use(authMiddleware)`. Hậu quả là API hiện tại trả về 200 ngay cả khi
  thiếu hoặc sai token thay vì 401. (Lưu ý điểm này khi viết các test case liên quan đến Auth).

**[YÊU CẦU CÔNG VIỆC MỚI]**
Dựa trên mã nguồn hiện tại, hãy thực hiện các task sau:

1. **Chuẩn hóa kiến trúc Postman Collection:**
   - Tái cấu trúc Collection bằng cách nhóm các request vào các folder theo **HTTP Method**
     (`GET`, `POST`, `PUT`, `DELETE`).
   - Bên trong mỗi folder Method, tiếp tục chia theo nhóm kịch bản: `Happy Path` (Thành công),
     `Negative` (Lỗi nghiệp vụ/Dữ liệu), và `Auth Fail` (Kịch bản 401).
   - Đảm bảo thống nhất Environment Variables cho môi trường local.

2. **Cập nhật Pre-request Scripts & API Chaining:**
   - Hoàn thiện đoạn script sinh Bearer token hợp lệ, lưu trực tiếp vào Environment variable.
   - Cấu hình tự động gắn biến token này vào Header `Authorization` ở cấp độ cha (Collection hoặc
     Folder) để mọi request (cả đọc và ghi) đều được kế thừa mà không phải set tay từng request.

3. **Viết Test Scripts toàn diện (CRUD):**
   - Viết các đoạn test script (assert) để kiểm tra HTTP Status code và các trường (field) cốt lõi
     trong response body cho kịch bản Happy Path của cả 4 method.
   - Ví dụ: Kiểm tra bắt buộc phải có `id`, `name`, `type` trả về, hoặc một chuỗi xác nhận đối với
     tác vụ `DELETE` tùy theo cấu trúc dữ liệu thực tế của API.

4. **Xây dựng file kịch bản `.http` (VS Code REST Client):**
   - Soạn một file `.http` để có thể chạy test nhanh gọn ngay trong IDE.
   - Khai báo các biến cục bộ ở đầu file (ví dụ: `@baseUrl`, `@token`).
   - Viết các block request bao phủ đủ 4 method, mỗi method phải chứa tối thiểu các kịch bản:
     Thành công, `401 Unauthorized`, `404 Not Found` (kèm theo `400 Bad Request` cho `POST`/`PUT`
     nếu API có validate).

Hãy xuất cấu hình Postman JSON đã chuẩn hóa và nội dung file `.http` ra cho tôi. Vui lòng gửi lại
bản nháp đầu tiên để tôi tiến hành review trước khi chốt lại bản cuối cùng.

Sau đó hãy sử dụng @.agents/skills/ai-audit-report/SKILL.md để audit lại toàn bộ input/output prompt nhé
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc mã nguồn provider để rút ra hợp đồng API thực tế thay vì tin vào mô tả trong prompt:
   server.js, middleware/auth.middleware.js, product/product.routes.js,
   product/product.controller.js, product/product.repository.js, product/product.js
2. Đối chiếu ngữ cảnh trong prompt với mã nguồn, phát hiện 3 điểm không khớp (xem Issues found).
3. Truy vết lịch sử git (`git show ec080de`) để xác nhận lỗi thứ tự middleware đã được sửa.
4. Sinh 3 file artifact:
   - src/postman/collections/product-service.postman_collection.json
   - src/postman/environments/local.postman_environment.json
   - src/rest-client/product-service.http
5. Cài dependency provider, khởi chạy server thật tại localhost:8080.
6. Chạy script Node kiểm chứng 20 kịch bản request/response đối chiếu với giả định đã viết.
7. Chạy Newman trên Collection vừa sinh để xác nhận toàn bộ assertion pass.
```

#### AI Output

```text
Tạo 3 file:

1. src/postman/collections/product-service.postman_collection.json
   - Cấu trúc: 4 folder theo HTTP Method (GET / POST / PUT / DELETE), mỗi folder chia 3 subfolder
     Happy Path / Negative / Auth Fail. Tổng 16 request.
   - Auth kiểu bearer `{{authToken}}` đặt ở cấp Collection; nhóm Auth Fail ghi đè bằng
     `"auth": {"type": "noauth"}` hoặc token hết hạn.
   - Pre-request script cấp Collection sinh authToken = ISO timestamp trừ lùi 5 giây,
     và expiredToken = 2 giờ trước.
   - API Chaining: POST lưu `createdProductId` -> PUT và DELETE Happy Path dùng lại id đó.

2. src/postman/environments/local.postman_environment.json
   - Biến: baseUrl (http://localhost:8080), authToken, expiredToken, seedProductId (09),
     missingProductId (99999), createdProductId.

3. src/rest-client/product-service.http
   - 21 block phủ 4 method, khai báo biến @baseUrl / @token / @expiredToken ở đầu file,
     dùng {{$datetime iso8601 -1 m}} sinh token, chaining qua `# @name createProduct`.

Kết quả kiểm chứng: Newman 16 requests / 36 assertions / 0 failed (trước khi sửa lỗi ở Entry 2).
```

#### Human Review

| Aspect           | Detail                                                                            |
| ---------------- | --------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Lê Hồ Anh Khoa                                                             |
| Review date      | 2026-07-16                                                                        |
| Corrections made | Có - xem Entry 2. AI tự phát hiện và sửa 2 lỗi trong output của chính nó.         |
| Quality rating   | Good. Không đạt Excellent vì assertion `version` có lỗi logic phải sửa ở Entry 2. |
| Issues found     | Xem mục "Vấn đề đã phát hiện" bên dưới - tổng 9 vấn đề, chia 4 nhóm.              |

---

### Entry 2 - Review độc lập bộ test do AI sinh

| Field              | Value                                                                               |
| ------------------ | ----------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Opus 4.8 (Claude Code, VS Code extension)                                    |
| **Date/Time**      | 2026-07-16 09:36:00 +07:00                                                          |
| **Task**           | Phản biện độc lập lại Collection và file `.http` đã sinh ở Entry 1, tìm lỗi tiềm ẩn |
| **Feature**        | API Testing - Product Service                                                       |
| **Bloom-AI Level** | G9.3 (Analyse) - phản biện, thiết kế thí nghiệm kiểm chứng, đánh giá rủi ro         |

#### Prompt

**Prompt người dùng:**

```text
Bạn review độc lập, phản biện lại outcome AI vừa sinh ra xem có issue gì không nhé
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE (gộp Entry 2 vào file mới cùng Entry 1)

Các bước AI đã thực hiện:

1. Rà soát lại 3 file artifact tự sinh, liệt kê các giả định chưa được kiểm chứng.
2. Viết script kiểm chứng 4 nghi vấn:
   - POST không gửi `version` thì product trả về có thiếu hẳn field `version` không?
   - PUT chỉ gửi `version` có ghi đè mất type/name không?
   - Token ISO thiếu timezone có pass không?
   - Header Authorization rỗng có bị chặn không?
3. Viết script thứ hai kiểm chứng 4 biến thể định dạng timestamp (Z / +07:00 / không timezone / hết hạn)
   để xác nhận file .http dùng {{$datetime iso8601}} có an toàn không.
4. Chạy cả hai script trên server thật, ghi nhận kết quả.
5. Sửa 2 lỗi tìm được, chạy lại Newman xác nhận.
```

#### AI Output

```text
Phát hiện 2 lỗi thật trong output của Entry 1 và đã sửa:

1. Assertion "Mọi product có đủ id, type, name, version" trong GET /products là SAI logic.
   Kiểm chứng: POST /products {"type":"CREDIT_CARD","name":"No Version Product"} -> 201, và
   response KHÔNG có field `version` (hasOwnProperty = false). GET /products sau đó trả 4 product
   trong đó 1 product thiếu `version` -> assertion FAIL.
   Đã sửa: tách thành 2 assertion - id/type/name bắt buộc cho mọi product; `version` chỉ assert
   trên product seed 09/10/11.

2. `_postman_id` và `id` của environment không đúng định dạng UUID (8-4-4-4-12 hex).
   Đã sửa thành UUID hợp lệ.

Xác nhận file .http an toàn: {{$datetime iso8601}} của REST Client sinh dạng có offset
(2026-07-16T09:36:25+07:00) -> middleware chấp nhận, trả 200.

Kết quả sau khi sửa: Newman 16 requests / 37 assertions / 0 failed.
```

#### Human Review

| Aspect           | Detail                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Lê Hồ Anh Khoa                                                                                         |
| Review date      | 2026-07-16                                                                                                    |
| Corrections made | Có - sửa assertion `version` và 2 UUID không hợp lệ; chạy lại Newman xác nhận 37/37 pass.                     |
| Quality rating   | Good. Việc AI tự tìm ra lỗi logic trong chính output của mình bằng thí nghiệm trên server thật là có giá trị. |
| Issues found     | 2 lỗi trong output AI (đã sửa) + 3 vấn đề thiết kế còn để mở - xem mục bên dưới.                              |

---

## Vấn đề đã phát hiện (Issues Found)

### Nhóm A - Ngữ cảnh trong prompt của người dùng KHÔNG khớp mã nguồn

Đây là nhóm nghiêm trọng nhất: nếu AI tin theo prompt mà không kiểm chứng, toàn bộ nhóm test Auth Fail sẽ sai.

| #   | Vấn đề                                                                                                                                                                                                                         | Bằng chứng                                                                                                                                                                                                     |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Prompt khẳng định `server.js` đăng ký `app.use(routes)` TRƯỚC `app.use(authMiddleware)`, khiến API trả 200 dù thiếu token. Thực tế lỗi này ĐÃ ĐƯỢC SỬA. Nếu viết test theo prompt sẽ assert 200 cho Auth Fail - sai hoàn toàn. | `server.js:11-12` hiện là `authMiddleware` rồi mới `routes`. `git show ec080de` (PR #4 `feature/week06-provider-auth-crud`) cho thấy commit đã đảo đúng thứ tự. Chạy thật: `GET /products` không token -> 401. |
| A2  | Prompt/tài liệu cũ giả định port 3000.                                                                                                                                                                                         | `server.js:5` - `const port = 8080`.                                                                                                                                                                           |
| A3  | Prompt nói "đã xây dựng xong bản nháp Postman Collection và Environment ban đầu". Thực tế `src/postman/` chỉ có `README.md`, không có file nào.                                                                                | `Get-ChildItem src/postman -Recurse` trước khi làm.                                                                                                                                                            |

### Nhóm B - Yêu cầu trong đề bài không khả thi với API hiện tại

| #   | Vấn đề                                                                                                                             | Bằng chứng                                                                                                                                                                             |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | Đề bài yêu cầu case `400 Bad Request` cho `PUT`. Không viết được: controller PUT không validate body, dùng `??` để giữ giá trị cũ. | `product.controller.js:22-26`. Chạy thật: `PUT /product/09` với body `{}` -> **200**, không phải 400.                                                                                  |
| B2  | Đề bài giả định `DELETE` trả "một chuỗi xác nhận". Thực tế trả `204 No Content` với body rỗng hoàn toàn.                           | `product.controller.js:30` - `res.status(204).send()`. Chạy thật: `204`, `len=0`. Đã thay bằng assert `pm.response.text() === ''` và thêm request `GET -> 404` để chứng minh xóa thật. |
| B3  | Đề bài chỉ nhắc `id`, `name`, `type`. Product thực tế có 4 field, thêm `version`.                                                  | `product.js` - constructor `(id, type, name, version)`.                                                                                                                                |

### Nhóm C - Lỗi trong chính output của AI (đã sửa ở Entry 2)

| #   | Vấn đề                                                                                                                                       | Trạng thái |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| C1  | Assertion "mọi product có `version`" sẽ FAIL nếu tồn tại product tạo mà không kèm `version`. Đã kiểm chứng bằng thí nghiệm trên server thật. | Đã sửa     |
| C2  | `_postman_id` và environment `id` không đúng định dạng UUID.                                                                                 | Đã sửa     |

### Nhóm D - Phát hiện về chất lượng API (đề xuất báo cho nhóm)

| #   | Phát hiện                                                                                                                                                                                                         | Vì sao đáng quan tâm                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | `POST /products` không bắt buộc `version`, nên product tạo ra có thể **thiếu hẳn** field `version` trong JSON (vì `JSON.stringify` bỏ qua `undefined`). Hợp đồng response do đó không nhất quán giữa các product. | Đây là **contract smell** liên quan trực tiếp tới phần Pact của seminar: consumer kỳ vọng `version` luôn tồn tại sẽ vỡ. Nên hoặc đặt default `version`, hoặc khai báo rõ là optional trong contract. |
| D2  | Token ISO 8601 **thiếu timezone** (vd `2026-07-16T02:36:27.059`) bị `new Date()` hiểu là giờ local, lệch 7 tiếng so với UTC -> luôn 401.                                                                          | Bẫy dễ mắc khi người khác tự viết test. Đã ghi chú trong file `.http` và Collection.                                                                                                                 |
| D3  | `authMiddleware` áp cho **mọi** route, không có endpoint public nào (kể cả health check). `README.md` của `src/sample-api` vẫn mô tả `GET /health`, `POST /auth/login`, `GET /profile` - đều không tồn tại.       | Ảnh hưởng CI/CD: không có readiness probe không cần auth. Ngoài ra `src/sample-api/README.md` và `src/postman/README.md` đã lỗi thời, cần cập nhật.                                                  |

### Nhóm E - Rủi ro thiết kế còn để mở (cần người review quyết định)

| #   | Vấn đề                                                                                                                                                              | Đề xuất                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| E1  | API Chaining khiến PUT/DELETE Happy Path phụ thuộc `createdProductId` do POST set. Chạy riêng lẻ một folder sẽ dùng id cũ -> 404 -> fail.                           | Chấp nhận và ghi chú rõ "phải chạy full Collection theo thứ tự", hoặc thêm pre-request tự tạo product nếu biến rỗng. |
| E2  | Request `GET /product/:id - xác nhận đã xóa -> 404` được đặt trong folder `DELETE / Happy Path`, lệch nguyên tắc "gom folder theo HTTP Method" mà đề bài yêu cầu.   | Trade-off giữa tính liền mạch kịch bản và tính thuần nhất cấu trúc. Cần người review chốt.                           |
| E3  | `authToken` và `expiredToken` khai báo `type: "secret"` nên bị Postman che giá trị, gây khó khi demo trước lớp (mà token chỉ là timestamp, không phải bí mật thật). | Cân nhắc đổi sang `type: "default"` cho mục đích seminar.                                                            |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                                | Value                                                                                                                                                                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total AI interactions                 | 2                                                                                                                                                                                                                                  |
| AI tools used                         | Claude Opus 4.8 (Claude Code, VS Code extension)                                                                                                                                                                                   |
| Features covered                      | API Testing - Postman Collection, Environment Variables, Pre-request/Test Scripts, API Chaining, VS Code REST Client                                                                                                               |
| Documents created / updated           | `src/postman/collections/product-service.postman_collection.json`, `src/postman/environments/local.postman_environment.json`, `src/rest-client/product-service.http`, `docs/reports/week06/AI Usage/KhoaNguyen/AI_Audit_Report.md` |
| Issues found by audit                 | 9 (A: 3 ngữ cảnh sai, B: 3 yêu cầu bất khả thi, C: 2 lỗi output AI, D: 3 phát hiện về API, E: 3 rủi ro để mở)                                                                                                                      |
| Issues resolved                       | 2/2 lỗi trong output AI (nhóm C) đã sửa. Nhóm A/B đã ghi nhận và điều chỉnh test theo thực tế. Nhóm D/E còn mở, chờ nhóm quyết định.                                                                                               |
| Postman requests created              | 16                                                                                                                                                                                                                                 |
| Postman assertions                    | 37 (Newman: 37/37 pass, 0 failed)                                                                                                                                                                                                  |
| REST Client blocks created            | 21                                                                                                                                                                                                                                 |
| API scenarios verified on live server | 20 (script kiểm chứng độc lập) + 4 (biến thể định dạng token)                                                                                                                                                                      |

### AI Contribution Breakdown

| Task                                    | AI Contribution | Human Contribution |
| --------------------------------------- | --------------- | ------------------ |
| Source code analysis (rút hợp đồng API) | 90%             | 10%                |
| Postman Collection structuring          | 85%             | 15%                |
| Test script writing                     | 90%             | 10%                |
| REST Client `.http` writing             | 90%             | 10%                |
| Verification & debugging                | 80%             | 20%                |
| Issue identification & critique         | 75%             | 25%                |
| Yêu cầu & định hướng task               | 0%              | 100%               |
| Final decision & sign-off               | 0%              | 100%               |

---

## Compliance Checklist

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Human Review
- [x] Định dạng Markdown chuẩn

---
