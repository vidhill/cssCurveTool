var path = require('path'),
    resolve = path.resolve;

module.exports = env => {
  return {
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
    }
  }
}
