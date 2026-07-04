# API mẫu (Sample API) — Node.js + Express

> Placeholder — sẽ dựng ở tuần sau.

API mẫu dùng **xuyên suốt** các demo Postman / Newman / Pact của seminar.

## Dự kiến

- Framework: **Node.js + Express**
- Có cả endpoint **public** và **cần authenticate** (JWT) để minh họa.
- Endpoint dự kiến:
  - `GET /health`
  - `GET /users`, `GET /users/:id`, `POST /users`
  - `POST /auth/login` → trả token
  - `GET /profile` (cần Bearer token)

## Chạy (khi có code)

```bash
npm install
npm start   # mặc định http://localhost:3000
```

## Ghi chú
- Cân nhắc: tự build (kiểm soát tốt cho demo) vs dùng API mã nguồn mở. Chốt ở tuần 2.
