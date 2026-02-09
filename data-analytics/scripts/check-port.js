import net from 'node:net';

const portArg = process.argv[2];
const port = Number(portArg || 5187);

if (!Number.isInteger(port) || port <= 0) {
  console.error(`Invalid port: ${portArg}`);
  process.exit(1);
}

const server = net.createServer();

server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please free it before running tests.`);
    process.exit(1);
  }
  console.error(`Port check failed: ${err.message}`);
  process.exit(1);
});

server.once('listening', () => {
  server.close(() => {
    process.exit(0);
  });
});

server.listen(port, '127.0.0.1');
