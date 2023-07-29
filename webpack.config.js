const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map",
  module: { 
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },     
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
       test: /\.(woff|woff2|eot|ttf|otf)$/i,
       type: 'asset/resource',
      },
    ],
  },
};