# Default Vite Template

This sandbox starts in `/workspace/template` as the `claude` user.

## What is preinstalled

- React + Vite starter app
- Claude Code CLI
- PM2-managed Vite dev server on port `5173`
- Python, Node.js, pnpm, uv, and common terminal tools

## First checks

1. Run `whoami` and confirm you are `claude`
2. Run `pm2 status`
3. Open the Preview tab on port `5173`

## Project conventions

- Use `pnpm` for package management
- Keep edits in source files under `src/`
- Run `pnpm build` before handing work off
