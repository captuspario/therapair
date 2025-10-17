Got it. Below is a ready-to-paste master prompt for Cursor/Claude-Code that (1) resets your duplication issues, (2) replaces Tailwind with a simpler theming approach, (3) sets up a clean React + Vite widget core, (4) supports Notion OR hosted JSON via adapters, (5) gives you a standalone HTML preview that matches production, and (6) enforces Playwright visual tests that block deploys via GitHub Actions. It also includes an overall SaaS architecture check and optimisation plan.

⸻

MASTER PROMPT — “Therapair SaaS Reset • Client-Cloneable Widget • Notion/JSON Adapters • Visual-Test-Blocked Deploys”

SYSTEM ROLE

You are a senior SaaS architect and front-end lead. Optimise Therapair’s architecture for client-by-client clones with pixel-fidelity, simple theming, and visual regression tests that block deploys. Stack assumptions and constraints (confirmed by stakeholder):
	•	Stack: React, Playwright, GitHub Actions, Git-based auto deploy (Hostinger/CDN), Notion or hosted JSON as data.
	•	Simplify styling: Tailwind has created friction → remove it. Use CSS custom properties (+ PostCSS nesting) and a tiny “utilities.css” (optional) for spacing helpers. No frameworks.
	•	Data: Support Notion API and hosted JSON as interchangeable adapters.
	•	Preview: Must have a standalone static HTML build that looks identical to production embed for final approvals.
	•	Testing: Playwright flow + visual regression. Visual diffs MUST block deploys.
	•	Repos: One Git repo per client is planned, but we must avoid code drift → centralise shared core as an npm package (or Git submodule) consumed by each client repo.

⸻

OBJECTIVES
	1.	Overall Architecture Check + Optimisation
	•	Propose and implement a Core vs Client split:
	•	@therapair/core (shared): components, styles, theme engine, data adapters, Playwright base tests, embed wrapper.
	•	therapair-client-template (template repo): client config (theme + data endpoint), thin shell, CI pipeline.
	•	Make Core publishable to GitHub Packages (or local npm) for each client repo to consume.
	•	Add docs/architecture.md that explains responsibilities, how to update core, and how clients inherit updates safely.
	2.	Styling Reset (No Tailwind)
	•	Create /packages/core/styles/tokens.css with CSS variables for colours, typography, radii, spacing, motion.
	•	Create /packages/core/styles/utilities.css (optional) with a minimal spacing/stack utility (e.g., .stack > * + * { margin-top: var(--space-3); }).
	•	Every component consumes variables via var(--color-primary), etc. No inline styles.
	•	Each client overrides tokens via a theme file: /client/theme.css.
	3.	Component & Embed
	•	Components: QuestionCard, ProgressBar, Button, StepController, ResultView, Loader, ErrorBoundary.
	•	Export a <TherapairWidget /> React component and a Web Component wrapper (using react-to-webcomponent or a lightweight wrapper) named <therapair-widget>.
	•	Build outputs:
	•	ESM/CJS for React apps,
	•	IIFE bundle for drop-in <script> usage (for static HTML/WordPress/etc.).
	•	Provide a /preview static page using the exact Web Component embed so local preview ≅ production.
	4.	Data Adapters (Notion & JSON)
	•	Define a DataAdapter interface in TypeScript:

export interface DataAdapter {
  loadQuestions(): Promise<Question[]>;
  submitResponse(payload: Submission): Promise<{ success: boolean; id?: string }>;
}


	•	Implement NotionAdapter (reads database via Notion API) and JsonAdapter (reads from a hosted JSON file).
	•	Add Zod schemas to validate both incoming questions and outgoing submissions.
	•	Choose adapter via environment/config: DATA_ADAPTER=notion|json, JSON_URL=…, NOTION_SECRET=…, NOTION_DB_ID=….

	5.	Client Template + Duplication Script
	•	Create therapair-client-template repo scaffold:

/client
  /public
  /src
    main.tsx
    client.config.ts  // name, adapter type, endpoints
    theme.css         // overrides for CSS variables only
  index.html          // standalone preview using <therapair-widget>
  playwright.config.ts
  tests/              // client-specific snapshots
  .github/workflows/ci.yml
  .env.example


	•	Add scripts/create-client.ts in a separate tooling repo (or runbook) that:
	•	Clones template → therapair-client-<client-slug>
	•	Fills client.config.ts, theme.css, .env
	•	Installs @therapair/core from GitHub Packages
	•	Runs baseline Playwright snapshot capture
	•	Opens a local preview server
	•	Document the process in docs/duplication.md.

	6.	Playwright Tests (Block Deploys)
	•	Core provides shared flow tests (navigate, answer, submit) and visual tests for key states.
	•	Client repos import core tests and also own theme-visual.spec.ts to assert tokens are applied (e.g., computed styles).
	•	GitHub Actions:
	•	build → test → playwright-visual (no --update-snapshots on CI)
	•	If visual diffs exist, fail the job and block deploy.
	•	On first run, provide a manual “approve snapshots” step locally; never in CI.
	7.	Deployment
	•	Build static assets (IIFE + embed + preview) via Vite.
	•	Deploy artefacts to Hostinger/Pages bucket or CDN via GitHub Actions.
	•	Post-deploy, run a smoke Playwright against the live URL (non-visual) to ensure uptime and embed is functional.
	8.	Docs & Developer UX
	•	Generate:
	•	docs/architecture.md
	•	docs/theming.md
	•	docs/data-adapters.md
	•	docs/duplication.md
	•	docs/testing.md
	•	docs/deployment.md
	•	Each doc must be concise, step-by-step, copy-paste friendly.

⸻

CONCRETE TASKS (DO IN ORDER)
	1.	Create Monorepo Scaffolding
	•	Use pnpm workspaces:

/packages/core
/templates/therapair-client-template
/docs


	•	Root package.json workspaces + build scripts.

	2.	Build @therapair/core
	•	Set up Vite library mode to output ESM/CJS/IIFE.
	•	Add styles/tokens.css, styles/utilities.css, and a reset.css.
	•	Build components + <TherapairWidget />.
	•	Add Web Component wrapper export.
	•	Implement NotionAdapter and JsonAdapter with zod validation and helpful error messages.
	3.	Template Repo
	•	Import @therapair/core, expose index.html preview that loads <therapair-widget> via IIFE bundle.
	•	client.config.ts controls:
	•	clientName, DATA_ADAPTER, JSON_URL or Notion vars, primaryColor, fontFamily (mapped to CSS variables in theme.css).
	•	theme.css sets:

:root {
  --color-primary: #2f80ed;
  --color-bg: #ffffff;
  --color-text: #111111;
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
  --radius-md: 10px;
  --space-3: 12px;
}


	•	Ensure preview matches production embed exactly.

	4.	Playwright
	•	Core tests: packages/core/tests export test utilities and specs.
	•	Client tests import core specs + add theme-visual.spec.ts:
	•	Mount widget with client theme.css.
	•	page.screenshot() baseline in tests/__screenshots__/….
	•	Assert no visual diffs unless approved locally.
	5.	GitHub Actions (client template)
	•	Jobs:
	•	install → build → unit → e2e → visual
	•	Visual job fails on diff.
	•	On success, deploy to Hostinger/CDN.
	•	Then smoke test against live URL.
	6.	Duplication CLI
	•	scripts/create-client.ts:
	•	inputs: --name, --slug, --adapter=json|notion, --json-url=<url>, optional colours and font
	•	copies template → sets config/env/theme
	•	runs pnpm install, pnpm test:e2e:baseline locally
	•	prints preview URL and next steps.
	7.	Docs
	•	Write the docs listed above with clear, minimal examples.

⸻

NON-NEGOTIABLES
	•	No Tailwind. Use CSS variables + small utilities only.
	•	No hard-coded client strings inside core.
	•	Adapters must validate data with Zod and surface precise errors.
	•	Standalone preview must mirror production embed.
	•	Playwright visual tests block deploys on CI.
	•	Keep everything TypeScript-strict and documented.

⸻

ACCEPTANCE CRITERIA
	•	Spinning up a new client takes ≤10 minutes:
	1.	Run create-client script
	2.	Paste colours/font in theme.css
	3.	Point DATA_ADAPTER + endpoint
	4.	Run local baseline snapshots
	5.	Commit → CI runs → deploys if green
	•	Changing only colours/typography introduces zero layout drift (verified by visual tests).
	•	You can switch between Notion and JSON without code changes (config only).
	•	Preview HTML equals production behaviour and look.

⸻

INPUTS (use these defaults if none provided)
	•	DATA_ADAPTER: json
	•	JSON_URL: https://example.com/client-data.json
	•	NOTION_SECRET/DB_ID: placeholder
	•	Primary font: system UI stack
	•	Primary colour: #2f80ed

⸻

OUTPUT
	•	Full monorepo with @therapair/core and therapair-client-template
	•	Working Web Component embed + static preview
	•	Playwright suite with passing baseline and failing diffs on unintended changes
	•	GitHub Actions blocking deploy on visual diffs
	•	Duplication script + docs

⸻

If anything in the repo blocks these steps (legacy files, coupling, Tailwind classes), remove or refactor to meet the above. Keep commits atomic with descriptive messages.

⸻

Done.

⸻

If you want, I can also generate a bundle of sub-prompts (one per subsystem: architecture, styles, adapters, tests, CI/CD, duplication script, docs) so you can run them sequentially in Cursor.