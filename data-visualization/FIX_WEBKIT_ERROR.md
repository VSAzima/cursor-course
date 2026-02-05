# Fix for WebKit Error

## Problem
Error: `browserType.launch: Executable doesn't exist at .../webkit-2248/pw_run.sh`

This happens because device descriptors like `iPhone 13` and `iPad Pro` default to WebKit browser, which isn't installed.

## Solution Applied

Updated `playwright.config.ts` to:
1. Use Chromium for all projects (instead of WebKit)
2. Manually configure viewport sizes instead of using device descriptors
3. Set mobile/tablet properties manually

## Changes Made

### Before (caused WebKit error):
```typescript
{
  name: 'chromium-mobile',
  use: { 
    ...devices['iPhone 13'], // This defaults to WebKit!
  },
}
```

### After (uses Chromium):
```typescript
{
  name: 'chromium-mobile',
  use: { 
    ...devices['Desktop Chrome'], // Base on Chromium
    viewport: { width: 375, height: 667 }, // Manual viewport
    userAgent: '...', // Mobile user agent
    isMobile: true,
    hasTouch: true,
  },
}
```

## Running Tests

### Run tests on desktop only (default):
```bash
npm run test:e2e:clean
# or
npm run test:e2e:all
```

### Run tests across all viewports:
```bash
npm run test:e2e:all-viewports
```

This will run tests on:
- Desktop (1280x720)
- Mobile (375x667) 
- Tablet (768x1024)

All using Chromium browser (no WebKit needed).

## Verification

Run this to verify the fix:
```bash
npm run test:e2e:all-viewports
```

Expected: All tests pass without WebKit errors.
