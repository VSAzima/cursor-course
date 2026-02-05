# Quick Fix for E2E Tests

## The Problem

You're seeing this error:
```
Error: browserType.launch: Executable doesn't exist at .../chrome-headless-shell-mac-arm64/chrome-headless-shell
```

This means **Playwright browsers are not installed**.

## The Solution

Run this command to install Chromium:

```bash
npm run test:e2e:setup
```

Or use the all-in-one command:

```bash
npm run test:e2e:full
```

## What Each Command Does

### `npm run test:e2e:setup`
- Installs Chromium browser for Playwright
- Run this **once** after installing dependencies

### `npm run test:e2e:full`
- Installs Chromium browser
- Kills processes on port 5173
- Runs all E2E tests
- **Use this if you want everything done automatically**

### `npm run test:e2e:clean`
- Kills processes on port 5173
- Runs E2E tests
- **Use this after browsers are installed**

## Step-by-Step Fix

1. **Install browsers:**
   ```bash
   npm run test:e2e:setup
   ```
   
   You should see output like:
   ```
   Downloading Chromium...
   ✓ Chromium installed successfully
   ```

2. **Run tests:**
   ```bash
   npm run test:e2e:clean
   ```

## Expected Output After Fix

Once browsers are installed, you should see:

```
Found X process(es) on port 5173
Killed process XXXXX
Port 5173 should be free now.

Running 15 tests using 5 workers

  ✓ [chromium] › e2e/product-search.spec.ts:11:5 › Product Search Feature › Search with valid query
  ✓ [chromium] › e2e/product-search.spec.ts:34:5 › Product Search Feature › Search with no results
  ... (all 15 tests)

  15 passed (35.2s)
```

## If Installation Fails

If `npm run test:e2e:setup` fails, try:

```bash
# Install with system dependencies
npx playwright install --with-deps chromium

# Or install all browsers
npx playwright install
```

## Verify Installation

Check if browsers are installed:

```bash
npx playwright install --dry-run chromium
```

If you see "chromium is already installed", you're ready to run tests!
