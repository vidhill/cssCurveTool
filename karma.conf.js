/* global module, require  */

var testGlob = 'src/js/**.spec.js',
    srcGlob = 'src/js/**!(test).js',
    webpackEnv = { test: true },
    webpackConfig = require('./webpack.config.js')(webpackEnv);

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'node_modules/snapsvg/dist/snap.svg.js',
            testGlob,
            srcGlob
        ],
        exclude: [
            'src/js/app.js'
        ],
        preprocessors: {
            [testGlob]: ['webpack'],
            [srcGlob]: ['webpack']
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
