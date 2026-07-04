**Tools:** Claude Sonnet 5

**Timestamp:** 02/07/2026 \- 20:50:55

**Prompt:** 

Khảo sát công cụ Postman & VS Code REST Client

Vai trò & bối cảnh

Bạn là một chuyên gia về công cụ kiểm thử API (API testing tools), có kinh nghiệm thực chiến với Postman và các REST client tích hợp trong IDE. Tôi đang chuẩn bị nội dung seminar môn học về chủ đề "API Testing & Contract Testing" và cần khảo sát chi tiết 2 nhóm công cụ dưới đây để trình bày trước lớp và làm demo trực tiếp.

Mục tiêu nghiên cứu

Tổng hợp kiến thức đầy đủ, chính xác, có ví dụ minh họa cụ thể.

Phần 1: Postman

Với mỗi chức năng dưới đây, trình bày: (1) định nghĩa/khái niệm, (2) vai trò trong quy trình test API, (3) cách sử dụng cơ bản (từng bước hoặc cú pháp), (4) một ví dụ thực tế minh họa.

1\. Environment – cách tạo và quản lý nhiều môi trường (dev/staging/prod), phân biệt biến environment với biến global/collection.

2\. Collection – tổ chức request theo nhóm/folder, thứ tự chạy, Collection Runner.

3\. Variable – các loại biến trong Postman (global, collection, environment, local, data), cách dùng \`{{variable}}\` và dynamic variables.

4\. Script – Pre-request Script và Test Script (\`pm.test\`, \`pm.expect\`, chaining request bằng script); kèm một ví dụ test script kiểm tra status code và response body.

5\. Data-driven testing – dùng file CSV/JSON làm input cho Collection Runner để chạy nhiều bộ dữ liệu test tự động.

Phần 2: VS Code REST Client (.http / .rest)

1\. Giới thiệu extension "REST Client" trên VS Code – cách cài đặt, cú pháp file \`.http\`/\`.rest\` cơ bản.

2\. Cách khai báo và dùng biến/environment (\`@variable\`, file \`http-client.env.json\`).

3\. So sánh khả năng: chạy nhiều request, viết script kiểm tra response, chạy hàng loạt (data-driven) — REST Client có hỗ trợ tương đương Postman không, giới hạn ở đâu.

4\. Ưu điểm khi dùng ngay trong VS Code (gần code, thân thiện với version control, không cần app riêng) so với Postman.

Phần 3: Bảng so sánh

Lập bảng so sánh Postman vs VS Code REST Client theo các tiêu chí: giao diện, đường cong học tập, quản lý environment/variable, hỗ trợ script/test, data-driven testing, khả năng tích hợp CI/CD, phù hợp với nhóm người dùng nào.

Yêu cầu về nguồn

\* Ưu tiên tài liệu chính thức: Postman Learning Center (learning.postman.com), trang extension REST Client trên VS Code Marketplace.

\* Có thể bổ sung 1–2 bài viết/tutorial uy tín (blog chính thức, dev.to, Medium) để làm rõ ví dụ.

\* Trích nguồn rõ ràng cho các thông tin/số liệu quan trọng.

Yêu cầu đầu ra

\* Trình bày dạng outline có tiêu đề rõ ràng, dùng để chuyển thành nội dung slide được.

\* Mỗi chức năng: giải thích ngắn gọn (3–5 câu) \+ 1 đoạn code/script hoặc mô tả ví dụ cụ thể.

\* Có bảng so sánh tóm tắt ở cuối.

\* Ghi chú riêng phần nào nên demo trực tiếp trên lớp (tách rõ "lý thuyết" và "demo thực hành").

\* Độ dài: khoảng 800–1200 từ (chưa tính code/bảng) — đủ làm tài liệu tham khảo nội bộ nhóm.

Ràng buộc

\* Không cần đi sâu vào Contract Testing (Pact) hay Newman — phần đó do thành viên khác phụ trách.

\* Tập trung vào tính năng test API thông thường (không phải contract testing).

\* Ngôn ngữ: tiếng Việt; thuật ngữ kỹ thuật giữ nguyên tiếng Anh (Environment, Collection, Script, v.v.).

