/* eslint-env node */

var testGlob = 'src/js/**.spec.js',
    srcGlob = 'src/js/**!(test).js',
    webpackEnv = { test: true },
    webpackConfig = require('./webpack.config.js')(webpackEnv),
    reportsFolder = 'karma-html-reports'
    ;

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
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
        reporters: ['spec', 'coverage', 'html'],
        htmlReporter: {
            outputDir: reportsFolder, // where to put the reports
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'unit-test-report', // report summary filename; browser info by default
        },
        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: reportsFolder, subdir: 'coverage' },
                { type: 'json', dir: reportsFolder, subdir: 'coverage' },
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
