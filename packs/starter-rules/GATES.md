# starter-rules — example gates

Three shapes a workshop-owned rule (**W.**) can take in
`.orch/gates/user/manifest.json`, shipped here as a pack so `orch pack
install` can drop them straight into a fresh workshop. Copy one, rename the
`id`, adjust the pattern — that's the whole workflow.

| Id | Kind | Checks |
|----|------|--------|
| `deny-todo` | `deny` (regex) | No `TODO` left in a sealed or committed change |
| `require-doc-title` | `require` (regex) | Every new `docs/**/*.md` starts with a top-level `# Title` |
| `cmd-diff-check` | `cmd` (argv, no shell) | `git diff --cached --check` — trailing whitespace / conflict markers, at `pre-commit` (files must already be staged) |

None of these three needs `orch guard <verb>` — they are plain `.orch/gates/user/manifest.json`
entries the pack format (`rules: [...]` in `MANIFEST.yaml`) just installs for you, tagged
`source: starter-rules@0.1.0` so `orch pack update|remove` can tell them from
a rule you wrote by hand.
