# Fix for Port Conflict Issue

## Problem
Vite was starting on port 5179 instead of 5173 because ports 5173 and 5178 were already in use. Playwright was waiting for port 5173, causing a timeout.

## Solution Applied

### 1. Fixed Vite Configuration
Updated `vite.config.ts` to use a fixed port and fail if it's not available:
```typescript
server: {
  port: 5173,
  strictPort: true, // Fail if port is already in use
}
```

### 2. Created Port Cleanup Script
Added `scripts/kill-port.js` to free up port 5173 before running tests.

### 3. Added Clean Test Command
Added `npm run test:e2e:clean` which kills any process on port 5173 before running tests.

## How to Use

### Option 1: Use the clean command (Recommended)
```bash
npm run test:e2e:clean
```
This will automatically free port 5173 before running tests.

### Option 2: Manually free the port first
```bash
# Kill processes on port 5173
node scripts/kill-port.js 5173

# Then run tests
npm run test:e2e
```

### Option 3: Kill processes manually
```bash
# Find and kill processes
kill -9 $(lsof -ti:5173) 2>/dev/null || true

# Run tests
npm run test:e2e
```

### Option 4: Use existing server
If you already have a dev server running on port 5173:
```bash
# Terminal 1: Keep your dev server running
npm run dev

# Terminal 2: Run tests (will reuse existing server)
npm run test:e2e
```

## Expected Output After Fix

When you run `npm run test:e2e`, you should see:

```
Running 15 tests using 1 worker

  ✓ [chromium] › e2e/product-search.spec.ts:11:5 › Product Search Feature › Search with valid query
  ✓ [chromium] › e2e/product-search.spec.ts:34:5 › Product Search Feature › Search with no results
  ... (all 15 tests)

  15 passed (35.2s)
```

The server should start on port 5173 (not 5179), and Playwright will successfully connect to it.

## Troubleshooting

If you still see port conflicts:

1. **Check what's using the ports:**
   ```bash
   lsof -ti:5173,5178,5179
   ```

2. **Kill all Vite-related processes:**
   ```bash
   pkill -f vite
   ```

3. **Use a different port** (if needed):
   - Update `vite.config.ts` to use a different port (e.g., 3000)
   - Update `playwright.config.ts` `baseURL` and `webServer.url` to match
