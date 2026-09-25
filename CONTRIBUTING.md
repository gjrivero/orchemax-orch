# Contributing to orchemax-orch

This is the **Orchemax community packs** repo: language seeds and optional craft for **any** programming language. It is not the Orchemax product source, and it is not Delphi-centric (Delphi is one pack).

## Add or extend a language seed

Try it in your own workshop first: the same document at `.orch/langs/<id>.json`
is loaded over the embedded catalog, and `orch workspace` prints which languages
came from there. Full walkthrough:
[Add your language](https://docs.orchemax.com/how-to/add-your-language/). Then:

1. Add `langs/<id>.json` (see existing files — Go, TypeScript, Python, …): `id`, `exts`, `comment`, and either `engine` (native parser, Go-only today) or a `rules` array of definition regexes.
2. Append `<id>` to `langs/catalog.json`.
3. Each `rules` entry is a **definition-rule contract**, not a suggestion: the product's native indexer runs it against every file of that language and feeds the match straight into the symbol index — an `orch:export`-tagged name stays `scope=shared`, everything else lands `scope=local` (see [`langs/README.md`](langs/README.md)). Get `kind`/`pattern`/`name_group` right or the seed silently mis-tags symbols instead of failing loudly.
4. If Orchemax should embed it, note the sync in your PR description. These files
   and the copy the product embeds are kept identical, and a test there fails when
   they diverge.
5. Include `params_group` whenever the declaration line shows the parameter list —
   without it two overloads normalize to one string and the duplicate gate compares
   names instead of signatures. Omit it when the grammar does not show one; do not
   guess.

## Rules for your own workshop, not for this repo

A rule about your company's process belongs in your workshop's
`.orch/gates/user/manifest.json`, never here — `deny`/`require` regexes or a
`cmd` to run, judged at the same cut points as the built-ins
([Your own rules](https://docs.orchemax.com/how-to/your-own-rules/)). Send it
here only once it is general enough that a stranger's workshop wants it, and then
it arrives as a pack.

## Add or extend a pack

1. Prefer starting from `packs/_workshop` (agnostic) or `packs/go` (thin language template).  
2. Fill `MANIFEST.yaml` + `GATES.md` + short `README.md`.  
3. Keep SHARED snippets **agnostic** (no client/product names).  
4. Add `fixtures/` if you introduce a hard deny.  
5. Link the pack in the root README pack list.

Deep packs (like `delphi`) are welcome for **any** stack that has LLM footguns — Python packaging, TS ESM, Rust unsafe, etc.

## Naming

Prose names the product **Orchemax**. `orch` stays literal only for the
command, the binary, config/dirs (`orch.yaml`, `.orch/`), code identifiers,
skill names (`orch-chair`, …), and the MCP server name — never as a stand-in
for the product in a sentence. Check before you send a PR:

```bash
grep -rnE '\borch\b' --include='*.md' README.md SPEC.md CONTRIBUTING.md catalog/ packs/ skills/README.md docs/ langs/ | grep -viE '`orch|orch\.(yaml|exe)|\.orch/|orch-[a-z]+|orch (guard|pack|init|claude|opencode|lock|symbols|usage|skill|harness|memory|setup)'
```

Any survivor naming the product itself (not the CLI) should read **Orchemax**.

## Style

- Brand: **Orchemax** (product), `orch` (CLI), **orchemax-orch** (this repo).  
- English for pack docs (LLM reliability). Owner workshops may translate.  
- Short GATES tables; long war stories → optional `NOTES.md`.  
- MIT license; by contributing you agree the same.

## Review checklist

- [ ] README/pack text does not imply the repo is single-language  
- [ ] MANIFEST install paths are workshop-relative  
- [ ] Clear O.* (Orchemax built-in) vs P.* (pack) vs W.* (owner)  
- [ ] No secrets, no customer data  
- [ ] Soft-skip / warn vs block is explicit
- [ ] No private workshop or internal folder names (this is a public repo — packs, docs, fixtures, and JSON seeds must never mention the maker's private repo/folder names; only "Orchemax" / "orch" / "orchemax-orch" are fine)
