const Prometheus = require('prom-client')
const server = require('express')()

const PrometheusMetrics = {
  requestCounter: new Prometheus.Counter('throughput', 'The number of requests served')
}

server.use((req, res, next) => {
  PrometheusMetrics.requestCounter.inc()
  next()
})

server.get('/metrics', (req, res) => {
  res.end(Prometheus.register.metrics())
})

server.listen(3000)