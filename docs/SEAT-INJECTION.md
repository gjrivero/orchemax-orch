# Seat injection — always kit vs layout families

Orchemax sits **under** every CLI. Injection is **not** an allowlist of agent
names. There are hundreds of agents; dogfood cases (OpenClaude, Cursor, …)
only teach **layout families**.

Product code: catalog hints `SkillRoot` / `HookLayout` on optional scan
entries — never `switch preset { "openclaude": … }` for each new binary.

## Always (any `orch <agent>` / dispatch)

| Surface | Where | Notes |
|---------|--------|--------|
| Compact protocol | SessionStart `additionalContext` (Claude family) + Cursor alwaysApply `.cursor/rules/orch-protocol.mdc` | Role-scoped chair/worker; **no** public `*/skills/orch-*` by default |
| Runtime depth | `.orch/ORCH_RUNTIME.md` | Every seat; refreshed on open |
| Orch MCP | `.orch/mcp.json` / `.mcp.json` | Server ids **`orchemax`** (preferred) and **`orch`** (alias). If another tool is named `orch`, call Orchemax as `orchemax`. |
| Continuity | `.orch/LAST_SESSION.md` | Chat is not memory |
| Gates | Seal path (dup, shared-lock, `.orch/gates/*`) | Run even when the CLI has **no** hooks |
| UserPromptSubmit | Same notify-hook | On “take context” / Chair cues injects `.orch/LAST_SESSION.md` |

Escape hatch: `ORCH_LEGACY_SKILLS=1` restores durable sealed `orch-*` skill
folders for one release. Default private mode sweeps them on launch.

A BYO binary with no catalog hint still gets this kit. Governance does not
wait for a named adapter.

## Optional — layout families (reuse adapters)

When a CLI exposes a known config schema, orch reuses **one** adapter for
that family. Catalog entries that share a schema point at the same
`HookLayout` + `SkillRoot` (hints from dogfood, not a seat allowlist).

| Family (`HookLayout`) | Adapter | Config dir (`SkillRoot`) | Dogfood examples |
|-----------------------|---------|--------------------------|------------------|
| `claude_settings` | Claude Code settings/hooks schema → `settings.local.json` | `.claude`, `.openclaude`, … | Claude Code, OpenClaude, Copilot (when it reads `.claude`) |
| `cursor_hooks` | `.cursor/hooks.json` | `.cursor` | Cursor Agent |
| `commandcode` | Command Code settings + mod | `.commandcode` | Command Code |

If the CLI has no hook surface, orch does **not** invent one. Seal gates +
MCP + compact protocol still apply.

## Pattern for a new agent (dogfood)

1. Open it with `orch <name>` (PATH LookPath — no catalog required).
2. Confirm the **always** kit (compact protocol, MCP under `orchemax`|`orch`, seal).
3. If notify / write-dup hooks are missing, classify the **schema**:
   - Same JSON as Claude settings? → `HookLayout: claude_settings` + its config dir.
   - Cursor-style hooks file? → `cursor_hooks`.
   - Unique layout? Prefer protocol/docs paste; only add a **new family** when
     the schema is truly different (same rule as gateway: no per-CLI writers).
4. Document the symptom in [COMMON-SETTINGS.md](COMMON-SETTINGS.md) as a field
   lesson — name the **layout**, not “add agent X to the allowlist”.

## Anti-patterns

- Growing `case "agentname":` lists in dispatch / wire.
- Shipping a settings writer per CLI (gateway already forbids this).
- Expecting vendor hooks for a CLI that has none — use seal + MCP instead.
- Seeding browsable `*/skills/orch-*` in workshops (R15 private default).

## Related

- Product how-to: [Silent seat protocol](https://docs.orchemax.com/how-to/silent-seat-protocol/)  
- [GATEWAY-AGENTS.md](GATEWAY-AGENTS.md) — two protocols, not hundreds of writers  
- [COMMON-SETTINGS.md](COMMON-SETTINGS.md) — terminal UI, permissions, notify  
- [WORKSHOP.md](WORKSHOP.md) — Chair / workers / same-CLI multi-project  
