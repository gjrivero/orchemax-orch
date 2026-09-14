# Contributing to orchemax-orch

This is the **OrcheMax community packs** repo: language seeds and optional craft for **any** programming language. It is not the OrcheMax product source, and it is not Delphi-centric (Delphi is one pack).

## Add or extend a language seed

1. Add `langs/<id>.json` (see existing files — Go, TypeScript, Python, …).  
2. Append `<id>` to `langs/catalog.json`.  
3. If OrcheMax should embed it, note the sync in your PR description.

## Add or extend a pack

1. Prefer starting from `packs/_workshop` (agnostic) or `packs/go` (thin language template).  
2. Fill `MANIFEST.yaml` + `GATES.md` + short `README.md`.  
3. Keep SHARED snippets **agnostic** (no client/product names).  
4. Add `fixtures/` if you introduce a hard deny.  
5. Link the pack in the root README pack list.

Deep packs (like `delphi`) are welcome for **any** stack that has LLM footguns — Python packaging, TS ESM, Rust unsafe, etc.

## Style

- Brand: **OrcheMax** (product), `orch` (CLI), **orchemax-orch** (this repo).  
- English for pack docs (LLM reliability). Owner workshops may translate.  
- Short GATES tables; long war stories → optional `NOTES.md`.  
- MIT license; by contributing you agree the same.

## Review checklist

- [ ] README/pack text does not imply the repo is single-language  
- [ ] MANIFEST install paths are workshop-relative  
- [ ] Clear O.* (OrcheMax built-in) vs P.* (pack) vs W.* (owner)  
- [ ] No secrets, no customer data  
- [ ] Soft-skip / warn vs block is explicit
