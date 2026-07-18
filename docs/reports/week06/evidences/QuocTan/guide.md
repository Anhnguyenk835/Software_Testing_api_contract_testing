# Hướng dẫn Thực thi Data-Driven Testing với Postman & Newman

Tài liệu này hướng dẫn cách thiết lập môi trường, import và thực thi bộ kiểm thử tự động theo hướng dữ liệu (Data-Driven Testing) cho Product Service API.

---

## 1. Chuẩn bị môi trường

Trước khi chạy kiểm thử, bạn cần cài đặt các thư viện phụ thuộc và khởi động Provider API.

```bash
# Di chuyển vào thư mục của Provider API
cd src/sample-api/pact-workshop-js

# Cài đặt các package bằng pnpm
pnpm install

# Khởi động server
pnpm start
```

Server sẽ khởi chạy tại địa chỉ: `http://localhost:8080`. Hãy giữ terminal này hoạt động trong suốt quá trình chạy test.

---

## 2. Thực thi bằng Postman giao diện (GUI)

Phương pháp này thích hợp khi bạn muốn debug chi tiết hoặc xem trực quan kết quả của từng vòng chạy (iteration).

### Bước 1: Import dữ liệu vào Postman

1. Mở Postman, nhấn vào nút **Import** ở góc trên bên trái.
2. Chọn kéo thả hoặc chọn tập tin từ máy tính đối với 2 file sau:
   - File Collection: `src/postman/collections/product-service-data-driven.postman_collection.json`
   - File Environment: `src/postman/environments/local.postman_environment.json`
3. Nhấp chọn môi trường hoạt động là **Product Service - Local** ở thanh công cụ góc trên bên phải màn hình Postman.

### Bước 2: Cấu hình và chạy Collection Runner

1. Nhấp chuột vào nút ba chấm bên cạnh tên Collection `Product Service - Data Driven Tests` -> Chọn **Run collection**.
2. Trong danh sách bên trái, chọn thư mục kịch bản muốn kiểm thử (ví dụ: `GET — Happy Path` hoặc `POST — Negative`).
3. Ở bảng cấu hình bên phải:
   - Nhấp vào **Select File** tại dòng **Data**.
   - Tìm đến thư mục `src/postman/data/` và chọn file dữ liệu tương ứng (được mô tả ở bảng đối chiếu bên dưới). Bạn có thể chọn file định dạng `.json` hoặc `.csv`.
   - Postman sẽ tự động nhận diện số lượng **Iterations** (vòng chạy) dựa vào số lượng bản ghi dữ liệu trong file.
4. Nhấn nút **Run Product Service - Data Driven Tests** màu xanh để bắt đầu chạy.

### Bảng đối chiếu thư mục kịch bản và file dữ liệu tương ứng

| Thư mục kịch bản (Folder) | Tập tin dữ liệu tương ứng (Data File)                       | Số vòng chạy (Iterations) |
| :------------------------ | :---------------------------------------------------------- | :-----------------------: |
| GET — Happy Path          | `get-products.data.json` hoặc `get-product-by-id.data.json` |         4 hoặc 7          |
| GET — Negative            | `get-products.data.json` hoặc `get-product-by-id.data.json` |         4 hoặc 7          |
| POST — Happy Path         | `post-products.data.json` hoặc `post-products.data.csv`     |             7             |
| POST — Negative           | `post-products.data.json` hoặc `post-products.data.csv`     |             7             |
| PUT — Happy Path          | `put-product.data.json` hoặc `put-product.data.csv`         |             6             |
| PUT — Negative            | `put-product.data.json` hoặc `put-product.data.csv`         |             6             |
| DELETE — Happy Path       | `delete-product.data.json` hoặc `delete-product.data.csv`   |             5             |
| DELETE — Negative         | `delete-product.data.json`                                  |                           | `delete-product.data.csv` | 5   |

---

## 3. Thực thi bằng dòng lệnh (Newman CLI)

Newman cho phép chạy nhanh toàn bộ kịch bản mà không cần mở giao diện Postman, cực kỳ hữu ích cho việc tích hợp CI/CD.

### Cấu trúc và Ý nghĩa của Câu lệnh Newman

Mỗi câu lệnh chạy Newman cho bộ Data-Driven có cấu trúc như sau:

```bash
pnpm dlx newman run <đường_dẫn_collection> \
  -e <đường_dẫn_environment> \
  -d <đường_dẫn_data_file> \
  --folder "<tên_thư_mục_kịch_bản>" \
  --reporters <dạng_báo_cáo>
```

Trong đó:

- `pnpm dlx`: Tải nhanh gói `newman` từ thư viện và chạy trực tiếp mà không cần cài đặt toàn cục vào máy tính.
- `newman run`: Lệnh chính của Newman để thực thi một Collection của Postman.
- `-e` hoặc `--environment`: Chỉ định đường dẫn tới tập tin chứa biến môi trường (ví dụ: `local.postman_environment.json`).
- `-d` hoặc `--iteration-data`: Chỉ định đường dẫn tới tập tin chứa bộ dữ liệu kiểm thử (JSON hoặc CSV). Newman sẽ lặp lại các request trong folder theo số dòng dữ liệu hiện có trong file này.
- `--folder`: Chỉ định tên thư mục con cụ thể trong Collection muốn thực thi. Điều này cho phép bạn chia nhỏ chạy riêng biệt từng method và kịch bản (ví dụ: chỉ chạy `POST — Happy Path`).
- `--reporters`: Kiểu định dạng kết quả hiển thị. Giá trị `cli` sẽ in kết quả trực tiếp ra màn hình terminal một cách trực quan.

---

### Danh sách các câu lệnh chạy chi tiết

Mở một cửa sổ Terminal mới tại thư mục gốc của dự án và sử dụng các câu lệnh sau:

- **Chạy kịch bản GET (Đọc danh sách sản phẩm)**:

  ```bash
  pnpm dlx newman run src/postman/collections/product-service-data-driven.postman_collection.json \
    -e src/postman/environments/local.postman_environment.json \
    -d src/postman/data/get-products.data.json \
    --folder "GET — Happy Path" \
    --reporters cli
  ```

- **Chạy kịch bản GET theo ID**:

  ```bash
  pnpm dlx newman run src/postman/collections/product-service-data-driven.postman_collection.json \
    -e src/postman/environments/local.postman_environment.json \
    -d src/postman/data/get-product-by-id.data.json \
    --folder "GET — Happy Path" \
    --reporters cli
  ```

- **Chạy kịch bản POST (Tạo sản phẩm)**:

  ```bash
  pnpm dlx newman run src/postman/collections/product-service-data-driven.postman_collection.json \
    -e src/postman/environments/local.postman_environment.json \
    -d src/postman/data/post-products.data.json \
    --folder "POST — Happy Path" \
    --reporters cli
  ```

- **Chạy kịch bản PUT (Cập nhật sản phẩm)**:

  ```bash
  pnpm dlx newman run src/postman/collections/product-service-data-driven.postman_collection.json \
    -e src/postman/environments/local.postman_environment.json \
    -d src/postman/data/put-product.data.json \
    --folder "PUT — Happy Path" \
    --reporters cli
  ```

- **Chạy kịch bản DELETE (Xóa sản phẩm)**:
  ```bash
  pnpm dlx newman run src/postman/collections/product-service-data-driven.postman_collection.json \
    -e src/postman/environments/local.postman_environment.json \
    -d src/postman/data/delete-product.data.json \
    --folder "DELETE — Happy Path" \
    --reporters cli
  ```

---

## 4. Lưu ý về tính độc lập của dữ liệu (Test Isolation)

Do Provider API hoạt động dựa trên cơ chế lưu trữ tạm thời trong bộ nhớ (In-memory store):

1. **Thứ tự thực thi**: Kịch bản `DELETE — Happy Path` sẽ tiến hành xóa sản phẩm có ID là 11 khỏi hệ thống. Do đó, hãy chạy kịch bản DELETE cuối cùng.
2. **Khôi phục dữ liệu**: Nếu bạn muốn chạy lại toàn bộ quy trình kiểm thử từ đầu, bạn chỉ cần nhấn `Ctrl + C` tại Terminal chạy server, sau đó chạy lại lệnh `pnpm start` để khôi phục dữ liệu mẫu ban đầu của hệ thống.
