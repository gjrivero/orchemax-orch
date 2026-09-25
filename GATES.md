# no-unmeasured-claims

Prose you publish does not state a saving as a percentage unless the number was
measured against a named counterfactual.

This is a house rule, not engineering: a workshop markets however it likes, so
Orchemax holds no opinion and the rule lives here. It was a built-in until the
owner's criterion retired it — a check whose scope was two of *our* own
directories, `server/web/` and `docs/site/`, was never a general check.

| Rule | What it denies |
|---|---|
| `no-unmeasured-savings-percent` | A figure with `%` within the same sentence as a savings word — save/reduce/cut/fewer/faster and their Spanish counterparts — in `.md`, `.html` or `.txt`. A threshold like "stop at 80%" is a setting, not a claim, and carries no savings word beside it, so it passes. |

Two honest limits of carrying this as a pack rule instead of a built-in:

- The rule is one regex over the whole file, so it reports the **first** claim in a
  file, not every one. Fix it, commit, see the next.
- It does not strip HTML tags, so a percentage split across markup can slip past.

Narrow `files` to the trees you actually publish. It ships as `**/*.md`,
`**/*.html`, `**/*.txt` because a pack cannot know where your prose lives.

## Install

```
orch pack install <path-or-url>/packs/no-unmeasured-claims
orch pack remove no-unmeasured-claims
```
