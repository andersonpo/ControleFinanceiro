import http from 'http';
import app from './app';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  return console.log(`Servidor disponivel em http://localhost:${PORT}`);
});

server.once('error', (err) => {
  return console.error('Erro não tratado no servidor', err);
});
