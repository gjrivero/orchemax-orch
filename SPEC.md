# SPEC — orchemax-orch pack contract

Version: **1**  
Product: **OrcheMax** (CLI: `orch`).  
This repo: **community packs** for any language — not the OrcheMax binary, not a single-stack (e.g. Delphi-only) project.

Consumers: humans (copy/paste), future `orch pack *`, CI that validates MANIFESTs.

## 0. Naming

| Name | Meaning |
|------|---------|
| **OrcheMax** | The product (workshop orchestration for AI agents) |
| **`orch`** | The CLI command |
| **orchemax-orch** | This public GitHub repo — language seeds + optional packs |
| **Workshop** | User’s multi-project folder using OrcheMax |
| **Pack** | Opt-in folder under `packs/` you merge into a workshop |

## 1. Language seeds (`langs/`)

Same shape as OrcheMax `internal/langspec` (many languages; Delphi is only one id):

- `langs/catalog.json` → `{ "languages": ["go", "javascript", "typescript", …] }` (order = preference).
- `langs/<id>.json` →

```json
{
  "id": "delphi",
  "exts": [".pas", ".dpr", ".dpk"],
  "comment": "//",
  "aliases": ["pas", "pascal"],
  "engine": "",
  "rules": [
    { "kind": "unit", "pattern": "(?im)^…", "name_group": 1 }
  ]
}
```

- `engine: "go-ast"` → OrcheMax uses Go AST; leave `rules` empty.
- Otherwise `rules` drive regex symbol seeding.

**Sync:** OrcheMax may vendor a snapshot. PRs that change `langs/` should note breaking regex changes. Prefer extending **any** language — do not treat one stack as the default.

## 2. Packs (`packs/<id>/`)

Every pack has:

| File | Required | Purpose |
|------|----------|---------|
| `MANIFEST.yaml` | yes | id, kind, languages, orch_min, install hints |
| `GATES.md` | yes | Human + agent readable gate list |
| `README.md` | recommended | One-screen install |
| `SHARED*.md` | optional | Drop into shared layer folders |
| `claude/` | optional | Rules / snippets for Claude Code |
| `cursor/` | optional | `.mdc` / rules for Cursor |
| `fixtures/` | optional | Red/green examples for gates |
| `defaults.yaml` | optional | Suggested `orch.yaml` fragments |

### MANIFEST.yaml fields

```yaml
id: delphi
kind: language          # language | workshop | cross-cutting
version: 0.1.0
languages: [delphi]     # empty if workshop/cross-cutting
orch_min: "0.0.0"       # semver floor when known
summary: "…"
install:
  shared_docs:
    - { from: SHARED.core.md, to: "core/SHARED.md", mode: merge }
  gates_user:
    - { from: GATES.md, to: ".orch/gates/user/DELPHI.md" }
  claude_rules:
    - { from: claude/RULES.md, to: ".claude/rules/delphi.md" }
depends_on: [_workshop] # optional pack ids
built_in_orch:          # document Orche commands this pack relies on
  - guard code-lang
  - guard encoding
  - guard ddl
```

`mode: merge` = never wipe owner content; append under owner markers when present.

## 3. Workshop defaults (`packs/_workshop`)

Agnostic recommendations:

- Thin root `CLAUDE.md` / `AGENTS.md` pointers
- `SHARED.md` stub per shared folder
- `docs/TRACKER.md` vocabulary
- Profile hints: lite | shared | strict

Language packs **add** to this; they do not replace Orche `orch init` seeds.

## 4. Gates taxonomy

Use stable ids in GATES.md tables:

| Prefix | Meaning |
|--------|---------|
| `O.*` | Implemented (or documented) as **Orche built-in** |
| `P.*` | Pack-only (script, prose, or future Orche) |
| `W.*` | Workshop policy (owner judgment) |

Example: `O.encoding` = `orch guard encoding`; `P.delphi.firedac-text` = SHARED rule + optional fixture.

## 5. Contribution bar

1. One concern per PR.  
2. Fixtures for any **blocking** gate (red + green).  
3. No product brand names inside language packs.  
4. Soft-skip when the rule does not apply (noisy packs get deleted).  
5. Prefer documenting an Orche built-in over copying a lab `.mjs` wholesale.

## 6. Non-goals

- Not a marketplace SKU.  
- Not a replacement for `orch.yaml` or sealed `orch-*` skills.  
- Not any single company's internal product; these packs are fed by real workshop use, not published as a substitute for one.
