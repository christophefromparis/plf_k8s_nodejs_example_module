const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
const counter = new prometheus.Counter({
  name: 'counter',
  help: 'A sample counter'
});

const port = 9102;

collectDefaultMetrics({ timeout: 5000 });
collectDefaultMetrics({ prefix: 'nodejs-example' });

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  counter.inc();
  res.send('Hello Veolia World')
})

app.get('/metrics', function (req, res) {
  res.send(prometheus.register.metrics())
})

app.listen(port)