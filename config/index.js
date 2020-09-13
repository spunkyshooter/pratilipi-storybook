if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod"); //require gives us ability to import dynamically
} else {
  module.exports = require("./keys_dev");
}
