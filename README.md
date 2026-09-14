# orchemax-orch

**Community language packs for [OrcheMax](https://orchemax.com)** — not a Delphi repo, not the OrcheMax product binary.

This repository is the **public craft library** for people who run multi-project workshops with AI coding agents (Claude Code, Cursor, OpenCode, …) and the OrcheMax CLI (`orch`).

---

## What is OrcheMax?

**OrcheMax** is the product: workshop orchestration for AI agents — shared locks/symbols, optional guards (`orch guard *`), init seeds, gateway, Chair/worker seats. The CLI you run is `orch`.

OrcheMax’s **core stays thin and language-agnostic**. It must work for Go, TypeScript, Python, Delphi, Rust, … without baking every stack’s war stories into the binary.

That is why this repo exists.

---

## What is *this* repo?

| This repo **is** | This repo is **not** |
|------------------|----------------------|
| A **community catalog** of language seeds + optional packs | The OrcheMax application / commercial sources |
| Tips, gates, SHARED snippets, Claude/Cursor rules you **copy into your workshop** | A Delphi-only project (Delphi is one pack among many) |
| Nutrition that grows with PRs | Mandatory — OrcheMax runs fine without it |
| MIT, public, “download and merge” | A marketplace SKU |

**One sentence:**  
*OrcheMax runs the workshop; **orchemax-orch** is where the community publishes per-language and cross-cutting agent craft so you can paste what you need.*

---

## Who is it for?

Anyone whose workshop uses **any** programming language (or several), and who wants agents to stop repeating the same mistakes:

- Missing UTF-8 charset in HTML/email → mojibake  
- Inventing duplicates instead of searching shared code  
- Putting product brand names into shared libraries  
- Stack-specific pitfalls (e.g. FireDAC text params in Delphi, idiomatic Go errors, …)

You pick packs for **your** stack. If you only use Go + React, you never open the Delphi pack.

---

## What’s inside

```text
langs/           # ~30 language seeds for symbol indexing (Go, TS, Python, Delphi, …)
packs/
  _workshop/     # Agnostic workshop defaults (start here — any language)
  encoding/      # Cross-cutting: HTML/email UTF-8 + mojibake
  go/            # Go starter pack
  delphi/        # Delphi/Pascal pack (example of a deep language pack)
  …              # PRs welcome: python, typescript, rust, …
schemas/         # MANIFEST contract for future `orch pack add`
SPEC.md          # Formal consumer contract
```

### Language seeds (`langs/`)

Same JSON shape OrcheMax uses internally for symbol seeding: extensions, comment style, regex rules (or `go-ast`).  
**Catalog today:** Go, JavaScript, TypeScript, Python, Java, C#, C/C++, Rust, Delphi, PHP, Kotlin, Swift, Ruby, Dart, Scala, Shell, R, Lua, Objective-C, PowerShell, Elixir, Haskell, Perl, Julia, Zig, Groovy, VB.NET, Solidity — and growing.

### Packs (`packs/`)

Optional folders you merge into a workshop:

1. **`_workshop`** — layout, SHARED template, project CLAUDE stub, portable gate map (every workshop).  
2. **`encoding`** — any stack that ships HTML or email.  
3. **Language packs** (`go`, `delphi`, …) — only if that language is in your workshop.

Delphi appears in the tree because it was **field-proven early** (hard LLM pitfalls). It is a **sample of depth**, not the mission of the repo. Prefer reading `_workshop` + `encoding` + **your** language first.

---

## Quick start (any language)

```bash
git clone https://github.com/gjrivero/orchemax-orch.git
cd orchemax-orch

# 1) Always useful — workshop-agnostic
#    merge packs/_workshop/* into your workshop (SHARED.md, GATES owner section, …)

# 2) If you ship HTML or email
#    merge packs/encoding/GATES.md → .orch/gates/user/ENCODING.md

# 3) Only your languages — examples:
#    Go:     packs/go/
#    Delphi: packs/delphi/
#    (add python/, typescript/, … via PR)
```

Prefer merging under workshop markers such as  
`<!-- owner rules below this line -->`  
so re-seeds do not wipe your rules.

OrcheMax built-ins you will often enable (independent of this repo):

```text
orch guard code-lang
orch guard encoding
orch guard add-all
orch guard shared-brand
orch init / orch guard wire   # when you want hooks
```

Later OrcheMax may ship `orch pack add <id>` using `schemas/pack.manifest.schema.json`. Until then: clone and copy.

---

## How the pieces relate

```text
┌─────────────────────────────────────────┐
│  OrcheMax product (`orch` CLI)          │
│  locks · symbols · guards · init · MCP  │
└──────────────────┬──────────────────────┘
                   │ optional nutrition
┌──────────────────▼──────────────────────┐
│  orchemax-orch (this repo)              │
│  langs/*  +  packs/*  (community)       │
└──────────────────┬──────────────────────┘
                   │ copy / merge
┌──────────────────▼──────────────────────┐
│  Your workshop (Go / TS / Delphi / …)   │
│  CLAUDE.md · SHARED.md · .orch/gates    │
└─────────────────────────────────────────┘
```

Field labs (private multi-product workshops) **prove** rules; portable lessons either land in OrcheMax core or stay here as packs.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Highest value PRs:

1. New or improved **`langs/<id>.json`**  
2. New **language pack** (`packs/python`, `packs/typescript`, …) using `_workshop` as template  
3. Sharper **cross-cutting** packs (encoding, security headers, …)  
4. Fixtures for any **blocking** gate  

Keep product/client brand names out of language packs.

---

## License

MIT — see [LICENSE](LICENSE).
