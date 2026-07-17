# Hướng dẫn Publish Pact lên Pactflow Broker

> **Dự án:** API & Contract Testing — Nhóm 3 SEBros  
> **Task:** W06 — Nguyên An (23127148)  
> **Stack:** `@pact-foundation/pact@13.1.4` · `@pact-foundation/pact-cli@16.0.4`  
> **Contract:** `FrontendWebsite` → `ProductService`

---

## 1. Chuẩn bị biến môi trường

Các biến này **không được hardcode** vào source code. Set chúng trong terminal
trước khi chạy bất kỳ lệnh nào bên dưới.

| Biến | Mô tả | Bắt buộc |
|---|---|---|
| `PACT_BROKER_URL` | URL của Pactflow SaaS (VD: `https://<team>.pactflow.io`) | ✅ |
| `PACT_BROKER_TOKEN` | Read/Write API token lấy từ Pactflow → Settings → API Tokens | ✅ |
| `GIT_COMMIT` | SHA của commit hiện tại — dùng làm `consumer-app-version` | ✅ |
| `GIT_BRANCH` | Tên nhánh hiện tại — gắn vào version metadata | ✅ |
| `PACT_PUBLISH_RESULTS` | Set `"true"` để provider tự publish verification result lên broker | Provider only |

### PowerShell (Windows)

```powershell
$env:PACT_BROKER_URL     = "https://<your-team>.pactflow.io"
$env:PACT_BROKER_TOKEN   = "<your-readwrite-token>"
$env:GIT_COMMIT          = git rev-parse --short HEAD
$env:GIT_BRANCH          = git rev-parse --abbrev-ref HEAD
```

### Bash / Git Bash

```bash
export PACT_BROKER_URL="https://<your-team>.pactflow.io"
export PACT_BROKER_TOKEN="<your-readwrite-token>"
export GIT_COMMIT=$(git rev-parse --short HEAD)
export GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
```

> ⚠️ **Lưu ý bảo mật:** Không commit token vào git. Dùng `.env` + `.gitignore`
> hoặc lưu trong CI/CD secrets.

---

## 2. Publish pact từ Consumer

Bước này đẩy file contract `consumer/pacts/FrontendWebsite-ProductService.json`
lên Pactflow. Phải chạy **sau** khi `npm run test:pact` ở consumer đã thành công
(để file pact được generate mới nhất).

### Chạy từ thư mục `consumer/`

```powershell
# Windows PowerShell
npx pact-broker publish ./pacts `
  --consumer-app-version="$env:GIT_COMMIT" `
  --branch="$env:GIT_BRANCH" `
  --broker-base-url="$env:PACT_BROKER_URL" `
  --broker-token="$env:PACT_BROKER_TOKEN"
```

```bash
# Bash / Git Bash
npx pact-broker publish ./pacts \
  --consumer-app-version="$GIT_COMMIT" \
  --branch="$GIT_BRANCH" \
  --broker-base-url="$PACT_BROKER_URL" \
  --broker-token="$PACT_BROKER_TOKEN"
```

> `pact-broker` CLI đến từ `@pact-foundation/pact-cli@16.0.4`
> đã có trong `devDependencies` của consumer — không cần cài thêm.

**Output mong đợi:**

```
Publishing pacts to pact broker at https://<team>.pactflow.io
Tagging version <GIT_COMMIT> of FrontendWebsite as "<GIT_BRANCH>"
Publishing FrontendWebsite/ProductService pact... done
```

---

## 3. Verify + Publish verification result từ Provider

Sau khi consumer đã publish pact lên broker, provider cần kéo pact mới nhất,
chạy verification, rồi publish kết quả về broker.

```powershell
# Chạy từ: provider/
$env:PACT_BROKER_URL      = "https://<your-team>.pactflow.io"
$env:PACT_BROKER_TOKEN    = "<token>"
$env:GIT_COMMIT           = git rev-parse --short HEAD
$env:GIT_BRANCH           = git rev-parse --abbrev-ref HEAD
$env:PACT_PUBLISH_RESULTS = "true"

npm run test:pact
```

`product.pact.test.js` đã có logic tự động chọn nguồn pact:

```js
if (process.env.PACT_BROKER_URL) {
    // Kéo pact từ broker, publish verification result
    opts.pactBrokerUrl             = process.env.PACT_BROKER_URL;
    opts.pactBrokerToken           = process.env.PACT_BROKER_TOKEN;
    opts.consumerVersionSelectors  = [{ latest: true }];
    opts.publishVerificationResult = process.env.PACT_PUBLISH_RESULTS === "true";
} else {
    // Fallback: đọc file pact local
    opts.pactUrls = ["../consumer/pacts/FrontendWebsite-ProductService.json"];
}
```

---

## 4. npm script `publish:pact` (provider/package.json)

Script `publish:pact` được thêm vào `provider/package.json` để publish contract
tử consumer lên broker bằng một lệnh duy nhất, chạy từ thư mục `provider/`.

```powershell
# Đặt env vars trước (xem mục 1), rồi chạy từ provider/:
npm run publish:pact
```

Script thực thi lệnh (cross-platform qua `cross-env`):

```
pact-broker publish ../consumer/pacts
  --consumer-app-version=$GIT_COMMIT
  --branch=$GIT_BRANCH
  --broker-base-url=$PACT_BROKER_URL
  --broker-token=$PACT_BROKER_TOKEN
```

> Script dùng `npx --prefix ../consumer pact-broker` để tận dụng
> `@pact-foundation/pact-cli` đã cài trong consumer, tránh cài thêm
> dependency vào provider.

---

## 5. Quy trình đầy đủ

```
┌─────────────────────────────────────────────────────────┐
│                     CONSUMER SIDE                        │
│                                                          │
│  npm run test:pact                                       │
│       │                                                  │
│       ▼                                                  │
│  pacts/FrontendWebsite-ProductService.json (generated)  │
│       │                                                  │
│       ▼                                                  │
│  npm run publish:pact  (hoặc từ provider/)              │
│       │                                                  │
└───────┼──────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────┐
│   PACTFLOW BROKER    │
│   (cloud)            │
└──────────┬───────────┘
           │  (provider kéo pact mới nhất)
           ▼
┌─────────────────────────────────────────────────────────┐
│                     PROVIDER SIDE                        │
│                                                          │
│  PACT_BROKER_URL=... PACT_PUBLISH_RESULTS=true          │
│  npm run test:pact                                       │
│       │                                                  │
│       ▼                                                  │
│  Verification result ──────────────────► Pactflow Broker │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Đọc kết quả trên Pactflow UI & chụp minh chứng

### Bước 1 — Vào Dashboard

1. Truy cập `https://<your-team>.pactflow.io`
2. Đăng nhập bằng tài khoản team
3. Chọn **Pacts** ở sidebar trái

### Bước 2 — Kiểm tra pact đã publish

Bảng **Pacts** hiển thị:

| Cột | Giá trị mong đợi |
|---|---|
| Consumer | `FrontendWebsite` |
| Provider | `ProductService` |
| Consumer version | SHA commit (`GIT_COMMIT`) |
| Last published | Timestamp gần nhất |
| Status | ✅ Verified |

### Bước 3 — Các màn hình cần chụp minh chứng

| # | Màn hình | Cách điều hướng |
|---|---|---|
| **SC-1** | Danh sách pact với `FrontendWebsite → ProductService` | Trang chủ → **Pacts** |
| **SC-2** | Chi tiết 10 interactions của contract | Pacts → click tên pact |
| **SC-3** | Verification result badge ✅ + provider version + branch | Pacts → tab **Verifications** |
| **SC-4** | *(Bonus)* **Matrix view** — compatibility matrix | Sidebar → **Matrix** |

> **Tip:** Matrix view (`/matrix`) là màn hình trực quan nhất,
> cho thấy mọi tổ hợp consumer/provider version có verified hay chưa.

### Bước 4 — Ý nghĩa các badge

| Badge | Ý nghĩa |
|---|---|
| 🟢 **Verified** | Provider đã verify thành công — an toàn để deploy |
| 🔴 **Failed** | Verification thất bại — xem log để debug |
| 🟡 **Pending** | Consumer đã publish, provider chưa chạy verification |
| ⚪ **Not verified** | Pact mới, chưa có verification record |

---

## 7. Troubleshooting

| Lỗi | Nguyên nhân | Giải pháp |
|---|---|---|
| `401 Unauthorized` | Token sai hoặc hết hạn | Tạo lại token: Pactflow → Settings → API Tokens |
| `404 Not Found` | URL broker sai | Kiểm tra `PACT_BROKER_URL` không có dấu `/` cuối |
| `No pacts found` | Provider dùng `latest:true` nhưng consumer chưa publish | Chạy consumer publish trước |
| Verification result không lên broker | `PACT_PUBLISH_RESULTS` chưa set | Set `$env:PACT_PUBLISH_RESULTS="true"` |
| `pact-broker: command not found` | pact-cli chưa install | Chạy `npm install` trong `consumer/` |
| Branch không hiển thị trên UI | `GIT_BRANCH` không được set | Set env var và re-publish |

---

*Tài liệu này được tạo cho task W06 — Nguyên An (23127148), Nhóm 3 SEBros.*  
*Phiên bản: 1.0 — 2026-07-18*
