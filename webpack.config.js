const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // or 'production' depending on your environment
  entry: "./src/script/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env",
      safe: true,
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output CSS file
    }),
  ],
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
