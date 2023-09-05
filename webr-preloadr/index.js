const app = require('express')()
const path = require('path');
const { loadPackages } = require('webrtools');
const { WebR } = require('webr');

(async () => {
  globalThis.webR = new WebR();
  await globalThis.webR.init();

  console.log("🚀 webR is ready 🚀");

  await loadPackages(
    globalThis.webR,
    path.join(__dirname, 'webr_packages')
  )

  console.log("📦 Packages written to webR 📦");

  const res = await globalThis.webR.FS.lookupPath("/usr/lib/R/library");
  console.log(res)

  await globalThis.webR.evalR("library(dplyr)");
  app.listen(3000, '0.0.0.0', () => {
    console.log('http://localhost:3000')
  })
})();


app.get('/', async (req, res) => {
  let result = await globalThis.webR.evalR('sample_n(mtcars, 10)');
  let output = await result.toJs();
  res.send(output.values)
});