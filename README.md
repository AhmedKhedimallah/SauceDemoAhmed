# SauceDemo — Cypress BDD Automation (POM)

> Package : `saucedemo-cypress-bdd` · Auteur : **Ahmed — QA Automation Lead**
> Application cible : [SauceDemo](https://www.saucedemo.com)

Projet d'automatisation de tests end-to-end pour **SauceDemo**, construit avec
**Cypress** + **Cucumber (BDD/Gherkin)** et une architecture **Page Object Model**
stricte, en **TypeScript**. Le dépôt embarque en plus une suite de **skills IA
personnalisés** qui industrialisent l'écriture des tests en imposant les conventions
du projet.

---

## Stack

- **Cypress** + **@badeball/cypress-cucumber-preprocessor** (BDD/Gherkin) + **esbuild**
- **TypeScript** partout (`tsc --noEmit` doit rester vert)
- Reporter Cucumber HTML + JSON (`cypress/reports/`)

## Architecture (POM + BDD) — non négociable

```
cypress/
├── e2e/features/          # *.feature — scénarios Gherkin, un fichier par feature
├── fixtures/              # *.data.json — une fixture par feature (sections internes)
├── locators/              # *.locators.ts — SÉLECTEURS UNIQUEMENT
├── pages/                 # *.page.ts — méthodes POM (actions + vérifications)
└── support/
    ├── step_definitions/  # *.steps.ts — glue Gherkin ↔ POM (mince)
    ├── commands.ts        # commandes custom (cy.loginBySession)
    ├── index.d.ts         # types des commandes custom
    ├── types.ts           # types des fixtures
    └── e2e.ts
```

**Séparation des responsabilités :**
- Les **sélecteurs** ne vivent que dans `locators/` (jamais dans une page ni un step).
- Les **pages** portent le comportement et retournent `this` (chaînables) ; elles
  importent les locators, jamais de Gherkin.
- Les **steps** sont minces : résoudre la data, appeler une méthode de page, rien d'autre.
- Sélecteurs stables uniquement : `[data-test='...']` (jamais XPath ni sélecteur fragile).

**Login programmatique :** `cy.loginBySession(username)` pose le cookie de session
SauceDemo dans `cy.session()` (mis en cache). Seul `login.feature` pilote l'UI de login.

**Quirk SPA-404 :** `/inventory.html` et `/cart.html` renvoient un statut HTTP **404**
tout en servant la SPA → tout `cy.visit()` vers ces routes doit passer
`{ failOnStatusCode: false }`.

## Features couvertes

| Feature | Fichier | Tags |
|---|---|---|
| Login (UI) | `login.feature` | `@smoke` `@positive` `@negative` |
| Tri / filtre produits | `inventory-filter.feature` | `@filter` `@smoke` |
| Panier | `cart.feature` | `@cart` `@endtoend` |
| Intégrité visuelle (problem_user) | `inventory-integrity.feature` | `@negative` `@problemuser` |

## Installation & exécution

> ⚠️ **Runtime WSL / Linux uniquement.** Cypress & esbuild embarquent des binaires
> natifs par OS dans `node_modules`. Ne PAS lancer `npm install` ni `cypress run`
> depuis Windows sur cet arbre partagé (cela casse le binaire esbuild WSL).
> Windows peut seulement exécuter `npx tsc --noEmit`.

```bash
# une fois, sous WSL
npm install && npx cypress install

# lancer les tests (WSL)
npm run cy:open          # mode interactif
npm run cy:run           # tout, headless
npm run test:login       # feature login
npm run test:filter      # tag @filter
npm run test:cart        # tag @cart
npm run test:integrity   # tag @problemuser
npm run test:smoke       # tag @smoke
npm run test:headed      # headed (Chrome)

# type-check (OK depuis Windows)
npx tsc --noEmit
```

Exécution par tag : `npx cypress run --env tags="@cart"`
(`filterSpecs`/`omitFiltered` sont activés → seuls les specs correspondants sont chargés).

---

## Skills IA personnalisés

Le projet fournit une chaîne de **skills** (dans `.claude/skills/`), chacun adossé à un
sous-agent dédié, qui génèrent/maintiennent le code de test **en respectant
l'architecture ci-dessus**. C'est le cœur de la démarche « test assisté par l'IA » du
projet : au lieu de laisser l'IA produire du Cypress générique, ces skills lui imposent
les conventions (séparation stricte, sélecteurs `data-test`, une fixture par feature,
dédoublonnage, quirk SPA-404).

### Comment les appeler

Taper le nom de la commande dans Claude Code, éventuellement suivi de la feature cible.
L'ordre recommandé pour bâtir une feature complète est **data → locators → pages → steps**.

| Skill | Commande | Rôle | Écrit dans |
|---|---|---|---|
| **data** | `/data <feature>` | Extrait la data du `.feature` (Examples, DataTables, valeurs entre guillemets, clés) | `cypress/fixtures/<feature>.data.json` + type dans `support/types.ts` |
| **locators** | `/locators <feature>` | Génère uniquement des sélecteurs **stables** (`data-test`…), jamais de XPath ni de sélecteur fragile | `cypress/locators/<page>.locators.ts` |
| **pages** | `/pages <feature>` | Méthodes POM (actions + vérifications), **conscient du dédoublonnage** (réutilise / refactorise plutôt que dupliquer) | `cypress/pages/<page>.page.ts` |
| **steps** | `/steps <feature>` | Step definitions minces (glue Gherkin ↔ POM), couvre chaque scénario, réutilise les steps partagés | `cypress/support/step_definitions/<feature>.steps.ts` |

Chaque skill **lit d'abord** le `.feature` ciblé et les fichiers existants pour éviter
toute duplication, puis n'ajoute que le strict nécessaire.

### Recette — ajouter une nouvelle feature (ex. « checkout »)

1. `cypress/e2e/features/checkout.feature` — Gherkin, `Background` qui login via session.
2. `/data checkout` → fixture + type.
3. `/locators checkout` → sélecteurs `data-test` utilisés.
4. `/pages checkout` → méthodes POM retournant `this`.
5. `/steps checkout` → glue mince couvrant tous les scénarios.
6. Taguer les scénarios, ajouter un script `test:checkout`, lancer `npx tsc --noEmit`
   puis la suite (WSL).

### Skill complémentaire : `cypress-docs`

Installée depuis [`cypress-io/ai-toolkit`](https://github.com/cypress-io/ai-toolkit)
via `npx skills add`, la skill **`cypress-docs`** ancre les réponses sur la
**documentation Cypress officielle** (`docs.cypress.io`, en privilégiant les versions
markdown `/llm/*`) et **refuse d'inventer** une API ou un comportement non vérifiable.
Elle intervient sur les questions de doc/API Cypress ; elle **ne remplace pas** les
skills d'écriture ci-dessus (qui restent l'autorité pour produire les tests POM/BDD).

```bash
# ré-installation / mise à jour de la skill de doc (n'affecte pas node_modules)
npx skills add cypress-io/ai-toolkit --skill cypress-docs --agent claude-code --copy -y
```

> Les conventions détaillées appliquées par ces skills sont décrites dans
> [`CLAUDE.md`](./CLAUDE.md) à la racine.

---

## Definition of done (toute modification)

- `npx tsc --noEmit` passe (0 erreur).
- Le `npm run test:*` concerné passe en WSL.
- Aucun sélecteur hors de `locators/`, aucune data en dur hors de `fixtures/`.
