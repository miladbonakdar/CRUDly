const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.join(__dirname, "dist"), // Folder to store generated bundle
        filename: "[name].js" // Name of generated bundle after build
    },
    optimization: {
        minimizer: [new TerserPlugin()]
    }
});
