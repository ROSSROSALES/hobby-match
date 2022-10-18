const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
    experiments: {
        topLevelAwait: true
      },
    plugins: [
        new Dotenv(),
        new NodePolyfillPlugin()
    ]
}

