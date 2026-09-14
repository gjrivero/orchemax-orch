# Shared: core (Delphi pack)

**Shared server craft layer** — merge into your workshop `core/SHARED.md`.

## Purpose
Agnostic Delphi/FireDAC server code, libs, deploy assets, and tests. No product brands.

## Practices
- Source-only beside units; `.dcu` / trial binaries under `tests/` (or gitignored `out/`).
- Before edit: `orch lock acquire`; search with `orch symbols`.
- Parametrize SQL; never concatenate. HTML output: encode user input.

## FireDAC / text params (LLM forgets this)

- **Never** `P.Add('field', someString)` for free text. Without `DataType`, FireDAC infers **ANSI**. Unicode becomes `0x00` on Linux (PostgreSQL rejects UTF-8) or `?` on Windows. Sanitizing the Pascal string does **not** fix it — the bad byte is born in the driver conversion.
- **Always** use a typed helper such as `AddTextParam(P, 'field', text)` (WideString / `ftWideString` path). Keep a regression test that proves bare `Add` still mutilates.
- `Add(name, NULL)` without type can fail Prepare (`-335`) and hang the connection — set `DataType` explicitly.

```delphi
// BAD:  P.Add('body', CleanResp);
// GOOD: AddTextParam(P, 'body', CleanResp);
```

## Not here
- Workshop seat rules → root `CLAUDE.md`
- Product-only rules → `products/<app>/`
- FMX chrome → `core-app/` (see `SHARED.core-app.md`)
