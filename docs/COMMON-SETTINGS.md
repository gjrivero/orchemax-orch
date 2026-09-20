# Common settings (workshop tune-ups)

Field lessons that improve day-to-day seats. These are **optional** — put them
in your workshop `orch.yaml` (or the named env) when you hit the symptom.
Product docs: [docs.orchemax.com](https://docs.orchemax.com).

## Mouse / focus garbage in the chat (`[I[O`, `<35;…M`)

**Symptom:** clicking or focusing the terminal pastes escape junk into the
agent chat (OpenCode and OpenClaude / Claude Code family).

**Cause:** the TUI enables DEC mouse/focus reporting; some builds do not
filter those bytes. Orchemax already resets leftover modes around seats;
turning mouse off is an **owner choice** (native select works; in-TUI wheel
scroll usually does not).

```yaml
agents:
  disable_mouse: true   # injects OPENCODE_DISABLE_MOUSE + CLAUDE_CODE_DISABLE_MOUSE
```

Opt out for one shell: `ORCH_ENABLE_AGENT_MOUSE=1`.  
If you already set `OPENCODE_DISABLE_MOUSE=true`, Orchemax mirrors
`CLAUDE_CODE_DISABLE_MOUSE=1` so OpenClaude matches OpenCode.

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

**Cause:** OpenClaude reads `.openclaude/`, not `.claude/`. The Notification
hook that runs `orch hook notification` must be wired for OpenClaude.

```bash
orch guard wire --openclaude
```

Opening `orch openclaude` also injects project
`.openclaude/settings.local.json` automatically. Claude Code still uses
`orch guard wire --claude`. Prove desktop: `orch notify test --desktop`.

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

## Related

- [WORKSHOP.md](WORKSHOP.md) — workspace / Chair / workers / schedules  
- [GATEWAY-AGENTS.md](GATEWAY-AGENTS.md) — seat matrix  
- [ASSIST-HITL.md](ASSIST-HITL.md) — Team+ Telegram approve/deny  
- Product: [Know when a worker finishes or asks](https://docs.orchemax.com/how-to/know-when-a-worker-finishes-or-asks/)
