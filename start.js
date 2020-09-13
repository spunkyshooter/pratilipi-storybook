// since i am not intrested in using nodemon -r esm server.js we do the below

/*
You can omit -r esm parameter when you run a node script.
Instead, you need to create an entrypoint file that loads esm
for before application code.
 */

require = require("esm")(module /*, options*/);
module.exports = require("./server.js");