<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/lockup-dark-h64.png">
    <img src="docs/brand/lockup-light-h64.png" alt="Orchemax" height="56">
  </picture>
</p>

**orchemax-orch — community language packs for [OrcheMax](https://orchemax.com)**  
Public craft for any language · Not the product binary · Not Delphi-only

---

## What is OrcheMax?

**OrcheMax is the product that governs multi-agent AI coding teams** — a local workshop factory plus an optional cloud overlook for whoever pays the bill.

It is **not** another chat tab, not another agent IDE, and not a replacement for Claude, Cursor, or OpenCode. Those stay your seats. OrcheMax sits **under** them (`orch` CLI) and gives the floor a chair, laws, and teamwork.

### What it is

| | |
|--|--|
| **Product** | OrcheMax — multi-agent · multi-session **workshop governance** |
| **CLI** | `orch` — opens seats, locks shared code, buses messages, optional guards |
| **Model** | Your agents keep their **native UI**; OrcheMax is the factory underneath |
| **Code** | Stays on **your machines** (Zero-Code-Leak: SaaS sees usage metadata, never source) |
| **Stack** | OrcheMax itself is Go; **your** workshop is polyglot (~30 language templates) |

### What it is for

- Founders and CTOs who need **several agents / sessions** on one codebase without babysitting chaos  
- Teams that already bought Claude / Cursor / OpenCode and need **one director (Chair)** plus workers — not five directors racing the same files  
- Workshops with **shared libraries** across apps (search before invent, lock before edit)  
- Orgs that want **spend visibility, caps, allowlists, and an overlook** without uploading the repo  

**Day-to-day:** install `orch` → bind a workshop → open a seat (`orch claude`, `orch opencode`, …) → Chair coordinates → workers execute secondary tasks → shared paths under locks, backed by the call graph → optional gateway for API-key CLIs → optional account for overlook / plans (Free → Enterprise).

### What it avoids (the pain it kills)

| Without OrcheMax | With OrcheMax |
|------------------|---------------|
| Every agent acts like a director → races, duplicate helpers, knotted work | **One Chair** per project; workers for secondary tasks only |
| Parallel sessions rewrite the same shared unit, or a worker can't see what a sibling project already built | **Shared locks** + full symbol/call graph (`trace_path`, `impact`, `code_snippet`) + cross-project `ask` before create |
| Fat `CLAUDE.md` that agents ignore under pressure | Optional **`orch guard *`** (code-lang, encoding, ddl, clone detection, …) + opt-in hooks |
| Vendor chat as the only “bus” between agents | **Disk message bus** (parent / child / sibling) |
| Surprise invoices; no floor view for the CTO | Caps, usage by project/model, **metadata overlook** |
| Building your own babysitting infra | Buy the assembly line — ship apps instead |

### What orch gives your agents

Once a seat is open, every agent gets these MCP tools with no extra setup:

| Tool | What it does |
|------|--------------|
| `search_shared_symbols` | Full-text search over the shared-scope symbol registry (`orch:export`-tagged) |
| `trace_path` | Call graph around one symbol — callers, callees, a confidence per edge |
| `impact` | What a change reaches: symbols in the touched paths plus their callers |
| `code_snippet` | One symbol's body by line range, instead of reading the whole file |
| `architecture` | Directory-level map of the workspace — symbols and edge counts per directory |
| `task_claim` / `task_release` | Atomic claim/release on one ledger checklist item, so two seats never grab the same task |
| `ask` (with `to_project`) | A worker's blocking question to its Chair, or to another registered project's Chair |
| `context_externalize` / `context_retrieve` | Crush bulky tool output to disk and pull it back by id only when it's actually needed |
| `memory_recall` | FTS search over durable local memories before a decision gets reinvented |
| `usage_status` | Token spend and crush savings by session, worker, and model — content-free |
| `verify_report` | The worker's own verification evidence (tests run, symbols reused) attached before a session closes |

**Gateway:** a local API-key vault, not an account login. Add keys once (`orch gateway keys add <provider>`) and every OpenAI-compatible CLI shares **one connection** instead of one per provider; the gateway rotates through your keys on rate limits and applies the same compression to every call. No fixed savings percentage is published anywhere — real compression for your workspace shows up in `orch usage`. Claude Code keeps its own plan login and never routes through this vault (Anthropic's terms forbid third-party login or intermediation of plan credentials).

### Why it differs from its closest peer (Traycer)

**Traycer** is the closest peer: BYO agents + a host for tasks and reviews. OrcheMax pushes the same idea (keep your CLIs) into a **workshop factory**:

1. **BYO CLI** — keep Claude/Cursor/OpenCode; `orch` sits underneath (no forced new window).  
2. **One Chair law** — stops multi-director chaos.  
3. **Shared locks + reuse** — workshop law for common code, not only artifacts/reviews.  
4. **Zero-Code-Leak overlook** — CTOs see tokens/actors/policy without SaaS reading source.  
5. **Polyglot + packs** — ~30 language templates; this repo feeds stack craft.  

Full matrix below, including where peers beat us today. We sell governed workshops and a CTO overlook — not another agent IDE.


**Buy vs build:** your job is to ship and invoice, not invent AI babysitting infrastructure. For about a week of a cheap engineer’s salary you get a local assembly line on your hardware, audited when you link the cloud.

→ Product, signup, plans: **[orchemax.com](https://orchemax.com)**

---

## What is *this* repository (orchemax-orch)?

This GitHub repo is the **public pantry of language craft** that feeds OrcheMax workshops.

| | **OrcheMax** (product) | **orchemax-orch** (here) |
|--|------------------------|---------------------------|
| Job | Run and govern the workshop | Publish seeds, gates, SHARED tips, Claude rules |
| You install | `orch` + account (optional) | `git clone` → merge into your workshop |
| License | Commercial + Free plan | **MIT** |
| Required? | This is the runtime | **No** — OrcheMax works without it |
| Languages | Agnostic core | **Any** language the community packs |

**One sentence:** OrcheMax runs the floor; **orchemax-orch** is where the community writes “don’t forget charset / FireDAC / Go errs …” so you paste what matches *your* stack.

---

## Multi-agent teamwork (product + packs)

| Pillar | OrcheMax does | Packs (here) add |
|--------|---------------|------------------|
| Many agents, one factory | One Chair; workers; message bus | Stack “don’t forget X” for those agents |
| Teamwork without stomping | Locks + symbols before invent | Language footguns (encoding, DB drivers, …) |
| Stop the duplicate mess | Shared reuse; code stays local | SHARED.md snippets per layer / language |

---

## Compare: OrcheMax vs other agent orchestrators

OrcheMax is an **agent orchestrator**: it directs the coding CLIs you already pay for. Personal-assistant gateways such as OpenClaw and Hermes, and agent frameworks such as CrewAI, AutoGen and LangGraph, are **seats and libraries an orchestrator drives** — not competitors, so they are not in this table. **Primary peer:** Traycer.

Every cell below is a fact from the 2026-09-15 orchestrator scan, or *Not documented* — never a guess.

| Capability | Traycer | Paperclip | Gas Town + Beads | Kiro Crew | claude-squad | **OrcheMax** |
|---|---|---|---|---|---|---|
| Where it sits | VS Code extension / desktop app, above your agent | Node server + React UI; agents attach | `gt` workspace manager over tmux, `bd` as a second CLI | Gateway + dashboard, run as a systemd/launchd service | tmux TUI, one session per agent | **Under the CLI you already opened: MCP tools + one harness hook** |
| Who directs | Plan-first modes drive the agents; second director *Not documented* | Org chart of “employees”, approval gates above them | “Mayor” (a Claude Code instance) runs convoys; no second-director rule | A crew delegates to subagents; you approve tool requests | No director — you switch between independent instances | **One Chair per project by arrival order; the second is refused** |
| Collision handling | Plans before anyone writes; no file locks documented | Atomic task checkout + budget, business level not file level | Worktree per polecat, claimed bead, bisecting merge queue (Refinery) | *Not documented* — no worktrees, locks or merge queue named | One git workspace per instance; isolation by checkout | **Worktree and a shared lock with TTL before the shared edit — no merge queue** |
| Duplicate prevention | Shared memory across models — context, not symbols | Reuse of documented skills per agent; no symbol registry | Dependency graph in Dolt, queryable by SQL — tasks, not symbols | *Not documented*; semantic memory in-process | None — it is a terminal manager | **`guard dup` on PreToolUse + the exported-signature registry** |
| Governance | Review Mode; boards a human co-edits live | Org charts, budgets, approval gates, versioned config, rollback | Convoys, Mayor, `bd remember`; no mandatory human gate | Interactive approvals, deny-by-default command catalog, `kirocrew security verify` | No ledger — you read diffs by hand | **Ledger with `task_claim` on the line itself, plus `verify_report`** |
| Heterogeneous workers | Claude Code, Codex, Cursor, OpenCode | OpenClaw, Claude Code, Codex, Cursor | Claude Code, Copilot, Codex, Gemini; `bd setup` wires more | `kiro-cli` over ACP; no second coding CLI named | `-p` flag swaps claude / codex / aider / gemini | **ACP for Gemini CLI and OpenCode (opt-in); Codex, Claude, Cursor as subprocesses** |
| Cost read-out | No credit meters on your subscription; own inference billed apart | Budget enforced per agent and per task, atomically | None native; `scheduler.max_polecats` caps concurrency, not spend | *Not documented* — no token count, cost or budget named | None — each instance spends whatever its CLI spends | **`orch usage` / `--leaks` / `--governance` read your transcripts; Team caps a task’s budget** |
| Code stays local | Local host; cloud may sync task data, Privacy Mode is paid | Yes — MIT, self-hosted Node server | Yes — OSS and local; Beads leaves only on `dolt push` | Yes — Mac, local container or a remote machine you control | Yes — OSS tmux on your machine | **Yes — runtime is local; a linked account gets counters/events, never code** |

**Where they beat us today.** Gas Town’s Refinery is a bisecting merge queue that batches merge requests, runs the gates and isolates the bad one — OrcheMax has no merge queue at all. Paperclip enforces a budget and an approval gate before an agent spends, with versioned config and safe rollback of a bad change. Kiro Crew (AWS, Apache-2.0) runs scheduled work around the clock as a system service, shows each agent’s plan, tool calls, approvals and results in one Activity view, and keeps a verifiable security-event log. Traycer’s Review Mode and shared boards let a human co-edit next to the agents in real time. Multica, left out for lack of a locatable repo, drives about twelve CLIs — more than anyone in the table.

**Not in the table, for width:** Conductor (Melty Labs) — closed-source Mac app, git worktree per agent with diff-first review, Claude Code and Codex only, no open API to add a third, no meter of its own (“you pay only your API cost”), and no duplicate prevention documented.

**Choose Gas Town** if merge throughput across twenty agents is the bottleneck. **Choose Paperclip** if spend caps and approvals matter more than code-level dedup. **Choose Kiro Crew** if you want unattended 24/7 runs on one vendor’s CLI with a sandboxed, audited command surface. **Choose Traycer** if planning and live human review boards are the job. **Choose claude-squad or Conductor** if parallel sessions in isolated worktrees is all you need. **Choose OrcheMax** if the CLI you already opened should stay the CLI you open — with a lock, a registry, a claim and a measured read-out underneath it. We sell governed workshops and a CTO overlook, not another agent IDE.

**This GitHub repo** does not compete with Traycer; it **feeds** OrcheMax workshops with community language craft.

Full matrix and detail: [orchemax.com/compare](https://orchemax.com/compare) · Deep dive: [orchemax.com/vs/traycer](https://orchemax.com/vs/traycer)

### Search / discoverability

Prioritize queries and pages around **OrcheMax vs Traycer**. GitHub Topics: `orchemax`, `agent-orchestration`, `multi-agent`, `claude-code`, `cursor`, `opencode`. Product: [orchemax.com#compare](https://orchemax.com#compare); next SEO win is `orchemax.com/vs/traycer` (title + H1). Details: [docs/DISCOVERABILITY.md](docs/DISCOVERABILITY.md).

---

## Compare: where should a rule live?

| Kind of rule | Put it in… | Example |
|--------------|------------|---------|
| Portable, any stack | **OrcheMax built-in** (`orch guard *`) | `code-lang`, `encoding`, `add-all`, `shared-brand`, `ddl` |
| Language / stack craft | **This repo** `packs/<lang>/` | FireDAC `AddTextParam`, idiomatic Go |
| Cross-cutting docs/HTML | **This repo** `packs/encoding/` (or OrcheMax `guard encoding`) | `<meta charset="utf-8">` |
| Your company process | Workshop owner `CLAUDE.md` / `.orch/gates/user/` | HTMX-only UI, naming conventions |
| Vendor IDE defaults | Claude/Cursor settings | Model, permissions — not workshop law |

| Approach alone | Gap |
|----------------|-----|
| Only a fat root `CLAUDE.md` | Agents ignore prose under pressure; no shared locks/bus |
| Only vendor hooks (no OrcheMax) | No Chair, no cross-CLI workshop law, no overlook |
| Only OrcheMax core, no packs | Works, but stack footguns stay undocumented |
| **OrcheMax + packs (here)** | Runtime governance + community stack nutrition |

---

## How you work (day-to-day)

1. **Install & bind** — `orch` in its own folder; workshop root separate from the install.  
2. **Open a seat** — `orch opencode` / `orch claude` / … in a registered project; first interactive seat is Chair.  
3. **Chair vs workers** — one director; spawn workers for secondary tasks; don’t open a second Chair.  
4. **Shared code** — lock → edit → release; search symbols before inventing.  
5. **Talk on the bus** — orch messaging, not a parallel vendor chat between agents.  
6. **Optional cloud** — link account for caps / CTO overlook; source stays local.  
7. **Optional packs (this repo)** — merge `_workshop` + `encoding` + your language packs.

---

## Workspace ≠ project

Illustration only (not a forced template). You declare paths; OrcheMax binds `.orch/` + `orch.yaml` and meters **registered** projects:

```text
acme-workshop/                 ← WORKSPACE (not a billable project)
├── orch.yaml
├── .orch/                     ← OrcheMax state + optional gates/user (packs land here)
├── CLAUDE.md                  ← thin OrcheMax seed + owner rules
├── shared/                    ← or core/, libs/, … (your layout)
│   └── SHARED.md              ← often from packs/_workshop or packs/<lang>
├── apps/ / products/
│   ├── api/                   ← registered project (.git)
│   └── web/
└── …
```

Packs merge under owner markers such as `<!-- owner rules below this line -->`.

---

## What’s inside this repo

```text
langs/           # ~30 language seeds (symbol index) — Go, TS, Python, Delphi, Rust, …
packs/
  _workshop/     # Agnostic defaults — START HERE (any language)
  encoding/      # Cross-cutting HTML/email UTF-8 + mojibake
  go/            # Go language pack (starter)
  delphi/        # Delphi pack (deep example — optional)
  …              # PRs: python/, typescript/, rust/, …
schemas/         # MANIFEST contract for future `orch pack add`
SPEC.md          # Formal consumer contract
```

### Language seeds (`langs/`)

Same JSON shape OrcheMax embeds for symbol seeding.

**Catalog today:** Go, JavaScript, TypeScript, Python, Java, C#, C/C++, Rust, Delphi, PHP, Kotlin, Swift, Ruby, Dart, Scala, Shell, R, Lua, Objective-C, PowerShell, Elixir, Haskell, Perl, Julia, Zig, Groovy, VB.NET, Solidity — and growing.

### Packs

| Pack | Kind | Who needs it |
|------|------|----------------|
| `_workshop` | Workshop | Everyone |
| `encoding` | Cross-cutting | Anyone shipping HTML/email |
| `go` | Language | Go workshops |
| `delphi` | Language | Delphi/Pascal workshops only |

Delphi is **field-proven depth**, not the mission. Read `_workshop` → `encoding` → **your** language.

### OrcheMax built-ins packs document (O.*)

| Command | Purpose |
|---------|---------|
| `orch guard lang` | Docs/prose vs `workspace.locale` |
| `orch guard code-lang` | Identifiers + shipping strings vs `workspace.code_lang` |
| `orch guard encoding` | HTML/email charset + mojibake |
| `orch guard add-all` | No `git add -A` on shared repos |
| `orch guard shared-brand` | No product brands in shared layers |
| `orch guard control-bytes` | No invisible control bytes in source |
| `orch guard ddl` | Schema paired with seeder/writer |
| `orch guard comment` / `dup` / `lock` / `tracker` | Shared hygiene + TRACKER shape |
| `orch guard wire` / `harness scan` | IDE/git adapters |

---

## Quick start (any language)

```bash
git clone https://github.com/gjrivero/orchemax-orch.git
cd orchemax-orch

# 1) Workshop-agnostic — packs/_workshop
# 2) HTML / email — packs/encoding
# 3) Only your languages — packs/go, packs/delphi, (PR) packs/python/ …
```

```text
orch guard code-lang
orch guard encoding
orch guard profile lite    # then shared/strict when ready
orch guard wire --profile
```

Future: `orch pack add <id>`. Today: clone and merge.

---

## How the pieces relate

```text
┌──────────────────────────────────────────┐
│  OrcheMax product  (orchemax.com)        │
│  orch CLI · Chair/workers · locks/bus    │
│  guards · gateway · overlook · plans     │
└───────────────────┬──────────────────────┘
                    │ optional nutrition
┌───────────────────▼──────────────────────┐
│  orchemax-orch  (this MIT repo)          │
│  langs/* + packs/*  — any language       │
└───────────────────┬──────────────────────┘
                    │ copy / merge
┌───────────────────▼──────────────────────┐
│  Your workshop (polyglot)                │
│  CLAUDE.md · SHARED.md · .orch/gates     │
└──────────────────────────────────────────┘
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Highest value: better `langs/<id>.json`, new `packs/<lang>/`, cross-cutting packs, fixtures for blocking gates. No product/client brand names inside language packs.

---

## License

MIT — see [LICENSE](LICENSE).

Product site and plans: [orchemax.com](https://orchemax.com).
