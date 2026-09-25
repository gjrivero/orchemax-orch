<!-- orch:begin -->
# AGENTS.md — orchemax-orch

Cross-CLI digest (Codex/OpenCode native; Claude `@AGENTS.md`; Cursor/Copilot/Gemini pointers).
Seat binary = `agents.default_preset` only.

## Workspace rules
- locale: en · code_lang: en · comment_lang: en · address: informal
- guard.profile: strict · dup: block · code_lang_strict: off · tracker: off
- sandbox (item 144): agent scratch under `.sandbox/<seat>/`, swept after 14 day(s), never versioned; temp files deleted at task close.
- litter (item 9): never `-v2`/`-final`/copy files — update the canonical one; never `> nul` (`/dev/null`/`$null`); pipe build logs to `.sandbox/<seat>/` (`tee build.log` in-tree is denied); scripts you run are not inspected inside, so they follow the same rule.

## Reach orch
MCP servers `orchemax` (preferred) or `orch` (alias) — see `.mcp.json` / `.cursor/mcp.json`. If another tool is named orch, call Orchemax as `orchemax`. CLI: `orch task`, `orch dispatch`, `orch guard`.

## More
- Seat contract: `.orch/ORCH_RUNTIME.md` (injected at launch; not public skill folders).
- Elemental principles (Karpathy): `DEV_PRACTICES.md` § Elemental principles.
- User gates: `../../.orch/gates/user/README.md`
- Full doctrine: this project's `CLAUDE.md`.
<!-- orch:end -->

---
<!-- owner notes below this line — orch does not touch this section on refresh -->
