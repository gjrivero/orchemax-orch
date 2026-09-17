# Encoding pack — HTML / email (any language)

Cross-cutting Orchemax workshop craft. Applies whether you write Go templates, Delphi HTML, React (if you must), or static sites.

## Why

LLMs omit charset constantly. Accented or non-English copy without UTF-8 → mojibake (`cafÃ©`).

## Install

```text
copy packs\encoding\GATES.md  <workshop>\.orch\gates\user\ENCODING.md
```

Prefer Orchemax built-in:

```text
orch guard encoding path\to\file.html
```

## Not this pack

Language-specific DB drivers (e.g. Delphi FireDAC) → that language’s pack.  
i18n key discipline → owner / product docs.
