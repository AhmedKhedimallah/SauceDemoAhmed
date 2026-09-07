---
name: locators
description: Generate/maintain Cypress locators for a page or feature following strict best practices — ONLY stable data-* selectors, NEVER XPath or fragile selectors. Reads a .feature (and existing locators to avoid duplication) and writes cypress/locators/<page>.locators.ts. Trigger phrases "/locators", "add locators", "ajouter les locators", "locators for <feature>".
---

# /locators — best-practice locator builder

When the user types `/locators` (optionally with a page/feature name), spawn the
dedicated agent to do the work:

```
Agent(subagent_type: "locators-agent",
      description: "Build locators",
      prompt: "<target feature/page + any DOM/data-test info the user gave>")
```

## What this skill guarantees
- **Allowed selectors only:** `[data-test='…']` (preferred), `[data-testid='…']`,
  `[data-cy='…']`, ARIA/`role`, or a stable app-owned `#id`.
- **Forbidden — never emit these:** XPath (any `//…`), positional selectors
  (`:nth-child`, `:eq()`, `:first`), auto-generated/hashed CSS classes, deep
  descendant chains, absolute DOM paths, style/text-based structural selectors.
- **Minimalism:** add ONLY the selectors that the feature actually needs — no full
  page maps.
- **Format:** one `cypress/locators/<page>.locators.ts` per page, `as const`,
  default-exported. Per-item dynamic selectors are builder functions, e.g.
  `addToCartButton: (slug: string) => \`[data-test='add-to-cart-${slug}']\``.
- **No duplication:** read the existing `cypress/locators/*.ts` first and extend the
  right file instead of creating a near-duplicate.

Follow the project conventions in `CLAUDE.md` (root). If a required element's real
`data-test` value is unknown, mark it `// TODO(verify)` rather than inventing or
falling back to a fragile selector.
