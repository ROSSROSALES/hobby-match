const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
    plugins: [
        new Dotenv(),
        new NodePolyfillPlugin()
    ]
}

