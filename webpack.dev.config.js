const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  devtool: debug ? 'inline-sourcemap' : null,
  entry: path.join(__dirname, 'src', 'App.jsx'),
  devServer: {
    inline: true,
    port: 3333,
    contentBase: 'src/static/',
    historyApiFallback: {
      index: '/index-static.html',
    },
  },
  output: {
    path: 'public/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          cacheDirectory: 'babel_cache',
          presets: debug ? ['react', 'es2015', 'react-hmre', 'stage-1'] : ['react', 'es2015', 'stage-1'],
          plugins: 'transform-object-rest-spread',
        },
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=flick-demo__[name]__[local][hash:base64:5]!postcss-loader',
      },
    ],
  },
  postcss: [
    require('postcss-modules-values'),
    require('autoprefixer'),
  ],
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
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
