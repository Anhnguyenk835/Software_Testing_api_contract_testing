# **Khảo sát công cụ API Testing: Postman & VS Code REST Client**

## **Phần 1 — Postman**

### **1\. Environment** 

**Khái niệm.** Một Environment là một tập biến (key–value) mà ta tham chiếu khi gửi request hoặc viết script. Khi chuyển Environment, tất cả biến trong request/script tự động lấy giá trị của Environment đang active — rất hữu ích khi cùng một request cần chạy trên test server và production server.

**Vai trò.** Cho phép dùng một Collection duy nhất chạy trên nhiều môi trường (dev/staging/prod) chỉ bằng một dropdown, thay vì sửa tay từng URL/token. Đồng thời giúp che giấu dữ liệu nhạy cảm (API key, password) và chia sẻ cấu hình trong nhóm.

**Cách dùng cơ bản.**

1. Sidebar → **Environments** → tạo mới (ví dụ *Dev*, *Staging*, *Prod*).  
2. Trong mỗi Environment, khai báo cùng bộ tên biến (`baseUrl`, `token`…) nhưng khác giá trị.  
3. Chọn Environment active ở góc trên phải (environment selector).  
4. Trong request dùng cú pháp `{{baseUrl}}/users/{{userId}}`.

**Phân biệt scope (quan trọng):** biến **Global** dùng chung toàn workspace (nên hạn chế); biến **Collection** gắn với một Collection và *không đổi* theo Environment; biến **Environment** đổi theo môi trường đang chọn. Mỗi biến có **Initial value** (sync lên cloud, chia sẻ cho team) và **Current value** (chỉ local, không sync) — đây là điểm hay nhầm.

**Ví dụ.** `Dev.baseUrl = http://localhost:3000/api`, `Prod.baseUrl = https://api.example.com`. Cùng request `GET {{baseUrl}}/posts/1` → chỉ đổi dropdown là gọi đúng server.

---

### **2\. Collection** 

**Khái niệm.** Collection là một nhóm các request có liên quan về logic, có thể lồng **Folder** để phân cấp (thường mỗi Folder ứng với một controller/endpoint).

**Vai trò.** Tổ chức bộ test theo cấu trúc API, đặt Authorization/Script/biến ở cấp Collection để áp dụng cho mọi request con, và là đơn vị để chạy hàng loạt bằng **Collection Runner**.

**Cách dùng.**

1. **Collections** → *Create a collection*, đặt tên \+ mô tả (hỗ trợ Markdown).  
2. Thêm request, kéo–thả để sắp **thứ tự chạy** (Runner chạy tuần tự trên xuống).  
3. Chạy: `⋯` cạnh tên Collection → **Run collection** → chọn request, số **Iterations**, **Delay** → *Run*.

**Ví dụ.** Collection *User API* gồm Folder *Auth* (`POST /login`) và Folder *Users* (`GET /users`, `POST /users`). Runner chạy lần lượt và hiển thị bảng Pass/Fail cho toàn bộ test.

---

### **3\. Variable** 

**Khái niệm.** Biến là placeholder lưu giá trị để tái sử dụng. Postman có 5 scope, từ rộng → hẹp: **global → collection → environment → data → local**. Biến hẹp hơn *ghi đè* biến rộng hơn khi trùng tên.

**Vai trò của từng loại.**

* **Global:** truy cập mọi nơi trong workspace — hợp cho prototyping, nên dùng dè.  
* **Collection:** dùng trong một Collection, độc lập Environment (base URL, thông tin auth cố định).  
* **Environment:** thay đổi theo môi trường (URL, credential dev/staging/prod).  
* **Data:** đến từ file CSV/JSON, chỉ tồn tại trong Collection Runner (data-driven).  
* **Local:** biến tạm trong script, mất sau khi run kết thúc.

**Cú pháp.**

* Trong UI (URL/header/body): `{{variableName}}`.  
* Trong script: `pm.environment.get()/set()`, `pm.collectionVariables.get()`, `pm.globals.get()`, `pm.variables.get()` (lấy theo thứ tự ưu tiên scope).  
* **Dynamic variables** (tạo dữ liệu ngẫu nhiên, chỉ dùng trong `{{...}}`): `{{$guid}}`, `{{$timestamp}}`, `{{$randomInt}}`, `{{$randomEmail}}`…

**Ví dụ.** `{{baseUrl}}/users/{{$randomInt}}` tạo id ngẫu nhiên mỗi lần gửi; trong Pre-request `pm.environment.set("ts", Date.now())` rồi dùng `{{ts}}` ở body.

---

### **4\. Script — Pre-request & Test (Post-response)** 

**Khái niệm.** Script là JavaScript chạy trong **Postman Sandbox** (runtime dựa trên Node.js). **Pre-request Script** chạy *trước* khi gửi request (chuẩn bị biến, sinh dữ liệu động, xử lý auth). **Test Script** (tab *Post-response*) chạy *sau* khi có response, dùng để kiểm chứng — có sẵn thư viện **Chai.js** với cú pháp BDD (`pm.expect`).

**Vai trò.** Biến Postman từ công cụ "gửi request" thành công cụ *test tự động*: assert status/body/header/response time, và **chaining** (lấy token từ response này gán biến cho request sau).

**Cú pháp cốt lõi.** `pm.test("tên test", function(){ ... })` — hàm trả về true/false quyết định Pass/Fail; bên trong dùng `pm.response` \+ `pm.expect`.

**Ví dụ — kiểm tra status code và response body:**

// Tab Scripts \> Post-response  
pm.test("Status code là 200", function () {  
    pm.response.to.have.status(200);  
});

pm.test("Response body hợp lệ", function () {  
    const body \= pm.response.json();  
    pm.expect(body).to.have.property("id");        // có field id  
    pm.expect(body.name).to.eql("John");           // name đúng giá trị  
    pm.expect(pm.response.responseTime).to.be.below(500); // \< 500ms  
});

// Chaining: lưu token cho request kế tiếp  
const token \= pm.response.json().access\_token;  
pm.environment.set("access\_token", token);

// Tab Scripts \> Pre-request — chuẩn bị dữ liệu trước khi gửi  
pm.environment.set("timestamp", Date.now());

Thứ tự chạy: Pre-request (Collection → Folder → Request) → gửi request → Post-response (Collection → Folder → Request).

---

### **5\. Data-driven testing (Collection Runner)** 

**Khái niệm.** Data-driven testing \= chạy *cùng một bộ request* với *nhiều bộ dữ liệu* nạp từ file **CSV hoặc JSON**. Mỗi dòng dữ liệu \= một **iteration**; giá trị được đưa vào request qua **data variables**.

**Vai trò.** Kiểm thử nhiều case (positive/negative) tự động chỉ với một request — tăng độ bao phủ mà không phải sửa tay input từng lần.

**Cách dùng.**

1. Chuẩn bị file dữ liệu (CSV: dòng đầu là tên biến; JSON: mảng object).  
2. Tham số hoá request bằng `{{username}}`, `{{password}}`.  
3. Run collection → **Select File** → chọn file → **Preview** để kiểm tra → *Run*. Số iterations \= số dòng dữ liệu.

**Ví dụ.**

username,password,expectedStatus  
alice,pass123,200  
bob,,400

\[  
  { "username": "alice", "password": "pass123", "expectedStatus": 200 },  
  { "username": "bob",   "password": "",        "expectedStatus": 400 }  
\]

// Test script đọc dữ liệu từng iteration  
pm.test("Status khớp dữ liệu test", function () {  
    pm.response.to.have.status(Number(pm.iterationData.get("expectedStatus")));  
});

Lưu ý: data variables chỉ **đọc** (không sửa/thêm) trong lúc run, và một lần run chỉ dùng **một** file dữ liệu.

---

## **Phần 2 — VS Code REST Client (`.http` / `.rest`)**

### **1\. Giới thiệu & cài đặt** 

**Khái niệm.** *REST Client* (publisher `humao.rest-client`, tác giả Huachao Mao) là extension cho phép soạn và gửi HTTP request ngay trong VS Code, xem response ở pane bên cạnh — không cần app riêng.

**Cài đặt.** `Ctrl/Cmd+Shift+X` → tìm **"REST Client"** của Huachao Mao → *Install*. Tạo file đuôi `.http` hoặc `.rest`; nút **Send Request** tự hiện phía trên mỗi dòng request.

**Cú pháp cơ bản.** Mỗi request gồm dòng method \+ URL, các dòng header, một **dòng trống bắt buộc**, rồi body. Nhiều request trong một file ngăn cách bằng `###`.

@baseUrl \= https://jsonplaceholder.typicode.com

\#\#\# Lấy 1 post  
GET {{baseUrl}}/posts/1  
Accept: application/json

\#\#\# Tạo post mới (chú ý dòng trống trước body)  
POST {{baseUrl}}/posts  
Content-Type: application/json

{  
  "title": "demo",  
  "userId": 1  
}

---

### **2\. Biến & Environment** 

**File variable (`@variable`).** Khai báo ngay trong file bằng `@name = value`, phạm vi **file scope**, tham chiếu bằng `{{name}}`. Có thể sinh dữ liệu động bằng **system variables** như `{{$guid}}`, `{{$timestamp}}`, `{{$randomInt}}`.

**Environment variable.** Đây là điểm cần lưu ý khi demo: extension `humao.rest-client` **đọc environment từ `settings.json`** qua khóa `rest-client.environmentVariables`, **không** dùng file `http-client.env.json`. (`http-client.env.json` là quy ước của HTTP Client trong **JetBrains/IntelliJ** và một số fork — đừng nhầm khi demo trên lớp.) Chuyển môi trường bằng thanh status bar hoặc lệnh **REST Client: Switch Environment**.

// .vscode/settings.json  
{  
  "rest-client.environmentVariables": {  
    "$shared": { "version": "v1" },                 // dùng cho mọi env  
    "dev":  { "baseUrl": "http://localhost:3000/api", "token": "dev-token" },  
    "prod": { "baseUrl": "https://api.example.com",   "token": "prod-token" }  
  }  
}

Môi trường `$shared` cung cấp biến dùng chung; biến trùng tên trong env đang chọn sẽ ghi đè.

---

### **3\. So sánh khả năng: multi-request, test, data-driven** 

**Chạy nhiều request:** Có — nhiều request/1 file, gửi từng cái. **Chaining** hỗ trợ tốt qua **request variables**: đặt tên request bằng `# @name login` rồi tham chiếu response ở request sau bằng JSONPath.

\# @name login  
POST {{baseUrl}}/auth/login  
Content-Type: application/json

{ "username": "alice", "password": "pass123" }

\#\#\# Dùng token vừa lấy được  
GET {{baseUrl}}/profile  
Authorization: Bearer {{login.response.body.$.access\_token}}

**Viết script kiểm tra response:** **Giới hạn lớn nhất.** REST Client *không* có bộ assertion kiểu `pm.test`/`pm.expect` như Postman. Ta chỉ đọc trực quan status/body ở pane response, hoặc tham chiếu giá trị response để chaining — không có report Pass/Fail tự động. (Muốn assertion thực thụ trong hệ `.http` thường phải chuyển sang IntelliJ HTTP Client hoặc công cụ khác.)

**Data-driven (nhiều bộ dữ liệu):** **Không** có Collection Runner nạp CSV/JSON để lặp iteration như Postman. Đây là ranh giới rõ nhất: REST Client thiên về *khám phá & tài liệu hoá* request, chưa phải nền tảng test tự động hàng loạt.

---

### **4\. Ưu điểm khi dùng ngay trong VS Code** 

Gần code (không rời editor, không cần app riêng, nhẹ). Cú pháp kiểu Markdown, dễ đọc, dễ viết. File `.http`/`.rest` là **plain text** nên **commit vào Git** và review/chia sẻ như code — tài liệu API "sống" cùng repo, thân thiện version control hơn hẳn định dạng nội bộ của Postman. Phù hợp làm demo nhanh và tài liệu hoá endpoint.

---

## **Phần 3 — Bảng so sánh tóm tắt**

| Tiêu chí | Postman | VS Code REST Client |
| ----- | ----- | ----- |
| Giao diện | App GUI đầy đủ, nhiều panel | Plain text `.http` trong editor, tối giản |
| Đường cong học tập | Trung bình (nhiều tính năng) | Thấp (viết như soạn text) |
| Quản lý Environment/Variable | Mạnh: 5 scope, UI, sync cloud, secret | Cơ bản: file var \+ env trong `settings.json` (`$shared`) |
| Script / Test | Mạnh: `pm.test`, `pm.expect` (Chai.js), report Pass/Fail | **Không có assertion tự động**; chỉ xem response \+ chaining |
| Data-driven testing | Có: Collection Runner \+ CSV/JSON, nhiều iteration | **Không hỗ trợ** |
| Chaining request | Có (script \+ biến) | Có (request variables \+ JSONPath) |
| Tích hợp CI/CD | Tốt (qua Newman/Postman CLI — *ngoài phạm vi*) | Hạn chế (không phải hướng thiết kế) |
| Version control | Export JSON, kém trực quan khi diff | **Rất tốt** — file text commit thẳng vào Git |
| Phù hợp nhóm nào | QA/tester, team cần test tự động, cộng tác, môi trường phức tạp | Developer làm việc trong VS Code, cần thử API nhanh & tài liệu hoá theo repo |

---

## **Ghi chú Demo trực tiếp (tách lý thuyết / thực hành)**

**Nên demo live** 

1. **Postman Environment \+ Variable:** tạo *Dev/Prod*, cùng request `GET {{baseUrl}}/posts/1`, đổi dropdown để thấy request đổi server.  
2. **Postman Test Script:** dán đoạn `pm.test` kiểm tra status 200 \+ body, bấm *Send*, mở tab **Test Results** xem Pass/Fail; sửa status kỳ vọng để tạo một test Fail cho lớp thấy.  
3. **Data-driven:** nạp file CSV 2–3 dòng vào Collection Runner, chạy nhiều iteration, cho xem bảng kết quả.  
4. **REST Client:** tạo `demo.http`, gửi 1 GET; demo **chaining** login → dùng `{{login.response.body.$.token}}`; đổi env ở status bar để thấy `settings.json` phát huy tác dụng.

**Chỉ trình bày slide:** định nghĩa scope biến, thứ tự chạy script, bảng so sánh, và phần giới hạn của REST Client (không assertion, không data-driven).

**Gợi ý API công khai để demo (không cần server riêng):** `https://jsonplaceholder.typicode.com`, `https://postman-echo.com`, `https://reqres.in`.

---

## **Nguồn tham khảo**

**Postman (tài liệu chính thức — learning.postman.com / blog.postman.com):**

* Group sets of variables using environments — `learning.postman.com/docs/use/send-requests/variables/managing-environments`  
* Store and reuse values using variables (5 scope) — `learning.postman.com/docs/use/send-requests/variables/variables`  
* Use scripts to add logic and tests / Write test scripts / pm.test–pm.expect — `learning.postman.com/docs/tests-and-scripts/write-scripts/`  
* Run collections using imported data (data files) — `learning.postman.com/docs/collections/running-collections/working-with-data-files`  
* Using CSV and JSON Data Files in the Collection Runner — `blog.postman.com/using-csv-and-json-files-in-the-postman-collection-runner/`

**VS Code REST Client:**

* Trang extension (Marketplace) — `marketplace.visualstudio.com/items?itemName=humao.rest-client`  
* README/tài liệu chính thức (GitHub Huachao Mao) — `github.com/Huachao/vscode-restclient`

**Bài viết bổ trợ (minh hoạ ví dụ):**

* Perficient — *Replacing Postman with the REST Client VS Code Extension* — `blogs.perficient.com/replacing-postman-with-the-rest-client-visual-studio-code-extension/`  
* Baeldung — *A Guide to Variables in Postman* — `baeldung.com/java-postman-variables`

