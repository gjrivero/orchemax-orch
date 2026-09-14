# orchemax-orch

**Community language packs for [OrcheMax](https://orchemax.com)**

Public craft library for multi-language workshops.  
Not the OrcheMax binary. Not a Delphi-only repo. Not another agent IDE.

> OrcheMax runs the **governed workshop** (Chair, locks, symbols, guards, overlook).  
> **orchemax-orch** is where the community publishes **per-language and cross-cutting agent craft** so you download, merge, and harden *your* stack.

---

## What is OrcheMax?

**OrcheMax** governs multi-agent AI teams without wrecking the repo or the budget.

Parallel agents need a **chair**, **rules**, and **teamwork** — not another chat tab. Local factory + optional CTO overlook; your CLIs stay native (Claude, Cursor, OpenCode, …). Source stays on your machines (**Zero-Code-Leak**: SaaS sees metadata, never source).

Under the seat (`orch` CLI): token compression, LLM gateway with key rotation, message bus (Chair + sibling workers), shared locks/reuse, git worktrees, optional guards.

The product is written in Go for a small local binary; **your workshops stay polyglot** via language templates (TypeScript, Python, Go, Delphi, Rust, C#, …) — about **30 language seeds**. Go is only how OrcheMax itself is built.

**Buy vs build:** as a founder or CTO, your job is to ship apps and invoice — not build the infrastructure to babysit AIs. OrcheMax is the assembly line; this repo is the community toolbox that bolts onto that line.

Site: [orchemax.com](https://orchemax.com) · Signup / plans on the product site.

---

## What is *this* repository?

| | **orchemax-orch** (here) | **OrcheMax** (product) |
|--|--------------------------|-------------------------|
| Job | Community catalog of language seeds + optional packs | Governed workshop + CTO overlook |
| You get | JSON lang seeds, GATES/SHARED snippets, Claude rules | `orch` CLI, locks, bus, guards, init, MCP, gateway |
| License | MIT, public | Commercial product + Free→Enterprise plans |
| Required? | No — OrcheMax runs without it | Yes — this is the runtime |
| Scope | **Any** language the community packs | Language-agnostic core + embedded lang seeds |

**One sentence:** *OrcheMax runs the workshop; orchemax-orch is the public pantry of stack craft you paste in.*

---

## Multi-agent teamwork (product context)

Same story as the [landing](https://orchemax.com) — so this repo’s place is clear:

| Pillar | What OrcheMax does | What packs add |
|--------|--------------------|----------------|
| Many agents, one factory | One **Chair** per project; workers for secondary tasks; message bus | Stack-specific “don’t forget X” for those agents |
| Teamwork without stomping | Shared **locks**, search-before-create via **symbols** | Language footguns (encoding, FireDAC, Go errs, …) |
| Stop the duplicate mess | Shared reuse rules; code stays local | SHARED.md snippets per layer / language |

---

## Compare: OrcheMax vs other agent orchestrators

Peers are **orchestrators** (Orca, Traycer, OpenClaw, Hermes, Prime Agent…) — not Claude or Cursor themselves. Capability map from the product pitch (facts, not trophies):

| Capability | Orca | Traycer | OpenClaw / Hermes | Prime Agent | **OrcheMax** |
|------------|------|---------|-------------------|-------------|--------------|
| Job | ADE / parallel agent IDE | Host + tasks around BYO agents | Personal multi-channel agent gateway | Self-improving coding / research harness | **Governed workshop + CTO overlook** |
| Keep native agent UI | Panes / terminals in ADE | Chat / Terminal Host | Own runtime face | Own TUI / daemon | **`orch` sits under BYO CLIs** |
| One director per project | Coordinator / Run (ADE) | Task-centric Host | Usually one personal brain | Can spawn peers (multi-director risk) | **One Chair; workers only for secondary tasks** |
| Stop stomping shared code | Worktree isolation (thin workshop law) | Artifacts / reviews — not shared locks | Not a repo factory | Not workshop locks / symbol law | **Shared locks + reuse rules** |
| Agent↔agent bus | Orchestration messages / gates | A2A with capability gates | Channels to humans / tools | Role-addressed messaging + roster | **Disk bus + parent/child/sibling roles** |
| Org overlook + plans | Commercial opaque on pitch | BYOA + paid tiers | Personal / self-host | OSS harness, not org SaaS | **FREE→TEAM + metadata overlook** |
| Source leaves your machine? | Local ADE | Local Host; cloud syncs task data | Self-host / your gateway | Local agent execution | **Code local; SaaS metadata only** |
| Polyglot workshops | ADE-centric | Host-centric | Channel-centric | Harness-centric | **~30 language templates + this packs repo** |

Other tools can sit **beside** OrcheMax. OrcheMax sells governed workshops and a CTO overlook — not another agent IDE.  
**This GitHub repo** does not compete with Orca/Traycer; it **feeds** OrcheMax workshops with community language craft.

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

Aligned with the product guide:

1. **Install & bind** — `orch` in its own folder; `orch setup` / workshop root separate from the install.  
2. **Open a seat** — `orch opencode` / `orch claude` / … in a registered project; first interactive seat is Chair.  
3. **Chair vs workers** — one director; spawn workers for secondary tasks; don’t open a second Chair.  
4. **Shared code** — lock → edit → release; search symbols before inventing.  
5. **Talk on the bus** — orch messaging, not a parallel vendor chat between agents.  
6. **Optional cloud** — link account for caps / CTO overlook; source stays local.  
7. **Optional packs (this repo)** — merge `_workshop` + `encoding` + your language packs into SHARED / gates / Claude rules.

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

Packs never replace your process — they merge under owner markers such as  
`<!-- owner rules below this line -->`.

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

Same JSON shape OrcheMax embeds for symbol seeding: extensions, comment style, regex rules (or `go-ast`).

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

# 1) Workshop-agnostic
#    merge packs/_workshop → SHARED.md, GATES owner section, defaults.yaml hints

# 2) HTML / email
#    merge packs/encoding → .orch/gates/user/ENCODING.md

# 3) Only your languages
#    packs/go/  or  packs/delphi/  or  (PR) packs/python/
```

```text
orch guard code-lang
orch guard encoding
orch guard profile lite    # then shared/strict when ready
orch guard wire --profile
```

Future: `orch pack add <id>` using `schemas/pack.manifest.schema.json`. Today: clone and merge.

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

See [CONTRIBUTING.md](CONTRIBUTING.md). Highest value:

1. Better **`langs/<id>.json`** for any language  
2. New **`packs/<lang>/`** (python, typescript, rust, …)  
3. Cross-cutting packs (encoding already started)  
4. Fixtures for blocking gates  

No product/client brand names inside language packs.

---

## License

MIT — see [LICENSE](LICENSE).

Product site and plans: [orchemax.com](https://orchemax.com).
