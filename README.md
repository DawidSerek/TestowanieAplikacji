# TestowanieAplikacji — Cypress + TypeScript

Final project for the **Testing and Quality Assurance** course.

End-to-end tests for [https://testpages.eviltester.com](https://testpages.eviltester.com) — Alan Richardson's practice app — written in **Cypress 15** with **TypeScript**.

## Stack

- Cypress 15 (Node, headless via `cypress run`)
- TypeScript 5.6 (`strict: true`, `noEmit: true` — Cypress transpiles via its own bundler)
- `cypress-mcp` for driving the run/inspect loop from the AI agent

## Layout

```
cypress/
├── e2e/
│   ├── 00-basic-syntax.cy.ts
│   ├── 01-html-forms.cy.ts
│   ├── 02-alerts-javascript.cy.ts
│   ├── 03-file-upload.cy.ts
│   ├── 04-local-storage.cy.ts
│   ├── 05-drag-drop.cy.ts
│   ├── 06-simulated-login.cy.ts
│   └── 07-basiccart.cy.ts
├── fixtures/
│   ├── basiccart/mystic-apparatus-1.json
│   └── file-upload/hello.txt
├── selectors/
│   ├── pages/
│   │   ├── basics/alerts-javascript.selectors.ts
│   │   ├── files/file-upload.selectors.ts
│   │   ├── forms/basic-inputs.selectors.ts
│   │   ├── forms/text-inputs.selectors.ts
│   │   ├── interaction/drag-drop.selectors.ts
│   │   └── storage/local-storage.selectors.ts
│   └── apps/
│       ├── basiccart.selectors.ts
│       └── simulated-login.selectors.ts
├── support/
│   ├── commands.ts          ← custom commands (cy.login, cy.assertProductInCart)
│   └── e2e.ts
└── types/
    └── interfaces.ts        ← Product, LoginCredentials
cypress.config.js            ← baseUrl, viewport, video off
tsconfig.json                ← single config, includes cypress/**
package.json                 ← test scripts, TS devDeps
```

### Selector convention

Selectors mirror the URL path. The URL `/pages/forms/basic-inputs/` lives at `cypress/selectors/pages/forms/basic-inputs.selectors.ts`. Every selector is hand-extracted from the live DOM (no `:nth-child`, no Cypress-suggested locators).

Each file exports a `<PAGE>_SELECTORS` `as const` object. Specs import with a short local alias:

```ts
import { BASIC_INPUTS_SELECTORS as BI } from "../selectors/pages/forms/basic-inputs.selectors";
cy.get(BI.buttonInput)...
```

## Run

| Command | Purpose |
|---|---|
| `npm test` | **Headless** run of every spec (`cypress run`). This is the rubric #5 "w tle" script. |
| `npm run test:headed` | Cypress Test Runner GUI (`cypress open`) |
| `npm run test:single -- <spec>` | Headless run of one spec |
| `npx cypress run` | Direct CLI fallback |

## Tests

37 tests across 8 spec files. Every spec asserts against the live eviltester practice app.

| Spec | URL | Tests | Notes |
|---|---|---:|---|
| `00-basic-syntax.cy.ts` | `/`, `/pages/basics/basic-web-page/` | 4 | Cypress method demo (title, get, should, contains, click, wait) |
| `01-html-forms.cy.ts` | `/pages/forms/basic-inputs/`, `/pages/forms/text-inputs/` | 10 | Button / checkbox / radio / hidden / required-toggle |
| `02-alerts-javascript.cy.ts` | `/pages/basics/alerts-javascript/` | 4 | `cy.on('window:alert'\|'window:confirm')`, `cy.stub(win, 'prompt')` |
| `03-file-upload.cy.ts` | `/pages/files/file-upload/` | 4 | `selectFile` + fixture |
| `04-local-storage.cy.ts` | `/pages/storage/local-storage/` | 4 | `cy.window().then(win => win.localStorage)` |
| `05-drag-drop.cy.ts` | `/pages/interaction/drag-drop/` | 3 | Drives page's `dropped()` via `cy.window()` |
| `06-simulated-login.cy.ts` | `/apps/simulated-login/` | 4 | Uses `cy.login(creds)` custom command |
| `07-basiccart.cy.ts` | `/apps/basiccart/` | 4 | Uses `cy.assertProductInCart(product)` dual command |

### Custom commands — `cypress/support/commands.ts`

Both commands take a TypeScript interface as their parameter (rubric #4).

```ts
cy.login(creds: LoginCredentials)                        // parent
cy.assertProductInCart(product: Product)                 // dual (optional subject)
```

### Interfaces — `cypress/types/interfaces.ts`

```ts
export interface Product { id: number; name: string; price: number; }
export interface LoginCredentials { username: string; password: string; }
```

## Rubric coverage

| # | Requirement | Where |
|---|---|---|
| 1 | 5–10 scenarios, complexity-weighted | 8 specs across 3 tiers (foundations → storage/files/interaction → apps) |
| 2 | Min. 2 custom commands | `cy.login` (parent) + `cy.assertProductInCart` (dual) |
| 3 | Tests in TypeScript | every spec is `.cy.ts` |
| 4 | Interfaces as command param types | `LoginCredentials` → `cy.login`; `Product` → `cy.assertProductInCart` |
| 5 | Headless script | `npm test` → `cypress run` |
| 6 | Selectors in a separate file | one `*.selectors.ts` per URL, never inline in specs |
| 7 | Unique, hand-extracted selectors | every selector was inspected in the live DOM, no `:nth-child` or Cypress-suggested locators |

## Submission

The deliverable is a `.zip` of the repository **without `node_modules/`**. The repo's `.gitignore` already excludes:

- `node_modules/`
- `cypress/screenshots/`, `cypress/downloads/`, `cypress/videos/`

So zipping the working tree directly gives a clean archive.

```
git archive --format=zip --output=TestowanieAplikacji.zip HEAD
```

## AI-usage acknowledgment

This project was built with significant AI assistance. Two complementary tools were used:

- **LM Studio + Qwen2.5-Coder-3B** — self-hosted local model used for inline autocompletion while writing code. Kept the developer in the loop for every keystroke.
- **Opencode + MiniMax-M3** — agentic harness used for end-to-end work: fetching pages, hand-extracting selectors, writing spec + selector files, iterating until green, and committing. The user approved each scenario's plan before files were written.

In addition, [`cypress-mcp`](https://github.com/yashpreetbathla/cypress-mcp) was the primary tool for running tests and inspecting results — every spec in this repo was first exercised via `cypress_run_spec`, then iterated with `cypress_get_failure_context` and `cypress_get_screenshot` until green.

The architectural decisions (URL-mirrored selectors, SRP per page, one spec per scenario, dual-command pattern for `assertProductInCart`, dual spec coverage for `01-html-forms`, etc.) were discussed with the user before being committed. Per AGENTS.md, no `.md` files live at the project root except this `README.md` and `AGENTS.md`; all working notes live in `.opencode/`.
