<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/lockup-dark-h64.png">
    <img src="docs/brand/lockup-light-h64.png" alt="Orchemax" height="56">
  </picture>
</p>

# orchemax-orch — community language data for Orchemax

[Orchemax](https://orchemax.com) is a local control layer for AI coding agents.
This repository holds the part the community knows best: how each
**programming language** and each **human language** is written, so Orchemax
reads and checks your code correctly whatever stack you use.

It is data, not the product. The Orchemax binary embeds a snapshot of it.

## What lives here

| Folder | What it is | Who improves it |
|---|---|---|
| `langs/` | One JSON per programming language: file extensions, comment syntax, definition and import rules, test-file naming, build output | Anyone who works in that language |
| `packs/<language>/` | Language and stack rules (`delphi`, `go`, `htmx-spa`) | Practitioners of that stack |
| `packs/encoding`, `packs/es-tuteo` | Text encoding and human-language style rules | Anyone shipping that language |
| `schemas/` | The JSON schemas the files above must follow | Maintainers |

## Contribute

1. Try your change in your own workshop first: a file at `.orch/langs/<id>.json`
   is loaded over the embedded catalog.
2. Follow `SPEC.md` (file shapes) and `CONTRIBUTING.md` (bar for a PR).
3. One concern per pull request; add red and green fixtures for any rule that blocks.

Guides: [Add your language](https://docs.orchemax.com/how-to/add-your-language/).

## License

Content in this repository is licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
(see `LICENSE`). Commercial use outside Orchemax requires written permission.
