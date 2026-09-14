# Go pack (starter)

Thin starter — extend via PRs. Orche already understands Go AST for symbols (`langs/go.json` → `engine: go-ast`).

## Install

```text
copy packs\go\GATES.md  <workshop>\.orch\gates\user\GO.md
```

## Defaults

- `workspace.code_lang: en`
- Shared modules under registered `shared` paths; products compose them
- `orch symbols` / `orch:export` comments for shared APIs
