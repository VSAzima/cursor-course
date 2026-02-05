# Troubleshooting E2E Tests

## Common Issues

### Error: Timed out waiting for webServer

**Problem:** Playwright is trying to start the dev server but it's timing out.

**Solutions:**

1. **Check if port 5173 is already in use:**
   ```bash
   lsof -ti:5173
   ```
   
   If a process is returned, you can either:
   - Kill the existing process: `kill -9 $(lsof -ti:5173)`
   - Use the existing server (it should be reused automatically)

2. **Manually start the dev server first:**
   ```bash
   # Terminal 1: Start dev server
   npm run dev
   
   # Terminal 2: Run tests (they will reuse the existing server)
   npm run test:e2e
   ```

3. **Check if the server is responding:**
   ```bash
   curl http://localhost:5173
   ```
   
   You should see HTML content. If you get a connection error, the server isn't running.

4. **Increase timeout (if server is slow to start):**
   Edit `playwright.config.ts` and increase the timeout:
   ```typescript
   webServer: {
     timeout: 180 * 1000, // 3 minutes instead of 2
   }
   ```

### Tests fail with "Navigation timeout"

**Problem:** Tests can't navigate to the page.

**Solutions:**

1. Ensure the dev server is running and accessible
2. Check that `baseURL` in `playwright.config.ts` matches your dev server URL
3. Try running tests in headed mode to see what's happening:
   ```bash
   npm run test:e2e:headed
   ```

### Port already in use

**Problem:** Another process is using port 5173.

**Solutions:**

1. **Find and kill the process:**
   ```bash
   # Find the process
   lsof -ti:5173
   
   # Kill it (replace PID with the number from above)
   kill -9 PID
   ```

2. **Use a different port:**
   - Update `vite.config.ts` to use a different port
   - Update `playwright.config.ts` `baseURL` and `webServer.url` to match

### Tests pass locally but fail in CI

**Problem:** CI environment differences.

**Solutions:**

1. Ensure `reuseExistingServer` is set correctly:
   ```typescript
   reuseExistingServer: !process.env.CI
   ```
   This ensures a fresh server starts in CI.

2. Check CI logs for server startup errors
3. Increase timeout for CI environments if needed

## Debugging Tips

### Run tests with UI mode
```bash
npm run test:e2e:ui
```
This opens an interactive UI where you can see what's happening step by step.

### Run tests in headed mode
```bash
npm run test:e2e:headed
```
This shows the browser window so you can see what's happening.

### Debug a specific test
```bash
npm run test:e2e:debug
```
This opens Playwright Inspector for step-by-step debugging.

### Check server logs
When running tests, check the terminal output for server startup messages. The dev server should show:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Quick Fixes

### Reset everything
```bash
# Kill any processes on port 5173
kill -9 $(lsof -ti:5173) 2>/dev/null || true

# Clear node_modules and reinstall (if needed)
rm -rf node_modules package-lock.json
npm install

# Run tests
npm run test:e2e
```

### Verify setup
```bash
# Check Playwright installation
npx playwright --version

# Check if browsers are installed
npx playwright install --help

# Verify dev server works
npm run dev
# Then visit http://localhost:5173 in browser
```
