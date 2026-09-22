<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/lockup-dark-h64.png">
    <img src="docs/brand/lockup-light-h64.png" alt="Orchemax" height="56">
  </picture>
</p>

**orchemax-orch — community language packs for [Orchemax](https://orchemax.com)**  
Public craft for any language · Not the product binary · Not Delphi-only

Documentation: https://docs.orchemax.com

---

## What is Orchemax?

**Orchemax is the product that governs multi-agent AI coding teams** — a local workshop factory plus an optional cloud overlook for whoever pays the bill.

It is **not** another chat tab, not another agent IDE, and not a replacement for Claude, Cursor, or OpenCode. Those stay your seats. Orchemax sits **under** them (`orch` CLI) and gives the floor a chair, laws, and teamwork.

### What it is

| | |
|--|--|
| **Product** | Orchemax — multi-agent · multi-session **workshop governance** |
| **CLI** | `orch` — opens seats, locks shared code, buses messages, optional guards |
| **Model** | Your agents keep their **native UI**; Orchemax hosts the Windows terminal path (scroll, typing, detach/reattach) underneath |
| **Code** | Stays on **your machines** (Zero-Code-Leak: SaaS sees usage metadata, never source) |
| **Stack** | Orchemax itself is Go; **your** workshop is polyglot (**29** language seeds in `langs/` today — PRs add more) |

### What it is for

- Founders and CTOs who need **several agents / sessions** on one codebase without babysitting chaos  
- Teams that already bought Claude / Cursor / OpenCode and need **one director (Chair)** plus workers — not five directors racing the same files  
- Workshops with **shared libraries** across apps (search before invent, lock before edit)  
- Orgs that want **spend visibility, caps, allowlists, and an overlook** without uploading the repo  
- Linked accounts: **Professional** soft Telegram notify; **Team+** Assist HITL (`/approve` / `/deny` in `/app/assist`) and optional **work schedules** (company timezone + per-day On/Off/Ignored)  

**Day-to-day:** install `orch` → bind a workshop → open a seat (`orch claude`, `orch opencode`, …) → Chair coordinates → workers execute secondary tasks → shared paths under locks, backed by the call graph → optional gateway for API-key CLIs → optional account for overlook / plans (Free → Enterprise; soft TG notify from Professional, Assist HITL from Team).

### What it avoids (the pain it kills)

| Without Orchemax | With Orchemax |
|------------------|---------------|
| Every agent acts like a director → races, duplicate helpers, knotted work | **One Chair** per project; workers for secondary tasks only |
| Parallel sessions rewrite the same shared unit, or a worker can't see what a sibling project already built | **Shared locks** + full symbol/call graph (`trace_path`, `impact`, `code_snippet`) + cross-project `ask` before create |
| Fat `CLAUDE.md` that agents ignore under pressure | Optional **`orch guard *`** (code-lang, encoding, ddl, clone detection, …) + opt-in hooks |
| Vendor chat as the only “bus” between agents | **Disk message bus** (parent / child / sibling) |
| Surprise invoices; no floor view for the CTO | Caps, usage by project/model, **metadata overlook** |
| Building your own babysitting infra | Buy the assembly line — ship apps instead |

### What Orchemax gives your agents

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

### Universal context-mode communication & auto-installed Pi workers

- **Universal context-mode across ANY model:** Claude offers agent communication, but exclusively between Claudes. Orchemax provides seamless context-mode communication across **any agent and any LLM model** (Claude, Cursor, OpenCode, Codex, Gemini, DeepSeek, local models, etc.). This universal cross-model capability is a major commercial differentiator.
- **Auto-installed Pi for secondary workers:** When configuring or dispatching workers powered by different LLMs from the primary seat, Orchemax automatically installs and manages **Pi** under machine-home tools. No manual setup is needed.
- **Speed & token savings with external workers:** Workers execute secondary tasks externally in sandboxed worktrees. The primary orchestrator (Chair) suffers zero context bloat or token fatigue. The only tokens consumed are what the worker's LLM specifically spends on its assigned subtask, rather than ballooning the orchestrator's context window.
- **Live dashboard metrics:** Savings and counters refresh dynamically in the local dashboard (`/app/board`).

**Gateway (optional, API-key seats only):** a local vault for **provider API keys**,
not a replacement for Cursor / Claude / Codex plan logins. Add keys once
(`orch gateway keys add <provider>`); seats that actually use keys (OpenCode,
OpenClaude, Command Code, optional BYOK) share one connection with rotation and
crush. Account seats keep their vendor login — Orchemax still governs them via
MCP/bus/locks, without routing their model traffic.

| Seat kind | Examples | Gateway? |
|-----------|----------|----------|
| Account / plan | Cursor, Claude Code (subscription), Codex | **No** (default) |
| API-key / BYO | OpenCode, OpenClaude, Command Code, Pi, Cursor BYOK | **Yes** — `orch gateway connect …` |

Matrix and rules: [docs/GATEWAY-AGENTS.md](docs/GATEWAY-AGENTS.md) · Product:
[docs.orchemax.com/how-to/gateway-keys-and-connect](https://docs.orchemax.com/how-to/gateway-keys-and-connect/).

### Why it differs from its closest peer (Traycer)

**Traycer** is the closest peer: BYO agents + a host for tasks and reviews. Orchemax pushes the same idea (keep your CLIs) into a **workshop factory**:

1. **BYO CLI** — keep Claude/Cursor/OpenCode; `orch` sits underneath (no forced new window).  
2. **One Chair law** — stops multi-director chaos.  
3. **Shared locks + reuse** — workshop law for common code, not only artifacts/reviews.  
4. **Zero-Code-Leak overlook** — CTOs see tokens/actors/policy without SaaS reading source.  
5. **Polyglot + packs** — **29** language seeds in this repo today; open a PR on `langs/` to add another. Packs feed stack craft.  

Full matrix below, including where peers beat us today. We sell governed workshops and a CTO overlook — not another agent IDE.


**Buy vs build:** your job is to ship and invoice, not invent AI babysitting infrastructure. For about a week of a cheap engineer’s salary you get a local assembly line on your hardware, audited when you link the cloud.

→ Product, signup, plans: **[orchemax.com](https://orchemax.com)**

---

## What is *this* repository (orchemax-orch)?

This GitHub repo is the **public pantry of language craft** that feeds Orchemax workshops.

| | **Orchemax** (product) | **orchemax-orch** (here) |
|--|------------------------|---------------------------|
| Job | Run and govern the workshop | Publish seeds, gates, SHARED tips, Claude rules |
| You install | `orch` + account (optional) | `git clone` → merge into your workshop |
| License | Commercial + Free plan | **MIT** |
| Required? | This is the runtime | **No** — Orchemax works without it |
| Languages | Agnostic core | **Any** language the community packs |

**One sentence:** Orchemax runs the floor; **orchemax-orch** is where the community writes “don’t forget charset / FireDAC / Go errs …” so you paste what matches *your* stack.

---

## Multi-agent teamwork (product + packs)

| Pillar | Orchemax does | Packs (here) add |
|--------|---------------|------------------|
| Many agents, one factory | One Chair; workers; message bus | Stack “don’t forget X” for those agents |
| Teamwork without stomping | Locks + symbols before invent | Language footguns (encoding, DB drivers, …) |
| Stop the duplicate mess | Shared reuse; code stays local | SHARED.md snippets per layer / language |

---

## Compare: Orchemax vs other agent orchestrators

Orchemax is an **agent orchestrator**: it directs the coding CLIs you already pay for. Personal-assistant gateways such as OpenClaw and Hermes, and agent frameworks such as CrewAI, AutoGen and LangGraph, are **seats and libraries an orchestrator drives** — not competitors, so they are not in this table. **Primary peer:** Traycer.

Every cell below is a fact from the 2026-09-15 orchestrator scan, or *Not documented* — never a guess.

| Capability | Traycer | Paperclip | Gas Town + Beads | Kiro Crew | claude-squad | **Orchemax** |
|---|---|---|---|---|---|---|
| Where it sits | VS Code extension / desktop app, above your agent | Node server + React UI; agents attach | `gt` workspace manager over tmux, `bd` as a second CLI | Gateway + dashboard, run as a systemd/launchd service | tmux TUI, one session per agent | **Under the CLI you already opened: MCP tools + one harness hook** |
| Who directs | Plan-first modes drive the agents; second director *Not documented* | Org chart of “employees”, approval gates above them | “Mayor” (a Claude Code instance) runs convoys; no second-director rule | A crew delegates to subagents; you approve tool requests | No director — you switch between independent instances | **One Chair per project by arrival order; the second is refused** |
| Collision handling | Plans before anyone writes; no file locks documented | Atomic task checkout + budget, business level not file level | Worktree per polecat, claimed bead, bisecting merge queue (Refinery) | *Not documented* — no worktrees, locks or merge queue named | One git workspace per instance; isolation by checkout | **Worktree and a shared lock with TTL before the shared edit — no merge queue** |
| Duplicate prevention | Shared memory across models — context, not symbols | Reuse of documented skills per agent; no symbol registry | Dependency graph in Dolt, queryable by SQL — tasks, not symbols | *Not documented*; semantic memory in-process | None — it is a terminal manager | **The exported-signature registry denies the write before it lands when the profile blocks; a `PostToolUse` pass names an existing copy** |
| When it acts | *Not documented* | *Not documented* | *Not documented* | *Not documented* | Never — it is a terminal manager and runs no check of its own | **Before the file lands — the `PreToolUse` hook denies the write when `guard.profile` blocks; a `PostToolUse` pass names an existing copy** |
| Governance | Review Mode; boards a human co-edits live | Org charts, budgets, approval gates, versioned config, rollback | Convoys, Mayor, `bd remember`; no mandatory human gate | Interactive approvals, deny-by-default command catalog, `kirocrew security verify` | No ledger — you read diffs by hand | **Ledger with `task_claim` on the line itself, plus `verify_report`** |
| Heterogeneous workers | Claude Code, Codex, Cursor, OpenCode | OpenClaw, Claude Code, Codex, Cursor | Claude Code, Copilot, Codex, Gemini; `bd setup` wires more | `kiro-cli` over ACP; no second coding CLI named | `-p` flag swaps claude / codex / aider / gemini | **Universal cross-model context communication; auto-installs Pi for different LLM workers; ACP + native CLIs** |
| Cost read-out | No credit meters on your subscription; own inference billed apart | Budget enforced per agent and per task, atomically | None native; `scheduler.max_polecats` caps concurrency, not spend | *Not documented* — no token count, cost or budget named | None — each instance spends whatever its CLI spends | **`orch usage` / `--leaks` / `--governance` read your transcripts; Team caps a task’s budget** |
| Code stays local | Local host; cloud may sync task data, Privacy Mode is paid | Yes — MIT, self-hosted Node server | Yes — OSS and local; Beads leaves only on `dolt push` | Yes — Mac, local container or a remote machine you control | Yes — OSS tmux on your machine | **Yes — runtime is local; a linked account gets counters/events, never code** |

**Where they beat us today.** Gas Town’s Refinery is a bisecting merge queue that batches merge requests, runs the gates and isolates the bad one — Orchemax has no merge queue at all. Paperclip enforces a budget and an approval gate before an agent spends, with versioned config and safe rollback of a bad change. Kiro Crew (AWS, Apache-2.0) runs scheduled work around the clock as a system service, shows each agent’s plan, tool calls, approvals and results in one Activity view, and keeps a verifiable security-event log. Traycer’s Review Mode and shared boards let a human co-edit next to the agents in real time. Multica, left out for lack of a locatable repo, drives about twelve CLIs — more than anyone in the table. The blocking mechanism is not ours: Claude Code ships it — its hooks stop a tool call (“Exit 2: Claude Code blocks the action”, [hooks guide](https://code.claude.com/docs/en/hooks-guide)) while a memory file does not (“Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead”, [memory](https://code.claude.com/docs/en/memory)); what is ours is the policy, not the hook. And the duplicate registry is thinner than it reads: **9 of the 29 language seeds produce a normalized signature** — the other 20 match by name.

**Not in the table, for width:** Conductor (Melty Labs) — closed-source Mac app, git worktree per agent with diff-first review, Claude Code and Codex only, no open API to add a third, no meter of its own (“you pay only your API cost”), and no duplicate prevention documented.

**Choose Gas Town** if merge throughput across twenty agents is the bottleneck. **Choose Paperclip** if spend caps and approvals matter more than code-level dedup. **Choose Kiro Crew** if you want unattended 24/7 runs on one vendor’s CLI with a sandboxed, audited command surface. **Choose Traycer** if planning and live human review boards are the job. **Choose claude-squad or Conductor** if parallel sessions in isolated worktrees is all you need. **Choose Orchemax** if the CLI you already opened should stay the CLI you open — with a lock, a registry, a claim and a measured read-out underneath it. We sell governed workshops and a CTO overlook, not another agent IDE.

**Isn’t this just Sonar?** Those tools check code. None of them stops the write, and none of them knows the actor is an agent. jscpd blocks the **commit**: a pre-commit hook that fails once duplication passes the threshold ([jscpd.dev/ci-and-hooks/pre-commit](https://jscpd.dev/ci-and-hooks/pre-commit)). SonarQube gates the **pull request**: AI Code Assurance sets project labels, a default quality gate and badges, and its verification loop runs on the PR ([docs.sonarsource.com/…/ai-code-assurance](https://docs.sonarsource.com/agent-centric-development-cycle/ai-code-standards/ai-code-assurance)). Semgrep Guardian does run as the code is written, in the IDE — but on OWASP Top 10 issues, malicious packages and hardcoded secrets, not duplication ([semgrep.dev](https://semgrep.dev/blog/2026/introducing-semgrep-guardian-real-time-security-for-ai-written-code)). Pharaoh maps the repo into a queryable graph an agent consults before writing — it surfaces the twin and advises; no refusal step is documented ([pharaoh.so](https://pharaoh.so/blog/prevent-duplicate-functions-ai-coding/)).

**This GitHub repo** does not compete with Traycer; it **feeds** Orchemax workshops with community language craft.

Full matrix and detail: [orchemax.com/compare](https://orchemax.com/compare) · Deep dive: [orchemax.com/vs/traycer](https://orchemax.com/vs/traycer)

### Search / discoverability

Prioritize queries and pages around **Orchemax vs Traycer**. GitHub Topics: `orchemax`, `agent-orchestration`, `multi-agent`, `claude-code`, `cursor`, `opencode`. Product: [orchemax.com#compare](https://orchemax.com#compare); next SEO win is `orchemax.com/vs/traycer` (title + H1). Details: [docs/DISCOVERABILITY.md](docs/DISCOVERABILITY.md).

---

## Compare: where should a rule live?

| Kind of rule | Put it in… | Example |
|--------------|------------|---------|
| Portable, any stack | **Orchemax built-in** (`orch guard *`) | `code-lang`, `encoding`, `add-all`, `shared-brand`, `ddl` |
| Language / stack craft | **This repo** `packs/<lang>/` | FireDAC `AddTextParam`, idiomatic Go |
| Cross-cutting docs/HTML | **This repo** `packs/encoding/` (or Orchemax `guard encoding`) | `<meta charset="utf-8">` |
| Your company process | Workshop owner `CLAUDE.md` / `.orch/gates/user/` | HTMX-only UI, naming conventions |
| Vendor IDE defaults | Claude/Cursor settings | Model, permissions — not workshop law |

| Approach alone | Gap |
|----------------|-----|
| Only a fat root `CLAUDE.md` | Agents ignore prose under pressure; no shared locks/bus |
| Only vendor hooks (no Orchemax) | No Chair, no cross-CLI workshop law, no overlook |
| Only Orchemax core, no packs | Works, but stack footguns stay undocumented |
| **Orchemax + packs (here)** | Runtime governance + community stack nutrition |

---

## How you work (day-to-day)

Full walkthrough with commands and examples: [docs.orchemax.com](https://docs.orchemax.com) — start at [Quickstart](https://docs.orchemax.com/quickstart/) and [Organise a workshop](https://docs.orchemax.com/how-to/organise-a-workshop/).

1. **Install & bind** — `orch` in its own folder; workshop root separate from the install.  
2. **Open a seat** — `orch opencode` / `orch claude` / … in a registered project; first interactive seat is Chair.  
3. **Chair vs workers** — one director; spawn workers for secondary tasks; don’t open a second Chair.  
4. **Shared code** — lock → edit → release; search symbols before inventing.  
5. **Talk on the bus** — Orchemax messaging, not a parallel vendor chat between agents.  
6. **Optional cloud** — link account for caps / CTO overlook / soft Telegram notify (Professional+) / **Assist HITL (Team+)**: `/approve` `/deny` from `/app/assist`; source stays local.  
7. **Optional packs (this repo)** — merge `_workshop` + `encoding` + your language packs.

---

## Workspace ≠ project

Illustration only (not a forced template). You declare paths; Orchemax binds `.orch/` + `orch.yaml` and meters **registered** projects:

```text
acme-workshop/                 ← WORKSPACE (not a billable project)
├── orch.yaml
├── .orch/                     ← Orchemax state + optional gates/user (packs land here)
├── CLAUDE.md                  ← thin Orchemax seed + owner rules
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
langs/           # 29 language seeds today (symbol index) — Go, TS, Python, Delphi, Rust, … — PRs welcome
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

Same JSON shape Orchemax embeds for symbol seeding.

**Catalog today:** Go, JavaScript, TypeScript, Python, Java, C#, C/C++, Rust, Delphi, PHP, Kotlin, Swift, Ruby, Dart, Scala, Shell, R, Lua, Objective-C, PowerShell, Elixir, Haskell, Perl, Julia, Zig, Groovy, VB.NET, Solidity — and growing.

### Packs

| Pack | Kind | Who needs it |
|------|------|----------------|
| `_workshop` | Workshop | Everyone |
| `encoding` | Cross-cutting | Anyone shipping HTML/email |
| `go` | Language | Go workshops |
| `delphi` | Language | Delphi/Pascal workshops only |
| [`starter-rules`](packs/starter-rules/) | Rules starter | `orch pack install`-able example: one `deny`, one `require`, one `cmd` gate to copy and adapt |

Delphi is **field-proven depth**, not the mission. Read `_workshop` → `encoding` → **your** language.

`starter-rules` uses a different, smaller MANIFEST shape than the language
packs above — see [`catalog/GATES.md`](catalog/GATES.md) for the full gate
list and [`packs/starter-rules/README.md`](packs/starter-rules/README.md)
for the install command.

### Orchemax built-ins packs document (O.*)

Full table with run points, profile behaviour and the equivalent
`.orch/gates/user/manifest.json` entry: [`catalog/GATES.md`](catalog/GATES.md).

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

```bash
git clone https://github.com/gjrivero/orchemax-orch.git
orch pack install ./orchemax-orch/packs/starter-rules
```

`orch pack install <git-url>` clones fresh and expects `MANIFEST.yaml` at the
**root** of that URL — a pack published as its own repo, not a subfolder of
this one. `starter-rules` installs from a local path (above) until it (or
this whole repo) gets its own remote. It also only understands the smaller
MANIFEST shape (`packs/starter-rules/`) — the language packs above
(`_workshop`, `encoding`, `go`, `delphi`) still install by cloning and
copying their files in by hand per each pack's own README until they grow
one too.

---

## How the pieces relate

```text
┌──────────────────────────────────────────┐
│  Orchemax product  (orchemax.com)        │
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
Assist HITL (Team+): [docs/ASSIST-HITL.md](docs/ASSIST-HITL.md) · [docs.orchemax.com](https://docs.orchemax.com/how-to/notifications-and-approvals/).  
Workshop model + Team schedules: [docs/WORKSHOP.md](docs/WORKSHOP.md) · [docs.orchemax.com/how-to/team-work-schedules](https://docs.orchemax.com/how-to/team-work-schedules/).  
Common tune-ups (mouse junk, OpenClaude notify, turn caps): [docs/COMMON-SETTINGS.md](docs/COMMON-SETTINGS.md).  
Seat injection (always kit vs layout families — no agent allowlists): [docs/SEAT-INJECTION.md](docs/SEAT-INJECTION.md).
