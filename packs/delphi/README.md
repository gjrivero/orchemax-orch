# Delphi / Pascal pack (one language among many)

Optional pack for workshops that use **Delphi/Pascal**.  
If your workshop is Go/TS/Python only, **ignore this folder** — use `packs/_workshop` + `packs/go` (or your language) instead.

This pack exists because Delphi + LLMs has sharp, measured footguns (FireDAC text params, `.dcu` placement). The same pattern applies to other languages via their own packs.

## Install

```bash
# Merge into your shared server layer (do not blind-overwrite owner text)
copy packs\delphi\SHARED.core.md   <workshop>\core\SHARED.md
copy packs\delphi\GATES.md         <workshop>\.orch\gates\user\DELPHI.md
copy packs\delphi\claude\RULES.md  <workshop>\.claude\rules\delphi.md
```

Enable OrcheMax built-ins: `code_lang: en`, `orch guard encoding` (HTML), `orch guard add-all` on shared repos.

## Depends on

- `packs/_workshop` (agnostic)
- `packs/encoding` (if you ship HTML/email)
- Language seed: `langs/delphi.json`
