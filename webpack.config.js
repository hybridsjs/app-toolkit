module.exports = {
  output: {
    filename: 'elements.js',
    libraryTarget: 'umd',
    library: 'hybridElements',
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'eslint-loader', enforce: 'pre' },
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
  mode: 'production',
  devtool: 'source-map',
};
