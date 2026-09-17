# Gate catalogue — every default `orch guard` verb

One row per built-in check the `orch` binary ships. Use this table to decide
whether a rule you want already exists (don't duplicate it in
`.orch/gates/user/manifest.json`), and whether one you're about to write by
hand could instead be a "P." pack rule other workshops reuse.

**Run points**: `on-demand` = callable any time as its own CLI verb;
`pre-commit`/`pre-push` = wired by `orch guard hooks install` (git hooks),
turned on for `guard.profile: shared|strict`; `ide-pre`/`ide-post` = the
Claude Code hook wired by `orch guard wire`, on only for `guard.profile:
strict`; `seal` = the verification pass a worker session runs at close.

**Profile behaviour** follows the workshop's `guard.profile` (`orch guard
profile`): `none` seeds nothing and wires no hook; `lite` (day-1 default)
seeds docs/skills but installs no hook — every guard below is still callable
on-demand, just not automatic; `shared` adds the git hooks; `strict` adds the
IDE hook and turns the six genesis guards from advisory to blocking. A guard
whose own flag already carries a mode (`dup`, `lock`) reads that flag first;
`guard.profile` only decides whether the hook that calls it exists at all.

**User-manifest equivalent**: whether the same check is expressible as one
`.orch/gates/user/manifest.json` entry (`deny`/`require` regex, or a `cmd`
wrapping a script). Most of these guards are structural (AST, DB schema, file
existence across two paths) — a regex cannot see that, so the honest answer
for those is "no — write a `cmd` gate that shells out to your own script."

| Verb | Checks | Run points | Profile behaviour | User-manifest equivalent |
|------|--------|------------|--------------------|---------------------------|
| `guard lang [root]` | Prose/docs text vs `workspace.locale` | on-demand, pre-commit/pre-push (shared/strict), ide-pre/post (strict) | Same hook wiring as the rest of the "core" set — off until `shared`, on-demand always | No — language detection needs more than a regex; a `require` gate could pin one literal phrase per file at most |
| `guard code-lang [root]` | Identifiers/shipping strings vs `workspace.code_lang` (`code_lang_strict` also flags identifiers) | on-demand, pre-commit/pre-push, ide-pre/post | Same as above | No |
| `guard encoding [files...]` | UTF-8 charset declared + no mojibake in HTML/email templates | on-demand, pre-commit/pre-push, ide-pre/post | Same as above | Partial — `require: "charset=utf-8"` on `*.html` catches the missing-charset half only |
| `guard dup <file>` | New file duplicates a shared symbol; Rabin-Karp clone detection across the repo | on-demand (also the PreToolUse advisory hook) | Independent of `guard.profile` — its own `guard.dup.mode: advisory\|block\|off` decides; profile only gates whether the git/IDE hook calls it | No — needs the shared-symbol index (`orch symbols`) |
| `guard ddl [files...]` | A migration/`CREATE TABLE` change has a matching seeder/repository write | on-demand, pre-commit/pre-push, ide-pre/post | Same as core set | No — cross-file pairing |
| `guard comment <shared-file>` | Exported shared symbols carry a one-line purpose comment | on-demand, pre-commit/pre-push, ide-pre/post | Same as core set | No — needs the language's export syntax, not text |
| `guard comment-prose [path]` | Flags long/narrative comment blocks (advisory, never denies) | on-demand | Always advisory — no block state to gate | No — heuristic over comment length/prose ratio |
| `guard add-all [git-cmd]` | Denies `git add -A`/`git add .` when cwd is a shared repo | on-demand, pre-commit | Same as core set | No — inspects the git command line, not file content; closest is a `cmd` gate wrapping a wrapper script around `git add` |
| `guard shared-brand [files...]` | No product brand / `products/<id>` reference inside a shared layer | on-demand, pre-commit/pre-push, ide-pre/post | Same as core set | Yes — `{"deny": "\\b(your-brand-id)\\b", "files": ["shared/**"]}` |
| `guard control-bytes [files...]` | No invisible control bytes in source (tab/LF/CR excepted) | on-demand, pre-commit/pre-push, ide-pre/post | Same as core set | Yes — `{"deny": "[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]"}` |
| `guard artifacts [files...\|dir]` | Denies disposable build junk (`.dcu`, `.o`, `.exe`, …) committed beside source | on-demand, pre-commit | Same as core set | Yes — one `deny`/`files` glob per extension you want to keep out |
| `guard tracker [TRACKER.md\|dir]` | `TRACKER.md` shape: status · SPEC ref · evidence · no prose (T1–T4) | on-demand, pre-commit/pre-push | `guard.tracker: true` opts a fresh workshop in even before a TRACKER.md exists; otherwise same as core set | No — table-shape validation |
| `guard lock <path>` | Shared-path write only under a lock held by `--holder` | on-demand (also `orch lock`) | Independent of `guard.profile` — locking is always on for anything under a registered `shared` root | No — needs the live `shared_locks` table |
| `guard wire` / `guard unwire` | Installs/removes the marked git + Claude/Cursor/Copilot/agy adapters | on-demand (`orch setup`/`orch init` call it) | `shared` wires git hooks only; `strict` adds the Claude Code IDE hook; `bring` and `none` wire nothing automatically | n/a — a meta-command, not a check |
| `guard hooks install\|uninstall\|status\|run` | Manages/runs the git pre-commit/pre-push hook that calls every guard above plus `.orch/gates/user/manifest.json` | pre-commit, pre-push | Installed automatically for `shared`/`strict`; always installable by hand | n/a — the runner, not a check |
| `guard rules [run]` | Lists/validates/dry-runs the workshop's own `.orch/gates/user/manifest.json` | on-demand | n/a — this is how you inspect **W.**/**P.** rules, not an **O.** check itself | n/a |
| `guard profile [name]` | Shows or sets `guard.profile` in `orch.yaml` | on-demand | n/a | n/a |
| `guard docs [root]` | Denies an unreferenced new doc, or a header count mismatched to the file (genesis) | on-demand, pre-commit/pre-push (shared/strict) | Advisory under `lite`/`bring`/`none`/unset; advisory under `shared` too (its one exception); blocking under `strict` | No — cross-references the doc index |
| `guard signature [files...]` | Denies a non-constant-time comparison on a signature/HMAC/token (genesis) | on-demand, pre-commit/pre-push | Advisory under `lite`/`bring`/`none`/unset; **blocking** under `shared` and `strict` | No — needs the language's comparison AST |
| `guard upsert [files...]` | Denies `ON CONFLICT`/`ON DUPLICATE KEY`/`MERGE` with no matching `UNIQUE`/PK (genesis) | on-demand, pre-commit/pre-push | Advisory `lite`/`bring`/`none`/unset; blocking `shared`/`strict` | No — needs the schema |
| `guard env-drift [root]` | Denies keys lost/emptied between a `.env.example` and its real instance (genesis) | on-demand, pre-commit/pre-push | Advisory `lite`/`bring`/`none`/unset; blocking `shared`/`strict` | No — diffs two files by key, not by regex |
| `guard shared-shadow [files...]` | Denies a project file whose path mirrors one already under a shared root (genesis) | on-demand, pre-commit/pre-push | Advisory `lite`/`bring`/`none`/unset; blocking `shared`/`strict` | No — needs the registered shared roots |
| `guard template-drift [files...]` | Denies a key-set mismatch between a `*.template.json`/`*.example.json` and its instance (genesis) | on-demand, pre-commit/pre-push | Advisory `lite`/`bring`/`none`/unset; blocking `shared`/`strict` | No — same reason as `env-drift` |
| `guard litter [files...]` | Denies new agent scratch (notes, reports, logs, `-v2`/`final`/`(n)` copies, unlisted dot-folders, byte duplicates, `> nul`-style reserved names) outside `.sandbox/<seat>/` or docs; source/module files never by name; shell redirects (`>`, `tee`, `Out-File`) judged by the IDE hook | on-demand, ide-pre, seal | deny on lite/shared/strict, note on bring, off on none | no (built-in; add paths to `projects[].keep` instead) |
| `guard principles` | Prints the 9 seeded elemental principles and which are enforced, advisory or guidance | on-demand | n/a | n/a |
| seal: dangling refs | Deleting or renaming a path another tracked file still names (segment-bounded, rename-aware); comment/`.md` hits are advisory | seal | block on lite/shared/strict, note on bring, off on none | no |
| seal: unreferenced script | A new `.sh`/`.ps1`/`.cmd`/`.bat`/executable nothing references (a litter-shaped file cannot vouch for it) | seal | follows `guard litter` | no |
| seal: principle 7 | A test lost assertions or gained a skip while the source it covers changed | seal | advisory; off on none | no |
| seal: principle 4 | A dispatched worker edited before calling `ask` or stating assumptions (Claude Code transcripts) | seal | advisory; off on none | no |

## Notes for pack authors

- A pack (`packs/<name>/GATES.md` in this repo) documents a footgun and
  recommends turning on one or more of the **O.** rows above, or ships a
  **P.**/**W.** rule of its own via `orch pack install` (see
  [`packs/starter-rules/`](../packs/starter-rules/) for the three shapes:
  `deny`, `require`, `cmd`).
- Never re-implement a row from this table as a user rule just because the
  regex is short — the built-in has already been proven against the seal
  path, the IDE hook, and the git hook; a duplicate copy drifts the moment
  one side changes.
