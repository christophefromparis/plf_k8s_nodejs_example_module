const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
const counter = new prometheus.Counter({
  name: 'tot_request_example',
  help: 'A sample counter'
});

const port = 9102;

collectDefaultMetrics({ timeout: 5000 });

var express = require('express');
var session = require('express-session');
var Keycloak = require('keycloak-connect');

var app = express();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

app.use(session({
  secret: 'myAwesomeAndVeryLongSecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use( keycloak.middleware( { logout: '/logout'} ));

app.get('/', function (req, res) {
  counter.inc();
  console.log('Counter incremented');
  res.send('Hello the world')
});

app.get('/metrics', function (req, res) {
  res.send(prometheus.register.metrics())
  console.log('Someone wants metrics');
});

app.get( '/protected', keycloak.protect(), (req, res) => {
  res.send('Welcome to the protected content!')
  console.log('Protected content accessed');
});

app.listen(port);