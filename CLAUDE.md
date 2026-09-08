# CLAUDE.md — SauceDemo Cypress BDD project

Conventions for AI coding assistants (Claude Code, Cursor, Copilot) working in this
repo. Follow these EXACTLY — they make generated tests fit the existing architecture
instead of generic Cypress.

## Stack
- **Cypress** + **@badeball/cypress-cucumber-preprocessor** (BDD/Gherkin) + **esbuild** bundler
- **TypeScript** everywhere (`tsc --noEmit` must stay green)
- Target app: SauceDemo — https://www.saucedemo.com

## Architecture (Page Object Model + BDD) — non-negotiable
```
cypress/
├── e2e/features/          # *.feature  — Gherkin scenarios, ONE file per feature
├── fixtures/              # *.data.json — ONE file per feature (see Data below)
├── locators/              # *.locators.ts — SELECTORS ONLY
├── pages/                 # *.page.ts — page METHODS (POM), no raw selectors
└── support/
    ├── step_definitions/  # *.steps.ts — Gherkin ↔ POM glue (no selectors, no logic)
    ├── commands.ts        # custom commands (cy.loginBySession)
    ├── index.d.ts         # types for custom commands
    ├── types.ts           # fixture types
    └── e2e.ts
```

### Strict separation of concerns
- **Locators** live only in `locators/`. NEVER put a CSS/`data-test` selector in a page or step file.
- **Page objects** hold behaviour (actions + verifications) and return `this` for chaining. They import locators; they never contain Gherkin.
- **Step definitions** are thin: resolve data, call page methods, nothing else.
- Add **only the locators you actually use** (do not pre-declare a full page map).
- Prefer `[data-test='...']` selectors over ids/classes (stable).

## Data (fixtures)
- **One fixture per feature**, named `<feature>.data.json`, with internal sections.
  Example `login.data.json` → `{ "users": {...}, "messages": {...} }`.
- Type each fixture in `support/types.ts` and read it typed:
  `cy.fixture<LoginData>("login.data").then(({ users }) => ...)`.
- Never hard-code usernames, prices, or expected messages in steps — resolve by key from the fixture.

## Independent tests
- Every scenario must be self-contained. A `Background` re-establishes state
  (login via session + navigate) so no scenario depends on another's leftovers.
- Carry data between steps with **Cypress aliases** (`cy.wrap(x).as('foo')` →
  `cy.get('@foo')`), not module-level variables.

## Login = programmatic session (NOT the UI)
- Use `cy.loginBySession(username)` (in `support/commands.ts`). It sets the SauceDemo
  session cookie (`session-username`) inside `cy.session()` and caches it
  (`cacheAcrossSpecs: true`). SauceDemo has no real auth API — this cookie is its only
  session artifact, so this is the API-equivalent login. Only the login.feature tests
  drive the UI login form (that IS their subject).
- **SPA 404 quirk:** `/inventory.html` and `/cart.html` return an HTTP **404 status**
  while still serving the SPA. Any `cy.visit()` to those routes MUST pass
  `{ failOnStatusCode: false }`, or the visit fails.

## Tags & scripts
- Tag scenarios: `@smoke`, `@filter`, `@cart`, `@endtoend`, `@negative`, `@positive`,
  `@problemuser`.
- Run subsets via tags: `npx cypress run --env tags="@cart"`.
- `filterSpecs`/`omitFiltered` are enabled → tag runs load only matching specs.
- npm scripts: `cy:run`, `cy:open`, `test:login`, `test:filter`, `test:cart`,
  `test:integrity`, `test:smoke`, `test:headed`. Type-check: `npx tsc --noEmit`.

## Runtime environment — IMPORTANT
- This project runs under **WSL / Linux** (and CI Ubuntu). Cypress & esbuild ship
  **native binaries per OS** inside `node_modules`.
- **Do NOT run `npm install` or `cypress run` from Windows** on this shared tree — it
  swaps the esbuild binary and breaks the WSL run ("installed for another platform").
  Windows may run only `npx tsc --noEmit` (pure JS, safe).
- In WSL: `npm install && npx cypress install` once, then the `npm run test:*` scripts.

## Recipe — adding a new feature (e.g. "checkout")
1. `cypress/e2e/features/checkout.feature` — Gherkin, `Background` logs in via session.
2. `cypress/locators/checkout.locators.ts` — only the selectors used.
3. `cypress/pages/checkout.page.ts` — POM methods returning `this`.
4. `cypress/fixtures/checkout.data.json` + a type in `support/types.ts`.
5. `cypress/support/step_definitions/checkout.steps.ts` — thin glue.
6. Tag scenarios, add a `test:checkout` script, run `npx tsc --noEmit` then the suite.

## Definition of done for any change
- `npx tsc --noEmit` passes (0 errors).
- The relevant `npm run test:*` passes in WSL.
- No selector leaked outside `locators/`, no hard-coded data outside `fixtures/`.
```
