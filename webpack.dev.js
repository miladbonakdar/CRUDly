const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const path = require("path");

const outFileName = "juggernut";

module.exports = merge(common, {
    mode: "development",
    optimization: {
        minimize: false
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: `${outFileName}.js`,
        sourceMapFilename: `${outFileName}.map`
    }
});
