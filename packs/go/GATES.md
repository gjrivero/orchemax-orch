# Go pack — gates

| Id | Rule | Notes |
|----|------|-------|
| O.* | Orchemax built-ins | Prefer them over pack prose |
| P.go.context | Pass `context.Context` as first param on blocking calls | prose |
| P.go.err | Do not ignore `err`; wrap with `%w` at boundaries | prose |
| W.go.modules | One module per shared/product repo unless owner says otherwise | owner |

Contribute fixtures and sharper gates via PR.
