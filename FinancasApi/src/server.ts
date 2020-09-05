import http from 'http';
import app, { runMigrations } from './app';
import environment from './environment';

const PORT = process.env.PORT || environment.port || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\n\nServidor disponivel em http://localhost:${PORT}`);
  runMigrations();
  return;
});

server.once('error', (err) => {
  return console.error('Erro não tratado no servidor', err);
});
