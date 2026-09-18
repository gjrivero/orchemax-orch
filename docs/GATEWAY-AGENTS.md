# Gateway ↔ agent seats

How Orchemax's local gateway is pointed at each coding CLI. The runtime that
writes configs lives in the product (`orch`); this page is the public matrix so
pack authors and workshop owners know **which seat gets which wire**.

Product how-to (always current):  
https://docs.orchemax.com/how-to/gateway-keys-and-connect/

## Mental model

```text
agent CLI  →  Orchemax gateway (:8788)  →  your providers (key ring + failover)
```

- Upstream secrets live only in machine-home `keys.env` — never in chat, never in
  this repo, never in `orch.yaml`.
- The agent authenticates with a **virtual** key (`orch_gk_…`). It never sees
  OpenRouter / Groq / … secrets.
- Several keys in one env var (`OPENROUTER_API_KEY=a,b,c`) = rotation ring.
  Failover across providers is `ai.yaml` priority.

## Per-seat connect matrix

| Seat | Why people pick it | Transport | How Orchemax wires it | Config file (if any) |
|------|--------------------|-----------|------------------------|----------------------|
| **OpenCode** | TUI + OpenAI-compat providers | OpenAI `/v1` | `orch gateway connect opencode --allow-user-scope` | `~/.config/opencode/opencode.json` |
| **OpenClaude** | Claude Code UX with a **third-party** provider (not Anthropic) | OpenAI `/v1` (`CLAUDE_CODE_USE_OPENAI=1`) | `orch gateway connect openclaude --allow-user-scope` | `~/.openclaude/settings.json` → `env` block |
| **Command Code** | OpenAI-compat CLI | OpenAI `/v1` | `orch gateway connect commandcode` (prints env) | paste / CLI settings |
| **Copilot CLI** | GitHub Copilot provider flags | OpenAI `/v1` | `orch gateway connect openai` (prints env) | paste |
| **Cursor** (BYOK) | Override OpenAI base URL in Settings | OpenAI `/v1` | `orch gateway connect openai` | Settings → Models (not shell env) |
| **Claude Code** | Anthropic plan or Anthropic **API key** | Anthropic `/v1/messages` | `orch gateway connect claude` (prints env) | paste / `~/.claude/settings.json` |
| **Codex** | OpenAI plan login | — | default `agents.auth.codex: account` | keep vendor login |

### OpenClaude vs Claude Code

| | **Claude Code** (`orch claude`) | **OpenClaude** (`orch openclaude`) |
|--|----------------------------------|-------------------------------------|
| Intent | Anthropic (plan or API key) | Same IDE UX, **other** providers |
| Gateway lane | Anthropic Messages passthrough (no provider-ring rotation) | OpenAI-compat → full key ring + failover |
| Connect | `orch gateway connect claude` | `orch gateway connect openclaude --allow-user-scope` |
| File | optional paste into Claude settings | **writes** `~/.openclaude/settings.json` |

OpenClaude's `settings.json` env block looks like:

```json
{
  "env": {
    "CLAUDE_CODE_USE_OPENAI": "1",
    "OPENAI_BASE_URL": "http://127.0.0.1:8788/v1",
    "OPENAI_API_KEY": "orch_gk_…",
    "OPENAI_MODEL": "orchemax/auto"
  }
}
```

Orchemax merges into `env` and keeps an existing top-level `model` if set.
Restart OpenClaude after connect.

### Claude Code and Anthropic terms

Claude Code on a **subscription / OAuth** login stays on `agents.auth.claude: account`.
Orchemax does not intermediate `sk-ant-oat…` or Anthropic OAuth beta headers (gateway
answers `403`). An Anthropic **API key** is the only Anthropic credential the
passthrough lane carries — and that lane does **not** rotate your OpenRouter ring.

## Pattern for similar agents

When adding or documenting another seat, classify it once:

1. **Config-file seat (OpenAI-compat)** — like OpenCode / OpenClaude: product grows a
   `gateway connect <id> --allow-user-scope` writer; document the path and the env
   keys here and on docs.orchemax.com.
2. **Paste OpenAI-compat** — Command Code, Copilot, Cursor BYOK: document
   `connect openai` (or a dedicated connect) and where the human pastes.
3. **Paste Anthropic** — only Claude Code (and forks that truly speak Messages API
   against Anthropic upstream). Do **not** put third-party-provider forks on this
   lane if the user's goal is provider rotation.
4. **Account seat** — Cursor / Codex plan login: default `agents.auth.<preset>: account`;
   connect only prints `ORCH_GATEWAY_*` unless the owner forces `gateway`.

Do not invent a second vault. Keys stay in Orchemax machine-home; the seat only
learns the virtual key + base URL.

## Minimal commands

```bash
orch gateway keys add openrouter     # or edit %LOCALAPPDATA%\Orchemax\keys.env
orch gateway setup --live …          # once per provider
orch gateway                         # leave running
orch gateway connect openclaude --allow-user-scope
# or: connect opencode --allow-user-scope
orch gateway status
```

## Related

- [WORKSHOP.md](WORKSHOP.md) — workspace / Chair / workers  
- Product: [Gateway keys and connect](https://docs.orchemax.com/how-to/gateway-keys-and-connect/)  
- Recipe: [Connect OpenCode](https://docs.orchemax.com/talk-to-orch/connect-opencode-gateway/)  
- Recipe: [Connect OpenClaude](https://docs.orchemax.com/talk-to-orch/connect-openclaude-gateway/)
