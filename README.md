# RiskGuard AI

RiskGuard AI is an early-warning and decision-support system for operational telecom risk. The MVP detects an emerging incident in a Lagos LGA (canonical demo: Ikeja), explains it with grounded AI agents, lets an operator compare and approve mitigation options, tracks recovery, and produces an NCC-ready evidence pack.

It is a vertical slice — convincing, deterministic, and end-to-end — not the production system.

For the full picture, read [`docs/MVP_BLUEPRINT.md`](docs/MVP_BLUEPRINT.md). It explains the demo we are shipping, the four engineering domains, and how the domains plug into each other.

## Repository layout

```
riskguard_ai/
├── api/        FastAPI backend (Poetry-managed). See api/README.md.
├── client/     Vite + React + TypeScript frontend.
└── docs/       MVP blueprint, functional requirements, plan, architecture diagrams.
```

## Getting started

**Backend** — see [`api/README.md`](api/README.md) for full setup, run, and package-management instructions.

```bash
cd api
cp .env.example .env
poetry install
poetry run uvicorn main:app --reload
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

## Branching and pull requests

We use two long-lived branches:

- **`main`** — production-ready. Only updated by promoting `dev` once the team agrees a release is ready.
- **`dev`** — integration branch. All feature work merges here first.

**Never push directly to `main` or `dev`.** Every change goes through a pull request.

### Day-to-day workflow

1. Sync your local `dev` before starting:

   ```bash
   git checkout dev
   git pull origin dev
   ```

2. Create a feature branch off `dev`. Use a short, descriptive name prefixed with your initials or the module you are working on:

   ```bash
   git checkout -b <prefix>/<short-description>
   # examples:
   #   git checkout -b risk/scoring-engine
   #   git checkout -b copilot/network-agent
   #   git checkout -b ta/fix-cors-origin
   ```

3. Commit as you work. Keep commits small and message-clear:

   ```bash
   git add <files>
   git commit -m "risk: add rolling z-score feature"
   ```

4. Push your branch and open a pull request **into `dev`** (not `main`):

   ```bash
   git push -u origin <your-branch>
   gh pr create --base dev --title "<short title>" --body "<what + why>"
   ```

   If you don't use the `gh` CLI, open the PR from the GitHub UI and make sure the base branch is `dev`.

5. In the PR description, explain *what* changed and *why*. Link the issue or domain doc if relevant.

6. Request a review by mentioning any teammate (`@username`) — anyone on the team can review and merge.

7. Address review comments by pushing more commits to the same branch. Don't force-push unless the reviewer asks for a rebase.

8. Once approved, the reviewer (or you, if approved) merges the PR into `dev`. Delete the branch after merge.

### Promoting `dev` to `main`

Releases happen by opening a PR from `dev` → `main`, reviewed by at least one teammate, and merged once the team agrees.

### Quick rules

- Branch from `dev`, PR into `dev`.
- One PR per logical change. Don't bundle unrelated work.
- Keep PRs small enough to review in under 15 minutes when possible.
- Pull `dev` regularly while working on long-running branches; resolve conflicts on your branch, not in the PR.
- Never commit secrets, `.env` files, or `.venv/` / `node_modules/`.
