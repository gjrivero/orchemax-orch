# How people find OrcheMax when they search competitors

Hashtags alone do little. Search (Google, GitHub, HN, Reddit) ranks **named comparisons** and **topics**.

## 1. GitHub Topics (done on this repo)

Settings → Topics (or `gh repo edit --add-topic …`):

- Product: `orchemax`, `orch`, `agent-orchestration`, `multi-agent`, `ai-agents`
- Seats people already use: `claude-code`, `cursor`, `opencode`
- Intent: `agent-orchestrator`, `developer-tools`, `llm`

Topics are the closest thing to “hashtags” on GitHub. Keep them honest — don’t spam unrelated competitor brand topics if GitHub rejects them; put competitor **names in README H2s** instead (see below).

## 2. README / docs headings (indexed text)

Use explicit H2s:

- `### OrcheMax vs Orca`
- `### OrcheMax vs Traycer`
- `### OrcheMax vs OpenClaw / Hermes`
- `### OrcheMax vs Prime Agent`

Google and GitHub search match those strings. The compare **table** reinforces the same names.

## 3. Product site (orchemax.com) — highest leverage

| Tactic | Why |
|--------|-----|
| Landing `#compare` (already live) | Names competitors in HTML |
| Pages `/vs/orca`, `/vs/traycer`, … | Title + H1 = “OrcheMax vs Orca” → classic SEO |
| Meta description with those names | Snippet in SERP |
| `sitemap.xml` + canonical | Crawlability (seo.go already helps) |
| Blog / changelog posts | “Migrating from X to OrcheMax” |

**Rule:** one honest page per competitor beats stuffing twenty names in a footer.

## 4. Social / community (real hashtags)

On X/LinkedIn/Reddit use both:

`#OrcheMax #AgentOrchestration` **and** plain text: “OrcheMax vs Orca for governed workshops…”

Hashtags help *in-network*; Google mostly ignores them. Named phrases in the body do the SEO work.

## 5. What not to do

- Don’t buy fake “vs” spam sites.  
- Don’t claim features you don’t have (trust dies faster than rank rises).  
- Don’t make this packs repo look like a phishing clone of a competitor — always lead with OrcheMax.

## Checklist

- [x] Repo description + homepage → orchemax.com  
- [x] Topics on `gjrivero/orchemax-orch`  
- [x] README H2s “OrcheMax vs …”  
- [ ] Optional: `orchemax.com/vs/<peer>` pages in the product web  
- [ ] Optional: EN + es-US compare posts when you publish content
