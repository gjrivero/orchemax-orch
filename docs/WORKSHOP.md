# The workshop model

How Orchemax's runtime concepts map to the files you keep in your own
repositories. This repo only documents the model; the runtime lives in the
`orch` CLI (product, not here).

## Workspace ≠ project

A **workspace** is where you bind `orch` — one `orch.yaml` + `.orch/` state
directory. It is never billed and never registered on its own.

A **project** is one registered path inside that workspace, usually one git
repo (an app, an API, a service). Projects are what Orchemax meters and what
a Chair governs.

```text
acme-workshop/                 ← WORKSPACE (not a billable project)
├── orch.yaml
├── .orch/                     ← runtime state + optional gates/user
├── CLAUDE.md                  ← thin Orchemax seed + owner rules
├── doctrine/                  ← cross-project law (orch seeds README only)
│   └── README.md
├── docs/                      ← optional workshop-generic notes (not product TRACKER)
├── shared/                    ← or core/, libs/, … (your layout)
│   └── SHARED.md
├── apps/ / products/ / projects/
│   ├── api/                   ← registered project (.git)
│   │   └── docs/              ← that project's TRACKER / PRODUCT / specs
│   └── web/                   ← registered project (.git)
└── …
```

| Path | What belongs there |
|------|--------------------|
| `doctrine/` | Rules that apply to **every** project (you add e.g. `WORKSHOP.md`, `PATTERNS.md`) |
| `docs/` (workshop root) | Optional human notes about the workshop itself |
| `<project>/docs/` | That project's truth (TRACKER, PRODUCT, specs) |

Orchemax does not invent your folder names under `doctrine/` beyond `README.md`.
One workspace can hold many projects. A monorepo can register the whole repo
as one project, or register subdirectories separately — your call.

## One Chair per project

The first interactive seat opened in a registered project (`orch claude`,
`orch opencode`, …) becomes that project's **Chair**. A second interactive
Chair on the same project is blocked — two directors racing the same files is
the exact failure mode the workshop model exists to prevent.

**Plan caps (separate from "one Chair per project"):** open-agent Chairs are
metered by `orch.agents.max`; concurrent workers by `orch.agents.concurrent`.
MCP-only Chairs do not consume the worker meter. See docs.orchemax.com
[Chair and workers](https://docs.orchemax.com/chair-and-workers/).

## Workers

The Chair spawns **workers** for secondary tasks. Optional
`agents.workers` in `orch.yaml` is a cheap-worker preference list (agent +
model); an empty list leaves the Chair's own agent as the default. Live
spawn still respects the concurrent cap.

A worker:

- executes one task, reports back over the disk message bus (parent / child
  / sibling roles), and does not re-orchestrate or spawn its own workers;
- asks the Chair a blocking question with `ask` instead of guessing, when a
  decision genuinely is not the worker's to make;
- can be a native BYO agent under its own subprocess, or — for Claude Code,
  Codex, Gemini CLI and OpenCode — an ACP-driven agent: structured tool-call
  and permission events over JSON-RPC instead of scraped stdout, so its
  permission requests route through `ask`/`ask_answer` to the Chair like any
  other worker's would.

## Team work schedules

On **Team+**, the overlook can gate dispatch with a **company timezone** and
seven weekday rows (On / Off / Ignored). Hours use the company zone, not UTC
by default. Outside an enforced window the client denies in plain language
(*Outside the Team work schedule…*), not a machine `plan deny:` string.
Configure at [orchemax.com/app/schedules](https://orchemax.com/app/schedules);
full how-to: [Team work schedules](https://docs.orchemax.com/how-to/team-work-schedules/).

## Cross-project ask

A worker or Chair in one registered project can send a blocking `ask` to
**another** registered project's running Chair with `to_project=<id>`,
instead of pasting an answer sight-unseen. When the answer references code
("here's how we solved this elsewhere"), the answering Chair attaches a
`symbol_ref` (project, symbol, path, line) instead of pasting a body; the
asker fetches the real, current source with `code_snippet{project}`. This
keeps cross-project knowledge sharing pointing at live code, not a stale copy.

## Claims

`task_claim` / `task_release` put one seat on one ledger checklist item
(`- [ ] N.` in a `.workflow/LEDGER*.md`-style file) atomically, so two seats
working the same ledger never grab the same line. A claim fails clearly if
another live session already holds it, and can be released by its holder (or
force-released with `holder=*`).

## Where this is enforced

None of the above is a suggestion enforced by prose alone — `task_claim`,
`ask`, and the graph tools (`trace_path`, `impact`, `code_snippet`,
`architecture`) are MCP tools the product wires into every seat; see the root
[README.md](../README.md#what-orch-gives-your-agents) for the full list,
[GATEWAY-AGENTS.md](GATEWAY-AGENTS.md) for pointing each coding CLI at the local
gateway (OpenCode, OpenClaude, Claude Code, Cursor, …),
[SEAT-INJECTION.md](SEAT-INJECTION.md) for the always kit vs layout families
(skills/hooks — not an agent-name allowlist),
[COMMON-SETTINGS.md](COMMON-SETTINGS.md) for frequent `orch.yaml` / env tune-ups
(mouse junk, Notification wire, turn caps), and
[GATES.md](GATES.md) for the gates that back the shared-code rules above.
