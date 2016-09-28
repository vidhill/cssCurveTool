/* global require, module, __dirname */

var path = require('path'),
    webpack = require('webpack'),
    resolve = path.resolve;


module.exports = env => {

    var addPlugin = (add, plugin) =>{
        add ? plugin : undefined;
    };

    var ifProd = plugin => {
        addPlugin(env.prod, plugin);
    };

    var removeEmpty = i => {
        i !== undefined;
    };

    return {
        devtool: 'source-map',
        entry: './src/js/app.js',
        output: {
            path: resolve(__dirname, 'webp'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [
                        resolve(__dirname, 'src')
                    ],
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                              ['es2015', { 'modules': false }]
                        ]
                    }

                }
            ]
        },
        plugins: [
            ifProd( new webpack.optimize.DedupePlugin() ),
            ifProd( new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            ifProd( new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: 'production'
                }
            })),
            ifProd( new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true, // no SVG, no ie8
                    warnings: true,
                    sourceMap: true
                }
            }))
           )
        ].filter(removeEmpty)
    };
};
