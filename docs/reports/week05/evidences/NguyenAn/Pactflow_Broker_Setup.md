# Hướng dẫn Đăng ký và Cấu hình Pactflow Broker

- **Sinh viên thực hiện:** Ân Tiến Nguyên An (MSSV: 23127148)
- **Ngày thực hiện:** 2026-07-10

---

## 1. Đăng ký tài khoản SmartBear / Pactflow

Truy cập [https://pactflow.io](https://pactflow.io) và đăng ký tài khoản dùng thử miễn phí (Swagger Enterprise Trial — 30 ngày).

Sau khi đăng ký, giao diện **Swagger Catalog** hiển thị dashboard tổng quan với các module: Organization APIs, Studio, Portal, Functional Testing, và **Contract Testing**.

![Swagger Catalog Dashboard](./Setup%20Pactflow%20Broker%20Screenshot/1.png)

---

## 2. Thiết lập Workspace cho Contract Testing

Chọn mục **Contract Testing** ở sidebar trái. Hệ thống hiển thị trang Welcome với thông tin tài khoản đã đăng nhập (`23127148@student.hcmus.edu.vn`) và tổ chức **VNUHCM - University of Science**.

Nhấn **"Set up workspace"** để khởi tạo workspace riêng cho nhóm.

![Welcome to Contract Testing](./Setup%20Pactflow%20Broker%20Screenshot/2.png)

---

## 3. Workspace sẵn sàng

Sau khi setup, hệ thống cấp URL Pactflow Broker riêng cho tổ chức:

> **Broker URL:** `https://vnuhcm-university-of-science.pactflow.io`

Đây là URL sẽ được cấu hình trong mã nguồn để publish và verify contract.

![Workspace setup complete](./Setup%20Pactflow%20Broker%20Screenshot/3.png)

---

## 4. Giao diện Dashboard — Guided Tutorials

Pactflow cung cấp 2 tutorial hướng dẫn cho người mới:

| Tutorial | Mô tả | Thời gian |
|----------|--------|-----------|
| **Contract Testing** | Create, publish, and verify a pact using a sample product catalog API | 10 min • Beginner |
| **Drift** | Verify a live API against its OpenAPI schema and publish results | 12 min • Beginner |

![Guided Tutorials](./Setup%20Pactflow%20Broker%20Screenshot/4.png)

---

## 5. Danh sách Applications mẫu

Pactflow tự động tạo 4 application mẫu để minh hoạ luồng contract testing:

| Application | Loại | Trạng thái |
|-------------|------|------------|
| **Example API** | Provider | `can-i-merge: success` ✅ |
| **Example App** | Consumer | `can-i-merge: success` ✅ |
| **Petstore Api** | Provider | `can-i-merge: success` ✅ |
| **Petstore Consumer** | Consumer | `can-i-merge: success` ✅ |

Nhóm sẽ thêm application riêng (FrontendWebsite + ProductService) vào đây khi triển khai contract testing.

![Applications Dashboard](./Setup%20Pactflow%20Broker%20Screenshot/5.png)

---

## 6. Lấy API Token để tích hợp

Vào **Settings** → **API Tokens** để lấy thông tin cần thiết cho việc tích hợp:

- **Base URL:** `https://vnuhcm-university-of-science.pactflow.io`
- **Read only token:** Dùng cho việc verify contract (Provider side).
- **Read/write token:** Dùng cho việc publish contract (Consumer side) và deploy.

Nhấn **"Copy Token Value"** để lấy token, sau đó cấu hình vào biến môi trường của dự án:

```bash
export PACT_BROKER_BASE_URL="https://vnuhcm-university-of-science.pactflow.io"
export PACT_BROKER_TOKEN="<your-read-write-token>"
```

![API Tokens](./Setup%20Pactflow%20Broker%20Screenshot/6.png)

> **Lưu ý bảo mật:** Không commit token trực tiếp vào mã nguồn. Sử dụng biến môi trường hoặc GitHub Secrets cho CI/CD.
