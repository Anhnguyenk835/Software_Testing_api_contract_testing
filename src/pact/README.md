# Contract Testing với Pact

> Placeholder — bổ sung tuần sau.

Demo contract testing theo mô hình **consumer-driven** với Pact-JS.

## Cấu trúc dự kiến

```
pact/
├── consumer/     # test phía consumer → sinh pact file
├── provider/     # verify pact phía provider
└── pacts/        # pact file sinh ra (ignore trong git)
```

## Luồng demo

1. Chạy consumer test → sinh `pacts/*.json`.
2. Provider chạy verification trên pact đó.
3. Sửa provider gây breaking change → verification fail (minh họa giá trị của contract testing).

Xem lý thuyết tại [`contracting_testing.md`](../../docs/reports/week04/evidences/contracting_testing.md)
và ghi chú công cụ tại [`tool_research.md`](../../docs/reports/week04/evidences/tool_research.md).
