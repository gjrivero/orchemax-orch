# Pack: HTMX + SPA shell (optional)

**Not an OrcheMax default.** Use only if your workshop web UI is HTMX swaps on a persistent shell (a persistent-shell style, field-proven in production). React/Vue/Next shops should skip this pack.

## Why

Full-document reloads cause flicker and “pestañeo”. Multi-agent workshops that claim SPA must **prove** it:

| Metric | Limit |
|--------|--------|
| Real document navigations | **1** per SPA session |
| CLS during each swap | **0.00** |
| Console errors after 3 nav passes | **0** |

## Install

```bash
copy packs\htmx-spa\GATES.md              <workshop>\.orch\gates\user\HTMX-SPA.md
copy packs\htmx-spa\tools\check-spa.mjs   <workshop>\tools\check-spa.mjs
# or under shared core: core\tools\check-spa.mjs
npm i playwright   # once
npx playwright install chromium
```

## Run

```bash
node tools/check-spa.mjs http://localhost:8080/app/
node tools/check-spa.mjs http://localhost:8080/app/ --nav "#app-sidebar a[hx-get]"
```

Prefer env credentials: `CHECK_SPA_TOKEN`, `CHECK_SPA_COOKIE`, `CHECK_SPA_STORAGE`.

Exit `1` = fail · `2` = could not measure (never treat unmeasured as green).

## Doctrine excerpt

Internal nav = `hx-get` + `hx-select="#spa-content"` + `hx-target="#main-content"` + `hx-swap="innerHTML swap:130ms"` + `hx-push-url`.  
Shell chrome never repaints. Page scripts use IIFE + `__spaPageInit` (not only `DOMContentLoaded`).

Full patterns: your workshop's own `SPA_DEV_PATTERNS.md` §4 (workshop-owned — this pack only ships the enforceable check, not the doctrine doc).

## Depends on

- `packs/_workshop`
- Does **not** require Delphi — any HTMX product can use it
