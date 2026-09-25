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
`name_group` is the capture group holding its name, and the optional
`params_group` is the capture holding the declaration's parameter list.

`params_group` is what lets two overloads of one name be told apart. Without it
every `foo(...)` normalizes to the same string, so a duplicate gate comparing
signatures is really comparing names — and the "this method already exists in
another project, promote it to shared" advice fires on homonyms. Twenty-six of
the twenty-eight regex seeds here carry one. `shell` and `haskell` do not:
neither declares its parameters in the line that names the function, and a rule
that cannot see a parameter list omits it rather than guess, which leaves those
gates quiet for that language instead of wrong. Every match becomes a row
in the native index: one already carrying an `orch:export` tag stays
`scope=shared` (what `search_shared_symbols` returns); everything else lands
as `scope=local` — invisible to that search, but visible to the graph tools
(`trace_path`, `impact`, `code_snippet`, `architecture`). That is what stops a
worker from writing a second copy of a function nobody remembered to tag.

## Try it in your own workshop first

A seed does not need this repo to work. Drop the same document at
`.orch/langs/<id>.json` in your workshop and Orchemax loads it over the embedded
catalog — a new id joins the list, an id it already ships is replaced. `orch
workspace` prints the ones that came from there:

```
own languages: cobol (.cbl .cob) — from .orch/langs
```

A seed that will not compile fails the load and names the file and the rule. Full
walkthrough: [Add your language](https://docs.orchemax.com/how-to/add-your-language/).

## Adding a language here

1. Add `langs/<id>.json` with `id`, `exts`, `comment`, and either `engine` or
   a `rules` array (copy an existing file close to your grammar — regex rules
   don't need to be exhaustive, just enough to catch top-level declarations).
2. Append `<id>` to `catalog.json`'s `languages` array, in the same order the
   file lists them.
3. If Orchemax should embed the same seed, say so in your PR — see
   [CONTRIBUTING.md](../CONTRIBUTING.md).

These files and the copy Orchemax embeds are kept identical, and a test in the
product fails when they diverge. They did diverge once: eighteen languages gained
`params_group` in the binary and the files here kept the name-only rule, so anyone
extending a rule started from the weaker version of it.

Root [SPEC.md](../SPEC.md) and [README.md](../README.md) explain how this feeds Orchemax workshops.
