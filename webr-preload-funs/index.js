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

  await globalThis.webR.FS.mkdir("/home/rfuns")

  await globalThis.webR.FS.mount(
    "NODEFS",
    {
      root: path.join(__dirname, 'rfuns')
    },
    "/home/rfuns"
  )

  console.log("📦 Packages written to webR 📦");

  // see https://github.com/r-wasm/webr/issues/292
  await globalThis.webR.evalR("options(expressions=1000)")
  await globalThis.webR.evalR("pkgload::load_all('/home/rfuns')");

  app.listen(3000, '0.0.0.0', () => {
    console.log('http://localhost:3000')
  })

})();

app.get('/', async (req, res) => {
  let result = await globalThis.webR.evalR(
    'unique_species()'
  );
  try {
    let js_res = await result.toJs()
    res.send(js_res.values)
  } finally {
    webR.destroy(result);
  }

})


app.get('/:n', async (req, res) => {
  let result = await globalThis.webR.evalR(
    'star_wars_by_species(n)',
    { env: { n: req.params.n } }
  );
  try {
    const result_js = await result.toJs();
    res.send(result_js)
  } finally {
    webR.destroy(result);
  }
});