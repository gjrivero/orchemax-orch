# Encoding gates

| Id | Rule | Orche |
|----|------|-------|
| O.encoding.charset | HTML needs `<meta charset="utf-8">` (or http-equiv); email needs `Content-Type: …; charset=utf-8` | `orch guard encoding` |
| O.encoding.mojibake | Flag classic mojibake sequences (`Ã©`, `Â¿`, `â€™`, …) | same |
| O.encoding.utf8 | File must be valid UTF-8 bytes | same |
| W.encoding.api | JSON/HTTP APIs serving text should advertise charset when not pure binary | owner / reverse-proxy |

## Fixtures (manual)

**Red:** `<html><head><title>x</title></head><body>Año</body></html>`  
**Green:** add `<meta charset="utf-8">` in `<head>`.
