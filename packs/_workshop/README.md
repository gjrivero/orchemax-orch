# Workshop pack — agnostic defaults (any language)

Start here for **every** Orchemax workshop, regardless of Go, TypeScript, Python, Delphi, …

Language packs (`packs/go`, `packs/delphi`, …) stack **on top** of this. You do not need them all.

## Copy

| From | To (workshop) | Mode |
|------|-----------------|------|
| `SHARED.md.tmpl` | each shared folder `SHARED.md` | merge / fill |
| `project_CLAUDE.md.tmpl` | each project's `CLAUDE.md` | seed once |
| `defaults.yaml` | fragment into `orch.yaml` | merge carefully |
| `GATES.md` | `.orch/gates/user/WORKSHOP.md` or root GATES owner section | merge |

Orchemax `orch init` also seeds workshop-root `doctrine/README.md` (empty kit) and each project's `docs/TRACKER.md`. Put cross-project law in `doctrine/`; put product truth in that project's `docs/`.

## Orchemax built-ins to enable early

```text
orch guard profile lite            # or shared when ready
orch guard wire --profile
orch harness scan
```

Recommended knobs:

```yaml
workspace:
  locale: en          # docs/chat — or es
  code_lang: en       # identifiers + shipping strings
```

Next: `packs/encoding` if you ship HTML/email; then **only** the language packs you use.
