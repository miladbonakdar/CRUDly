const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    watch: true,
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                use: ["babel-loader"],
            },
        ],
    }
};
