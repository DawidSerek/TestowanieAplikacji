# AGENTS.md

## Project
- **Course**: "Testing and Quality Assurance" — final project (Polish-language assignment).
- **System under test**: https://testpages.eviltester.com (Alan Richardson's practice pages).
- **Stack**: Cypress 15 (Node). The deliverable must be written in **TypeScript** — the current scaffold is JS and must be converted.
- **Submission**: a `.zip` of the repo, **without `node_modules/`**.

## Grading rubric (max 10 pts)
| # | Requirement | Pts |
|---|---|---|
| 1 | 5–10 scenarios, complexity-weighted | 2 |
| 2 | Min. 2 custom commands | 2 |
| 3 | Tests written in TypeScript | 1 |
| 4 | TypeScript interfaces used as parameter types of the custom commands | 1 |
| 5 | Script that runs tests in headless mode ("w tle" = in background) | 1 |
| 6 | Selectors stored in a **separate file** and consumed in tests (Cypress best practice #1) | 2 |
| 7 | Selectors are **unique and hand-extracted from the DOM** — Cypress-suggested selectors are considered *kruche* (fragile) and penalized | 1 |

## Repo state — things an agent would miss
- `cypress.config.js` is minimal: no `baseUrl`, no viewport, `allowCypressEnv: false`. Either add `baseUrl` to the chosen sub-app of eviltester, or use full URLs in `cy.visit()`.
- `package.json` has **no `scripts`** and **no TypeScript**. Add `typescript` + `@types/node` as devDeps, add a `tsconfig.json` (Cypress default extends `@tsconfig/cypress` or set `"types": ["cypress", "node"]` in `cypress/tsconfig.json`).
- All 20 specs under `cypress/e2e/1-getting-started/` and `2-advanced-examples/` are **Cypress boilerplate, not deliverables**. Delete them before submission so they don't inflate the spec count.
- `cypress/support/commands.js` is empty boilerplate. Rename to `commands.ts` and put the 2 custom commands there (requirement #2 + #4).
- `cypress/support/e2e.js` imports `./commands` — update to `./commands` (same name works in TS with `allowJs` / `checkJs` off).
- No **selectors file** exists yet. Cypress best practice #1 = one place for selectors (requirement #6).
- No `.gitignore` — add one for `node_modules/`, `cypress/screenshots/`, `cypress/downloads/`, `cypress/videos/` before zipping.
- No project `README.md` — must be created, and must include the AI-usage acknowledgment at the end.

## Proposed layout
```
cypress/
├── e2e/
│   └── <scenario-slug>.cy.ts            ← tests, TypeScript
├── fixtures/
│   └── <scenario-slug>.json
├── selectors/
│   └── selectors.ts                     ← single source for all selectors (req #6, #7)
├── support/
│   ├── commands.ts                      ← 2 custom commands using interfaces (req #2, #4)
│   └── e2e.ts
└── types/
    └── interfaces.ts                    ← shared interfaces (Product, User, …)
package.json                             ← add "test": "cypress run" (req #5)
tsconfig.json
cypress.config.js                        ← add baseUrl + viewport
cypress/tsconfig.json                    ← Cypress-specific TS config
.opencode/                               ← notes, plans, scratch (only place for md notes)
README.md                                ← project README + AI-usage acknowledgment
.gitignore                               ← node_modules, screenshots, downloads, videos
```

## Run commands
- **Headless (all specs)** — the "background" script (req #5):
  - Add `"test": "cypress run"` to `package.json` scripts, then `npm test`.
- **Headed / dev**: `npm run test:headed` → `cypress open`.
- **Direct CLI fallback**: `npx cypress run` or `npx cypress open`.
- **Single spec via MCP**: `cypress_run_spec "cypress/e2e/<slug>.cy.ts"`.

## cypress-mcp (wired in `opencode.json`)
Use it as the primary way to run and debug tests from this session.
- `cypress_doctor` — sanity check after any config / dep change.
- `cypress_discover` / `cypress_list_specs` — enumerate specs.
- `cypress_analyze_spec <spec>` — deep-read before editing.
- `cypress_run_spec <spec>` — headless run of one spec.
- `cypress_run_test <spec> "<test name>"` — single test (grep).
- `cypress_get_failure_context` — debug bundle after a failure (with screenshot paths).
- `cypress_get_screenshot` — locate failure screenshots for visual debug.
- `cypress_rerun_last` — replay the previous invocation.

For exploring the live target site before writing selectors, use the `tinyfish_*` browser-automation tools (`fetch_content` to read a page, `run_web_automation` to interact, `search` to look up endpoints). Then hand-extract selectors from the DOM with DevTools — do not copy Cypress-suggested selectors (req #7).

## Conventions
- **Selectors** (`cypress/selectors/selectors.ts`): export plain string consts, grouped by page/feature. Prefer `data-test`, `id`, stable `name`, or stable class. Never use generated `:nth-child(...)` or chained `>` selectors.
- **Types**: at least one interface in `cypress/types/interfaces.ts` (e.g. `Product`, `User`, `LoginCredentials`). Use it as the parameter type of both custom commands (req #4).
- **Custom commands**: keep them small and reused by ≥2 specs.
  - Parent example: `cy.fillRegistrationForm(user: User)`
  - Dual example: `cy.assertProductInCart(product: Product)`
- **Tests**: prefer `cy.get(SELECTORS.x).should(...)`, `cy.contains(...)`, `cy.find(...)`, `cy.click()`, `cy.type(...)`, and `.then(...)` — the assignment calls these out by name. Do not chase exotic methods for the sake of it.
- **Assertions**: chain on the same element where possible (yielding element flow). Negative assertions use `should('not.exist')` / `should('not.be.visible')`.

## AI workflow rules (this project)
- The user is **learning alongside the AI**. Default to guiding, not editing. When a code change is needed, describe what you will do and why, then ask before writing files.
- **Fewer edits per turn**. One file at a time, with rationale, so the user can read and learn.
- **All notes go in `.opencode/`** only. No scratch comments or debug `console.log`s left in `cypress/`, no `.md` files in the project root unless they are deliverables (README, AGENTS).
- **At project completion**, add an AI-usage acknowledgment to `README.md` describing: self-hosted LM Studio + Qwen2.5-Coder-3B for inline completions, Opencode with remote MiniMax-M3 for agentic work. Mention that [`cypress-mcp`](https://github.com/yashpreetbathla/cypress-mcp) was used to run tests and inspect results.

## Suggested scenarios
See `.opencode/scenarios.md` for the proposed 8 scenarios, mapped to the grading rubric and the eviltester page tree.