# Shared: core-app (Delphi pack)

**FMX / client base** apps inherit — merge into `core-app/SHARED.md`.

## Purpose
Shared desktop/mobile chrome, bridges, base controllers. No product business schemas.

## Practices
- Prefer inherit chrome (nav, context bar) over reimplementing per product.
- Source-only; disposable compile output under `tests/` if present.
- Web pieces: declare UI stack in owner CLAUDE (e.g. HTMX). Do not invent React because the LLM likes it.
- Lock + symbols before shared edits.

## Not here
- Server/DB spine → `core/`
- Product screens → `products/<app>/`
