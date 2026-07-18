# Postman — Collections, Environments & Data Files

Chứa toàn bộ file Postman cho data-driven testing — **Nhóm 3 (SEBros), Tuần W06**.

## Cấu trúc

```
postman/
├── collections/
│   └── SEBros_Product_API.postman_collection.json   # Collection hoàn chỉnh (9 folder, 10 request)
├── environments/
│   └── local.postman_environment.json               # baseUrl = http://localhost:8080
└── data/
    ├── get-products.data.json          # GET /products       — 4 test cases
    ├── get-products.data.csv
    ├── get-product-by-id.data.json     # GET /product/:id    — 7 test cases
    ├── get-product-by-id.data.csv
    ├── post-products.data.json         # POST /products      — 7 test cases
    ├── post-products.data.csv
    ├── put-product.data.json           # PUT /product/:id    — 6 test cases
    ├── put-product.data.csv
    ├── delete-product.data.json        # DELETE /product/:id — 5 test cases
    └── delete-product.data.csv
```

**Tổng: 29 test cases, 5 endpoint, 9 folder (Happy Path + Negative theo method)**

## Cách dùng — Postman Collection Runner

### Bước 1: Khởi động Provider API

```bash
cd src/sample-api/pact-workshop-js
pnpm install
pnpm start   # Provider chạy tại http://localhost:8080
```

### Bước 2: Import vào Postman

1. Mở Postman → **Import**
2. Chọn file `collections/SEBros_Product_API.postman_collection.json`
3. Chọn file `environments/local.postman_environment.json`
4. Chọn environment **"SEBros — Local"** ở góc trên phải

### Bước 3: Chạy Collection Runner với data file

1. Click **Run** trên collection → **Collection Runner**
2. Chọn folder cần chạy (ví dụ: `GET — Happy Path`)
3. Bật **Data** → chọn file `.json` hoặc `.csv` tương ứng
4. Set **Iterations** theo số rows (Postman tự detect từ JSON)
5. Click **Run SEBros — Product API**

### Mapping folder → data file → số iterations

| Folder | Data file | Iterations |
|:-------|:----------|:----------:|
| `_Setup (Pre-flight)` | *(không cần data file)* | 1 |
| `GET — Happy Path` — GET /products | `get-products.data.json` | 1 |
| `GET — Happy Path` — GET /product/:id | `get-product-by-id.data.json` | 3 |
| `GET — Negative` — GET /products | `get-products.data.json` | 3 |
| `GET — Negative` — GET /product/:id | `get-product-by-id.data.json` | 4 |
| `POST — Happy Path` | `post-products.data.json` | 2 |
| `POST — Negative` | `post-products.data.json` | 5 |
| `PUT — Happy Path` | `put-product.data.json` | 2 |
| `PUT — Negative` | `put-product.data.json` | 4 |
| `DELETE — Happy Path` | `delete-product.data.json` | 1 |
| `DELETE — Negative` | `delete-product.data.json` | 4 |

> **Lưu ý DELETE:** Folder `DELETE — Happy Path` xóa id=11 khỏi in-memory store.
> Chạy cuối cùng. Restart Provider (`Ctrl+C` rồi `npm start`) để reset về seed data.

## Cách dùng — Newman CLI (không cần Postman GUI)

```bash
# Cài Newman nếu chưa có
pnpm add -g newman

# Hoặc dùng pnpm dlx (không cần cài toàn cục)
pnpm dlx newman run src/postman/collections/SEBros_Product_API.postman_collection.json \
  --environment src/postman/environments/local.postman_environment.json \
  --iteration-data src/postman/data/get-products.data.json \
  --folder "GET — Happy Path" \
  --reporters cli,json \
  --reporter-json-export newman-report.json

# Chạy từng folder riêng
pnpm dlx newman run src/postman/collections/SEBros_Product_API.postman_collection.json \
  -e src/postman/environments/local.postman_environment.json \
  -d src/postman/data/post-products.data.json \
  --folder "POST — Negative"
```

> **Lưu ý Newman:** Newman không resolve `{{validToken}}` trong data file vì đây là
> Collection variable, không phải Environment variable. Collection Pre-request Script
> sẽ sinh token hợp lệ và replace trực tiếp trong header — hoạt động đúng với Newman.

## Auth mechanism

Provider yêu cầu header:

```
Authorization: Bearer <ISO-8601 timestamp trong vòng 1 giờ>
```

Collection Pre-request Script (Collection level) tự động:
1. Sinh `Bearer <new Date().toISOString()>` mỗi iteration
2. Map `auth_header` từ data file:
   - `"{{validToken}}"` → resolve thành Bearer hợp lệ
   - `"Bearer 2020-..."` → dùng nguyên (expired token, negative case)
   - `""` → xóa header Authorization hoàn toàn (no token, negative case)

## Tham khảo

- Tài liệu data-driven (Read API): [`docs/reports/week06/evidences/QuocTan/data-driven-read-api.md`](../../docs/reports/week06/evidences/QuocTan/data-driven-read-api.md)
- Tài liệu data-driven (Write API): [`docs/reports/week06/evidences/QuocTan/data-driven-write-api.md`](../../docs/reports/week06/evidences/QuocTan/data-driven-write-api.md)
- Test scripts: [`docs/reports/week06/evidences/QuocTan/postman-test-scripts.md`](../../docs/reports/week06/evidences/QuocTan/postman-test-scripts.md)
- Tổ chức collection: [`docs/reports/week06/evidences/QuocTan/collection-organization.md`](../../docs/reports/week06/evidences/QuocTan/collection-organization.md)
- Provider API: [`src/sample-api/README.md`](../sample-api/README.md)
