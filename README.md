# API Testing & Contract Testing — Seminar SEBros (Group 03)

Repo dùng cho seminar môn **Kiểm thử phần mềm** với chủ đề **API Testing & Contract Testing**.
Mục tiêu: các bạn trong lớp có thể **clone về thực hành** theo các demo trong seminar.

## Cấu trúc repo

```
.
├── src/                                        # CODE DEMO (chạy được)
│   ├── sample-api/                             # API mẫu — Node.js + Express
│   ├── postman/                                # Collections / environments / data
│   ├── newman/                                 # Automation chạy collection bằng CLI
│   └── pact/                                   # Contract test (consumer + provider)
├── docs/
│   ├── reports/                                # Báo cáo tuần + outline báo cáo cuối
│   │   ├── final-report-outline.md             # Bố cục báo cáo cuối (mục lục)
│   │   └── weekNN/                             # Báo cáo tuần NN + thư mục evidences/
│   ├── slides/
│   │   └── outline.md                          # Outline slide trình bày
│   └── demo/                                   # MATERIAL demo (không chạy code)
│       ├── demo-scenarios.md                   # Danh sách kịch bản demo
│       └── videos/                             # Video demo (hoặc link video)
├── .github/workflows/
│   └── ci.yml.example                          # Ví dụ CI/CD (Newman + Pact)
└── .claude/skills/                             # Skill nội bộ cho Claude Code (tooling)
```

| Đường dẫn | Nội dung |
|-----------|----------|
| [`src/`](src/) | **Code demo chạy được**: API mẫu, Postman, Newman, Pact |
| [`docs/reports/`](docs/reports/) | Báo cáo tuần (`weekNN/`) và [outline báo cáo cuối](docs/reports/final-report-outline.md) |
| [`docs/slides/outline.md`](docs/slides/outline.md) | Outline slide seminar |
| [`docs/demo/`](docs/demo/) | **Material demo** (không chạy code): kịch bản + video |
| [`docs/demo/demo-scenarios.md`](docs/demo/demo-scenarios.md) | Danh sách kịch bản demo (nhiều video) |
| [`.github/workflows/ci.yml.example`](.github/workflows/ci.yml.example) | Ví dụ cấu hình CI/CD |

## Quick start

```bash
git clone <repo-url>
cd Software_Testing_api_contract_testing

# API mẫu (Node.js + Express) — khi đã có code
cd src/sample-api
npm install
npm start                                        # mặc định http://localhost:3000
```

> Phần `src/` hiện là **khung sườn** (placeholder). Code demo và API mẫu sẽ được bổ sung ở các tuần tiếp theo.

## Thành viên — Group 03 (SEBros)

## Công nghệ dự kiến

- **API mẫu:** Node.js + Express
- **API testing:** Postman, VS Code REST Client (`.http`/`.rest`)
- **Automation:** Newman (Postman CLI)
- **Contract testing:** Pact (consumer–provider)
- **CI/CD:** GitHub Actions
