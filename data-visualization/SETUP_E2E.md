# E2E Test Setup Guide

## Quick Start

### First Time Setup

If this is your first time running E2E tests, you need to install Playwright browsers:

```bash
npm run test:e2e:setup
```

Or use the full command that does everything:

```bash
npm run test:e2e:full
```

This will:
1. Install Chromium browser
2. Kill any processes on port 5173
3. Run all E2E tests

## Common Issues & Solutions

### Issue: "Executable doesn't exist" Error

**Problem:** Playwright browsers are not installed.

**Solution:**
```bash
# Install Chromium browser
npm run test:e2e:setup

# Or install all browsers
npx playwright install
```

### Issue: Port Already in Use

**Problem:** Port 5173 is already in use by another process.

**Solution:**
```bash
# Use the clean command (automatically kills processes on port 5173)
npm run test:e2e:clean

# Or manually kill processes
node scripts/kill-port.js 5173
npm run test:e2e
```

### Issue: Server Starts on Wrong Port

**Problem:** Vite starts on port 5179 instead of 5173.

**Solution:**
The `vite.config.ts` is configured with `strictPort: true` to prevent this. If it still happens:
1. Kill all processes on ports 5173, 5178, 5179
2. Run `npm run test:e2e:clean`

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run all E2E tests (assumes server is running) |
| `npm run test:e2e:setup` | Install Playwright browsers |
| `npm run test:e2e:clean` | Kill port 5173 processes and run tests |
| `npm run test:e2e:full` | Setup browsers, clean port, and run tests |
| `npm run test:e2e:ui` | Run tests with interactive UI |
| `npm run test:e2e:headed` | Run tests with visible browser |
| `npm run test:e2e:debug` | Run tests in debug mode |

## Recommended Workflow

### First Time
```bash
npm run test:e2e:full
```

### Subsequent Runs
```bash
# If port is free
npm run test:e2e

# If port might be in use
npm run test:e2e:clean
```

### Development
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run tests (will reuse existing server)
npm run test:e2e
```

## Verification

After setup, verify browsers are installed:

```bash
npx playwright --version
npx playwright install --dry-run chromium
```

If you see "chromium is already installed", you're good to go!

## Troubleshooting

### Browsers Still Not Found

1. **Clear Playwright cache:**
   ```bash
   rm -rf ~/Library/Caches/ms-playwright
   npx playwright install chromium
   ```

2. **Check Playwright version:**
   ```bash
   npm list @playwright/test
   ```

3. **Reinstall Playwright:**
   ```bash
   npm uninstall @playwright/test
   npm install --save-dev @playwright/test
   npx playwright install chromium
   ```

### Permission Issues

If you get permission errors when installing browsers:

```bash
# On macOS/Linux
sudo npx playwright install chromium

# Or install without system dependencies
npx playwright install chromium --with-deps=false
```

## Next Steps

Once browsers are installed, you can run:

```bash
npm run test:e2e:clean
```

You should see:
```
Running 15 tests using 5 workers

  ✓ [chromium] › e2e/product-search.spec.ts:11:5 › Product Search Feature › Search with valid query
  ... (all 15 tests)

  15 passed (35.2s)
```
