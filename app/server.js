const express = require('express');
const client = require('prom-client');
const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'Total Requests'
});

app.get('/', (req, res) => {
  counter.inc();
  res.send("DevOps Monitoring App Running from new one ");
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(8080);
