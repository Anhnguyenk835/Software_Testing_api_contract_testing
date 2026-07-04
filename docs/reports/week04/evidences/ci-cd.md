# Phương án tích hợp CI/CD (GitHub Actions)

> Trạng thái: Tìm hiểu sơ bộ + phác thảo phương án triển khai. Chưa có phương án cụ thể
> Liên quan: file workflow mẫu [`ci.yml.example`](../../../../.github/workflows/ci.yml.example)

## 1. Mục tiêu

Tự động **chạy lại toàn bộ test API** (và contract test) mỗi khi có **commit push** hoặc **mở/cập nhật Pull Request**, để:

- Phát hiện sớm request bị hỏng / breaking change trước khi merge.
- Có bằng chứng (report, log) cho mỗi lần chạy → phục vụ báo cáo & demo.
- Giảm thao tác thủ công: không phải mở Postman chạy tay mỗi lần sửa code.

## 2. Vì sao chọn GitHub Actions

| Tiêu chí | GitHub Actions | GitLab CI | CircleCI |
|----------|----------------|-----------|----------|
| Tích hợp sẵn với repo GitHub | Ngay trong repo | Cần GitLab | Cần kết nối ngoài |
| Cấu hình | 1 file YAML trong `.github/workflows/` | `.gitlab-ci.yml` | `.circleci/config.yml` |
| Chi phí (public/edu) | Miễn phí, đủ dùng | Miễn phí | Miễn phí giới hạn |
| Độ phổ biến tài liệu | Rất nhiều | Nhiều | Trung bình |

-> Repo dự án đặt trên **GitHub** nên **GitHub Actions** là phương án đơn giản nhất: không cần dịch vụ ngoài, chỉ thêm 1 file YAML.

## 3. Khái niệm cơ bản của GitHub Actions

- **Workflow**: 1 quy trình tự động, định nghĩa bằng file YAML trong `.github/workflows/`.
- **Trigger (`on`)**: sự kiện kích hoạt — ở đây là `push` và `pull_request`.
- **Job**: một nhóm bước chạy trên 1 máy ảo (`runs-on: ubuntu-latest`).
- **Step**: từng lệnh/hành động; dùng `uses:` (action có sẵn) hoặc `run:` (lệnh shell).
- **Runner**: máy ảo do GitHub cấp để chạy job.

## 4. Pipeline dự kiến cho dự án

```
Trigger (push / PR)
   │
   ├─ 1. Checkout code                (actions/checkout)
   ├─ 2. Cài Node.js                  (actions/setup-node)
   ├─ 3. Cài dependencies             (npm ci)
   ├─ 4. Khởi động API mẫu            (npm start &  + wait-on /health)
   ├─ 5. Chạy API test bằng Newman    (newman run ...)
   └─ 6. Chạy Contract test bằng Pact (consumer test → provider verify)
```

Ánh xạ thư mục code (xem [`../../../../src/`](../../../../src/)):

| Bước | Thư mục |
|------|---------|
| API mẫu | `src/sample-api/` |
| Postman collection | `src/postman/` |
| Newman | `src/newman/` |
| Pact | `src/pact/` |

## 5. Phương án triển khai từng bước

1. **Chuẩn bị test chạy được bằng CLI (điều kiện tiên quyết).**
   - Export Postman collection + environment ra file JSON đặt trong `src/postman/`.
   - Đảm bảo API mẫu chạy được bằng `npm start` và có endpoint `GET /health` để CI biết server đã sẵn sàng.
   - Viết consumer/provider test cho Pact trong `src/pact/`.

2. **Tạo file workflow thật.**
   - Đổi tên `.github/workflows/ci.yml.example` → `ci.yml` (GitHub chỉ nhận file `.yml`/`.yaml`).
   - Bỏ comment các bước và điền đúng tên file collection/environment.

3. **Cấu hình trigger** trong `ci.yml`:
   ```yaml
   on:
     push:
       branches: [main]
     pull_request:
   ```

4. **Đẩy lên GitHub** → vào tab **Actions** xem workflow chạy. Mỗi commit/PR sẽ hiện ✅/❌.

5. **(Tuỳ chọn) Lưu report** bằng `actions/upload-artifact` để tải file `report.html` của Newman về xem/đính kèm báo cáo.

## 6. Ví dụ workflow (rút gọn)

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  api-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Start sample API
        run: |
          cd src/sample-api
          npm ci
          npm start &
          npx wait-on http://localhost:3000/health

      - name: Run Newman (API test)
        run: |
          npm install -g newman
          newman run src/postman/collections/main.postman_collection.json \
            -e src/postman/environments/ci.postman_environment.json \
            --reporters cli,html --reporter-html-export newman-report.html

      - name: Run Pact (contract test)
        run: |
          cd src/pact/consumer && npm ci && npm test
          cd ../provider && npm ci && npm run verify

      - name: Upload Newman report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: newman-report
          path: newman-report.html
```

> File mẫu đầy đủ (đang để comment): [`ci.yml.example`](../../../../.github/workflows/ci.yml.example).

## 7. Lưu ý & mở rộng

- **Secret/token:** không hard-code token trong collection; dùng **GitHub Secrets** rồi truyền qua biến môi trường Newman.
- **Cache:** dùng `cache: npm` trong `setup-node` để cài dependencies nhanh hơn.
- **Matrix (nâng cao):** chạy thử trên nhiều phiên bản Node (18/20) — chưa cần cho seminar.
- **Status badge:** gắn badge trạng thái CI vào `README.md` để minh hoạ trực quan.
- **`if: always()`:** vẫn upload report cả khi test fail, để phân tích nguyên nhân.

## 8. Kết luận

Với repo trên GitHub, phương án **đơn giản và đủ dùng** là **1 file `ci.yml`** kích hoạt theo `push`/`pull_request`, chạy tuần tự: dựng API mẫu → Newman (API test) → Pact (contract test), và lưu report làm artifact.

**Điều kiện để bật CI:** cần có API mẫu chạy được + collection/pact test thật trong `src/`. Đây là việc của các tuần sau; hiện đã có sẵn khung `ci.yml.example` để chỉ cần đổi tên và bỏ comment.

## Tài liệu tham khảo

- GitHub Actions — https://docs.github.com/actions
- Newman — https://github.com/postmanlabs/newman
- Pact (verify trong CI) — https://docs.pact.io/
