const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"), // webpack entry point. Module to start building dependency graph
    output: {
        path: path.join(__dirname, "dist"), // Folder to store generated bundle
        filename: "juggernut.js" // Name of generated bundle after build
    },
    watch: true,
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    module: {
        // where we defined file patterns and their loaders
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [new MinifyPlugin()]
};
