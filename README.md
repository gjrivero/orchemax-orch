# orchemax-orch

**Community packs for [Orche](https://orchemax.com) workshops** — language syntax seeds, agent gates, SHARED snippets, and Claude/Cursor recommendations.

OrcheMax ships a thin, portable core (`orch guard *`, locks, symbols, init).  
This repo holds **opt-in craft** the community maintains: Delphi FireDAC pitfalls, HTML charset/mojibake, Go defaults, …

> Download a pack → copy into your workshop (`.orch/gates/user/`, `SHARED.md`, rules) → optionally wire with `orch guard wire`.  
> Nothing here is required to run Orche. Your docs always win.

## Layout

```text
langs/                 # Symbol/index language seeds (same shape as Orche langspec)
  catalog.json         # ordered language ids
  <id>.json            # exts, comment style, regex rules | engine

packs/                 # Installable craft packs
  _workshop/           # Agnostic workshop defaults (any language)
  encoding/            # HTML/email UTF-8 + mojibake (any stack)
  delphi/              # Delphi/Pascal + FireDAC field lessons
  go/                  # Go starter (thin; grow with PRs)

schemas/               # MANIFEST + pack contracts
SPEC.md                # How Orche (and humans) consume this repo
CONTRIBUTING.md
```

## Quick install (manual — day 1)

```bash
git clone https://github.com/gjrivero/orchemax-orch.git
# Example: Delphi shared layer tips
cp packs/delphi/SHARED.core.md   /path/to/workshop/core/SHARED.md   # merge, don't blind-overwrite
cp packs/delphi/GATES.md         /path/to/workshop/.orch/gates/user/DELPHI.md
cp packs/encoding/GATES.md       /path/to/workshop/.orch/gates/user/ENCODING.md
```

Prefer merging under the `<!-- owner rules below this line -->` marker in workshop `CLAUDE.md` / `GATES.md`.

Later Orche may grow `orch pack add delphi` — the contract is `schemas/pack.manifest.schema.json` + each pack’s `MANIFEST.yaml`.

## What belongs where

| Content | Here? | Orche binary? |
|---------|-------|----------------|
| Portable guards (code-lang, encoding, add-all, shared-brand…) | Documented; implemented in Orche | Yes |
| Language symbol seeds (`langs/*.json`) | Yes (community may extend) | Orche embeds a copy; sync from here |
| FireDAC `AddTextParam`, HTMX stack | `packs/delphi` (+ Attlas overlays) | No |
| Workshop layout, SHARED stubs | `packs/_workshop` | Seeded by `orch init`; packs refine |

## Relationship to OrcheMax

- Product repo: private/commercial OrcheMax sources.  
- This repo: **public nutrition** for workshops and agents.  
- Field lab (e.g. Attlas) proves rules → portable pieces move into Orche core **or** stay as packs here.

## License

MIT — see [LICENSE](LICENSE).
