# starter-rules (starter)

Three example workshop rules — one `deny`, one `require`, one `cmd` — meant
to be installed, read, and adapted, not used as-is forever.

## Install

```text
orch pack install path\to\orchemax-orch\packs\starter-rules
```

`orch pack install <git-url>` clones fresh and expects `MANIFEST.yaml` at the
URL's **root** — publish this folder as its own repo to install it that way
directly; a local path (above) always works against this checkout.

This copies `GATES.md` into `.orch/gates/user/starter-rules-GATES.md`, merges
the three rules into `.orch/gates/user/manifest.json` (each tagged
`source: starter-rules@0.1.0`), and drops this `README.md` under
`.orch/packs/starter-rules/docs/`. Provenance + checksums land in
`.orch/packs/starter-rules.json`.

## Update / remove

```text
orch pack update starter-rules   # refreshes files you never hand-edited
orch pack remove starter-rules   # drops them, keeps anything you edited
```

A rule (or gate doc) you edit after installing is never silently overwritten
or deleted — `update`/`remove` report it as "kept (edited)" instead.

## Contribute

Sharper examples, or a fourth shape worth adding to this pack, welcome via
PR — see [`CONTRIBUTING.md`](../../CONTRIBUTING.md). This pack is a
laboratory-tested starting point, not the founder's own production rules.
