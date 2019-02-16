const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.join(__dirname, "dist"), // Folder to store generated bundle
        filename: "[name].js" // Name of generated bundle after build
    },
    plugins: [
        new UglifyJSPlugin({
            test: /\.js(\?.*)?$/i,
            exclude: /\/test/
        })
    ]
});
