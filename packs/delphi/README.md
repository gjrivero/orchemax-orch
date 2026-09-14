# Delphi / Pascal pack

Field-proven tips for Delphi workshops using Orche + LLMs (Attlas-fed, product-agnostic).

## Install

```bash
# Merge into your shared server layer (do not blind-overwrite owner text)
# Windows example:
copy packs\delphi\SHARED.core.md   C:\Dev\MyWorkshop\core\SHARED.md

copy packs\delphi\GATES.md         C:\Dev\MyWorkshop\.orch\gates\user\DELPHI.md
copy packs\delphi\claude\RULES.md  C:\Dev\MyWorkshop\.claude\rules\delphi.md
```

Also enable Orche built-ins: `code_lang: en`, `orch guard encoding` (HTML), `orch guard add-all` on shared repos.

## Depends on

- `packs/_workshop`
- Language seed: `langs/delphi.json`
