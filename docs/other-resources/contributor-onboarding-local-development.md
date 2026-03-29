---
title: "Contributor onboarding: run and test YAFFA locally"
sidebar_label: Contributor onboarding
sidebar_position: 1
description: A practical onboarding guide for contributors, including local setup options, testing workflow, and documentation depth guidelines for Windows, macOS, and Linux.
---

# Contributor onboarding: run and test YAFFA locally

Thank you for your interest in contributing to YAFFA. This guide helps you set up a local development environment, run YAFFA, and validate your changes before opening a pull request.

This guide is for the YAFFA application repository at `https://github.com/kantorge/yaffa`.

## Who this guide is for

- Developers contributing code, tests, translations, or assets to YAFFA
- QA contributors who want to run smoke tests and automated tests locally

If you only want to run a personal YAFFA instance, see the [installation guides](../getting-started/installation/index.md), e.g. [Install YAFFA using Docker for Windows](../getting-started/installation/install-yaffa-using-docker-for-windows.md).

## Possible local development setups

This guide covers three common local development setups for contributors:

- Windows 11 + WSL2 + Docker Desktop
- macOS (Intel or Apple Silicon) + Docker Desktop
- Linux (Ubuntu, Debian, Fedora, etc.) + Docker Engine + Compose plugin

Native Windows without WSL2 is possible, but it is not recommended for day-to-day contributor work.

## Prerequisites

Install the following tools before continuing:

- Git
- Docker with Compose support (Docker Desktop or Docker Engine + Compose plugin)
- PHP 8.4+
- Composer 2.x
- Node.js 20+ and npm

Verify your installation in your terminal:

```bash
git --version
docker --version
docker compose version
php -v
composer --version
node -v
npm -v
```

If one of these commands fails, install or fix that tool first.

<!--
**Screenshot placeholder:** Prerequisites verification
**What it should show:** Terminal output for all version checks.
**Acceptance check:** Every command returns a version string and no command reports "not found".
-->

## Before you begin

Use these rules throughout this guide:

- Run host commands directly in your terminal.
- Run containerized app commands through Sail (`./vendor/bin/sail ...`).
- Keep the repository in a performant local filesystem.
	- On Windows, keep it inside your WSL home directory, not under `/mnt/c`.

## Recommended contributor path (container-first)

Follow these steps in order from a clean machine.

### 1. Clone the YAFFA application repository

```bash
git clone https://github.com/kantorge/yaffa.git
cd yaffa
```

<!--
**Screenshot placeholder:** Step 1 - Clone repository
**What it should show:** Terminal output with successful clone, then current directory switched into `yaffa`.
**Acceptance check:** The prompt location ends with `/yaffa` and no clone errors are visible.
-->

### 2. Prepare the environment file

```bash
cp .env.example .env
```

Generate an application key:

```bash
php artisan key:generate
```

<!--
**Screenshot placeholder:** Step 2 - Environment file created
**What it should show:** Terminal output proving `.env` was created and a successful key generation message.
**Acceptance check:** Both `.env` exists and key generation completes without error.
-->

### 3. Install dependencies (host machine)

```bash
composer install
npm ci
```

<!--
**Screenshot placeholder:** Step 3 - Dependencies installed
**What it should show:** End of `composer install` and `npm ci` output with successful completion.
**Acceptance check:** No fatal errors and both commands return to the shell prompt.
-->

### 4. Start the local stack

Make sure Docker is running, then start the app and required services:

```bash
./vendor/bin/sail up -d
```

This starts the app and required services defined by YAFFA's local Docker setup. For the first time, it may take a few minutes to pull images and build containers.

Check service status:

```bash
./vendor/bin/sail ps
```

<!--
**Screenshot placeholder:** Step 4 - Containers running
**What it should show:** Successful `sail up -d` output and optionally `./vendor/bin/sail ps` with services in running state.
**Acceptance check:** Application and database services are up, not restarting or exited.
-->

### 5. Initialize the app

```bash
./vendor/bin/sail artisan migrate
```

For first-time contributor setup, also prepare frontend and cache state:

<!--
**Screenshot placeholder:** Step 5 - App initialized
**What it should show:** Terminal output confirming completed migrations and cleared caches.
**Acceptance check:** Migration command finishes without SQL errors and reports completed migrations.
-->

### 6. Build or run frontend assets

Build assets for the first time, or start the dev server for active development.

For one-time build:

```bash
npm run build
```

For active frontend development:

```bash
npm run dev
```

<!--
**Screenshot placeholder:** Step 6 - Frontend assets built or dev server running
**What it should show:** Successful build summary from `npm run build`, or active Vite output from `npm run dev`.
**Acceptance check:** Build exits cleanly, or dev server is listening without module resolution errors.
-->

### 7. Open the app

Open `http://localhost` (or your configured `APP_URL`) and verify the YAFFA login screen appears.

If your app is not on port 80, check your exposed port in the running containers and open that URL.

<!--
**Screenshot placeholder:** Step 7 - YAFFA login page
**What it should show:** Browser with YAFFA login screen on local URL.
**Acceptance check:** Page loads without server error and static assets (styles/icons) render correctly.
-->

## Local testing workflow for contributors

Run these checks before opening a pull request.

### 1. Baseline backend tests (required)

```bash
./vendor/bin/sail php ./vendor/bin/phpunit --testsuite Unit,Feature
```

<!--
**Screenshot placeholder:** Test step A - Baseline PHPUnit run
**What it should show:** End of test output with pass/fail summary for `Unit,Feature`.
**Acceptance check:** Exit code is zero for passing runs, with no unexpected skipped critical suites.
-->

### 2. Build frontend assets (required)

```bash
npm run build
```

### 3. Dusk browser tests (required for UI-sensitive changes)

YAFFA also runs Dusk browser tests in CI. If your change affects UI flows, run Dusk locally as well:

```bash
./vendor/bin/sail artisan dusk
```

<!--
**Screenshot placeholder:** Test step B - Optional Dusk run
**What it should show:** Dusk execution summary and, if failing, a sample screenshot or console artifact location.
**Acceptance check:** Passing runs complete cleanly; failing runs produce actionable browser artifacts.
-->

## OS-specific guidance

### Windows 11 + WSL2

- Install Docker Desktop and enable WSL integration for your Linux distribution.
- Open your WSL terminal and work from your Linux home directory.
- Do not run this flow from Windows Command Prompt against files in `/mnt/c`.
- If Docker commands fail in WSL, restart Docker Desktop and re-open the WSL terminal.

### macOS

- Docker Desktop is the simplest setup for contributor parity.
- Apple Silicon contributors may see slower first-time image builds when multi-arch images are pulled.
- If containers are slow to start, increase Docker Desktop CPU and memory allocation.

### Linux

- Install Docker Engine and Compose plugin from your distro or Docker docs.
- Add your user to the `docker` group to avoid repeated `sudo` usage.
- After adding your user to `docker` group, log out and log in again.

## Troubleshooting

### `./vendor/bin/sail` not found

Run `composer install` first. Sail is installed in `vendor/bin` as part of dependencies.

### Database connection errors during migrate

- Confirm containers are running with `./vendor/bin/sail ps`
- Retry after a short wait: the database service can need extra startup time
- Re-run migration command: `./vendor/bin/sail artisan migrate`

### Frontend build errors

- Ensure Node.js and npm versions are installed correctly
- Reinstall frontend dependencies with `npm ci`
- Re-run `npm run build`

### Port already in use

- Stop conflicting local services or adjust your Docker port mapping
- Restart stack with `./vendor/bin/sail down` then `./vendor/bin/sail up -d`
