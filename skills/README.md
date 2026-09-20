# orch-* skills (read-only mirror)

`orch-chair`, `orch-worker`, `orch-clarify`, `orch-recall`, `orch-config` — the five
sealed skills the `orch` binary seeds into every workshop's vendor skill
dirs (`.claude/skills/`, `.cursor/skills/`, …) on `orch init`/dispatch/launch.

**The binary is the source of truth.** These files are a snapshot, generated
with:

```
orch skill export --dir skills
```

Do not hand-edit them — a future `orch skill export` overwrites whatever is
here. If a skill needs to change, it changes in the `orch` binary
(`internal/chair`) and this snapshot is regenerated and committed alongside
that release.
