/* eslint-env node */

const path = require('path'),
    webpack = require('webpack'),
    resolve = path.resolve,
    checkstyleFormatter = require('eslint/lib/formatters/checkstyle'),
    stylishFormatter = require('eslint/lib/formatters/stylish')
    ;


module.exports = env => {

    var addPlugin = function(add, plugin){
        return (add === true ) ? plugin : undefined;
    };

    var ifProd = function(plugin) {
        return addPlugin(env.prod, plugin);
    };

    var removeEmpty = function(myArr) {
        return myArr.filter(function(i){
            return i !== undefined;
        });
    };


    var myPlugins = removeEmpty([
        ifProd(new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })),
        ifProd(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        })),
        ifProd(new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // no SVG, no ie8
                warnings: true
            }
        })),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    outputReport: {
                        filePath: 'foo.txt',
                        formatter: checkstyleFormatter
                    },
                    formatter: stylishFormatter
                }
            }
        })
    ]);

    return {
        devtool: 'source-map',
        entry: './src/js/app.js',
        output: {
            path: resolve(__dirname, 'dist/js'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [
                        resolve(__dirname, 'src')
                    ],
                    loader: 'babel-loader!eslint-loader'
                }
            ]
        },
        plugins: myPlugins
    };
};
