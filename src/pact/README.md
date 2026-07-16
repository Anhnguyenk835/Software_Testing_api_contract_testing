# Contract Testing với Pact

Demo contract testing theo mô hình **consumer-driven** với Pact-JS nằm trong
`src/sample-api/pact-workshop-js`.

## Consumer contract

Chạy consumer tests từ repository root:

```bash
npm run test:pact --prefix src/sample-api/pact-workshop-js/consumer
```

Test suite tạo contract cho các endpoint:

- `GET /products`
- `GET /product/:id`
- `POST /products`
- `PUT /product/:id`
- `DELETE /product/:id`

Pact JSON được ghi tại:

```text
src/sample-api/pact-workshop-js/consumer/pacts/FrontendWebsite-ProductService.json
```

Provider verification có thể đọc trực tiếp file trên hoặc publish file này lên
Pact Broker.

## Luồng demo

1. Chạy consumer test để sinh pact JSON.
2. Provider verify các interaction trong pact.
3. Publish pact lên broker khi cần chạy quy trình CI/CD.

Xem lý thuyết tại [`contracting_testing.md`](../../docs/reports/week04/evidences/contracting_testing.md)
và ghi chú công cụ tại [`tool_research.md`](../../docs/reports/week04/evidences/tool_research.md).
