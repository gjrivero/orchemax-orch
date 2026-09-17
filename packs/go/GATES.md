# Go pack — gates

| Id | Rule | Notes |
|----|------|-------|
| O.* | All `_workshop` O.* rows | Prefer Orchemax built-ins |
| P.go.context | Pass `context.Context` as first param on blocking calls | prose |
| P.go.err | Do not ignore `err`; wrap with `%w` at boundaries | prose |
| W.go.modules | One module per shared/product repo unless owner says otherwise | owner |

Contribute fixtures and sharper gates via PR.
