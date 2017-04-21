'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

// must match config.webpack.dev_server.port
var devServerPort = 8888;

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

var config = {
  target: 'node', // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  entry: './test/index.js',

  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    },
  ]},

  output: {
    filename: 'tmp/testBundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.join(__dirname, '../webpack'),
  },

  plugins: [
    new WebpackShellPlugin({
      onBuildExit: "yarn run mocha tmp/testBundle.js"
    })
  ],

  watchOptions: {
    poll: true
  }
};

module.exports = config;
