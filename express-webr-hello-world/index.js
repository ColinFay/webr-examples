'use strict';

const app = require('express')()
const { WebR } = require('@r-wasm/webr');

(async () => {
  globalThis.webR = new WebR();
  await globalThis.webR.init();
  console.log("webR is ready");
  // Starting the express app
  // only after webR is ready
  app.listen(3000, '0.0.0.0', () => {
    console.log('http://localhost:3000')
  })
})();

// Creating a route for the express app
// that will return the R version string
app.get('/', async (req, res) => {
  // Evaluating the R version string inside
  // the R worker thread
  let result = await globalThis.webR.evalR('tools::toTitleCase("hello from r!")');
  // Converting the result to a JS object
  let output = await result.toJs();
  // Sending the result back to the client,
  // but only the values (webR outputs an object with types/names/values
  // and here we only want the values)
  res.send(output.values)
});