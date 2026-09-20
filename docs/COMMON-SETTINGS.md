# Common settings (workshop tune-ups)

Field lessons for day-to-day seats. Optional workshop settings live in
`orch.yaml` / agent config when you hit the symptom.
Product docs: [docs.orchemax.com](https://docs.orchemax.com).

## Terminal UI — Orchemax owns it (no mouse tricks)

**You do not need OpenCode / Claude Code mouse hacks, Quick Edit toggles, or
`OPENCODE_DISABLE_MOUSE`.** Interactive seats on Windows go through Orchemax’s
terminal path so typing, wheel, select/copy, and exit restore match a bare
vendor CLI.

```yaml
agents:
  seat_host: true   # default on Windows; ORCH_SEAT_HOST=0 turns it off
```

| Capability | Behavior |
|------------|----------|
| Host-scroll (Claude-settings family) | ConPTY hold + host VT scrollback |
| Child-scroll (OpenCode + unknown BYO) | Native attach; vendor TUI owns scroll; orch clears Quick Edit |
| Live seat ops | `orch seat status\|wait\|read\|report` (+ MCP `seat_*`) |
| Detach / reattach | LLM `seat_detach`; human returns with `orch <agent>` (hosted hold only) |

Unknown `orch <bin>` defaults to child-scroll — not a name allowlist.

**Escape hatch only** (`seat_host: false`): `agents.disable_mouse: off|clicks|all`
for Claude-family classic knobs. Orchemax never sets `OPENCODE_DISABLE_MOUSE`
under seat_host. Prefer leaving seat_host on.

Full how-to:
[Common seat tune-ups](https://docs.orchemax.com/how-to/common-seat-tune-ups/).

## OpenClaude `/compact` fails (manual + automatic)

**Cause:** `compactModel` is a flash/reasoning model (e.g.
`orchemax/deepseek-flash-latest`). Summaries land in `reasoning`; OpenClaude
only reads chat `content`.

**Fix:** `orch openclaude` rewrites weak `compactModel` values in
`~/.openclaude.json` to `orchemax/pareto` (override
`ORCH_OPENCLAUDE_COMPACT_MODEL`, opt out with `=off`). Start a new seat, then
`/compact` again.

## OpenClaude always shows `orchemax/pareto` (or another model)

**Cause:** `~/.openclaude/settings.json` had `env.OPENAI_MODEL` pinned.
OpenClaude merges `settings.env` onto the process at startup, so that value
wins over the `model` field and the in-UI picker.

**Fix:** keep gateway routing in env, pick the model only via `model`:

```json
{
  "model": "orchemax/deepseek-v4.1-flash",
  "env": {
    "CLAUDE_CODE_USE_OPENAI": "1",
    "OPENAI_BASE_URL": "http://127.0.0.1:8788/v1"
  }
}
```

Do **not** put `OPENAI_MODEL` in `env`. `orch openclaude` now scrubs a
persisted `env.OPENAI_MODEL` on launch so the picker stays sticky.

## OpenClaude / Claude: no permission prompts (and no silent MCP denials)

**Modes that matter:**

| `defaultMode` | Asks? | What runs |
|---|---|---|
| `default` | Yes, often | You approve each sensitive tool |
| `acceptEdits` | Less | Edits auto; Bash/MCP may still ask |
| `dontAsk` | Never | **Only** `permissions.allow` — everything else is denied |
| `bypassPermissions` / `fullAccess` | Never | Tools run without prompting |

If you want **no questions** under Orchemax, prefer `bypassPermissions`
(workshop locks/guards still apply). Example for `~/.openclaude/settings.json`:

```json
"permissions": {
  "defaultMode": "bypassPermissions",
  "allow": [
    "mcp__orch__*",
    "Bash(*)",
    "Read(*)",
    "Edit(*)",
    "Write(*)",
    "MultiEdit(*)"
  ]
}
```

`dontAsk` alone with a short allow-list is what produced
`mcp__orch__verify_status has been denied` — add `mcp__orch__*` or switch
mode. Restart the seat after editing settings. In-session you can also use
`/permissions` or `/config` if the CLI exposes them.

## OpenClaude / Claude `dontAsk` denies `mcp__orch__…`

**Symptom:**

```text
Permission to use mcp__orch__verify_status has been denied because
Claude Code is running in don't ask mode.
```

**Cause:** `~/.openclaude/settings.json` (or Claude’s) has
`permissions.defaultMode: "dontAsk"` and only an explicit allow-list. Tools
not listed are refused without a prompt. A partial list (`msg_inbox`,
`task_list`, …) is not enough for `verify_status` / spawn / locks.

**Fix:** allow the whole Orchemax MCP server:

```json
"permissions": {
  "allow": ["mcp__orch__*", "…your other rules…"],
  "defaultMode": "dontAsk"
}
```

`orch guard wire --openclaude` (and `--claude`) also merges `mcp__orch__*`
into the project/local settings block. Restart the seat after changing
settings.

## OpenClaude needs a reply — no desktop toast

**Symptom:** OpenClaude waits on a permission / idle prompt; no toast or
Telegram.

**Cause:** OpenClaude uses the **Claude settings/hooks schema** under
`.openclaude/` (not `.claude/`). That is the `claude_settings` layout family —
same adapter as Claude Code, different config dir. See
[SEAT-INJECTION.md](SEAT-INJECTION.md).

```bash
orch guard wire --openclaude
```

Opening `orch openclaude` also injects project
`.openclaude/settings.local.json` automatically. Claude Code still uses
`orch guard wire --claude` (same family, `.claude/`). Prove desktop:
`orch notify test --desktop`.

## OpenClaude stops at 50 turns

**Symptom:** `Reached the maximum number of turns (50).`

**Cause:** OpenClaude’s default REPL cap (not Orchemax).

```bash
openclaude --max-turns 0          # 0 = unlimited (use with care)
# or
set OPENCLAUDE_MAX_TURNS=200      # shell / User env
```

In `orch.yaml` you can bake it into the interactive command:

```yaml
agents:
  interactive:
    openclaude: openclaude --max-turns 0
```

## Team work schedules gate dispatch

**Symptom:** plain message *Outside the Team work schedule…*

Configure company timezone + per-day On/Off/Ignored at
[orchemax.com/app/schedules](https://orchemax.com/app/schedules), then
`orch server entitlements`. How-to:
[Team work schedules](https://docs.orchemax.com/how-to/team-work-schedules/).

## Chair vs worker caps

| Meter | Key | What it counts |
|-------|-----|----------------|
| Open Chairs | `orch.agents.max` | Interactive Chair seats |
| Concurrent workers | `orch.agents.concurrent` | Dispatched workers |

MCP-only Chairs do not consume the worker meter. Optional cheap roster:

```yaml
agents:
  workers:
    - agent: opencode
      model: deepseek-v4.1-flash
      tier: cheap
```

## Gateway: protocols, not per-CLI writers

Hundreds of agents share two wires — see [GATEWAY-AGENTS.md](GATEWAY-AGENTS.md).
Prefer `orch gateway connect` (OpenAI-compat) or `connect anthropic`; only
OpenCode has an optional file writer (`--allow-user-scope`).

Seat skills / hooks follow the same rule: **always kit + few layout families**,
not an agent-name allowlist — [SEAT-INJECTION.md](SEAT-INJECTION.md).

## Related

- [WORKSHOP.md](WORKSHOP.md) — workspace / Chair / workers / schedules  
- [GATEWAY-AGENTS.md](GATEWAY-AGENTS.md) — seat matrix  
- [SEAT-INJECTION.md](SEAT-INJECTION.md) — always kit vs layout families  
- [ASSIST-HITL.md](ASSIST-HITL.md) — Team+ Telegram approve/deny  
- Product: [Common seat tune-ups](https://docs.orchemax.com/how-to/common-seat-tune-ups/)  
- Product: [Know when a worker finishes or asks](https://docs.orchemax.com/how-to/know-when-a-worker-finishes-or-asks/)
