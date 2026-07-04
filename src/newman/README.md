# Automation với Newman

> Placeholder — bổ sung tuần sau.

Chạy Postman collection bằng CLI để tích hợp CI/CD.

## Dự kiến

```bash
npm install -g newman
newman run ../postman/collections/<collection>.json \
  -e ../postman/environments/local.postman_environment.json \
  --reporters cli,html --reporter-html-export output/report.html
```

- Thư mục `output/` bị ignore trong git (xem `.gitignore`).
- Cấu hình chạy tự động trong CI: [`ci.yml.example`](../../.github/workflows/ci.yml.example).

Xem thêm ghi chú công cụ tại [`tool_research.md`](../../docs/reports/week04/evidences/tool_research.md).
