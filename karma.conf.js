/* global module, require  */

var filesGlob = 'src/js/**.spec.js',
    webpackEnv = { test: true },
    webpackConfig = require('./webpack.config.js')(webpackEnv);

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            filesGlob
        ],
        exclude: [
        ],
        preprocessors: {
            [filesGlob]: ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true // disable webpack build output for tests
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            reporters: [
                { type: 'lcov', dir:'cover', subdir: '.' },
                { type: 'json', dir:'cover', subdir: '.' },
                { type: 'text-summary' }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    });
};
