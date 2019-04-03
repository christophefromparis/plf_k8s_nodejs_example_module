const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Veolia World\n');
});

server.listen(port, hostname, () => {
  console.log('Server running at http://${hostname}:${port}/');
  console.log('plf_k8s_nodejs_example');
  console.log('I am here...');
});