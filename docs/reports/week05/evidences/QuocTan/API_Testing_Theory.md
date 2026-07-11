# Nghiên Cứu Lý Thuyết API Testing

> **Seminar W05 — Group 3**  
> Môn học: Kiểm thử phần mềm  
> Trường: HCMUS  
> Ngày tạo: 2026-07-04

---

## Mục lục

1. [Khái niệm API](#1-khái-niệm-api)
2. [Kiến trúc & Giao tiếp API](#2-kiến-trúc--giao-tiếp-api)
3. [Các loại API](#3-các-loại-api)
4. [Cấu trúc HTTP Request](#4-cấu-trúc-http-request)
5. [Cấu trúc HTTP Response](#5-cấu-trúc-http-response)
6. [Các loại HTTP Methods](#6-các-loại-http-methods)
7. [HTTP Status Codes](#7-http-status-codes)
8. [Phân biệt API có Authentication và không có Authentication](#8-phân-biệt-api-có-authentication-và-không-có-authentication)
9. [Các loại Authentication trong API](#9-các-loại-authentication-trong-api)
10. [Phân loại API Testing](#10-phân-loại-api-testing)
11. [Kỹ thuật Boundary Value Analysis (BVA) trong API Testing](#11-kỹ-thuật-boundary-value-analysis-bva-trong-api-testing)
12. [Kỹ thuật Equivalence Partitioning (Phân vùng tương đương) trong API Testing](#12-kỹ-thuật-equivalence-partitioning-phân-vùng-tương-đương-trong-api-testing)
13. [Kỹ thuật Data-Driven Testing (Kiểm thử hướng dữ liệu) trong API Testing](#13-kỹ-thuật-data-driven-testing-kiểm-thử-hướng-dữ-liệu-trong-api-testing)
14. [Kỹ thuật Decision Table Testing (Bảng quyết định) trong API Testing](#14-kỹ-thuật-decision-table-testing-bảng-quyết-định-trong-api-testing)
15. [Kỹ thuật Pairwise Testing (Kiểm thử cặp) trong API Testing](#15-kỹ-thuật-pairwise-testing-kiểm-thử-cặp-trong-api-testing)
16. [Kỹ thuật State Transition Testing (Chuyển trạng thái) trong API Testing](#16-kỹ-thuật-state-transition-testing-chuyển-trạng-thái-trong-api-testing)
17. [Kỹ thuật Use Case Testing (Kiểm thử kịch bản) trong API Testing](#17-kỹ-thuật-use-case-testing-kiểm-thử-kịch-bản-trong-api-testing)
18. [Kỹ thuật API Contract Testing (Kiểm thử hợp đồng)](#18-kỹ-thuật-api-contract-testing-kiểm-thử-hợp-đồng)
19. [Checklist kiểm thử API](#19-checklist-kiểm-thử-api)
20. [Công cụ kiểm thử API phổ biến](#20-công-cụ-kiểm-thử-api-phổ-biến)

---

## 1. Khái niệm API

### 1.1 Định nghĩa

**API (Application Programming Interface)** là tập hợp các quy tắc, giao thức và định nghĩa cho phép các ứng dụng phần mềm khác nhau giao tiếp và trao đổi dữ liệu với nhau. API đóng vai trò như một "trung gian" (intermediary) — nhận yêu cầu từ client, xử lý tại server và trả về kết quả.

![API Client-Server Communication Model](./diagrams/api_client_server.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/api_client_server.mmd))_

### 1.2 Vai trò của API

| Vai trò               | Mô tả                                                           |
| --------------------- | --------------------------------------------------------------- |
| **Tích hợp hệ thống** | Cho phép các hệ thống khác nhau kết nối và chia sẻ dữ liệu      |
| **Trừu tượng hóa**    | Ẩn đi sự phức tạp của back-end, chỉ expose những gì cần thiết   |
| **Tái sử dụng**       | Một API có thể phục vụ nhiều loại client (web, mobile, desktop) |
| **Bảo mật**           | Kiểm soát quyền truy cập vào dữ liệu và chức năng hệ thống      |
| **Mở rộng**           | Cho phép bên thứ ba xây dựng sản phẩm trên nền tảng hiện có     |

### 1.3 Các khái niệm liên quan

- **Endpoint**: URL cụ thể mà API lắng nghe yêu cầu, ví dụ: `https://api.example.com/users`
- **Resource**: Đối tượng hoặc dữ liệu mà API quản lý (ví dụ: user, product, order)
- **Payload / Body**: Dữ liệu được gửi hoặc nhận trong một request/response
- **Statelessness**: Nguyên tắc mỗi request phải tự chứa đủ thông tin cần thiết; server không lưu trạng thái phiên làm việc
- **Base URL**: Phần URL gốc dùng chung cho tất cả endpoint, ví dụ: `https://api.example.com/v1`
- **API Contract**: Thỏa thuận về schema, format, và hành vi giữa client và server (thường được mô tả bằng OpenAPI/Swagger)

---

## 2. Kiến trúc & Giao tiếp API

### 2.1 Mô hình Client-Server

API hoạt động theo mô hình **Request–Response**:

1. **Client** gửi HTTP Request đến một Endpoint
2. **API Server** xử lý yêu cầu, truy vấn database/business logic
3. **Server** trả về HTTP Response với dữ liệu hoặc thông báo lỗi
4. **Client** đọc response và hiển thị / xử lý tiếp

### 2.2 Nguyên tắc Statelessness (REST)

- Mỗi request hoàn toàn **độc lập**
- Server **không lưu** trạng thái (session) giữa các request
- Mọi thông tin cần thiết (token, dữ liệu) phải được gửi **trong mỗi request**
- Ưu điểm: dễ scale (horizontal scaling), dễ debug

---

## 3. Các loại API

### 3.1 Phân loại theo kiến trúc

| Loại API      | Giao thức       | Định dạng dữ liệu | Đặc điểm nổi bật                        |
| ------------- | --------------- | ----------------- | --------------------------------------- |
| **REST**      | HTTP/HTTPS      | JSON, XML         | Đơn giản, phổ biến nhất, resource-based |
| **SOAP**      | HTTP, SMTP, TCP | XML only          | Nghiêm ngặt, có chuẩn WS-Security       |
| **GraphQL**   | HTTP/HTTPS      | JSON              | Client kiểm soát dữ liệu trả về         |
| **gRPC**      | HTTP/2          | Protocol Buffers  | Hiệu năng cao, phù hợp microservices    |
| **WebSocket** | WebSocket       | JSON, binary      | Kết nối hai chiều real-time             |

> **Lưu ý:** YAML thường được dùng để _mô tả_ API (OpenAPI/Swagger spec), **không** phải định dạng payload trong HTTP body của REST API thực tế.

### 3.2 Phân loại theo phạm vi truy cập

| Loại              | Mô tả                                                     |
| ----------------- | --------------------------------------------------------- |
| **Public API**    | Mở cho mọi developer, thường có tài liệu công khai        |
| **Private API**   | Chỉ dùng nội bộ trong tổ chức, không expose ra ngoài      |
| **Partner API**   | Chia sẻ với đối tác kinh doanh được xác thực              |
| **Composite API** | Kết hợp nhiều API, thực hiện nhiều bước trong một request |

### 3.3 So sánh REST vs SOAP vs GraphQL

![So Sánh REST vs SOAP vs GraphQL](./diagrams/rest_soap_graphql.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/rest_soap_graphql.mmd))_

---

## 4. Cấu trúc HTTP Request

Một HTTP Request bao gồm các thành phần sau:

![Cấu Trúc HTTP Request](./diagrams/http_request_structure.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/http_request_structure.mmd))_

### Ví dụ thực tế:

```http
POST https://api.example.com/v1/products HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json

{
  "name": "Laptop XYZ",
  "price": 15000000,
  "category": "electronics"
}
```

### 4.1 Các thành phần của Request

#### 4.1.1 HTTP Method (Verb)

Xác định **hành động** muốn thực hiện lên resource (xem mục 6).

#### 4.1.2 URL / Endpoint

![Cấu Trúc URL / Endpoint](./diagrams/url_anatomy.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/url_anatomy.mmd))_

- **Path Parameters**: Nhúng vào URL path — `/users/{id}` → `/users/42`
- **Query Parameters**: Thêm vào sau `?` — `?status=pending&page=1`
- **Fragment**: Phần sau `#`, không gửi đến server

#### 4.1.3 Request Headers

| Header            | Ý nghĩa                     | Ví dụ                            |
| ----------------- | --------------------------- | -------------------------------- |
| `Content-Type`    | Định dạng của request body  | `application/json`               |
| `Accept`          | Định dạng mong muốn nhận về | `application/json`               |
| `Authorization`   | Thông tin xác thực          | `Bearer <token>` / `Basic <b64>` |
| `X-API-Key`       | API Key xác thực            | `X-API-Key: abc123xyz`           |
| `User-Agent`      | Thông tin về client         | `PostmanRuntime/7.32.0`          |
| `Accept-Language` | Ngôn ngữ ưa thích           | `vi-VN, en-US`                   |
| `Cache-Control`   | Chính sách cache            | `no-cache`                       |
| `Cookie`          | Dữ liệu cookie gửi kèm      | `session_id=abc123`              |

#### 4.1.4 Request Body

Dữ liệu gửi lên server, thường đi kèm với `POST`, `PUT`, `PATCH`:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Secure@123",
  "role": "admin"
}
```

Các định dạng phổ biến: **JSON**, **XML**, **form-data** (multipart), **x-www-form-urlencoded**

---

## 5. Cấu trúc HTTP Response

Một HTTP Response bao gồm:

![Cấu Trúc HTTP Response](./diagrams/http_response_structure.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/http_response_structure.mmd))_

### Ví dụ thực tế:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://api.example.com/v1/products/789
X-Request-Id: f4a7b2c1-1234-5678-abcd-ef0987654321

{
  "id": 789,
  "name": "Laptop XYZ",
  "price": 15000000,
  "category": "electronics",
  "created_at": "2026-07-04T13:00:00Z"
}
```

### 5.1 Các thành phần của Response

#### 5.1.1 Status Code

Ba chữ số cho biết kết quả của request (xem chi tiết mục 7).

#### 5.1.2 Response Headers

| Header             | Ý nghĩa                                 | Ví dụ                             |
| ------------------ | --------------------------------------- | --------------------------------- |
| `Content-Type`     | Định dạng của response body             | `application/json; charset=utf-8` |
| `Content-Length`   | Kích thước body (bytes)                 | `248`                             |
| `Location`         | URL của resource vừa được tạo (sau 201) | `/api/users/123`                  |
| `Cache-Control`    | Chính sách cache phía client            | `max-age=3600, public`            |
| `WWW-Authenticate` | Thông báo yêu cầu xác thực (kèm 401)    | `Bearer realm="api"`              |
| `X-Request-Id`     | ID định danh request (debug)            | `f4a7b2c1-...`                    |
| `X-Rate-Limit-*`   | Thông tin giới hạn tốc độ               | `X-Rate-Limit-Remaining: 99`      |

#### 5.1.3 Response Body

Dữ liệu trả về, thường là **JSON**:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 42,
      "name": "Nguyen Van A",
      "email": "a@example.com"
    }
  },
  "meta": {
    "timestamp": "2026-07-04T06:00:00Z",
    "version": "1.0"
  }
}
```

---

## 6. Các loại HTTP Methods

### 6.1 Bảng tổng hợp HTTP Methods

| Method      | Hành động                          | Idempotent | Safe  | Có Body? | Mã thành công thường gặp |
| ----------- | ---------------------------------- | :--------: | :---: | :------: | :----------------------: |
| **GET**     | Lấy dữ liệu resource               |     Có     |  Có   |  Không   |         `200 OK`         |
| **POST**    | Tạo mới resource                   |   Không    | Không |    Có    |      `201 Created`       |
| **PUT**     | Cập nhật toàn bộ resource          |     Có     | Không |    Có    |         `200 OK`         |
| **PATCH**   | Cập nhật một phần resource         | Phụ thuộc  | Không |    Có    |         `200 OK`         |
| **DELETE**  | Xóa resource                       |     Có     | Không | Tùy chọn |     `204 No Content`     |
| **HEAD**    | Lấy headers (không có body)        |     Có     |  Có   |  Không   |         `200 OK`         |
| **OPTIONS** | Liệt kê methods được hỗ trợ (CORS) |     Có     |  Có   |  Không   |     `200 OK` / `204`     |

> **Idempotent**: Gọi nhiều lần có cùng kết quả như gọi một lần  
> **Safe**: Không thay đổi trạng thái server  
> **PATCH & Idempotency**: Theo RFC 5789, PATCH không được đảm bảo là idempotent theo thiết kế giao thức. Tuy nhiên, PATCH _có thể_ là idempotent tùy vào implementation: nếu body chứa giá trị tuyệt đối (`{"email": "new@test.com"}`) → idempotent; nếu body chứa hành động tương đối (`{"increment_views": 1}`) → không idempotent.

### 6.2 Ví dụ sử dụng từng method

```http
# GET — Lấy danh sách users
GET /api/v1/users?page=1&limit=10

# POST — Tạo user mới
POST /api/v1/users
Body: { "name": "Nguyen Van A", "email": "a@test.com" }

# PUT — Cập nhật toàn bộ thông tin user ID=42
PUT /api/v1/users/42
Body: { "name": "Nguyen Van B", "email": "b@test.com", "role": "admin" }

# PATCH — Chỉ cập nhật email
PATCH /api/v1/users/42
Body: { "email": "new@test.com" }

# DELETE — Xóa user ID=42
DELETE /api/v1/users/42
```

### 6.3 Mapping với CRUD

| CRUD Operation | HTTP Method | SQL Equivalent |
| :------------: | :---------: | :------------: |
|   **Create**   |    POST     |     INSERT     |
|    **Read**    |     GET     |     SELECT     |
|   **Update**   | PUT / PATCH |     UPDATE     |
|   **Delete**   |   DELETE    |     DELETE     |

---

## 7. HTTP Status Codes

### 7.1 Phân nhóm tổng quan

![Phân Nhóm HTTP Status Codes](./diagrams/http_status_codes_overview.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/http_status_codes_overview.mmd))_

### 7.2 Bảng chi tiết Status Codes

#### 1xx — Informational (Thông tin)

| Code | Tên                 | Ý nghĩa                                                    | Khi nào gặp                                        |
| ---- | ------------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| 100  | Continue            | Server đã nhận headers, client có thể tiếp tục gửi body    | Client gửi `Expect: 100-continue` trước upload lớn |
| 101  | Switching Protocols | Server đồng ý chuyển đổi giao thức theo yêu cầu của client | WebSocket upgrade (`Upgrade: websocket`)           |
| 102  | Processing          | Server đang xử lý request nhưng chưa có response           | WebDAV, long-running operations                    |
| 103  | Early Hints         | Server gửi trước một số headers để client preload          | Preload CSS/JS trước khi response chính hoàn tất   |

> **Vai trò trong API Testing:** 1xx ít gặp trong REST API thông thường, nhưng quan trọng khi test WebSocket (101), upload file lớn (100), hoặc HTTP/2 server push (103). Khi test API gateway/proxy, cần đảm bảo 1xx không bị nuốt bởi middleware.

#### 2xx — Thành công

| Code | Tên             | Ý nghĩa                            | Khi nào dùng               |
| ---- | --------------- | ---------------------------------- | -------------------------- |
| 200  | OK              | Request thành công, có body trả về | GET, PUT, PATCH thành công |
| 201  | Created         | Resource mới được tạo thành công   | POST thành công            |
| 202  | Accepted        | Đã nhận request, đang xử lý async  | Background job, queue      |
| 204  | No Content      | Thành công nhưng không có body     | DELETE thành công          |
| 206  | Partial Content | Trả về một phần dữ liệu            | Download lớn, pagination   |

#### 3xx — Redirection (Chuyển hướng)

| Code | Tên                | Ý nghĩa                                                                     | Khi nào gặp                                               |
| ---- | ------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| 301  | Moved Permanently  | Resource đã chuyển vĩnh viễn sang URL mới                                   | API version migration (`/v1/` → `/v2/`)                   |
| 302  | Found              | Resource tạm thời ở URL khác (có thể thay đổi HTTP method từ POST sang GET) | Redirect tạm thời, OAuth callback                         |
| 303  | See Other          | Response ở URL khác, client nên dùng GET để lấy                             | Sau POST thành công, redirect sang GET resource           |
| 304  | Not Modified       | Resource chưa thay đổi so với cache của client                              | Conditional GET với `If-None-Match` / `If-Modified-Since` |
| 307  | Temporary Redirect | Giống 302 nhưng đảm bảo giữ nguyên method (POST vẫn POST)                   | API proxy, load balancer redirect                         |
| 308  | Permanent Redirect | Giống 301 nhưng đảm bảo giữ nguyên method                                   | Permanent URL migration giữ nguyên method                 |

> **Vai trò trong API Testing:** 3xx rất quan trọng cho:
>
> - **Cache validation**: Test `304 Not Modified` khi client gửi `ETag` / `If-None-Match` — đảm bảo server không trả lại toàn bộ data khi chưa thay đổi
> - **API versioning**: Test redirect `301` khi truy cập endpoint cũ → phải chuyển đúng sang version mới
> - **OAuth flow**: `302 Found` là bước quan trọng trong Authorization Code flow
> - **Client behavior**: Kiểm tra client có follow redirect tự động không, hay cần xử lý thủ công

#### 4xx — Lỗi Client

| Code | Tên                  | Ý nghĩa                                         | Khi nào gặp                            |
| ---- | -------------------- | ----------------------------------------------- | -------------------------------------- |
| 400  | Bad Request          | Request sai cú pháp hoặc thiếu dữ liệu bắt buộc | Gửi sai format JSON, thiếu field       |
| 401  | Unauthorized         | Chưa xác thực hoặc token không hợp lệ           | Không gửi token, token hết hạn         |
| 403  | Forbidden            | Đã xác thực nhưng không có quyền                | User không có quyền xóa bài người khác |
| 404  | Not Found            | Resource không tồn tại                          | GET /users/9999 (không tồn tại)        |
| 405  | Method Not Allowed   | HTTP method không được phép                     | POST vào endpoint chỉ hỗ trợ GET       |
| 409  | Conflict             | Conflict với trạng thái hiện tại                | Tạo user với email đã tồn tại          |
| 422  | Unprocessable Entity | Cú pháp đúng nhưng dữ liệu không hợp lệ         | Validation fails (email sai định dạng) |
| 429  | Too Many Requests    | Vượt quá giới hạn rate limiting                 | Gọi API quá nhiều lần trong 1 phút     |

#### 5xx — Lỗi Server

| Code | Tên                   | Ý nghĩa                                       | Khi nào gặp               |
| ---- | --------------------- | --------------------------------------------- | ------------------------- |
| 500  | Internal Server Error | Lỗi không xác định phía server                | Bug trong code server     |
| 501  | Not Implemented       | Server chưa hỗ trợ chức năng này              | Method chưa implement     |
| 502  | Bad Gateway           | Server nhận phản hồi không hợp lệ từ upstream | Proxy / Load balancer lỗi |
| 503  | Service Unavailable   | Server quá tải hoặc đang bảo trì              | Server down, maintenance  |
| 504  | Gateway Timeout       | Upstream server không phản hồi kịp thời       | Database query timeout    |

---

## 8. Phân biệt API có Authentication và không có Authentication

### 8.1 Tổng quan so sánh

| Tiêu chí                | API Không có Authentication            | API Có Authentication                   |
| ----------------------- | -------------------------------------- | --------------------------------------- |
| **Định nghĩa**          | Endpoint công khai, không cần xác thực | Yêu cầu thông tin xác thực hợp lệ       |
| **Ai có thể truy cập?** | Bất kỳ ai biết URL                     | Chỉ những người có credentials hợp lệ   |
| **Thông tin gửi kèm**   | Không cần thêm gì                      | Token / Key / Username+Password         |
| **Rủi ro bảo mật**      | Cao — dễ bị abuse, scrape, DoS         | Thấp hơn — có thể kiểm soát truy cập    |
| **Phù hợp cho**         | Public data, tài liệu công khai        | Dữ liệu cá nhân, chức năng quan trọng   |
| **Ví dụ thực tế**       | Public weather API, Wikipedia API      | Google Drive API, GitHub API            |
| **HTTP Status khi sai** | N/A                                    | `401 Unauthorized` hoặc `403 Forbidden` |

### 8.2 Sơ đồ luồng xử lý

![So Sánh Luồng Xử Lý API: Có vs. Không Có Authentication](./diagrams/api_auth_flow.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/api_auth_flow.mmd))_

### 8.3 Kiểm thử API Không có Authentication

**Mục tiêu kiểm thử:**

- Xác nhận endpoint trả về dữ liệu đúng mà **không cần gửi bất kỳ header xác thực nào**
- Kiểm tra rate limiting (nếu có)
- Kiểm tra hành vi khi gửi dữ liệu không hợp lệ

**Test cases cần có:**

| TC ID     | Mô tả                            | Input                                    | Expected Output          |
| --------- | -------------------------------- | ---------------------------------------- | ------------------------ |
| TC-PUB-01 | Gọi API không có header xác thực | `GET /api/public/products`               | `200 OK` + data          |
| TC-PUB-02 | Gọi với tham số hợp lệ           | `GET /api/public/products?category=tech` | `200 OK` + filtered data |
| TC-PUB-03 | Gọi với tham số không hợp lệ     | `GET /api/public/products?page=-1`       | `400 Bad Request`        |
| TC-PUB-04 | Gọi với method không được hỗ trợ | `DELETE /api/public/products`            | `405 Method Not Allowed` |

### 8.4 Kiểm thử API Có Authentication

**Test cases cần có:**

| TC ID      | Mô tả                          | Input                                       | Expected Output    |
| ---------- | ------------------------------ | ------------------------------------------- | ------------------ |
| TC-AUTH-01 | Gọi API không có token         | `GET /api/orders` (no headers)              | `401 Unauthorized` |
| TC-AUTH-02 | Gọi API với token hết hạn      | `Authorization: Bearer <expired_token>`     | `401 Unauthorized` |
| TC-AUTH-03 | Gọi API với token không hợp lệ | `Authorization: Bearer invalid123`          | `401 Unauthorized` |
| TC-AUTH-04 | Gọi API với token hợp lệ       | `Authorization: Bearer <valid_token>`       | `200 OK` + data    |
| TC-AUTH-05 | User A xem tài nguyên User B   | `Bearer <user_A_token>` + `GET /orders/B`   | `403 Forbidden`    |
| TC-AUTH-06 | User thường gọi endpoint admin | `Bearer <user_token>` + `GET /admin/users`  | `403 Forbidden`    |
| TC-AUTH-07 | Admin gọi endpoint admin       | `Bearer <admin_token>` + `GET /admin/users` | `200 OK` + data    |
| TC-AUTH-08 | Token đúng nhưng role không đủ | `Bearer <mod_token>` + `GET /admin/delete`  | `403 Forbidden`    |

### 8.5 Authentication vs Authorization — Sự khác biệt

![Authentication vs Authorization — Sự Khác Biệt](./diagrams/auth_vs_authz.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/auth_vs_authz.mmd))_

---

## 9. Các loại Authentication trong API

### 9.1 Bảng so sánh tổng quát

| Phương thức          | Cơ chế hoạt động           | Độ bảo mật | Độ phức tạp | Phù hợp cho                |
| -------------------- | -------------------------- | :--------: | :---------: | -------------------------- |
| **No Auth**          | Không cần xác thực         |  Rất thấp  |  Rất thấp   | Public data, Open APIs     |
| **Basic Auth**       | Username:Password (Base64) |    Thấp    |    Thấp     | Legacy, internal tools     |
| **API Key**          | Static unique string       |    Thấp    |    Thấp     | Public APIs, project-level |
| **Bearer Token/JWT** | Signed token               |    Cao     |    Trung    | Modern web/mobile apps     |
| **OAuth 2.0**        | Delegated access protocol  |  Rất cao   |     Cao     | Third-party integrations   |
| **mTLS**             | Certificate-based          |  Rất cao   |   Rất cao   | Enterprise, microservices  |

### 9.2 No Authentication

- **Mô tả**: Endpoint hoàn toàn công khai, không cần bất kỳ credential nào
- **Ví dụ**: `GET https://api.weather.gov/points/38.8894,-77.0352`
- **Rủi ro**: Dễ bị abuse, scraping, DoS

```http
GET /api/public/weather?city=HoChiMinh HTTP/1.1
Host: api.example.com
```

### 9.3 Basic Authentication

- **Cơ chế**: Mã hóa `username:password` bằng Base64 và gửi trong header
- **Bắt buộc**: Phải dùng HTTPS (vì Base64 không phải mã hóa thực sự)
- **Header**: `Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`

```http
GET /api/protected/data HTTP/1.1
Host: api.example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

> `dXNlcm5hbWU6cGFzc3dvcmQ=` = Base64("username:password")
> **Điểm yếu**: Nếu dùng HTTP (không có S), credential bị lộ hoàn toàn!

### 9.4 API Key

- **Cơ chế**: Server tạo một chuỗi unique, client gửi trong header hoặc query param
- **Đặc điểm**: Long-lived (tồn tại lâu dài), thường dùng để định danh **ứng dụng**

```http
# Cách 1: Trong Header (khuyến nghị)
GET /api/data HTTP/1.1
X-API-Key: sk-1234567890abcdef

# Cách 2: Trong Query Parameter (kém an toàn hơn vì lộ trong URL log)
GET /api/data?api_key=sk-1234567890abcdef HTTP/1.1
```

**Nhược điểm**: Nếu key bị lộ, cần revoke và tạo lại thủ công.

### 9.5 Bearer Token (JWT)

- **Cơ chế**: Sau khi đăng nhập thành công, server cấp token. Client gửi token trong mỗi request.
- **JWT (JSON Web Token)** gồm 3 phần: `Header.Payload.Signature`

![Cấu Trúc JWT (JSON Web Token)](./diagrams/jwt_structure.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/jwt_structure.mmd))_

```http
GET /api/v1/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Ưu điểm**: Stateless, có thể chứa thông tin user (claims), có expiration time (thường 15-60 phút).

#### 9.5.1 Cấu trúc chi tiết JWT

JWT gồm 3 phần, phân tách bởi dấu `.`:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUi...SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
|              Header              |           Payload           |              Signature             |
```

**Header (JOSE Header):**

| Claim | Ý nghĩa                     | Giá trị phổ biến                               |
| ----- | --------------------------- | ---------------------------------------------- |
| `alg` | Thuật toán ký               | `HS256` (HMAC), `RS256` (RSA), `ES256` (ECDSA) |
| `typ` | Loại token                  | `JWT`                                          |
| `kid` | Key ID (khi dùng nhiều key) | `"key-2026-07"`                                |

**Payload (Claims):**

| Loại           | Claim         | Ý nghĩa                                       | Ví dụ               |
| -------------- | ------------- | --------------------------------------------- | ------------------- |
| **Registered** | `sub`         | Subject — ID của user                         | `"42"`              |
| **Registered** | `iss`         | Issuer — ai cấp token                         | `"api.example.com"` |
| **Registered** | `aud`         | Audience — token dành cho ai                  | `"myapp.com"`       |
| **Registered** | `exp`         | Expiration — hết hạn (Unix timestamp)         | `1720098000`        |
| **Registered** | `iat`         | Issued At — thời điểm cấp                     | `1720094400`        |
| **Registered** | `nbf`         | Not Before — không hợp lệ trước thời điểm này | `1720094400`        |
| **Registered** | `jti`         | JWT ID — ID duy nhất của token (chống replay) | `"abc-123-def"`     |
| **Custom**     | `role`        | Vai trò user                                  | `"admin"`           |
| **Custom**     | `permissions` | Danh sách quyền                               | `["read", "write"]` |

**Signature:**

```
HMAC-SHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```

> **Lưu ý**: `base64UrlEncode` khác `base64` thông thường — thay `+` thành `-`, `/` thành `_`, bỏ padding `=`.

#### 9.5.2 Cơ chế Verify JWT

Khi server nhận JWT từ client, quá trình xác thực diễn ra như sau:

![Sơ đồ Cơ chế Verify JWT](./diagrams/jwt_verify_flow.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/jwt_verify_flow.mmd))_

**Test cases cho JWT Verify:**

| TC ID     | Scenario                                                   | Expected                                |
| --------- | ---------------------------------------------------------- | --------------------------------------- |
| TC-JWT-01 | Token hợp lệ, chưa hết hạn                                 | `200 OK`                                |
| TC-JWT-02 | Token hết hạn (`exp` < now)                                | `401 Unauthorized`                      |
| TC-JWT-03 | Sửa payload (thay `role: admin`) nhưng giữ signature cũ    | `401 Unauthorized` (signature mismatch) |
| TC-JWT-04 | Token với `alg: none` (downgrade attack)                   | `401 Unauthorized`                      |
| TC-JWT-05 | Token với `iss` sai                                        | `401 Unauthorized`                      |
| TC-JWT-06 | Token với `aud` không phải app hiện tại                    | `401 Unauthorized`                      |
| TC-JWT-07 | Token RS256 bị đổi sang HS256 (Algorithm Confusion Attack) | `401 Unauthorized`                      |

> **Chi tiết về Algorithm Confusion Attack (Key Confusion)**:
>
> - **Cơ chế**: Lỗi xảy ra khi máy chủ cấu hình hỗ trợ cả thuật toán bất đối xứng như `RS256` (sử dụng khóa Private Key để ký và khóa công khai Public Key công bố rộng rãi để xác thực) lẫn thuật toán đối xứng như `HS256` (sử dụng cùng một khóa bí mật Secret Key cho cả việc ký và xác thực).
> - **Cách tấn công**: Kẻ tấn công thu thập Public Key của thuật toán `RS256` từ endpoint công khai, sau đó dùng Public Key này làm Secret Key đối xứng để ký token giả mạo bằng thuật toán `HS256` và thay đổi trường `"alg": "HS256"` trong Header.
> - **Hệ quả**: Khi nhận token, Server đọc trường `"alg": "HS256"`. Do logic xác thực phía Server bị sai sót, nó nạp Public Key (vốn có dạng một chuỗi văn bản thông thường) rồi dùng hàm xác thực đối xứng HMAC-SHA256 để kiểm chứng chữ ký. Kết quả là chữ ký trùng khớp và token giả mạo được chấp nhận.
> - **Khắc phục**: Thiết lập cấu hình cứng thuật toán xác thực (ví dụ: chỉ cho phép `RS256`) và tách biệt hoàn toàn các hàm xử lý khóa bí mật/khóa công khai.

#### 9.5.3 Access Token vs Refresh Token

| Tiêu chí             | Access Token                | Refresh Token                       |
| -------------------- | --------------------------- | ----------------------------------- |
| **Mục đích**         | Truy cập API resources      | Lấy access token mới khi hết hạn    |
| **Thời gian sống**   | Ngắn: 15-60 phút            | Dài: 7-30 ngày                      |
| **Nơi lưu trữ**      | Memory / httpOnly cookie    | httpOnly cookie (secure, SameSite)  |
| **Gửi kèm request?** | Có — trong mỗi API call     | Không — chỉ khi cần refresh         |
| **Khi bị đánh cắp**  | Rủi ro thấp (sớm hết hạn)   | Rủi ro cao (cần revoke ngay)        |
| **Chứa claims?**     | Có (user info, permissions) | Thường không (chỉ có user ID + jti) |

**Luồng Refresh Token:**

![Sơ đồ Luồng Refresh Token](./diagrams/jwt_refresh_flow.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/jwt_refresh_flow.mmd))_

> **Refresh Token Rotation**: Mỗi lần dùng refresh token, server cấp refresh token MỚI và vô hiệu hóa cái cũ. Nếu attacker dùng refresh token cũ → server phát hiện bất thường → revoke tất cả tokens của user.

#### 9.5.4 Security Best Practices cho JWT

| #   | Best Practice                                                         | Lý do                                                                         | Sai lầm phổ biến                                        |
| --- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | Dùng **RS256** (asymmetric) thay **HS256** (symmetric) cho production | RS256: chỉ server có private key để ký, ai cũng có thể verify bằng public key | Dùng HS256 → nếu lộ secret, attacker có thể tạo token   |
| 2   | **Không lưu token trong localStorage**                                | localStorage accessible từ JavaScript → dễ bị XSS đánh cắp                    | `localStorage.setItem('token', ...)` → XSS steal        |
| 3   | Dùng **httpOnly + Secure + SameSite cookie**                          | httpOnly: JS không đọc được; Secure: chỉ HTTPS; SameSite: chống CSRF          | Lưu token trong cookie thường (không httpOnly)          |
| 4   | **Set `exp` ngắn** (15-30 phút)                                       | Giảm window of attack nếu token bị lộ                                         | `exp` = 24h hoặc 7 ngày                                 |
| 5   | **Validate `iss` + `aud`** ở server                                   | Chống token từ server khác được dùng ở server này                             | Chỉ verify signature, bỏ qua iss/aud                    |
| 6   | **Không đặt sensitive data** trong payload                            | Payload chỉ encoded (base64), KHÔNG encrypted — ai cũng decode được           | Đặt password, credit card trong payload                 |
| 7   | Implement **token blacklist/revocation**                              | JWT stateless → không thể "logout" nếu không có blacklist                     | Không có cách revoke token khi user đổi password        |
| 8   | Chống **`alg: none` attack**                                          | Attacker set algorithm = none → bypass signature verification                 | Server chấp nhận bất kỳ `alg` value nào                 |
| 9   | Chống **Algorithm Confusion**                                         | Tránh trường hợp attacker đổi alg từ RS256 sang HS256 và ký bằng public key   | Server tin tưởng hoàn toàn vào field `alg` trong Header |

> **Lưu ý quan trọng**: JWT **KHÔNG** mã hóa dữ liệu. Payload chỉ được base64url-encode — bất kỳ ai có token đều có thể decode và đọc nội dung. Nếu cần mã hóa, sử dụng **JWE (JSON Web Encryption)** thay vì JWS (JSON Web Signature).

### 9.6 OAuth 2.0

- **Cơ chế**: Giao thức ủy quyền cho phép ứng dụng bên thứ ba truy cập tài nguyên mà không cần mật khẩu người dùng
- **Ví dụ**: "Đăng nhập bằng Google" trên ứng dụng bên thứ ba

**Luồng Authorization Code (phổ biến nhất):**

![OAuth 2.0 — Authorization Code Flow](./diagrams/oauth2_flow.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/oauth2_flow.mmd))_

**Các Grant Types:**

| Grant Type              | Dùng cho                              |
| ----------------------- | ------------------------------------- |
| Authorization Code      | Web apps, Mobile apps (phổ biến nhất) |
| Client Credentials      | Server-to-server (không có user)      |
| Implicit                | Legacy SPAs (deprecated)              |
| Resource Owner Password | Legacy, không khuyến khích            |

### 9.7 mTLS (Mutual TLS)

- **Cơ chế**: Cả client **và** server đều phải cung cấp certificate để xác thực lẫn nhau — khác với TLS thông thường chỉ server xác thực với client
- **Phù hợp cho**: Hệ thống enterprise, microservices nội bộ, machine-to-machine (M2M) communication
- **Độ bảo mật**: Cao nhất — không thể giả mạo nếu không có certificate hợp lệ

**Luồng xác thực mTLS:**

![Luồng Xác Thực mTLS (Mutual TLS) — 9 Bước](./diagrams/mtls_flow.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/mtls_flow.mmd))_

**Ví dụ cấu hình (curl):**

```bash
curl --cert client.crt \
     --key client.key \
     --cacert ca.crt \
     https://internal-api.example.com/data
```

**So sánh TLS vs mTLS:**

| Tiêu chí            | TLS (1 chiều)                | mTLS (2 chiều)                    |
| ------------------- | ---------------------------- | --------------------------------- |
| Server xác thực     | Có                           | Có                                |
| Client xác thực     | Không                        | Có (bằng client certificate)      |
| Phù hợp cho         | Web/Mobile apps thông thường | Internal APIs, Microservices, IoT |
| Quản lý certificate | Chỉ server                   | Cả server và client               |
| Overhead            | Thấp                         | Cao hơn (quản lý cert phức tạp)   |

> **Lưu ý thực tế**: mTLS phổ biến trong Kubernetes service mesh (Istio, Linkerd), API gateway nội bộ, và các hệ thống tài chính/ngân hàng yêu cầu bảo mật cao.

**Nhược điểm:**

- Phức tạp trong việc quản lý vòng đời certificate (rotation, revocation)
- Không phù hợp với API công khai vì đòi hỏi client phải có certificate
- Chi phí hạ tầng PKI (Public Key Infrastructure) cao

---

## 10. Phân loại API Testing

### 10.1 Theo mục đích kiểm thử

![Phân Loại API Testing](./diagrams/api_testing_categories.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/api_testing_categories.mmd))_

### 10.2 Functional Testing

**Positive Testing (Happy Path):**

- Gửi request với đầy đủ dữ liệu hợp lệ
- Xác nhận status code đúng (200, 201...)
- Xác nhận cấu trúc và giá trị response body
- Xác nhận headers phản hồi

**Negative Testing (Error Path):**

- Thiếu field bắt buộc → `400 Bad Request`
- Sai kiểu dữ liệu (string thay vì integer) → `400/422`
- Vượt quá giới hạn ký tự → `400/422`
- Gửi null/empty → phải xử lý đúng
- Method không được phép → `405 Method Not Allowed`

### 10.3 Security Testing (OWASP API Security Top 10 — 2023)

> **Nguồn:** [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x00-header/)

| #   | Vulnerability                          | Mô tả                                  | Test cần làm                        |
| --- | -------------------------------------- | -------------------------------------- | ----------------------------------- |
| 1   | Broken Object Level Authorization      | Truy cập resource của user khác (IDOR) | Thay đổi ID trong URL               |
| 2   | Broken Authentication                  | Token bypass, weak credentials         | Test expired/invalid tokens         |
| 3   | Broken Object Property Level Auth      | Nhận field nhạy cảm không được phép    | Kiểm tra response không lộ password |
| 4   | Unrestricted Resource Consumption      | DoS qua request lớn                    | Fuzz testing với payload lớn        |
| 5   | Broken Function Level Authorization    | User thường gọi API admin              | Test RBAC bypasses                  |
| 6   | Unrestricted Access to Sensitive Flows | Abuse business logic                   | Race conditions, mass enrollment    |
| 7   | Server Side Request Forgery (SSRF)     | API gọi đến URL do attacker kiểm soát  | Gửi URL nội bộ trong body           |
| 8   | Security Misconfiguration              | Debug mode on, CORS wildcard           | Kiểm tra headers, options           |
| 9   | Improper Inventory Management          | Shadow APIs, outdated endpoints        | Kiểm tra tất cả endpoints           |
| 10  | Unsafe Consumption of APIs             | Tin tưởng mù quáng vào API bên thứ ba  | Validate third-party responses      |

#### 10.3.1 Các kịch bản và Script kiểm thử bảo mật API trong thực tế (Demo)

##### A. Kiểm thử JWT Token Manipulation (Bypass Auth)

Kịch bản giả lập kẻ tấn công giải mã phần Payload của JWT Token, sửa đổi vai trò thành `admin` hoặc đổi ID người dùng để chiếm quyền truy cập, sau đó gửi lại request với token đã sửa đổi lên server.

```javascript
// Postman Pre-request Script (Giả lập chỉnh sửa token của kẻ tấn công)
// (Lưu ý: trên thực tế, server bắt buộc phải từ chối vì chữ ký Signature không còn khớp)
const originalToken = pm.environment.get('authToken');
if (originalToken) {
  const parts = originalToken.split('.');
  const header = parts[0];
  const signature = parts[2];

  // Decode, chỉnh sửa payload và encode lại
  const rawPayload = JSON.parse(atob(parts[1]));
  rawPayload.sub = '999'; // Giả danh user 999
  rawPayload.role = 'admin'; // Tự nâng quyền lên admin

  const tamperedPayloadB64 = btoa(JSON.stringify(rawPayload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'); // Chuyển sang Base64Url format

  const tamperedToken = `${header}.${tamperedPayloadB64}.${signature}`;
  pm.environment.set('tamperedToken', tamperedToken);
}
```

```javascript
// Postman Tests Script (Xác nhận server chặn thành công token giả mạo)
pm.test('Server rejects tampered token with signature mismatch', function () {
  pm.response.to.have.status(401); // Hoặc 403 tùy theo cài đặt của server
  pm.expect(pm.response.json().message).to.include('invalid token');
});
```

##### B. Kiểm thử Rate Limiting (Giới hạn tần suất gọi API)

Kịch bản kiểm tra xem API có chặn việc spam request liên tiếp nhằm tránh DoS hay càn quét dữ liệu (scraping) bằng cách phản hồi mã lỗi `429 Too Many Requests` kèm Header `Retry-After`.

```javascript
// Kịch bản cấu hình Collection Runner chạy lặp (ví dụ: lặp 20 lần)
const currentIteration = pm.info.iteration; // Số lượt lặp hiện tại (0-indexed)
const maxAllowedWithoutLimit = 10; // Server quy định giới hạn 10 req/phút

if (currentIteration < maxAllowedWithoutLimit) {
  pm.test('Rate limit not exceeded yet - Expect 200 OK', function () {
    pm.response.to.have.status(200);
  });
} else {
  pm.test('Rate limit triggered - Expect 429 Too Many Requests', function () {
    pm.response.to.have.status(429);
    pm.test('Headers must contain Retry-After', function () {
      pm.expect(pm.response.headers.has('Retry-After')).to.be.true;
    });
  });
}
```

##### C. Kiểm thử Mass Assignment Attack

Kịch bản kẻ tấn công cố tình chèn thêm các thuộc tính nhạy cảm không được expose ra giao diện (như `"role": "admin"`, `"is_verified": true`) vào trong request tạo mới hoặc cập nhật profile nhằm làm thay đổi dữ liệu trái phép trong database.

```http
# HTTP Request Body gửi đi bởi Attacker
PATCH /api/v1/users/42
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "name": "Nguyen Van A",
  "email": "a@example.com",
  "role": "admin",
  "is_verified": true,
  "credit": 999999
}
```

```javascript
// Postman Tests Script
pm.test('Server ignores unauthorized parameters during mass assignment', function () {
  pm.response.to.have.status(200);
  const json = pm.response.json();

  // Đảm bảo các trường nhạy cảm không bị thay đổi bởi request
  pm.expect(json.role).to.equal('user'); // Quyền hạn vẫn phải là 'user'
  pm.expect(json.is_verified).to.not.equal(true);
  pm.expect(json.credit).to.not.equal(999999);
});
```

---

## 11. Kỹ thuật Boundary Value Analysis (BVA) trong API Testing

Boundary Value Analysis (Phân tích giá trị biên) là kỹ thuật kiểm thử tập trung vào các giá trị tại **ranh giới** (boundary) của miền dữ liệu hợp lệ. Lỗi phần mềm thường xảy ra tại các điểm biên nhiều hơn ở giữa miền — do sai điều kiện `<` vs `<=`, off-by-one errors, hoặc thiếu validation.

### 11.1 Nguyên tắc BVA

Với mỗi miền giá trị `[min, max]`, cần test tại **6 điểm**:

![Sơ đồ Nguyên tắc Phân tích Giá trị Biên BVA](./diagrams/bva_principles.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/bva_principles.mmd))_

### 11.2 Áp dụng BVA cho API Testing

BVA không chỉ dành cho UI — áp dụng trực tiếp vào API test với các trường có giới hạn:

| Field                         | Min             | Max       | Test Points (giá trị cần test)                             |
| ----------------------------- | --------------- | --------- | ---------------------------------------------------------- |
| `age` (integer)               | 0               | 120       | -1, 0, 1, 119, 120, 121                                    |
| `name` (string, max 50 chars) | 1 char          | 50 chars  | 0 chars (empty), 1 char, 49 chars, 50 chars, 51 chars      |
| `price` (decimal)             | 0.01            | 999999.99 | 0, 0.01, 0.02, 999999.98, 999999.99, 1000000               |
| `page` (pagination)           | 1               | N/A       | 0, 1, 2, max_int                                           |
| `limit` (pagination)          | 1               | 100       | 0, 1, 2, 99, 100, 101                                      |
| `email` (max 254 chars)       | 3 chars (`a@b`) | 254 chars | 2 chars, 3 chars, 4 chars, 253 chars, 254 chars, 255 chars |
| `password` (min 8, max 64)    | 8 chars         | 64 chars  | 7 chars, 8 chars, 9 chars, 63 chars, 64 chars, 65 chars    |

### 11.3 Ví dụ test case BVA cho API

```http
# BVA cho pagination — field "page"
GET /api/products?page=0&limit=10   → 400 Bad Request (page min = 1, 0 < min)
GET /api/products?page=1&limit=10   → 200 OK (min boundary, valid)
GET /api/products?page=2&limit=10   → 200 OK (min+1, valid)

# BVA cho pagination — field "limit"
GET /api/products?page=1&limit=0    → 400 Bad Request (limit min = 1, 0 < min)
GET /api/products?page=1&limit=1    → 200 OK (min boundary, valid)
GET /api/products?page=1&limit=100  → 200 OK (max boundary, valid)
GET /api/products?page=1&limit=101  → 400 Bad Request (limit max = 100, 101 > max)

# BVA cho field "name" (max 50 characters)
POST /api/users  Body: {"name": ""}                → 400/422 (empty, below min)
POST /api/users  Body: {"name": "A"}               → 201 Created (1 char, min boundary)
POST /api/users  Body: {"name": "A" × 50}          → 201 Created (50 chars, max boundary)
POST /api/users  Body: {"name": "A" × 51}          → 400/422 (51 chars, exceeds max)

# BVA cho field "age" (min 0, max 120)
POST /api/users  Body: {"age": -1}                 → 400/422 (below min)
POST /api/users  Body: {"age": 0}                  → 201 Created (min boundary)
POST /api/users  Body: {"age": 120}                → 201 Created (max boundary)
POST /api/users  Body: {"age": 121}                → 400/422 (above max)
```

> **Phân biệt việc sử dụng mã 400 vs 422 trong xác thực biên**:
>
> - **`400 Bad Request`**: Dùng khi yêu cầu (Request) sai cú pháp hoàn toàn (Malformed JSON, ví dụ thiếu dấu phẩy `,`, dấu ngoặc `{`, hoặc payload không đọc được).
> - **`422 Unprocessable Entity`**: Dùng khi yêu cầu đúng cú pháp nhưng dữ liệu bên trong không hợp lý (Semantic validation error, ví dụ: JSON hợp lệ nhưng email sai định dạng, `age = -1`, hoặc `quantity = 101`). Rất nhiều framework hiện đại (như FastAPI, NestJS, Ruby on Rails) mặc định trả về `422` cho lỗi kiểm thực dữ liệu biên để giúp phân biệt với lỗi cú pháp `400`.

### 11.4 Kịch bản kiểm thử biên phổ biến trong API

| Kịch bản                | Mô tả                                                     | Expected Behavior                                |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| **Empty string**        | Gửi `""` cho field bắt buộc                               | `400/422` — field không được rỗng                |
| **Null value**          | Gửi `null` cho field bắt buộc                             | `400/422` — field bắt buộc                       |
| **Missing field**       | Không gửi field bắt buộc trong body                       | `400/422` — thiếu field                          |
| **Chuỗi cực dài**       | Gửi string 10,000+ ký tự                                  | `400/413` — payload quá lớn hoặc vượt max length |
| **Số âm**               | Gửi số âm cho field chỉ chấp nhận dương (price, quantity) | `400/422` — giá trị không hợp lệ                 |
| **Số cực lớn**          | Gửi `2147483648` (overflow int32) hoặc `9999999999999`    | `400/422` hoặc server xử lý đúng                 |
| **Số thập phân**        | Gửi `1.5` cho field integer                               | `400/422` — sai kiểu dữ liệu                     |
| **Unicode/Emoji**       | Gửi `"Nguyễn 😀"` cho field name                          | Server xử lý đúng encoding hoặc reject           |
| **SQL Injection**       | Gửi `"1 OR 1=1"` trong field id                           | `400` — input bị từ chối hoặc escape             |
| **XSS payload**         | Gửi `"<script>alert(1)</script>"` trong field text        | Payload bị sanitize, không execute               |
| **Special characters**  | Gửi `"name": "O'Brien"`, `"path": "../../../etc/passwd"`  | Server escape đúng, không bị path traversal      |
| **Array size**          | Gửi array rỗng `[]` hoặc array 10,000 items               | `400/422` — validate min/max items               |
| **Nested depth**        | JSON lồng nhau 100 levels                                 | `400/413` — chống DoS qua deep nesting           |
| **Concurrent boundary** | 2 request cùng tạo resource cuối cùng (limit = max)       | Chỉ 1 thành công, 1 trả `409 Conflict`           |

### 11.5 Postman Script cho BVA Testing

```javascript
// Test BVA cho field "age" — min boundary
pm.test('Age = 0 (min boundary) should be accepted', () => {
  pm.response.to.have.status(201);
  pm.expect(pm.response.json().age).to.equal(0);
});

// Test BVA cho field "age" — below min
pm.test('Age = -1 (below min) should be rejected', () => {
  pm.response.to.have.status(422);
  const json = pm.response.json();
  pm.expect(json.errors).to.be.an('array');
  pm.expect(json.errors[0].field).to.equal('age');
});

// Test BVA cho field "name" — max boundary
pm.test('Name with 50 chars (max boundary) should be accepted', () => {
  pm.response.to.have.status(201);
  pm.expect(pm.response.json().name).to.have.lengthOf(50);
});

// Test BVA cho field "name" — above max
pm.test('Name with 51 chars (above max) should be rejected', () => {
  pm.response.to.have.status(422);
});
```

---

## 12. Kỹ thuật Equivalence Partitioning (Phân vùng tương đương) trong API Testing

Equivalence Partitioning (Phân vùng tương đương - EP) là kỹ thuật kiểm thử hộp đen trong đó dữ liệu đầu vào được chia thành các phân vùng (lớp) tương đương. Theo nguyên lý, các phần tử trong cùng một lớp sẽ có hành vi xử lý giống nhau bởi hệ thống. Do đó, chỉ cần chọn một phần tử đại diện của mỗi lớp để kiểm thử.

Sử dụng EP giúp giảm đáng kể số lượng test case cần chạy mà vẫn đảm bảo kiểm thử toàn diện các tình huống hợp lệ (Valid Partition) và không hợp lệ (Invalid Partition).

![Sơ đồ Phân loại Phân vùng Tương đương EP](./diagrams/equivalence_partitioning.png)  
_([Mã nguồn Mermaid](./diagrams/mermaid/equivalence_partitioning.mmd))_

### 12.1 Sự kết hợp giữa EP và BVA

EP và BVA (Boundary Value Analysis) là hai kỹ thuật luôn đi đôi với nhau:

- **EP** xác định các nhóm dữ liệu rộng.
- **BVA** tập trung vào các điểm ranh giới nhạy cảm giữa các nhóm dữ liệu đó.

### 12.2 Phân vùng tương đương cho dữ liệu API

Đối với các tham số trong API (Query Params, Path Params, Request Body), chúng ta phân chia phân vùng tương đương dựa trên kiểu dữ liệu và ràng buộc validation:

#### 12.2.1 Kiểu String (Email, Mật khẩu, Mã định danh)

- **Valid Partitions**: Đúng định dạng (RFC email), độ dài nằm trong khoảng cho phép, chứa các ký tự hợp lệ.
- **Invalid Partitions**: Thiếu ký tự bắt buộc (như `@` hoặc domain trong email), quá ngắn/quá dài, chứa ký tự đặc biệt bị cấm.

#### 12.2.2 Kiểu số (Giá cả, Số lượng, Tuổi)

- **Valid Partitions**: Số dương nằm trong khoảng hợp lệ.
- **Invalid Partitions**: Số âm, số bằng 0 (nếu không được phép), số quá lớn vượt quá giới hạn thiết kế (Overflow), hoặc giá trị không phải là số (non-numeric).

#### 12.2.3 Kiểu Enum / Loại tài nguyên (User Roles, Status)

- **Valid Partitions**: Thuộc danh sách các giá trị được định nghĩa trước (ví dụ: `["admin", "user", "moderator"]`).
- **Invalid Partitions**: Giá trị không nằm trong danh sách enum (ví dụ: `"guest"`, `"superadmin"`).

### 12.3 Bảng Phân vùng Tương đương mẫu cho API

Dưới đây là ma trận phân tích EP mẫu áp dụng cho các trường đầu vào của API:

| Tên trường | Ràng buộc dữ liệu                                   | Phân vùng hợp lệ (Valid)          | Phân vùng không hợp lệ (Invalid)                                                                          | Giá trị test đại diện                                                                                                                             |
| :--------- | :-------------------------------------------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `email`    | String, RFC format, bắt buộc                        | Định dạng email chuẩn             | 1. Không có ký tự `@`<br>2. Thiếu phần domain<br>3. Thiếu phần tên cục bộ (local name)<br>4. Rỗng (Empty) | 1. `test@example.com` (Valid)<br>2. `testexample.com` (Invalid)<br>3. `test@` (Invalid)<br>4. `@example.com` (Invalid)<br>5. `""` (Invalid)       |
| `password` | String, độ dài \[8-20\], chứa ít nhất 1 chữ hoa, 1 số | Chứa đủ chữ hoa, số và dài \[8-20\] | 1. Chỉ chứa chữ thường<br>2. Không chứa số<br>3. Độ dài < 8 ký tự<br>4. Độ dài > 20 ký tự                 | 1. `Secure123` (Valid)<br>2. `secureone` (Invalid)<br>3. `SecureLetter` (Invalid)<br>4. `Sec1` (Invalid)<br>5. `SecurePasswordLong1234` (Invalid) |
| `status`   | Enum: `["active", "pending", "suspended"]`          | Bất kỳ giá trị nào trong enum     | 1. Chuỗi ngoài enum<br>2. Kiểu dữ liệu số                                                                 | 1. `"active"` (Valid)<br>2. `"guest"` (Invalid)<br>3. `123` (Invalid)                                                                             |
| `quantity` | Integer, \[1 - 100\]                                  | Giá trị số nguyên từ 1 đến 100    | 1. Số âm hoặc bằng 0<br>2. Số lớn hơn 100<br>3. Số thập phân<br>4. Chuỗi không phải là số                 | 1. `50` (Valid)<br>2. `-5` (Invalid), `0` (Invalid)<br>3. `105` (Invalid)<br>4. `15.5` (Invalid)<br>5. `"ten"` (Invalid)                          |

### 12.4 Ví dụ thực tế Test Cases áp dụng EP cho API

```http
# --- VALID PARTITION TEST ---
POST /api/v1/users
Content-Type: application/json

{
  "email": "quoctan@hcmus.edu.vn",
  "password": "Password99",
  "status": "pending",
  "quantity": 10
}
# Expected: 201 Created (Tất cả tham số đều nằm trong phân vùng hợp lệ)

# --- INVALID PARTITION TEST (EMAIL WRONG FORMAT) ---
POST /api/v1/users
Content-Type: application/json

{
  "email": "quoctanhcmus.edu.vn",
  "password": "Password99",
  "status": "pending",
  "quantity": 10
}
# Expected: 422 Unprocessable Entity hoặc 400 Bad Request

# --- INVALID PARTITION TEST (STATUS OUT OF ENUM) ---
POST /api/v1/users
Content-Type: application/json

{
  "email": "quoctan@hcmus.edu.vn",
  "password": "Password99",
  "status": "archived",
  "quantity": 10
}
# Expected: 400 Bad Request
```

### 12.5 Postman Assertions cho EP Testing

Sử dụng Postman script để tự động xác thực các phân vùng hợp lệ và không hợp lệ:

```javascript
// Postman Assertions cho Valid Partition Response
pm.test('Create User thành công với phân vùng hợp lệ', function () {
  pm.response.to.have.status(201);
  const responseJson = pm.response.json();
  pm.expect(responseJson.email).to.equal('quoctan@hcmus.edu.vn');
  pm.expect(responseJson.status).to.be.oneOf(['active', 'pending', 'suspended']);
});

// Postman Assertions cho Invalid Partition Response
pm.test('Server từ chối yêu cầu do email sai định dạng', function () {
  pm.response.to.have.status(400); // Hoặc 422
  const responseJson = pm.response.json();
  pm.expect(responseJson.message).to.include('invalid email format');
});
```

## 13. Kỹ thuật Data-Driven Testing (Kiểm thử hướng dữ liệu) trong API Testing

### 13.1 Khái niệm Data-Driven Testing (DDT)

**Data-Driven Testing (DDT)** hay kiểm thử hướng dữ liệu là một kỹ thuật thiết kế và thực thi kiểm thử trong đó các kịch bản kiểm thử (test scripts) được tách biệt hoàn toàn khỏi dữ liệu kiểm thử (test data).

Thay vì hardcode (viết cứng) các giá trị đầu vào và kết quả mong đợi trong mã nguồn kiểm thử, chúng ta lưu trữ các bộ dữ liệu này ở một nguồn bên ngoài (như tệp CSV, JSON, database, hoặc Excel). Khi chạy kiểm thử, công cụ kiểm thử sẽ tải dữ liệu này, lặp qua từng dòng dữ liệu và truyền vào test script để thực thi API request tương ứng.

```mermaid
graph TD
    DataFile[Tệp Dữ Liệu Ngoài <br> CSV / JSON] -->|Đọc từng dòng dữ liệu| TestRunner[Test Runner <br> Postman / Newman / Pytest]
    TestRunner -->|Truyền biến vào request| APIReq[HTTP Request]
    APIReq -->|Gọi API| TargetAPI[Target API Server]
    TargetAPI -->|Trả Response| TestRunner
    TestRunner -->|Xác thực bằng expected_status| Assertions[Xác Thực Kết Quả]
```

### 13.2 Lợi ích của Data-Driven Testing

- **Tách biệt mối quan tâm (Separation of Concerns):** Tester tập trung thiết kế bộ dữ liệu test phong phú mà không cần sửa đổi mã kiểm thử.
- **Tái sử dụng mã nguồn kiểm thử:** Một test script đơn lẻ có thể chạy hàng trăm, hàng ngàn lần với các bộ dữ liệu đầu vào khác nhau (như test các phân vùng tương đương hay các điểm biên).
- **Dễ bảo trì:** Khi API thay đổi logic validation, chỉ cần cập nhật test script ở một nơi duy nhất. Khi cần thêm kịch bản mới, chỉ cần thêm dòng dữ liệu vào tệp CSV/JSON.
- **Tăng diện phủ kiểm thử (Test Coverage):** Cho phép kiểm thử đồng thời nhiều kịch bản biên, kịch bản lỗi, phân quyền người dùng (User Role matrix) một cách nhanh chóng.

### 13.3 Tổ chức dữ liệu kiểm thử (CSV / JSON)

#### Ví dụ tệp CSV kiểm thử API Login (`login_test_data.csv`):

```csv
username,password,expected_status,description
admin,Admin@123,200,Đăng nhập admin thành công
user1,Pass@123,200,Đăng nhập user thành công
,Pass@123,400,Thiếu username
admin,,400,Thiếu password
wrong_user,wrong_pass,401,Sai thông tin đăng nhập
admin,expired_pass,401,Tài khoản hết hạn mật khẩu
```

#### Ví dụ tệp JSON tương ứng (`login_test_data.json`):

```json
[
  {
    "username": "admin",
    "password": "Admin@123",
    "expected_status": 200,
    "description": "Đăng nhập admin thành công"
  },
  {
    "username": "",
    "password": "Pass@123",
    "expected_status": 400,
    "description": "Thiếu username"
  }
]
```

### 13.4 Triển khai DDT trong Postman và Newman

#### Bước 1: Tham số hóa Request Body trong Postman

Sử dụng cú pháp hai dấu ngoặc nhọn `{{variable}}` để tự động map các cột từ file dữ liệu vào HTTP Request Payload:

```json
{
  "email": "{{username}}",
  "password": "{{password}}"
}
```

#### Bước 2: Viết mã khẳng định (Assertions) động trong tab "Tests"

Sử dụng đối tượng `pm.iterationData.get()` để truy xuất giá trị mong đợi ứng với từng lượt lặp:

```javascript
// Đọc mã trạng thái mong đợi từ file dữ liệu
const expectedStatus = parseInt(pm.iterationData.get('expected_status'));
const description = pm.iterationData.get('description');

pm.test(`TC - ${description} - Trả về mã trạng thái ${expectedStatus}`, function () {
  pm.response.to.have.status(expectedStatus);
});
```

#### Bước 3: Thực thi tự động hóa với Newman CLI

Chạy kiểm thử hướng dữ liệu trong CI/CD pipeline bằng cách truyền tham số `-d` hoặc `--iteration-data` trỏ đến tệp CSV/JSON chứa dữ liệu kiểm thử:

```bash
newman run my_collection.json \
  -e environment.json \
  -d login_test_data.csv \
  -r cli,htmlextra
```

---

## 14. Kỹ thuật Decision Table Testing (Bảng quyết định) trong API Testing

### 14.1 Khái niệm

**Decision Table Testing (Kiểm thử Bảng quyết định)** là một kỹ thuật thiết kế test case hộp đen hệ thống, đặc biệt hữu ích khi kiểm thử các API có chứa **quy tắc nghiệp vụ phức tạp** (complex business logic) phụ thuộc vào sự kết hợp của nhiều điều kiện đầu vào khác nhau.

Bảng quyết định bao gồm:

- **Conditions (Các điều kiện/Đầu vào):** Các biến số hoặc tham số nhận được trong Request (Query Params, Request Body, Headers).
- **Actions (Các hành động/Kết quả mong đợi):** Phản hồi từ API (HTTP Status Code, Response Body, Error Messages, thay đổi trạng thái trong database).
- **Rules (Quy tắc):** Các cột đại diện cho một sự kết hợp cụ thể của các điều kiện và các hành động tương ứng.

### 14.2 Ứng dụng vào API Testing

Ví dụ kịch bản API thanh toán đặt hàng `POST /api/v1/checkout`:

- **Đầu vào (Conditions):**
  - Giỏ hàng có hợp lệ? (Cart Valid - True/False)
  - Mã giảm giá hợp lệ? (Promo Code Valid - True/False/None)
  - Đủ số lượng tồn kho? (In Stock - True/False)
- **Đầu ra mong đợi (Actions):**
  - Mã HTTP trả về (200 / 400 / 409 / 422)
  - Tạo đơn hàng thành công? (True/False)
  - Áp dụng giảm giá? (True/False)

### 14.3 Bảng quyết định cho API `POST /api/v1/checkout`

| Thành phần     | Tham số / Kết quả                 |     Rule 1     |        Rule 2        |     Rule 3     |           Rule 4            |           Rule 5            |     Rule 6     |
| :------------- | :-------------------------------- | :------------: | :------------------: | :------------: | :-------------------------: | :-------------------------: | :------------: |
| **Conditions** | Giỏ hàng hợp lệ (Cart Valid)?     |     False      |         True         |      True      |            True             |            True             |      True      |
|                | Mã giảm giá hợp lệ (Promo Valid)? |      N/A       |        False         |      True      |            True             |            None             |      None      |
|                | Đủ tồn kho (In Stock)?            |      N/A       |         N/A          |     False      |            True             |            True             |     False      |
| **Actions**    | HTTP Status Code                  |     `400`      |        `422`         |     `409`      |            `200`            |            `200`            |     `409`      |
|                | Tạo đơn hàng thành công?          |       No       |          No          |       No       |             Yes             |             Yes             |       No       |
|                | Áp dụng giảm giá?                 |       No       |          No          |       No       |             Yes             |             No              |       No       |
|                | Thông điệp phản hồi (Message)     | "Invalid cart" | "Invalid promo code" | "Out of stock" | "Order placed successfully" | "Order placed successfully" | "Out of stock" |

### 14.4 Ví dụ thực tế Test Cases trong Postman

```javascript
// Test Rule 4: Happy path (Đầy đủ điều kiện)
pm.test('Rule 4 - Happy path: Order placed with promo code successfully', function () {
  pm.response.to.have.status(200);
  const json = pm.response.json();
  pm.expect(json.order_created).to.be.true;
  pm.expect(json.discount_applied).to.be.true;
  pm.expect(json.message).to.equal('Order placed successfully');
});

// Test Rule 3: Out of stock
pm.test('Rule 3 - Out of stock: Order rejected with 409 Conflict', function () {
  pm.response.to.have.status(409);
  pm.expect(pm.response.json().message).to.equal('Out of stock');
});
```

---

## 15. Kỹ thuật Pairwise Testing (Kiểm thử cặp) trong API Testing

### 15.1 Khái niệm

**Pairwise Testing (All-Pairs Testing - Kiểm thử cặp)** là một kỹ thuật kiểm thử tổ hợp dựa trên nguyên lý thực nghiệm: hầu hết các lỗi phần mềm đều do sự tương tác giữa **tối đa 2 tham số đầu vào** gây ra.

Thay vì kiểm thử tất cả các tổ hợp có thể (Exhaustive Testing - vốn cực kỳ tốn kém và bất khả thi khi số lượng tham số lớn), Pairwise Testing chỉ thiết kế các test case sao cho **mọi cặp giá trị đầu vào** của các tham số đều được kiểm thử ít nhất một lần.

### 15.2 Ứng dụng vào API Testing

Trong API Testing, Pairwise thường được dùng để kiểm thử các API tìm kiếm hoặc lọc dữ liệu phức tạp (ví dụ: `GET /api/products/search`) có nhiều Query Parameters tùy chọn:

- `category` (3 giá trị: Electronics, Clothing, Home)
- `price_range` (2 giá trị: Low, High)
- `sort` (2 giá trị: Popularity, Price)
- `shipping` (2 giá trị: Free, Standard)

Số tổ hợp đầy đủ: $3 \times 2 \times 2 \times 2 = 24$ test cases.
Áp dụng thuật toán Pairwise, số kịch bản cần test giảm xuống chỉ còn **9 kịch bản** nhưng vẫn đảm bảo bao phủ toàn bộ các cặp tham số tương tác với nhau:

### 15.3 Bảng kịch bản Pairwise cho API `GET /api/products/search`

| TC ID | category    | price_range | sort       | shipping |
| :---- | :---------- | :---------- | :--------- | :------- |
| TC-01 | Electronics | Low         | Popularity | Free     |
| TC-02 | Electronics | High        | Price      | Standard |
| TC-03 | Clothing    | Low         | Price      | Free     |
| TC-04 | Clothing    | High        | Popularity | Standard |
| TC-05 | Home        | Low         | Popularity | Standard |
| TC-06 | Home        | High        | Price      | Free     |
| TC-07 | Electronics | Low         | Price      | Standard |
| TC-08 | Clothing    | High        | Popularity | Free     |
| TC-09 | Home        | High        | Popularity | Free     |

### 15.4 Triển khai bằng Data-Driven Testing trong Postman

Tester xuất bảng kết quả Pairwise trên thành tệp CSV (`pairwise_search.csv`) và nạp vào Postman Collection Runner.

```javascript
// Test script tự động kiểm tra kết quả lọc
pm.test(`Search with category=${pm.iterationData.get('category')} returns correct results`, function () {
  pm.response.to.have.status(200);
  const results = pm.response.json().data;

  results.forEach((product) => {
    pm.expect(product.category).to.equal(pm.iterationData.get('category'));
  });
});
```

---

## 16. Kỹ thuật State Transition Testing (Chuyển trạng thái) trong API Testing

### 16.1 Khái niệm

**State Transition Testing (Kiểm thử chuyển trạng thái)** là một kỹ thuật hộp đen được sử dụng khi hành vi của API phụ thuộc không chỉ vào dữ liệu đầu vào hiện tại mà còn phụ thuộc vào **trạng thái hiện tại** (current state) của tài nguyên trong hệ thống.

Một hệ thống chuyển trạng thái bao gồm:

- **States (Trạng thái):** Các trạng thái tĩnh mà tài nguyên có thể ở đó (ví dụ: Order: `CREATED`, `PAID`, `SHIPPED`, `CANCELLED`).
- **Transitions (Sự chuyển đổi):** Luồng di chuyển từ trạng thái này sang trạng thái khác.
- **Events/Inputs (Sự kiện/Đầu vào):** Các API requests tác động để kích hoạt sự chuyển đổi trạng thái (ví dụ: gọi `POST /orders/{id}/pay`).
- **Actions/Outputs (Hành động/Đầu ra):** Phản hồi trả về của API (HTTP status code, message) và sự thay đổi trạng thái trong database.

### 16.2 Sơ đồ trạng thái của tài nguyên Order (Đơn hàng)

```mermaid
stateDiagram-v2
    [*] --> CREATED : POST /orders (Tạo đơn)
    CREATED --> PAID : POST /orders/{id}/pay (Thanh toán)
    CREATED --> CANCELLED : POST /orders/{id}/cancel (Hủy đơn)
    PAID --> SHIPPED : POST /orders/{id}/ship (Giao hàng)
    PAID --> REFUNDED : POST /orders/{id}/refund (Hoàn tiền)
    SHIPPED --> DELIVERED : POST /orders/{id}/deliver (Nhận hàng)
```

### 16.3 Bảng chuyển trạng thái (State Transition Table) cho API

Bảng này dùng để xác định hành vi hợp lệ (Valid transition - chuyển trạng thái đúng) và hành vi không hợp lệ (Invalid transition - gọi API sai trạng thái):

| Trạng thái hiện tại | Sự kiện (API Call) | Trạng thái kế tiếp mong đợi | HTTP Status Code  | Ghi chú                                         |
| :------------------ | :----------------- | :-------------------------- | :---------------: | :---------------------------------------------- |
| **CREATED**         | `POST /pay`        | PAID                        |     `200 OK`      | Valid Transition                                |
| **CREATED**         | `POST /ship`       | CREATED (Không đổi)         | `400 Bad Request` | Invalid: Chưa thanh toán không được giao        |
| **PAID**            | `POST /cancel`     | PAID (Không đổi)            |  `409 Conflict`   | Invalid: Đã thanh toán không được hủy trực tiếp |
| **PAID**            | `POST /ship`       | SHIPPED                     |     `200 OK`      | Valid Transition                                |
| **SHIPPED**         | `POST /pay`        | SHIPPED (Không đổi)         | `400 Bad Request` | Invalid: Đã thanh toán trước đó                 |
| **SHIPPED**         | `POST /deliver`    | DELIVERED                   |     `200 OK`      | Valid Transition                                |

### 16.4 Kiểm thử các chuyển đổi không hợp lệ (Negative Testing) trong Postman

```javascript
// Test case: Cố tình gọi API giao hàng khi đơn chưa thanh toán (Trạng thái CREATED)
pm.test('Invalid Transition - Cannot ship unpaid order', function () {
  pm.response.to.have.status(400); // Hoặc 409 Conflict
  pm.expect(pm.response.json().message).to.include('Order must be paid before shipping');
});
```

---

## 17. Kỹ thuật Use Case Testing (Kiểm thử kịch bản) trong API Testing

### 17.1 Khái niệm

**Use Case Testing (Kiểm thử theo trường hợp sử dụng)** là kỹ thuật thiết kế kịch bản kiểm thử dựa trên **quy trình nghiệp vụ thực tế** (business workflow) của người dùng cuối.

Trong API Testing, Use Case Testing không kiểm thử các API một cách đơn lẻ (isolated) mà thực hiện **liên chuỗi các API (API Chaining)** theo một trình tự logic để hoàn thành một tác vụ nghiệp vụ trọn vẹn từ đầu đến cuối.

### 17.2 Tầm quan trọng của API Chaining

Quy trình nghiệp vụ của một ứng dụng thường yêu cầu dữ liệu đầu ra (Response) của API trước làm dữ liệu đầu vào (Request) cho API sau.
Ví dụ kịch bản mua hàng trực tuyến (E-commerce Checkout):

```mermaid
graph LR
    Register[POST /register] -->|Lấy email| Login[POST /login]
    Login -->|Lấy Auth Token| Search[GET /products]
    Search -->|Lấy Product ID| Cart[POST /cart]
    Cart -->|Lấy Cart ID| Checkout[POST /checkout]
    Checkout -->|Lấy Order ID| OrderStatus[GET /orders/id]
```

### 17.3 Các kịch bản Use Case chính

1. **Kịch bản chính (Main Success Scenario / Happy Path):** Người dùng thực hiện toàn bộ luồng đăng ký -> đăng nhập -> chọn hàng -> thanh toán thành công mà không gặp lỗi.
2. **Kịch bản thay thế/ngoại lệ (Alternative/Exception Flows):**
   - Đăng nhập sai mật khẩu -> Hệ thống yêu cầu đăng nhập lại.
   - Khi thanh toán, tài khoản không đủ số dư -> API Checkout báo lỗi `402 Payment Required`, giỏ hàng vẫn được giữ nguyên.

### 17.4 Mô tả luồng chạy và lưu trữ biến số trong Postman (API Chaining)

##### Bước 1: Gọi API Đăng nhập và trích xuất Bearer Token

```javascript
// POST /api/v1/auth/login
// Trong tab "Tests" của Postman:
pm.test('Login successful and token extracted', function () {
  pm.response.to.have.status(200);
  const token = pm.response.json().access_token;

  // Lưu token vào biến môi trường để các API tiếp theo sử dụng
  pm.environment.set('session_token', token);
});
```

##### Bước 2: Gọi API Tạo giỏ hàng sử dụng Token đã lưu

- Request Headers: `Authorization: Bearer {{session_token}}`
- Request Body: `{"item_id": 105, "quantity": 2}`

```javascript
// POST /api/v1/cart
// Trong tab "Tests":
pm.test('Cart created successfully', function () {
  pm.response.to.have.status(201);
  const cartId = pm.response.json().cart_id;

  // Lưu Cart ID cho bước thanh toán
  pm.environment.set('active_cart_id', cartId);
});
```

##### Bước 3: Thực hiện đặt hàng thanh toán

- Request Path: `POST /api/v1/checkout/{{active_cart_id}}`

```javascript
// POST /api/v1/checkout/{{active_cart_id}}
// Trong tab "Tests":
pm.test('Checkout completed', function () {
  pm.response.to.have.status(200);
  pm.expect(pm.response.json().status).to.equal('success');

  // Dọn dẹp biến môi trường sau khi hoàn tất kịch bản
  pm.environment.unset('active_cart_id');
});
```

---

## 18. Kỹ thuật API Contract Testing (Kiểm thử hợp đồng)

### 18.1 Khái niệm Contract Testing

Trong kiến trúc Microservices hoặc tích hợp hệ thống, **Contract Testing (Kiểm thử hợp đồng)** là kỹ thuật kiểm thử sự tích hợp giữa hai dịch vụ độc lập: **Consumer** (bên sử dụng dịch vụ, ví dụ: Frontend hoặc API Client) và **Provider** (bên cung cấp dịch vụ, ví dụ: Backend API).

Kỹ thuật này đảm bảo hai dịch vụ giao tiếp đúng theo một **hợp đồng thống nhất (Contract)** đã được thỏa thuận trước về cấu trúc Request/Response, kiểu dữ liệu, headers, và mã lỗi mà không cần triển khai kiểm thử tích hợp (Integration Test) toàn bộ hệ thống thực tế.

```mermaid
graph TD
    Consumer[Consumer / API Client] -->|1. Xác định kỳ vọng| PactFile[Tệp Hợp Đồng <br> Pact File - JSON]
    PactFile -->|2. Chia sẻ hợp đồng| Provider[Provider / API Server]
    Provider -->|3. Tự động xác thực| Assert[Xác Thực Kết Quả]
```

### 18.2 Phân biệt Consumer-Driven và Provider-Driven Contract Testing

- **Consumer-Driven Contract Testing (Hướng Consumer):** Consumer định nghĩa các kỳ vọng (Requests gửi đi và Responses mong muốn nhận lại) thành một "Hợp đồng" (Pact file). Provider có nhiệm vụ chạy kiểm thử để đảm bảo hệ thống của họ đáp ứng chính xác mọi yêu cầu trong hợp đồng đó. Đây là cách tiếp cận phổ biến nhất, giúp tránh tình trạng Provider thay đổi API làm hỏng ứng dụng của Consumer (Break Integration).
- **Provider-Driven Contract Testing (Hướng Provider):** Provider định nghĩa đặc tả API của mình (ví dụ bằng OpenAPI/Swagger) và Consumer tự động kiểm thử code của mình dựa trên đặc tả đó.

### 18.3 Phân biệt Schema Validation và Contract Testing

- **API Schema Validation:** Thường sử dụng các công cụ như OpenAPI (Swagger) để kiểm tra tính đúng đắn về mặt **tĩnh** của API (ví dụ: trường `email` có kiểu dữ liệu String không, trường `id` có bắt buộc không). Schema validation chỉ kiểm tra cấu trúc tại một thời điểm độc lập.
- **Contract Testing:** Kiểm tra tính **động** và nghiệp vụ tích hợp thực tế. Nó đảm bảo khi Consumer gửi Request cụ thể (ví dụ: `GET /users/42`), Provider phải phản hồi đúng mã `200` kèm dữ liệu có cấu trúc chính xác như đã ký kết. Khi Provider thay đổi logic nghiệp vụ làm ảnh hưởng đến luồng đi, Contract Testing sẽ phát hiện ngay lập tức.

---

## 19. Checklist kiểm thử API

### 19.1 Kiểm thử cơ bản (mỗi endpoint)

- [ ] **Status Code** đúng với scenario (200, 201, 400, 401, 403, 404, 500...)
- [ ] **Response Body** đúng schema (đủ field, đúng kiểu dữ liệu)
- [ ] **Response Headers** có đầy đủ (`Content-Type`, security headers)
- [ ] **Thời gian phản hồi** trong ngưỡng chấp nhận được (< 2s cho API thông thường)
- [ ] **Dữ liệu nhất quán** với database sau request

### 19.2 Kiểm thử Authentication

- [ ] Không gửi token → `401`
- [ ] Token sai → `401`
- [ ] Token hết hạn → `401`
- [ ] Token hợp lệ → `200` (và dữ liệu đúng)
- [ ] Token của user A dùng xem tài nguyên của user B → `403` hoặc `404`

### 19.3 Kiểm thử Validation

- [ ] Thiếu field bắt buộc → `400/422`
- [ ] Sai định dạng (email không có `@`) → `400/422`
- [ ] Giá trị ngoài phạm vi (age = -1 hoặc 999) → `400/422`
- [ ] Chuỗi quá dài → `400/422`
- [ ] SQL Injection trong input → phải bị từ chối hoặc escape
- [ ] XSS trong input → phải bị sanitize

### 19.4 Kiểm thử Performance

- [ ] Response time < 500ms (95th percentile)
- [ ] API xử lý được số lượng concurrent users mong đợi
- [ ] Rate limiting hoạt động đúng (→ `429` khi vượt giới hạn)
- [ ] API không crash khi payload lớn

---

## 20. Công cụ kiểm thử API phổ biến

| Công cụ                | Loại         | Ưu điểm                                                | Dùng cho                         |
| ---------------------- | ------------ | ------------------------------------------------------ | -------------------------------- |
| **Postman**            | GUI + Script | Dễ dùng, có Collection, Test script, Mock server       | Manual + Automated testing       |
| **REST Assured**       | Java Library | Tích hợp với JUnit/TestNG, CI/CD friendly              | Automated API testing (Java)     |
| **pytest + requests**  | Python       | Linh hoạt, rich ecosystem                              | Automated API testing (Python)   |
| **curl**               | CLI          | Lightweight, có sẵn trên Unix                          | Quick manual testing             |
| **k6**                 | Performance  | JS-based, load testing                                 | Performance testing              |
| **JMeter**             | Performance  | GUI + script, phổ biến                                 | Load/Stress testing              |
| **SoapUI**             | GUI          | Chuyên SOAP, có assertions mạnh                        | SOAP API testing                 |
| **Insomnia**           | GUI          | Đơn giản hơn Postman, GraphQL support                  | Manual testing, GraphQL          |
| **Pact**               | Contract     | Consumer-driven contract testing                       | Microservices contract testing   |
| **WireMock / Mockoon** | Mocking      | Tạo giả lập API độc lập, giảm độ phụ thuộc (flakiness) | Mocking API cho Integration Test |
