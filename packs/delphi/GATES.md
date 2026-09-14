# Delphi pack — gates

**O.** Orche built-in · **P.** this pack · **W.** owner judgment

## Rely on Orche (do not reimplement)

| Id | Command | Notes |
|----|---------|-------|
| O.code-lang | `orch guard code-lang` | English identifiers/strings; Spanish comments OK |
| O.encoding | `orch guard encoding` | HTML/email charset + mojibake |
| O.add-all | `orch guard add-all` | No blanket add on shared repos |
| O.shared-brand | `orch guard shared-brand` | No product names in shared |
| O.control-bytes | `orch guard control-bytes` | No 0x00/0x08 junk in sources |
| O.ddl | `orch guard ddl` | Table ⇒ seeder/writer |

## Pack rules (prose / fixtures — wire later if desired)

| Id | Rule | Severity |
|----|------|----------|
| P.delphi.firedac-text | Use `AddTextParam` for free text — never bare `P.Add('x', string)` (ANSI → `0x00` / `?`) | **block in review**; suite in workshop `core/tests` |
| P.delphi.null-param | `Add(name, Null)` needs explicit `DataType` or safe sentinel | warn |
| P.delphi.tests-dir | `.dcu` / trial binaries only under `tests/` (or disposable out/) — never beside shared units | warn → future O.artifacts |
| P.delphi.sql-in-controller | Controllers stay thin — no SQL string soup in controllers | owner architecture |
| P.delphi.htmx-spa | Optional Attlas-style: HTMX swaps, no React-by-default | **owner UI stack** — not Orche default |
| P.delphi.tenant-id | If using `taMultiTenant`, do not also declare `tenant_id` manually | owner schema |

## Suggested Claude rule

See `claude/RULES.md` — load with path globs for `**/*.{pas,dpr,dpk}`.
