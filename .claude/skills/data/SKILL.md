---
name: data
description: Generate/maintain Cypress test data for a feature. Reads the .feature file, extracts the data it needs (Examples tables, DataTables, quoted values, user keys, expected messages), and writes the fixture cypress/fixtures/<feature>.data.json plus its TypeScript type in cypress/support/types.ts. Trigger phrases "/data", "add data", "ajouter les data", "test data for <feature>", "fixture for <feature>".
---

# /data — feature-scoped test data builder

When the user types `/data` (optionally with a feature name), spawn the dedicated agent:

```
Agent(subagent_type: "data-agent",
      description: "Build test data",
      prompt: "<target .feature file or feature name>")
```

## What this skill guarantees
- **Source of truth = the `.feature`.** Read
  `cypress/e2e/features/<feature>.feature`, extract every data value it references:
  Scenario Outline `Examples`, `DataTable` rows, quoted `"..."` params, user/account
  keys, expected messages/labels.
- **Output = one fixture per feature:** `cypress/fixtures/<feature>.data.json`, with
  internal sections (e.g. `users`, `messages`, `products`) — NOT one file per data type.
- **Typing:** add/extend the matching interface in `cypress/support/types.ts` so steps
  read it typed: `cy.fixture<XxxData>("<feature>.data")`.
- **No hard-coding:** values belong in the fixture, referenced by key from steps — never
  inline in step definitions.
- **No duplication / no clobber:** if the fixture exists, merge missing keys; keep keys
  that other specs use.

Follow `CLAUDE.md` (root). Data lives in JSON fixtures (read via `cy.fixture`) with a TS
type — do not invent a parallel `.ts` data module unless explicitly asked.
