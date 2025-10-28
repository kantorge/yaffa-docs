# Copilot Instructions for yaffa-docs Repository

## Repository Overview

This repository contains the documentation for **YAFFA (Yet Another Free Financial Application)**, a free, open-source, self-hosted personal finance web application. The documentation is built using **Docusaurus v3.6.3**, a modern static website generator optimized for documentation sites.

**Key Information:**
- **Repository Size:** ~3.8MB (excluding node_modules and .git)
- **File Count:** ~150 files (excluding dependencies)
- **Primary Language:** JavaScript/JSX with React 18
- **Framework:** Docusaurus 3.6.3
- **Node Version Required:** >= 18.0 (tested with v20.19.5)
- **NPM Version:** 10.8.2
- **Build Output:** Static HTML/CSS/JS in `build/` directory (~7.4MB)

## Project Structure

### Root Directory Files
- `docusaurus.config.js` - Main Docusaurus configuration (site URL, base path, plugins, theme)
- `sidebars.js` - Sidebar configuration (auto-generated from docs folder)
- `babel.config.js` - Babel configuration for Docusaurus
- `package.json` - Node dependencies and npm scripts
- `package-lock.json` - Locked dependency versions
- `.gitignore` - Git ignore rules (includes node_modules, build, .docusaurus, cache)
- `move-build.ps1` / `move-build.bat` - Scripts for moving build to parent project's public directory

### Key Directories
- **`/docs`** - All documentation content in Markdown format
  - `/docs/introduction.md` - Main introduction page
  - `/docs/assets/` - Documentation about YAFFA assets (accounts, categories, currencies, payees)
  - `/docs/getting-started/` - Installation guides and first steps
    - `/docs/getting-started/installation/` - Various installation methods (Docker, XAMPP, Raspberry Pi, VPS)
    - `/docs/getting-started/advanced-settings/` - Configuration, email, AI, cron jobs, etc.
  - `/docs/other-resources/` - Additional resources (LEMP installation, etc.)
  - `_category_.json` files define section metadata and descriptions

- **`/src`** - React components and custom pages
  - `/src/pages/` - Custom pages (homepage: index.js)
  - `/src/components/` - React components (HomepageFeatures, HomepageDescription)
  - `/src/css/custom.css` - Custom CSS styling
  - `/src/globalData.js` - Global data constants (feature URLs, external links)

- **`/static`** - Static assets served directly
  - `/static/img/` - All images (logos, screenshots, documentation images)
    - Contains ~25 PNG files including logo, feature screenshots, installation guides
  - `/static/img/favicon.ico` - Site favicon

- **Generated Directories (gitignored):**
  - `.docusaurus/` - Docusaurus build cache
  - `node_modules/` - Node dependencies
  - `build/` - Production build output

## Build and Development Workflow

### Initial Setup
**ALWAYS run these steps in order when working with a fresh clone:**

```bash
cd /home/runner/work/yaffa-docs/yaffa-docs
npm install  # Takes ~60 seconds, installs 1314 packages
```

**Note:** You may see npm audit warnings about vulnerabilities. These are dependency vulnerabilities and should not be fixed automatically unless specifically requested.

### Available Commands

#### Development Server
```bash
npm start  # Starts dev server at http://localhost:3000/documentation/
```
- Compiles in ~7-10 seconds after start
- Hot-reload enabled for development
- Base URL: `/documentation/` (not root `/`)
- **Do NOT use** for testing production builds

#### Production Build
```bash
npm run build  # Creates optimized production build
```
- **Duration:** ~20-30 seconds
- Output: `build/` directory (~7.4MB)
- **CRITICAL:** Build will fail if image file references have incorrect case
- Runs webpack compilation for client and server
- Shows browserslist warning (safe to ignore unless updating is requested)
- Validates all internal links (throws error on broken links)
- Validates markdown links (warns on broken markdown links)

**Common Build Errors:**
- **"Module not found: Error: Can't resolve '/img/...'"** - Image file case mismatch. Static files are case-sensitive. Check that image imports in `.md` files match the exact case of files in `/static/img/`.

#### Serve Production Build
```bash
npm run serve  # Serves build/ at http://localhost:3000/documentation/
```
- Use this to test the production build locally
- Requires `npm run build` first
- Immediately available at http://localhost:3000/documentation/

#### Clear Cache
```bash
npm run clear  # Removes .docusaurus/ and node_modules/.cache/
```
- Use when experiencing build inconsistencies
- Required after major config changes
- Takes ~1 second

#### Other Commands
- `npm run deploy` - Docusaurus deployment (not typically used in this project)
- `npm run swizzle` - Eject Docusaurus theme components
- `npm run write-translations` - Generate translation files
- `npm run write-heading-ids` - Add IDs to headings

### Build Process Details

1. **Install dependencies** (first time or after package.json changes)
2. **Clear cache** if needed: `npm run clear`
3. **Build**: `npm run build`
   - Compiles client bundle (webpack)
   - Compiles server bundle (SSR)
   - Generates static HTML for all pages
   - Copies static assets
   - Validates links
4. **Test**: `npm run serve` to verify build

## Critical File Considerations

### Image Files and Case Sensitivity
**CRITICAL:** The build process is case-sensitive for image references, even on case-insensitive file systems.

- Images in `/static/img/` are referenced in markdown/JSX as `/img/filename.ext`
- Extension case MUST match exactly (e.g., `.png` vs `.PNG`)
- Two images had this issue: `xampp-installation-online.PNG` and `xampp-installation-mysql-database.PNG` were renamed to `.png` to fix build errors

**When adding images:**
1. Use lowercase extensions (`.png`, `.jpg`, not `.PNG`, `.JPG`)
2. Test build immediately after adding image references
3. If build fails with "Module not found" for an image, check case sensitivity

### Configuration Files

**docusaurus.config.js** - Main config:
- Site title, tagline, favicon
- Production URL: `https://yaffa.cc`
- Base URL: `/documentation/` (MUST have trailing slash)
- `onBrokenLinks: 'throw'` - Build fails on broken internal links
- `onBrokenMarkdownLinks: 'warn'` - Only warns on broken markdown links
- Google Tag Manager integration
- Image zoom plugin configuration

**sidebars.js** - Auto-generated sidebar from docs structure

**babel.config.js** - Standard Docusaurus preset

### Markdown Files
- Frontmatter required: `title`, `sidebar_label`, `sidebar_position`, `description`
- Images imported: `import ImageName from '/img/file.png';` then used as `<ImageName />`
- Markdown links: `[text](../path/to/file.md)` or `[text](/resources/path)`
- Route base path is `/resources` for docs (configured in docusaurus.config.js)

## Testing and Validation

### Pre-Commit Validation Steps
1. **Build test:** `npm run build` - MUST complete successfully
2. **Link validation:** Build process checks all internal links
3. **Serve test:** `npm run serve` - Verify site loads at http://localhost:3000/documentation/
4. **Visual check:** Navigate to changed pages and verify rendering

### No Automated Tests
- No unit tests, integration tests, or linting configured
- No CI/CD pipelines in .github/workflows
- Validation is manual through build and serve

## Common Issues and Solutions

### Issue: Build fails with image not found
**Solution:** Check image file case in `/static/img/` matches import statement case exactly

### Issue: Browserslist data is old
**Symptom:** Warning during build about caniuse-lite being 12 months old
**Solution:** Ignore unless specifically asked to update: `npx update-browserslist-db@latest`

### Issue: Build cache issues
**Solution:** Run `npm run clear` then rebuild

### Issue: Port 3000 already in use
**Solution:** Kill existing process: `pkill -f "docusaurus"` or use different port

### Issue: Changes not reflecting in dev server
**Solution:** 
1. Stop dev server
2. Run `npm run clear`
3. Restart with `npm start`

## Dependencies and Packages

### Core Dependencies
- `@docusaurus/core` (3.6.3)
- `@docusaurus/preset-classic` (3.6.3)
- `react` (18.2.0), `react-dom` (18.2.0)
- `@mdx-js/react` (3.0.0)
- `plugin-image-zoom` (from GitHub - enables image zoom on click)
- `@fortawesome` packages (icons)
- `prism-react-renderer` (syntax highlighting)

### Dev Dependencies
- `@docusaurus/module-type-aliases` (3.6.3)
- `@docusaurus/types` (3.6.3)

**Do not add new dependencies** unless absolutely necessary. Use existing Docusaurus features and plugins first.

## Making Changes

### Documentation Changes
1. Edit markdown files in `/docs/`
2. Follow existing frontmatter format
3. Use relative paths for links between docs
4. Add images to `/static/img/` with lowercase extensions
5. Test build: `npm run build`
6. Test locally: `npm run serve`

### Component Changes
1. Edit files in `/src/components/` or `/src/pages/`
2. Follow existing React patterns
3. Import from `@docusaurus/` packages for Docusaurus features
4. Test with `npm start` for hot reload
5. Test production build: `npm run build && npm run serve`

### Configuration Changes
1. Edit `docusaurus.config.js` or `sidebars.js`
2. ALWAYS run `npm run clear` after config changes
3. Rebuild: `npm run build`
4. Verify functionality: `npm run serve`

## Instructions for Agents

**ALWAYS follow this workflow:**
1. Install dependencies first: `npm install`
2. Make minimal changes to accomplish the task
3. Test immediately after changes: `npm run build`
4. If build fails, fix errors before proceeding
5. Verify with production server: `npm run serve`
6. Do not fix unrelated warnings or vulnerabilities unless requested

**File case sensitivity is critical:** When adding or referencing images, ensure exact case match between file names and import statements.

**Trust these instructions:** Only search for additional information if these instructions are incomplete or found to be incorrect. The project structure and build process are straightforward and documented here.
