const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.join(__dirname, "dist"), // Folder to store generated bundle
        filename: "juggernut.min.js", // Name of generated bundle after build
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    plugins: [new MinifyPlugin()],
});
