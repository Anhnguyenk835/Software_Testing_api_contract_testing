# AI Audit Report — Xây dựng mã nguồn ban đầu API mẫu (Consumer App & Provider Service)

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127152                                                                                                  |
| **Họ tên (Full Name)**         | Nguyễn Tuấn Anh                                                                                           |
| **Mã bài tập (Assignment)**    | Seminar W05 — Mã nguồn ban đầu API mẫu (Consumer App & Provider Service) + README hướng dẫn cài đặt      |
| **Ngày nộp (Submission Date)** | 2026-07-09                                                                                                |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: research kho mã nguồn công khai trên GitHub để chọn nguồn fork phù hợp, hỗ trợ thiết kế cấu trúc source code (Consumer App + Provider Service), và soạn thảo + kiểm thử thực tế file README hướng dẫn cài đặt/khởi chạy dự án API mẫu."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                            | Task Category      | Feature                                    | Date       | Bloom-AI Level  |
| --- | ----------------------------------- | ------------------- | ------------------------------------------- | ---------- | --------------- |
| 1   | Claude Sonnet 5 (Claude Code CLI)   | Research            | Chọn nguồn fork cho API mẫu                 | 2026-07-09 | G9.3 (Analyse)  |
| 2   | Claude Sonnet 5 (Claude Code CLI)   | Design / Planning    | Cấu trúc Consumer App & Provider Service    | 2026-07-09 | G9.4 (Create)   |
| 3   | Claude Sonnet 5 (Claude Code CLI)   | Documentation & Test | README hướng dẫn cài đặt/khởi chạy          | 2026-07-09 | G9.2 (Apply)    |

---

## Chi tiết từng lần sử dụng AI (Entries)

### Entry 1 — Research GitHub tìm repo đơn giản để fork làm Consumer App + Provider Service

| Field              | Value                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 5 (Claude Code CLI)                                                                      |
| **Date/Time**      | 2026-07-09 14:05:00 +07:00                                                                              |
| **Task**           | Tìm và đánh giá các mã nguồn public trên GitHub đủ đơn giản để fork làm nền cho API mẫu gồm 2 dịch vụ  |
| **Feature**        | Sample API — lựa chọn nguồn fork (`src/sample-api/`)                                                   |
| **Bloom-AI Level** | G9.3 (Analyse) — So sánh nhiều repo theo tiêu chí độ đơn giản, cấu trúc, mức độ khớp với đề bài         |

#### Prompt

**Prompt người dùng:**

```text
đọc yêu cầu của 23127152 – Nguyễn Tuấn Anh trong phân công week5[docs/reports/week05/Group3.md], Xây dựng mã nguồn ban đầu cho ứng dụng API mẫu gồm 2 dịch vụ: Consumer App (Frontend/Gateway đơn giản gọi API) và Provider Service (Backend API dịch vụ người dùng) sử dụng Node.js/Express. Sử dụng tool research extensively để tìm xem có mã nguồn nào public trên github mà đơn giản để có thể fork về và làm source codebase cho dự án testing này không ? lưu ý source code chỉ cần đơn giản
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Đọc file phân công docs/reports/week05/Group3.md để xác nhận đúng nội dung task.
2. Dùng WebSearch tra cứu nhiều truy vấn: "pact-foundation pact-workshop-js consumer provider github",
   "simple express microservices consumer provider example boilerplate", "pactflow example-consumer
   example-provider javascript github", "express gateway user service simple REST API demo".
3. Dùng WebFetch đọc chi tiết README/cấu trúc của các repo ứng viên: pact-foundation/pact-workshop-js,
   lirantal/pact-workshop-consumer-nodejs, DiUS/pact-workshop-js-v1 (đã archived), HarinduA/MicroServices_1.0.
4. Tổng hợp so sánh ưu/nhược điểm (độ đơn giản, khớp thuật ngữ Consumer/Provider của Pact, tech stack)
   và trình bày cho người dùng chọn qua AskUserQuestion.
```

#### AI Output

```text
Trình bày 3 lựa chọn kèm phân tích trade-off:
1. pact-foundation/pact-workshop-js (branch step1/step2) — chính chủ Pact Foundation, tách sẵn
   consumer/provider, khớp thuật ngữ Pact cho công việc contract testing tuần sau.
2. HarinduA/MicroServices_1.0 — 4 file, cực tối giản, có sẵn "user-service.js".
3. lirantal/pact-workshop-consumer-nodejs — Node/Express thuần nhưng nhiều lớp controller/repository hơn.
Người dùng chọn phương án 1 (pact-workshop-js) làm nguồn fork.
```

#### Human Review

| Aspect           | Detail                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Reviewed by      | Nguyễn Tuấn Anh                                                                                            |
| Review date      | 2026-07-09                                                                                                 |
| Corrections made | Không — kết quả research được chấp nhận, chọn thẳng phương án AI đề xuất (pact-workshop-js).                |
| Quality rating   | Good                                                                                                        |
| Issues found     | None                                                                                                        |

---

### Entry 2 — Liệt kê chính xác các bước cần thực hiện (Thiết kế cấu trúc source code (Consumer App / Provider Service) và điều chỉnh theo phản hồi)

| Field              | Value                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 5 (Claude Code CLI)                                                                      |
| **Date/Time**      | 2026-07-09 15:00:00 +07:00                                                                              |
| **Task**           | Brainstorm & chốt thiết kế: vị trí thư mục, phạm vi endpoint, giữ nguyên hay viết lại Consumer bằng Express |
| **Feature**        | Sample API — cấu trúc `src/sample-api/` (Consumer App & Provider Service)                                |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp research thành bản thiết kế cụ thể, viết spec doc                                |

#### Prompt

**Prompt người dùng:**

```text
[Lựa chọn qua AskUserQuestion] "pact-workshop-js (step1) (Recommended)"
[Lựa chọn qua AskUserQuestion] "src/sample-api/consumer-app + provider-service (Recommended)"
[Lựa chọn qua AskUserQuestion] "Chỉ CRUD user cơ bản, chưa có JWT (Recommended)"

không cần khớp với tuần trước, tuần đó chỉ là để tạm, fork repo đã chọn đi rồi viết lại readme rõ
ràng, vì sau task chuẩn bị source code là task `Soạn tài liệu README hướng dẫn các bước cài đặt và
khởi chạy dự án API mẫu trên môi trường local.`
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Dùng skill superpowers:brainstorming, đọc trước cấu trúc repo hiện có (src/sample-api/README.md,
   src/README.md, src/pact/README.md) để tránh xung đột với kế hoạch cũ đã ghi từ tuần 2.
2. Đề xuất và xác nhận qua AskUserQuestion: vị trí thư mục, phạm vi endpoint (không làm JWT tuần này).
3. Viết design spec tại docs/superpowers/specs/2026-07-09-sample-api-consumer-provider-design.md,
   ban đầu đề xuất đổi domain product→user và tách riêng consumer-app/provider-service, viết lại
   Consumer bằng Express thay vì React.
4. Cố gắng `git add` + `git commit` file spec mà chưa được người dùng yêu cầu — bị người dùng từ chối
   qua cơ chế permission (tool rejected). Nhận phản hồi và dừng hành động commit tự ý.
5. Theo yêu cầu người dùng, liệt kê lại step-by-step chi tiết (đổi tên file, route, README) để người
   dùng tự thực hiện hoặc duyệt trước khi AI làm.
6. Thử copy/rename các file từ repo đã clone sang cấu trúc consumer-app/provider-service — bị người
   dùng từ chối tool use, vì người dùng đã tự clone thủ công vào src/sample-api/pact-workshop-js và
   muốn giữ nguyên nội dung gốc, không đổi tên/xử lý lại.
7. Điều chỉnh kế hoạch: không đổi tên/tách thư mục nữa, dùng nguyên trạng `pact-workshop-js/` đã clone
   làm source code chính thức cho Consumer App (`consumer/`) và Provider Service (`provider/`).
```

#### AI Output

```text
- File spec: docs/superpowers/specs/2026-07-09-sample-api-consumer-provider-design.md (giữ nguyên
  theo yêu cầu người dùng dù không còn khớp 100% với cách triển khai thực tế cuối cùng).
- Kế hoạch cuối cùng: dùng nguyên trạng thư mục src/sample-api/pact-workshop-js/ (do người dùng tự
  clone) làm source code cho Consumer App + Provider Service, không đổi tên/domain.
```

#### Human Review

| Aspect           | Detail                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Tuấn Anh                                                                                                                                            |
| Review date      | 2026-07-09                                                                                                                                                |
| Corrections made | Có — Từ chối 2 lần thao tác tool của AI (git commit tự ý chưa xin phép; copy/rename file tự động khi không cần thiết); chỉ đạo AI giữ nguyên nội dung repo gốc, không đổi tên. |
| Quality rating   | Acceptable (hạ từ Good do AI 2 lần tự ý thực hiện thao tác vượt phạm vi được giao — xem Issues found) |
| Issues found     | (1) AI cố `git commit` file spec khi chưa được yêu cầu, vi phạm nguyên tắc chỉ commit khi được yêu cầu rõ ràng. (2) AI đề xuất và thử tự động đổi tên/tách file (product→user, consumer-app/provider-service) vượt quá yêu cầu thực tế "chỉ cần đơn giản, không cần đổi tên". Cả 2 vấn đề được chặn lại bởi cơ chế permission và điều chỉnh ngay khi người dùng phản hồi. |

---

### Entry 3 — Viết README hướng dẫn cài đặt/khởi chạy + verify thực tế

| Field              | Value                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 5 (Claude Code CLI)                                                                      |
| **Date/Time**      | 2026-07-09 16:10:00 +07:00                                                                              |
| **Task**           | Soạn README hướng dẫn cài đặt/khởi chạy local, verify bằng cách chạy thực tế và xử lý `.git` lồng bên trong thư mục đã clone |
| **Feature**        | Sample API — `src/sample-api/README.md`                                                                |
| **Bloom-AI Level** | G9.2 (Apply) — Áp dụng kết quả chạy thử thực tế để viết tài liệu hướng dẫn chính xác                    |

#### Prompt

**Prompt người dùng:**

```text
đọc sample codebase pact-workshop-js và viết readme hướng dẫn khởi chạy dự án ở môi trường local

[Sau khi AI báo cáo và đề xuất 2 việc cần quyết định]
1. xoá luôn
2. giữ nguyên
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Đọc các file thực tế trong src/sample-api/pact-workshop-js/ (root package.json, provider/package.json,
   provider/server.js, provider/product/product.routes.js, provider/middleware/auth.middleware.js,
   consumer/.env, docker-compose.yaml) để nắm đúng cách cài đặt/chạy/port thực tế.
2. Chạy thực tế `npm install` ở thư mục gốc pact-workshop-js/ để verify script postinstall cài đặt
   được cả consumer/ và provider/.
3. Chạy `npm start` (concurrently chạy cả 2 service), verify bằng `curl http://localhost:8080/products`,
   `curl http://localhost:8080/product/10`, và kiểm tra consumer trả về HTTP 200 kèm đúng tiêu đề trang.
4. Dừng các tiến trình dev server sau khi verify xong (giải phóng port 3000/8080).
5. Viết lại nội dung src/sample-api/README.md: mô tả 2 dịch vụ, port, lệnh cài đặt/chạy (gộp và tách
   riêng từng service), ví dụ curl kiểm tra nhanh, ghi chú các phần chưa dùng tới (Pact test, auth
   middleware, docker-compose) và nguồn gốc fork.
6. Phát hiện thư mục đã clone còn `.git` lồng bên trong (git repo con chưa track đúng cách) — báo cáo
   cho người dùng, xin quyết định xoá hay giữ, và xoá theo xác nhận của người dùng.
```

#### AI Output

```text
- Cập nhật src/sample-api/README.md với hướng dẫn cài đặt/khởi chạy đã verify thực tế (lệnh chạy gộp
  qua npm start ở thư mục gốc, lệnh chạy riêng từng service, ví dụ curl, ghi chú phạm vi chưa dùng tới).
- Xoá thư mục .git lồng bên trong src/sample-api/pact-workshop-js/ để Git repo chính track được đúng
  các file bên trong (theo xác nhận của người dùng).
```

#### Human Review

| Aspect           | Detail                                                                          |
| ----------------- | ---------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Tuấn Anh                                                                 |
| Review date      | 2026-07-09                                                                       |
| Corrections made | Không — nội dung README và việc xoá `.git` lồng được chấp nhận như AI đề xuất.  |
| Quality rating   | Good                                                                             |
| Issues found     | None — các bước hướng dẫn trong README đã được verify bằng cách chạy thực tế trước khi ghi vào tài liệu. |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                                               | Value                                                                                          |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Total AI interactions                                | 3                                                                                              |
| AI tools used                                        | Claude Sonnet 5 (Claude Code CLI)                                                              |
| Features covered                                     | Chọn nguồn fork; Thiết kế cấu trúc Consumer App/Provider Service; README cài đặt/khởi chạy      |
| Documents created / updated                          | src/sample-api/README.md; docs/superpowers/specs/2026-07-09-sample-api-consumer-provider-design.md |
| Source code                                          | src/sample-api/pact-workshop-js/ (fork từ pact-foundation/pact-workshop-js, clone thủ công bởi người thực hiện) |
| Issues found by audit                                | 2                                                                                              |
| Issues resolved                                      | 2/2                                                                                             |

### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ------------------------ | ---------------- | -------------------- |
| Research & Synthesizing | 80%              | 20%                  |
| Document Structuring    | 70%              | 30%                  |
| Code Writing / Fetching | 20%              | 80%                  |
| Verification & Testing  | 90%              | 10%                  |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
