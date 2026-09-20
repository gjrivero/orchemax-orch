# Gateway ↔ agent seats

**Not every seat uses the gateway.** Orchemax sits under every CLI for MCP, bus,
locks and governance. The **gateway** is optional and only for seats that talk to
models with **API keys** (or a third-party OpenAI-compat provider). Seats that
already have a **vendor login + token plan** keep that login — Cursor, Claude Code
(subscription), Codex, and similar.

Product how-to:  
https://docs.orchemax.com/how-to/gateway-keys-and-connect/

## Two protocols (not hundreds of writers)

Hundreds of agent CLIs share **two wires**. Orchemax connect is protocol-first:

| Protocol | Command | Who |
|----------|---------|-----|
| **OpenAI-compat** | `orch gateway connect` / `openai` | OpenCode, OpenClaude, Command Code, Copilot BYOK, Cursor BYOK, any unknown BYO CLI |
| **Anthropic Messages** | `orch gateway connect anthropic` (alias `claude`) | Claude Code **with API key** + `agents.auth.claude: gateway` |
| **OpenCode file write** (optional) | `orch gateway connect opencode --allow-user-scope` | Only OpenCode's JSON layout — the sole vendor writer |
| **Account / plan** | — | Cursor subscription, Claude plan, Codex — **no** connect |

Aliases (`openclaude`, `commandcode`, `copilot`, `cursor`, …) still print the
**openai** paste block. Orchemax does **not** ship a settings writer per CLI.

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
API-key seat (any OpenAI-compat BYO agent)
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
- Models: `GET /v1/models` on the gateway returns **real upstream ids**.

## Per-seat matrix

### Account / plan — gateway does **not** apply (default)

| Seat | Default `agents.auth` | What to do |
|------|----------------------|------------|
| **Cursor** (subscription) | `account` | Open `orch cursor`; keep Cursor login. No `gateway connect`. |
| **Claude Code** (Pro/Max / OAuth) | `account` | Open `orch claude`; keep Anthropic login. Gateway refuses OAuth bearers (`403`). |
| **Codex** | `account` | Keep OpenAI plan login. |
| **Antigravity (agy)** | `account` | Open `orch agy`; keeps product login. Orchemax auto-approves tool execution via `--dangerously-skip-permissions`. Machine-wide MCP wire: `orch guard wire --agy --scope user --allow-user-scope`. |

### API-key / BYO — gateway **does** apply

| Seat | Why | Connect | Config |
|------|-----|---------|--------|
| **Any OpenAI-compat BYO** | Dominant wire | `orch gateway connect` | paste Base URL + `orch_gk_…` |
| **OpenCode** | Optional convenience | `orch gateway connect opencode --allow-user-scope` | writes `~/.config/opencode/opencode.json` |
| **OpenClaude / Command Code / Copilot / Cursor BYOK** | Same OpenAI wire | aliases → openai paste | agent’s own settings / GUI |
| **Claude Code** (Anthropic **API key** only) | Messages API passthrough | `orch gateway connect anthropic` + `agents.auth.claude: gateway` | paste env — **no** OpenRouter ring |

### OpenClaude vs Claude Code

| | **Claude Code** (`orch claude`) | **OpenClaude** (`orch openclaude`) |
|--|----------------------------------|-------------------------------------|
| Typical user | Anthropic plan (login) | Same IDE UX, **other** providers via API keys |
| Gateway | Off by default | On by default (OpenAI-compat) |
| Connect | Only if using Anthropic API key → `connect anthropic` | `orch gateway connect` (paste; no settings writer) |

Paste for any OpenAI-compat seat:

```text
OPENAI_BASE_URL=http://127.0.0.1:8788/v1
OPENAI_API_KEY=orch_gk_…
```

For **OpenClaude** under `orch openclaude`: prefer **not** pasting the key
into `settings.json` (session injects `orch_wk_…`), and **never** pin
`OPENAI_MODEL` in `settings.env` — that overrides the UI model picker.
Set the choice in the top-level `model` field only. Details:
[COMMON-SETTINGS.md](COMMON-SETTINGS.md).

## Pattern for similar agents

Classify once:

1. **Account / plan seat** — document “no gateway”; default `agents.auth: account`.
2. **OpenAI-compat** — `orch gateway connect` (paste). Do not add a new writer.
3. **Anthropic Messages** — `orch gateway connect anthropic`.
4. **OpenCode only** — optional `--allow-user-scope` file write (unique JSON layout).

Do not invent a second vault. Do not tell plan users to point their IDE at `:8788`.
Do not add per-CLI connect writers — there are hundreds of agents.

## Tool execution permissions & prompt suppression

Orchemax governs the workshop perimeter (git worktrees, `.sandbox/`, audit logs, and quality gates). When agents run under Orchemax, they should not block unattended workers or spam interactive sessions asking for confirmation on every command or file edit.

Orchemax handles tool auto-approval agnostically through each CLI's native flags:
- **Antigravity (`agy`)**: `--dangerously-skip-permissions` (injected automatically for both interactive and headless seats)
- **Cursor (`cursor-agent`)**: `--force --trust --approve-mcps`
- **OpenCode (`opencode`)**: `run --auto`
- **Claude Code (`claude`)**: `--dangerously-skip-permissions`
- **BYO agent**: declare in `orch.yaml` under `agents.interactive.<id>` or `agents.cmds.<id>` with its native non-interactive flags.

## Minimal commands (API-key seats only)

```bash
orch gateway keys add openrouter
orch gateway setup --live …
orch gateway
orch gateway connect                    # OpenAI-compat paste
# optional: orch gateway connect opencode --allow-user-scope
orch gateway status
```

## Related

- [WORKSHOP.md](WORKSHOP.md) — workspace / Chair / workers  
- [COMMON-SETTINGS.md](COMMON-SETTINGS.md) — mouse junk, OpenClaude notify, turn caps, schedule denies  
- Product: [Gateway keys and connect](https://docs.orchemax.com/how-to/gateway-keys-and-connect/)  
- Recipe: [Connect OpenCode](https://docs.orchemax.com/talk-to-orch/connect-opencode-gateway/)  
- Recipe: [Connect OpenAI-compat agent](https://docs.orchemax.com/talk-to-orch/connect-openclaude-gateway/)
