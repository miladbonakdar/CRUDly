const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'crudly.min.js',
        library: 'crudly',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    optimization: {
        minimizer: [new TerserPlugin()]
    }
});
