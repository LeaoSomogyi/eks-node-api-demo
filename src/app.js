const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/health', (_, res) => res.send('OK from EKS!'));

app.listen(port, () => {
  console.log(`EKS Demo API running at http://localhost:${port}`);
});