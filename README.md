# SauceDemo - Cypress BDD Automation (Login)

Automation framework for the **Login** feature of [SauceDemo](https://www.saucedemo.com/).

## Tech & approach
- **TypeScript** (fully typed, `tsc --noEmit` type-check gate)
- **Cypress** (E2E runner)
- **Cucumber / Gherkin** (BDD) via `@badeball/cypress-cucumber-preprocessor`
- **Page Object Model (POM)** design pattern
- **Independent tests** — each scenario re-opens the page (no shared state)
- **Separation of concerns**: data / locators / page methods / steps split into folders

## Project structure
```
cypress/
├── e2e/features/                  # .feature files (Gherkin scenarios)
│   ├── login.feature
│   └── inventory-filter.feature
├── fixtures/                      # Test DATA (one file per feature)
│   └── login.data.json            #   sections: users / messages
├── locators/                      # SELECTORS only (only what is used)
│   ├── login.locators.ts
│   └── inventory.locators.ts
├── pages/                         # Page methods (POM)
│   ├── login.page.ts
│   └── inventory.page.ts
└── support/
    ├── step_definitions/          # Step definitions (test cases glue)
    │   ├── login.steps.ts
    │   └── inventory-filter.steps.ts
    ├── types.ts                   # Shared fixture types
    ├── index.d.ts                 # Custom command typings (loginBySession)
    ├── e2e.ts
    └── commands.ts                # cy.loginBySession (session-cached login)
cypress.config.ts
tsconfig.json
package.json
```

## Install
```bash
npm install
```

## Run
```bash
npm run cy:open        # interactive mode
npm run cy:run         # headless, all features
npm run test:login     # login feature only
npm run test:headed    # headed Chrome
npx tsc --noEmit       # type-check only
```

## Session / programmatic login
The inventory tests do **not** log in through the UI. `cy.loginBySession(username)`
(in `support/commands.ts`) sets the SauceDemo session cookie (`session-username`)
inside `cy.session()`, so the session is created once and cached across specs.
SauceDemo has no real auth API — this cookie is its only session artifact, so this
is the fast, best-practice equivalent of an API login. Note: SauceDemo is a SPA and
`/inventory.html` returns a 404 status while serving the app, hence
`failOnStatusCode: false` on that visit.

## Reports
HTML + JSON Cucumber reports are generated under `cypress/reports/` after a headless run.

## CI
GitHub Actions (`.github/workflows/e2e.yml`) runs the suite on **Ubuntu** for every
push / PR: `npm ci` → `tsc --noEmit` → login feature, with report/screenshot artifacts.
Linux is the neutral reference (same platform as WSL) — do not mix Windows and WSL
installs on the same `node_modules`.

## Test accounts (SauceDemo)
| Account          | Result                                   |
|------------------|------------------------------------------|
| `standard_user`  | Success → inventory page                 |
| `locked_out_user`| "Sorry, this user has been locked out."  |
| invalid creds    | "...do not match any user..."            |
| empty username   | "Username is required"                   |
| empty password   | "Password is required"                   |

Password for valid accounts: `secret_sauce`
