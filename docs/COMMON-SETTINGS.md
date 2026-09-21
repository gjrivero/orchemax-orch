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

## OpenClaude / Claude: no permission prompts (Chair and workers)

Under Orchemax the **workshop** is the perimeter (locks, guards) — not the
vendor “Allow this tool?” dialog. Defaults:

- Interactive + headless Claude / OpenClaude / agy: `--dangerously-skip-permissions`
- `orch guard wire`: sets `permissions.defaultMode: bypassPermissions` when unset
  and always allows `mcp__orch__*`
- Workers never have a human at the keyboard — a permission wall is exit **126**

Prefer `bypassPermissions` over `dontAsk` (`dontAsk` **denies** anything not
listed). Example for `~/.openclaude/settings.json` or project
`.openclaude/settings.local.json`:

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

An explicit `defaultMode` you set is never overwritten by wire. Restart the
seat after editing settings.

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

## Vendor allowlists / MCP approval walls

**Pattern:** Orchemax rewrites seat MCP/config every launch (fresh
`ORCH_SESSION`, role, paths). Many CLIs key a **local allowlist / hash** off
that file. When the hash changes, the vendor re-prompts — fine in a desktop
IDE, fatal for headless workers, and on some Windows TUIs the approve dialog
**hangs** after you pick an option (you must kill the terminal).

Do **not** treat this as an Orchemax name-whitelist. Prefer each CLI’s native
auto-approve flag on **both** interactive and headless presets. When you add a
BYO agent, put the same class of flag in `agents.interactive.<id>` and
`agents.cmds.<id>`.

| CLI / surface | What re-prompts | Orchemax default / fix |
|---------------|-----------------|------------------------|
| **Cursor** (`cursor-agent`) | Project MCP server approval (`~/.cursor/projects/…/mcp-approvals.json` hashes the server entry; orch puts `ORCH_SESSION` in `.cursor/mcp.json` env → new hash almost every seat) | Interactive: `cursor-agent --approve-mcps --trust`. Headless: `-p … --force --trust --approve-mcps` |
| **Claude / OpenClaude / agy** | Per-tool “Allow?” | `--dangerously-skip-permissions` on interactive + headless |
| **Claude-settings `dontAsk`** | MCP tools missing from `permissions.allow` | Allow `mcp__orch__*` (see section above); prefer `bypassPermissions` |
| **OpenCode** | Tool approval in `run` | `opencode run --auto` |
| **agy MCP** | No per-workspace MCP at all | `orch guard wire --agy --scope user --allow-user-scope` once |
| **BYO** | Whatever their docs call trust / yolo / approve-mcp | Declare native flags in `orch.yaml`; never rely on a human at the worker keyboard |

### Cursor: MCP approve TUI freezes on `orch cursor`

**Symptom:**

```text
The following MCP servers need to be approved:
  • orch (command: …\orch.exe)
  [a] Approve all servers
  …
  ⏳ Applying your selection...
```

Terminal never recovers — you close the window.

**Cause:** interactive preset used to be bare `cursor-agent` (no
`--approve-mcps`). Orch’s rewritten `.cursor/mcp.json` misses Cursor’s
approval whitelist → TUI every launch; applying the selection often hangs
under the seat console.

**Fix:** update `orch` (interactive default is now
`cursor-agent --approve-mcps --trust`). Override without upgrading:

```yaml
agents:
  interactive:
    cursor: cursor-agent --approve-mcps --trust
```

```powershell
$env:ORCH_AGENT_CMD = "cursor-agent --approve-mcps --trust"
orch cursor-agent
```

Headless workers already required `--approve-mcps` (otherwise
`MCP server does not exist: orch` / “not loaded (needs approval)” with exit 0).

## Account / plan login seats (no API key)

**Pattern:** Cursor, Claude Code (Pro/Max), Codex, agy (and similar) already
have a **vendor login + token plan**. Orchemax still sits under them for MCP,
bus, locks and usage — but **model traffic does not** go through the local
gateway. Default `agents.auth.<preset>: account`.

A fresh `orch setup` seeds `agents.auth` (account vs gateway examples),
`agents.interactive.cursor` (`--approve-mcps --trust`), and two placeholder
`agents.workers` rows (`your-account-agent-here` / `your-gateway-agent-here`)
so workshops see both modes before filling real CLIs. Untouched placeholders
never spawn.

Do **not** put provider keys in `keys.env` for these seats, and do **not** run
`orch gateway connect` to replace the login.

| Seat | Default `agents.auth` | What you do |
|------|----------------------|-------------|
| **Cursor** (subscription) | `account` | `orch cursor`; stay logged in. No API key. |
| **Claude Code** (Pro/Max / OAuth) | `account` | `orch claude`; keep Anthropic login. Gateway refuses OAuth (`403`). |
| **Codex** | `account` | Keep the OpenAI / Codex plan login. |
| **Antigravity (agy)** | `account` | `orch agy`; keep product login. |
| **Gemini CLI** (login) | `account` | Product login — not Orchemax vault keys. |

**Same CLI, key mode** (only when you mean it): Cursor BYOK / Copilot with
provider key → `orch gateway connect`; Claude with Anthropic **API key** →
`orch gateway connect anthropic` + `agents.auth.claude: gateway`; OpenCode /
OpenClaude / Command Code / unknown BYO → vault + gateway.

```yaml
agents:
  auth:
    claude: gateway   # Anthropic API key — not the Pro/Max login
```

**Anti-patterns:** pointing plan seats at `:8788`; expecting gateway crush on
account seats; hardcoding a short name list of “who uses account” — classify by
credential mode (`account` vs `gateway`). Full matrix:
[GATEWAY-AGENTS.md](GATEWAY-AGENTS.md).

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
**Account / plan seats** (Cursor, Claude Pro/Max, Codex, …) skip the gateway —
see [Account / plan login seats](#account--plan-login-seats-no-api-key) above.
Prefer `orch gateway connect` (OpenAI-compat) or `connect anthropic` only for
**API-key** seats; only OpenCode has an optional file writer (`--allow-user-scope`).

Seat skills / hooks follow the same rule: **always kit + few layout families**,
not an agent-name allowlist — [SEAT-INJECTION.md](SEAT-INJECTION.md).

## Related

- [WORKSHOP.md](WORKSHOP.md) — workspace / Chair / workers / schedules  
- [GATEWAY-AGENTS.md](GATEWAY-AGENTS.md) — seat matrix  
- [SEAT-INJECTION.md](SEAT-INJECTION.md) — always kit vs layout families  
- [ASSIST-HITL.md](ASSIST-HITL.md) — Team+ Telegram approve/deny  
- Product: [Common seat tune-ups](https://docs.orchemax.com/how-to/common-seat-tune-ups/)  
- Product: [Know when a worker finishes or asks](https://docs.orchemax.com/how-to/know-when-a-worker-finishes-or-asks/)
