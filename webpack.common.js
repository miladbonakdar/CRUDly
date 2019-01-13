const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    }
};
