'use strict';
const express = require("express")
const path = require("path")
const app = express()
const { WebR } = require('@r-wasm/webr');

(async () => {
  globalThis.webR = new WebR();
  await globalThis.webR.init();
  await globalThis.webR.evalR('x <- faithful[, 2]')
  console.log("webR is ready");
  app.listen(3000, '0.0.0.0', () => {
    console.log('http://localhost:3000')
  })
})();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/hist-data/:n", async (req, res) => {
  let result = await globalThis.webR.evalR(
    'table(cut(x, seq(min(x), max(x), length.out = n + 1)))',
    { env: { n: parseInt(req.params.n) } }
  );
  let output = await result.toJs();
  res.send(output)
})

