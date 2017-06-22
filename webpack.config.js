const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const DEV = process.env.NODE_ENV !== "production";
const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const NODE_MODULES_DIR = path.join(ROOT_DIR, 'node_modules');
const BUILD_DIR = path.join(ROOT_DIR, 'build');

const config = {
  target: 'web',
  context: SRC_DIR,
  entry: {
    client: ["./client/style.scss", "./client/main.js"],
    example: ["file-loader?name=[name].[ext]?v=[hash]!./example.json"],
  },

  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [SRC_DIR],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.json?$/,
        include: [SRC_DIR, NODE_MODULES_DIR],
        exclude: [path.join(SRC_DIR, 'example.json')],
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        include: [SRC_DIR, NODE_MODULES_DIR],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: "css-loader" }, 
            {
              loader: "sass-loader", 
              options: {
                sourceMap: true,
                includePaths: [path.join(NODE_MODULES_DIR, 'normalize.css')],
              }
            }
          ]
        })
      },

      { test: /\.woff(\?.*)?$/,  use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/,   use: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/,   use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   use: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/,   use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/,    use: 'url-loader?limit=8192' }
    ],
  },

  devServer: {
    contentBase: BUILD_DIR,
    hot: true,
    inline: true,
    quiet: true
  },
  devtool: DEV ? 'cheap-eval-source-map' : false,

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
    new webpack.NoEmitOnErrorsPlugin()
  );
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


module.exports = config;
