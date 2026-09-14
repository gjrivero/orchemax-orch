# Workshop pack — agnostic defaults

Install tips for any Orche workshop (Go, Delphi, TS, …).  
Language packs stack **on top** of this.

## Copy

| From | To (workshop) | Mode |
|------|-----------------|------|
| `SHARED.md.tmpl` | each shared folder `SHARED.md` | merge / fill |
| `project_CLAUDE.md.tmpl` | `projects/<app>/CLAUDE.md` | seed once |
| `defaults.yaml` | fragment into `orch.yaml` | merge carefully |
| `GATES.md` | `.orch/gates/user/WORKSHOP.md` or root GATES owner section | merge |

## Orche built-ins to enable early

```text
orch guard profile shared          # or lite day-1
orch guard wire --profile
orch harness scan
```

Recommended knobs:

```yaml
workspace:
  locale: en          # docs/chat — or es
  code_lang: en       # identifiers + shipping strings
```

See pack `encoding` if you ship HTML/email. See `delphi` / `go` for language craft.
