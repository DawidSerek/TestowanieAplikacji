# TestowanieAplikacji

End-to-end Cypress + TypeScript tests for [testpages.eviltester.com](https://testpages.eviltester.com).

## Run

| Command | Purpose |
|---|---|
| `npm test` | Headless (`cypress run`) |
| `npm run test:headed` | Cypress Test Runner GUI |

## Conventions

- **Selectors mirror the URL path.** `/pages/forms/basic-inputs/` → `cypress/selectors/pages/forms/basic-inputs.selectors.ts`. Each file exports one `<PAGE>_SELECTORS` `as const` object, imported in specs with a short local alias.
- **All selectors are hand-extracted from the live DOM** — no `:nth-child`, no Cypress-suggested locators.
- **Custom commands take TypeScript interfaces as parameter types** (`cy.login(creds: LoginCredentials)`, `cy.assertProductInCart(product: Product)`).

## AI-usage acknowledgment

This project was built with significant AI assistance:

- **LM Studio + Qwen2.5-Coder-3B** — self-hosted local model used for inline autocompletion while writing code.
- **Opencode + MiniMax-M3** — agentic harness used for end-to-end work: fetching pages, hand-extracting selectors, writing spec + selector files, iterating until green, and committing. Each scenario's plan was approved before files were written.
- **Cypress skills** wired into Opencode guided spec work throughout:
  - **`cypress-author`** — applied whenever a new spec, selector, or fix was written.
  - **`cypress-explain`** — applied when reviewing or critiquing existing tests without changes (used during the SOLID / selector-organization discussion).
  - **`cypress-docs`** — applied whenever a Cypress API or behavior claim needed grounding in official docs (especially around `cy.on('window:alert')`, `selectFile`, `cy.window().then(...)`, and the dual-command `prevSubject: 'optional'` signature).
- **[`cypress-mcp`](https://github.com/yashpreetbathla/cypress-mcp)** — primary tool for running tests and inspecting results; every spec was exercised via `cypress_run_spec` and iterated with `cypress_get_failure_context` / `cypress_get_screenshot` until green.

Per AGENTS.md, no other `.md` files live at the project root; all working notes live in `.opencode/`.
