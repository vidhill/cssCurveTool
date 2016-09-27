var path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'webp'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
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
