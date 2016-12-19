const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './src/server.jsx',
  output: {
    path: './public',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  externals: nodeExternals(),
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: ['babel-loader'],
      exclude: /node_modules/,
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015', 'stage-1'],
        plugins: 'transform-object-rest-spread',
      },
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=flick-demo__[name]__[local][hash:base64:5]!postcss-loader'),
    }],
  },
  plugins: debug ? [new ExtractTextPlugin('public/style.css', { allChunks: true })] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true,
    }),
  ],
};
