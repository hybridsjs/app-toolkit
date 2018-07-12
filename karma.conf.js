const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const reporters = ['dots'];
if (process.env.NODE_ENV === 'coverage') reporters.push('coverage');

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    reporters,
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    files: ['test/runner.js'],
    preprocessors: {
      'test/runner.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      module: {
        ...webpackConfig.module,
      },
      devtool: 'inline-source-map',
      mode: 'development',
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': 'env',
        }),
      ],
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
      ],
    },
    autoWatch: true,
    singleRun: false,
  });
};
