---
name: steps
description: Generate/maintain Cypress-Cucumber step definitions for a feature. Reads the .feature, its data fixture, its locators and its page object, then writes/develops the step definitions (thin Gherkin↔POM glue) covering every scenario, reusing shared steps and avoiding duplication. Writes cypress/support/step_definitions/<feature>.steps.ts. Trigger phrases "/steps", "step definitions", "ajouter les steps", "develop the test cases", "steps for <feature>".
---

# /steps — step definitions & test-case builder

When the user types `/steps` (optionally with a feature name), spawn the dedicated agent:

```
Agent(subagent_type: "steps-agent",
      description: "Build step definitions",
      prompt: "<target feature name>")
```

## What this skill guarantees
- **Reads everything:** the `<feature>.feature` (every Given/When/Then, Outlines,
  DataTables), its data fixture, its locators, and its `<page>.page.ts`.
- **Full coverage:** one step definition per distinct Gherkin step; every scenario in the
  feature is executable (no undefined/pending steps left).
- **Thin glue only:** resolve data from the fixture by key, call page-object methods,
  pass DataTables through. NO selectors, NO business logic, NO assertions inline that
  belong in the page object.
- **Reuse, don't duplicate:** shared steps (e.g. `Given I am logged in as "..."`,
  `I am on the inventory page`) are defined once and reused across features — do not
  redefine an existing step; check the other `*.steps.ts` first.
- **Independence:** rely on the `Background` (session login + navigate); carry data
  between steps with Cypress aliases.
- **Definition of done:** `npx tsc --noEmit` clean and the feature runs green
  (in WSL — never run Cypress from Windows, per `CLAUDE.md`).

Follow `CLAUDE.md` (root).
