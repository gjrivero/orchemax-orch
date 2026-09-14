# Workshop gates (pack map)

Taxonomy: **O.** = Orche built-in · **P.** = pack/prose · **W.** = owner judgment.

## O — use Orche

| Id | Command / feature | Purpose |
|----|-------------------|---------|
| O.lang | `orch guard lang` | Docs/prose vs `workspace.locale` |
| O.code-lang | `orch guard code-lang` | Identifiers + shipping strings vs `workspace.code_lang` (comments free) |
| O.encoding | `orch guard encoding` | HTML/email UTF-8 charset + mojibake |
| O.add-all | `orch guard add-all` | No `git add -A` on **shared** repos |
| O.shared-brand | `orch guard shared-brand` | No product id / `products/<id>` in shared |
| O.control-bytes | `orch guard control-bytes` | No invisible control bytes in source |
| O.ddl | `orch guard ddl` | Schema paired with seeder/writer |
| O.comment | `orch guard comment` | Shared exports need one-line purpose |
| O.lock | `orch lock` / `guard lock` | Shared edits under lock |
| O.dup | `orch guard dup` + `orch symbols` | Spot duplicate symbols |
| O.tracker | `orch guard tracker` | Optional TRACKER table shape (T1–T3) |
| O.wire | `orch guard wire` | Git / Claude / Cursor adapters |

## W — owner

| Id | Practice |
|----|----------|
| W.search-before-create | Grep/symbols before new types; promote generics to shared |
| W.tests-disposable | Build/test junk only under `tests/` (no `.dcu` beside units) |
| W.stack-declare | Say UI/DB stack once (anti LLM fashion defaults) |

Language-specific rows live in `packs/<lang>/GATES.md`.
