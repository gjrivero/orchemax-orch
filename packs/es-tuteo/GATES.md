# es-tuteo

Spanish prose addresses the reader as **tú**, never Rioplatense **vos**.

This is a house style, not engineering. Orchemax holds no opinion about how you speak
to your readers, so the rule lives here and applies only to a workshop that installed
this pack.

| Rule | What it denies |
|---|---|
| `es-tuteo-pronoun` | `vos` as the address pronoun in `.md`, `.html` or `.txt`. `vosotros` and `vosotras` are European plural and do not match. |
| `es-tuteo-verbs` | Rioplatense forms — `tenés`, `querés`, `podés`, `sos` — and the accented imperatives `mirá`, `hacé`, `probá`, `sentate`. `estás` is shared with tú and is deliberately absent. |

Both run at `pre-commit` and at the seal, at `block` severity. Set `severity` to
`warn` in `.orch/gates/user/rules/tuteo.json`, or remove the pack, if your prose
addresses the reader some other way.

## Install

```
orch pack install <path-or-url>/packs/es-tuteo
orch pack remove es-tuteo
```

Removing it takes the rules with it: the installer records what it wrote, so nothing
of this pack is left behind in `.orch/gates/user/`.
