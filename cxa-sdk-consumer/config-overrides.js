const webpack = require('webpack');
module.exports = function override(config, env) {
    //do stuff with the webpack config...

    config.resolve.fallback = {
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        vm: require.resolve('vm-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        'process/browser': require.resolve('process/browser')
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}