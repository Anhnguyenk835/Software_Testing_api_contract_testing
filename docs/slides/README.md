# Contract Testing Slidev deck

Deck lý thuyết và kiến trúc Consumer–Provider dành cho seminar của Nhóm 03 — SEBros.

## Chạy deck

```bash
cd docs/slides
npm install
npm run dev
```

## Kiểm tra bản build

```bash
npm run build
```

## Xuất PDF

Lệnh export cần Chromium do Playwright quản lý:

```bash
npx playwright install chromium
npm run export
```

Deck sử dụng theme `seriph`, bảng màu navy–cyan, Mermaid và hỗn hợp `fade`, `slide-left`, `slide-up`, `view-transition` theo nội dung.
