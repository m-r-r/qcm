const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const DEV = process.env.NODE_ENV !== "production";
const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const NODE_MODULES_DIR = path.join(ROOT_DIR, 'node_modules');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const HOST = process.env.IP || 'localhost';
const PORT = process.env.PORT || 8080;


const config = {
  context: SRC_DIR,
  entry: {
    client: ["./client/style.scss", "./client/main.js"],
    example: ["file?name=[name].[ext]?v=[hash]!./example.json"],
  },
  target: 'web',

  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js',
  },

  resolve: {
    root: path.resolve(SRC_DIR),
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    aliases: {}
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [SRC_DIR],
      }
    ],
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        include: [SRC_DIR],
      },
      {
        loader: 'json',
        test: /\.json?$/,
        include: [SRC_DIR, NODE_MODULES_DIR],
        exclude: [path.join(SRC_DIR, 'example.json')]
      },
      {
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass'),
        test: /\.scss$/,
        include: [SRC_DIR, NODE_MODULES_DIR],
      },

      { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
    ],

    sassLoader: {
      sourceMap: true,
      includePaths: [path.join(NODE_MODULES_DIR, 'normalize.css')],
    },

    devServer: {
      contentBase: BUILD_DIR,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      watch: true,
      host: HOST,
      port: PORT,
    },
  },
  devtool: 'eval-source-map',

  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        filename: 'examples.html',
        template: 'examples.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true,
        },
        chunks: ["client"],
    }),
    new ExtractTextPlugin("[name].css"),
  ],
};

if (DEV) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
  //config.entry.client.unshift("webpack/hot/dev-server");
} else {
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  );
}

config.eslint = {
  configFile: path.join(ROOT_DIR, '.eslintrc'),
  emitWarning: DEV,
};




module.exports = config;
