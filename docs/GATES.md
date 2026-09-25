# Gates: which one lives where

A "gate" is a rule that can block or warn on a write. Three places define
gates for a workshop, and each has a different job — don't duplicate one in
another.

| Kind | Lives in | Example |
|------|----------|---------|
| Product built-in (**O.**) | The `orch` CLI itself | `orch guard code-lang`, `orch guard ddl` |
| Pack-documented (**P.**) | This repo, `packs/<name>/GATES.md` | Language/stack footguns a pack recommends enabling |
| Owner-written (**W.**) | Your workshop's `.orch/gates/user/` | Company-specific rules `orch` cannot know about |

## O. — product built-ins (this repo only points at them)

There is no list of them here. The binary you have is the list, and each verb's
one-line description *is* what it checks:

```
orch guard --help                 # every built-in, with what it checks
orch guard explain <file>         # what every rule answers about one file
orch guard principles             # which elemental principles a gate enforces
```

A hand-kept copy of that list used to live in this file. It went stale in the two
ways a hand-kept list does: it named twelve of them, and it described the tracker
gate as checking three rules when the gate had grown to five.

The generated, always-current reference is
[Languages and guards](https://docs.orchemax.com/reference/languages-and-guards/) —
every `orch guard` verb, read straight from the source that defines it.

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
| A language the symbol index does not know | `langs/<id>.json` here, or `.orch/langs/<id>.json` to try it in your workshop first — see [`langs/README.md`](../langs/README.md) |

See [WORKSHOP.md](WORKSHOP.md) for the workspace/project/Chair/worker model
these gates operate on, and [CONTRIBUTING.md](../CONTRIBUTING.md) for how to
add or extend a pack's `GATES.md`.
