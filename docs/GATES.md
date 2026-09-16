# Gates: which one lives where

A "gate" is a rule that can block or warn on a write. Three places define
gates for a workshop, and each has a different job — don't duplicate one in
another.

| Kind | Lives in | Example |
|------|----------|---------|
| Product built-in (**O.**) | The `orch` CLI itself | `orch guard code-lang`, `orch guard ddl` |
| Pack-documented (**P.**) | This repo, `packs/<name>/GATES.md` | Language/stack footguns a pack recommends enabling |
| Owner-written (**W.**) | Your workshop's `.orch/gates/user/` | Company-specific rules `orch` cannot know about |

## O. — product built-ins (this repo only documents them)

| Gate | Command | Purpose |
|------|---------|---------|
| Language (prose) | `orch guard lang` | Docs/prose text vs `workspace.locale` |
| Language (code) | `orch guard code-lang` | Identifiers + shipping strings vs `workspace.code_lang` |
| Encoding | `orch guard encoding` | HTML/email UTF-8 charset + mojibake |
| Clone detection | `orch guard dup` | Function-body clone detection (Rabin-Karp over normalized tokens) — complements exported-symbol dedup; advisory by default, block opt-in |
| Schema pairing | `orch guard ddl` | Schema change paired with its seeder/writer |
| Tracker shape | `orch guard tracker` | Optional `TRACKER.md` table shape (T1–T3) |
| Add-all | `orch guard add-all` | No `git add -A` on shared repos |
| Shared-brand | `orch guard shared-brand` | No product/client id inside shared layers |
| Control bytes | `orch guard control-bytes` | No invisible control bytes in source |
| Comment | `orch guard comment` | Shared exports need a one-line purpose comment |
| Lock | `orch lock` / `orch guard lock` | Shared-path edits only under a held lock |
| Wire | `orch guard wire` | Git / Claude / Cursor harness adapters present |

Full descriptions and rationale for each: [`packs/_workshop/GATES.md`](../packs/_workshop/GATES.md)
(the canonical **O.**/**W.** table this repo ships); language-specific rows
live in `packs/<lang>/GATES.md`, e.g. [`packs/go/GATES.md`](../packs/go/GATES.md),
[`packs/delphi/GATES.md`](../packs/delphi/GATES.md).

## Hooks — opt-in, not gates

Two harness hooks rewrite tool output *before* it reaches the agent's
context; both default off because a hook that touches the agent's own loop
is a bigger consent than a pack recommendation:

| Config key | Effect when enabled |
|------------|----------------------|
| `context.hooks.post_tool` | Installs the harness `PostToolUse` (Claude Code) / `tool.execute.after` (OpenCode) hook that crushes bulky tool output before it reaches the agent |
| `context.hooks.pre_compact` | Installs the `PreCompact` hook; this is the one that lets `orch memory condense` run automatically ahead of a context compaction — it never runs on its own otherwise |

Set them in `orch.yaml` under `context.hooks:`. The legacy scalar form
(`context.hooks: true`) only ever enables `post_tool`, on purpose — a
deprecated value must not silently grant a consent it never asked for.

## Where a new rule belongs

| You want to add… | Put it in |
|-------------------|-----------|
| A rule that applies to any workshop, any stack | Propose it as an **O.** built-in (product repo, not here) |
| A footgun specific to one language/stack | `packs/<lang>/GATES.md` (this repo) |
| A rule specific to your company's process | Your workshop's `.orch/gates/user/` — never this repo |

See [WORKSHOP.md](WORKSHOP.md) for the workspace/project/Chair/worker model
these gates operate on, and [CONTRIBUTING.md](../CONTRIBUTING.md) for how to
add or extend a pack's `GATES.md`.
