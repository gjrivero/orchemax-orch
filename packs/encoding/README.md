# Encoding pack — HTML / email (anti mojibake)

Cross-cutting. Any workshop that ships HTML or email in **any language**.

## Why

LLMs omit charset constantly. Accented copy without UTF-8 declaration → mojibake (`cafÃ©`) in browsers and mail clients.

## Install

```text
copy packs\encoding\GATES.md  <workshop>\.orch\gates\user\ENCODING.md
```

Prefer Orche built-in:

```text
orch guard encoding path\to\file.html
```

Pre-commit hooks (profile shared/strict) already scan staged HTML/email when using current Orche.

## Not this pack

Delphi FireDAC / WideString → `packs/delphi`.  
i18n key discipline (data-i18n) → owner / product pack.
