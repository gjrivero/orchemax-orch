# Contributing

Thanks for improving agent workshop craft.

## Add or extend a language seed

1. Add `langs/<id>.json` (see existing files).  
2. Append `<id>` to `langs/catalog.json`.  
3. If Orche should embed it, open a PR on OrcheMax noting the sync.

## Add or extend a pack

1. Copy `packs/_workshop` or `packs/go` as a template.  
2. Fill `MANIFEST.yaml` + `GATES.md`.  
3. Keep SHARED snippets **agnostic** (no client/product names).  
4. Add `fixtures/` if you introduce a hard deny.  
5. Link the pack from the root README table (short PR description).

## Style

- English for pack docs (LLM reliability). Owner workshops may translate.  
- Short GATES tables; long war stories → `NOTES.md` optional.  
- MIT license; by contributing you agree the same.

## Review checklist

- [ ] MANIFEST installs paths are workshop-relative  
- [ ] Clear O.* vs P.* vs W.* in GATES.md  
- [ ] No secrets, no customer data  
- [ ] Soft-skip / warn vs block is explicit
