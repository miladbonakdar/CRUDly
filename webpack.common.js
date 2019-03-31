const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', path.resolve(__dirname, 'index.js')],
    watch: true,
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components|test)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
