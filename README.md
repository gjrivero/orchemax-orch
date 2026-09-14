# orchemax-orch

**Community language packs for [OrcheMax](https://orchemax.com)**  
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

**Day-to-day:** install `orch` → bind a workshop → open a seat (`orch claude`, `orch opencode`, …) → Chair coordinates → workers execute secondary tasks → shared paths under locks → optional account for overlook / plans (Free → Enterprise).

### What it avoids (the pain it kills)

| Without OrcheMax | With OrcheMax |
|------------------|---------------|
| Every agent acts like a director → races, duplicate helpers, knotted work | **One Chair** per project; workers for secondary tasks only |
| Parallel sessions rewrite the same shared unit | **Shared locks** + symbol search before create |
| Fat `CLAUDE.md` that agents ignore under pressure | Optional **`orch guard *`** (code-lang, encoding, ddl, …) + hooks |
| Vendor chat as the only “bus” between agents | **Disk message bus** (parent / child / sibling) |
| Surprise invoices; no floor view for the CTO | Caps, usage by project/model, **metadata overlook** |
| Building your own babysitting infra | Buy the assembly line — ship apps instead |

### Why it beats “just another orchestrator”

Peers (Orca, Traycer, OpenClaw/Hermes, Prime Agent…) are orchestrators too — not Claude/Cursor. OrcheMax wins on the **workshop + governance** wedge:

1. **BYO CLI** — keep the agent UI you already pay for; `orch` does not force a new ADE face.  
2. **One Chair law** — stops multi-director chaos that spawn-happy harnesses invite.  
3. **Shared locks + reuse** — real workshop law for common code, not only worktree isolation.  
4. **Zero-Code-Leak overlook** — CTOs see the floor (tokens, actors, policy) without the SaaS reading source.  
5. **Polyglot by design** — TS, Python, Go, Delphi, Rust, … plus community packs in **this** repo.  

Full capability matrix below. Other tools can sit **beside** OrcheMax; we sell governed workshops and a CTO overlook — not another agent IDE.

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
