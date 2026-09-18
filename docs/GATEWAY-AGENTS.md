# Gateway ↔ agent seats

**Not every seat uses the gateway.** Orchemax sits under every CLI for MCP, bus,
locks and governance. The **gateway** is optional and only for seats that talk to
models with **API keys** (or a third-party OpenAI-compat provider). Seats that
already have a **vendor login + token plan** keep that login — Cursor, Claude Code
(subscription), Codex, and similar.

Product how-to:  
https://docs.orchemax.com/how-to/gateway-keys-and-connect/

## Two kinds of seats

| Kind | Examples | Model auth | Gateway? |
|------|----------|------------|----------|
| **Account / plan** | Cursor (subscription), Claude Code (Pro/Max), Codex | Vendor login; tokens billed on that plan | **No** (default). Do not run `gateway connect` to replace the login. |
| **API-key / BYO provider** | OpenCode, OpenClaude, Command Code, Copilot CLI with provider key, Cursor **BYOK** only | Your keys in Orchemax `keys.env`, or the seat's own key | **Yes** — vault + rotation + crush |

A seat can support both modes (e.g. Claude with a plan *or* an Anthropic API key;
Cursor with a plan *or* BYOK). Orchemax defaults to **account** when a forced
gateway credential would steal the subscription login and its connectors
(`agents.auth.<preset>: account`). Force `gateway` only when you mean it.

## When the gateway applies

```text
API-key seat (OpenCode, OpenClaude, …)
        │  Base URL + virtual orch_gk_…
        ▼
orch gateway  (:8788)
        │  key ring + provider failover
        ▼
OpenRouter / Groq / Cerebras / …
```

Account seats skip that path entirely:

```text
Cursor / Claude (plan) / Codex
        │  their own login
        ▼
vendor model API
        │
orch still under the seat → MCP, bus, locks, usage (not model routing)
```

- Upstream secrets live only in machine-home `keys.env` — never in chat or this repo.
- On a gateway seat the agent sees a **virtual** key (`orch_gk_…`), never upstream secrets.
- Several keys in one env var (`OPENROUTER_API_KEY=a,b,c`) = rotation ring.

## Per-seat matrix

### Account / plan — gateway does **not** apply (default)

| Seat | Default `agents.auth` | What to do |
|------|----------------------|------------|
| **Cursor** (subscription) | `account` | Open `orch cursor`; keep Cursor login. No `gateway connect`. |
| **Claude Code** (Pro/Max / OAuth) | `account` | Open `orch claude`; keep Anthropic login. Gateway refuses OAuth bearers (`403`). |
| **Codex** | `account` | Keep OpenAI plan login. |

### API-key / BYO — gateway **does** apply

| Seat | Why | Connect | Config |
|------|-----|---------|--------|
| **OpenCode** | TUI + OpenAI-compat providers | `orch gateway connect opencode --allow-user-scope` | `~/.config/opencode/opencode.json` |
| **OpenClaude** | Claude Code UX + **third-party** provider (not Anthropic plan) | `orch gateway connect openclaude --allow-user-scope` | `~/.openclaude/settings.json` → `env` |
| **Command Code** | OpenAI-compat CLI | `orch gateway connect commandcode` | print env / paste |
| **Copilot CLI** (provider key) | OpenAI-compat flags | `orch gateway connect openai` | print env |
| **Cursor BYOK** (opt-in) | Override OpenAI base URL in Settings | `orch gateway connect openai` | Settings → Models only |
| **Claude Code** (Anthropic **API key** only) | Passthrough Messages API | `orch gateway connect claude` + `agents.auth.claude: gateway` | paste env — **no** OpenRouter ring |

### OpenClaude vs Claude Code

| | **Claude Code** (`orch claude`) | **OpenClaude** (`orch openclaude`) |
|--|----------------------------------|-------------------------------------|
| Typical user | Anthropic plan (login) | Same IDE UX, **other** providers via API keys |
| Gateway | Off by default | On by default (OpenAI-compat) |
| Connect | Only if using Anthropic API key | `connect openclaude --allow-user-scope` |

OpenClaude `settings.json` env (gateway seats only):

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

## Pattern for similar agents

Classify once:

1. **Account / plan seat** — document “no gateway”; default `agents.auth: account`.
2. **API-key config-file seat** — OpenCode / OpenClaude style: `connect <id> --allow-user-scope`.
3. **API-key paste seat** — Command Code / Copilot / Cursor BYOK: `connect openai`.
4. **Anthropic API-key only** — Claude Code passthrough; never the default for plan users.

Do not invent a second vault. Do not tell plan users to point their IDE at `:8788`.

## Minimal commands (API-key seats only)

```bash
orch gateway keys add openrouter
orch gateway setup --live …
orch gateway
orch gateway connect openclaude --allow-user-scope   # or opencode
orch gateway status
```

## Related

- [WORKSHOP.md](WORKSHOP.md) — workspace / Chair / workers  
- Product: [Gateway keys and connect](https://docs.orchemax.com/how-to/gateway-keys-and-connect/)  
- Recipe: [Connect OpenCode](https://docs.orchemax.com/talk-to-orch/connect-opencode-gateway/)  
- Recipe: [Connect OpenClaude](https://docs.orchemax.com/talk-to-orch/connect-openclaude-gateway/)
