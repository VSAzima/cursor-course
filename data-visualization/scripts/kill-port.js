#!/usr/bin/env node

/**
 * Script to kill processes running on a specific port
 * Usage: node scripts/kill-port.js <port>
 */

import { execSync } from 'child_process';

const port = process.argv[2];

if (!port) {
  console.error('Usage: node scripts/kill-port.js <port>');
  process.exit(1);
}

try {
  // Find processes using the port
  const pids = execSync(`lsof -ti:${port}`, { encoding: 'utf-8' }).trim();
  
  if (!pids) {
    console.log(`Port ${port} is free.`);
    process.exit(0);
  }

  // Kill processes
  const pidArray = pids.split('\n').filter(Boolean);
  console.log(`Found ${pidArray.length} process(es) on port ${port}`);
  
  let killedCount = 0;
  pidArray.forEach(pid => {
    try {
      execSync(`kill -9 ${pid}`, { stdio: 'pipe' });
      console.log(`Killed process ${pid}`);
      killedCount++;
    } catch (error) {
      // Try without -9 flag (softer kill)
      try {
        execSync(`kill ${pid}`, { stdio: 'pipe' });
        console.log(`Sent termination signal to process ${pid}`);
        killedCount++;
      } catch (err) {
        console.warn(`Could not kill process ${pid}: ${error.message || err.message}`);
      }
    }
  });
  
  if (killedCount > 0) {
    console.log(`Port ${port} should be free now (killed ${killedCount} process(es)).`);
  } else {
    console.log(`Could not kill processes on port ${port}. You may need to run with sudo or manually kill them.`);
  }
} catch (error) {
  // If lsof returns nothing, port is free
  if (error.status === 1 || error.code === 1) {
    console.log(`Port ${port} is free.`);
    process.exit(0);
  }
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
