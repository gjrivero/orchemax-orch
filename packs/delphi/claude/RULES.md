# Delphi — Claude / agent rules (pack)

Use with path globs: `**/*.{pas,dpr,dpk,inc}`.

## Must
- Identifiers and user-visible messages in **English** (`workspace.code_lang: en`). Comments may be Spanish/local.
- Free-text FireDAC params via **`AddTextParam`** (or equivalent typed WideString helper) — never bare `Add` for strings.
- New shared symbols: search (`orch symbols` / grep) before create; publish with a one-line purpose.
- Tests and `.dcu` under `tests/`, not next to production units.

## Must not
- Product brand names or `products/<id>` paths inside shared layers.
- `git add -A` on shared repos — stage explicit paths.
- Invent React/Vue/Next for this workshop unless the owner asked (if owner declared HTMX/FMX).

## HTML / email
If you write `.html` / mail templates: `<meta charset="utf-8">` or `Content-Type: …; charset=utf-8`. Orche: `orch guard encoding`.
