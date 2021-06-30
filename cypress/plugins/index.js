const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");
// require("dotenv").config();

module.exports = (on, config) => {
  on("file:preprocessor", cypressTypeScriptPreprocessor);

  // setting environment variables from a .env file
  //   config.env.username = process.env.USER_NAME;
  return config;
};
