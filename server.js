const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
const counter = new prometheus.Counter({
  name: 'tot_request_example',
  help: 'A sample counter'
});

const port = 9102;

collectDefaultMetrics({ timeout: 5000 });

var express = require('express')
var app = express()

var session = require('express-session');
var Keycloak = require('keycloak-connect');
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

app.use( keycloak.middleware() );

app.get('/', function (req, res) {
  counter.inc();
  res.send('Hello Veolia World')
})

app.get('/metrics', function (req, res) {
  res.send(prometheus.register.metrics())
})

app.get( '/protect', keycloak.protect(), complaintHandler );

app.listen(port)