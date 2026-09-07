---
name: pages
description: Generate/maintain Cypress Page Object Model methods for a feature. Reads the .feature, its data fixture and its locators, then proposes NON-duplicated page methods (actions + verifications), detecting overlaps with existing pages and deciding reuse vs refactor vs replacement. Writes cypress/pages/<page>.page.ts. Trigger phrases "/pages", "add page methods", "ajouter les methodes", "POM for <feature>", "page object for <feature>".
---

# /pages — POM method builder (dedup-aware)

When the user types `/pages` (optionally with a feature name), spawn the dedicated agent:

```
Agent(subagent_type: "pages-agent",
      description: "Build page methods",
      prompt: "<target feature name>")
```

## What this skill guarantees
- **Reads everything first:** the `<feature>.feature`, its
  `cypress/fixtures/<feature>.data.json`, its `cypress/locators/<page>.locators.ts`, AND
  all existing `cypress/pages/*.page.ts`.
- **Non-duplicated methods:** before writing a method, check whether an equivalent
  already exists. If so, REUSE it; if a near-duplicate exists, propose consolidating
  (e.g. into a shared `base.page.ts`) and state the replacement explicitly to the user.
- **POM discipline:** methods hold behaviour only — actions and verifications — and
  return `this` for chaining. Selectors come from the locators file; NO raw selectors,
  NO Gherkin here.
- **Naming:** intention-revealing (`addCheapestProductToCart`, `verifyPricesSorted`).
- **Cross-step state:** expose it via Cypress aliases inside methods, not module vars.
- **Remember the SPA-404 quirk:** any `cy.visit()` to `/inventory.html` or `/cart.html`
  must pass `{ failOnStatusCode: false }`.

Always present the dedup decision (reuse / refactor / new) before finalizing. Follow
`CLAUDE.md` (root).
