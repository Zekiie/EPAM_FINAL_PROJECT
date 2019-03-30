const webpack = require('webpack'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.conf'),
    devWebpackConfig = merge(baseWebpackConfig, {
        // DEV config
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: baseWebpackConfig.externals.paths.dist,
            port: 8081,
            overlay: true
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            })
        ]
    });

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
});
