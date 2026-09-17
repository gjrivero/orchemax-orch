# Language seeds (Orchemax symbol index)

JSON seeds for **many** languages — same contract Orchemax embeds for symbol indexing.

Not a Delphi catalog. See `catalog.json` for the full id list (Go, TypeScript, Python, Rust, Delphi, …).

- `catalog.json` — ordered ids
- `<id>.json` — `id`, `exts`, `comment` marker, optional `aliases`, and either
  `engine` (Go uses `go-ast`, its own native parser — no `rules` needed) or a
  `rules` array of regex definitions

## What a definition rule does

Each `rules` entry is one regex the product's native indexer runs against
every file of that language, in addition to the `orch:export`-tag scan:

```json
{"kind": "func", "pattern": "(?m)^(?:async\\s+)?def\\s+([A-Za-z_][\\w]*)\\s*\\(", "name_group": 1}
```

`kind` labels the symbol (`func`, `type`, `unit`, …), `pattern` is the regex,
`name_group` is the capture group holding its name. Every match becomes a row
in the native index: one already carrying an `orch:export` tag stays
`scope=shared` (what `search_shared_symbols` returns); everything else lands
as `scope=local` — invisible to that search, but visible to the graph tools
(`trace_path`, `impact`, `code_snippet`, `architecture`). That is what stops a
worker from writing a second copy of a function nobody remembered to tag.

## Adding a language

1. Add `langs/<id>.json` with `id`, `exts`, `comment`, and either `engine` or
   a `rules` array (copy an existing file close to your grammar — regex rules
   don't need to be exhaustive, just enough to catch top-level declarations).
2. Append `<id>` to `catalog.json`'s `languages` array, in the same order the
   file lists them.
3. If Orchemax should embed the same seed, say so in your PR — see
   [CONTRIBUTING.md](../CONTRIBUTING.md).

Root [SPEC.md](../SPEC.md) and [README.md](../README.md) explain how this feeds Orchemax workshops.
