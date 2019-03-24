const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    optimization: {
        minimize: false
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'crudly.js',
        library: 'crudly',
        libraryTarget: 'commonjs'
    }
});
