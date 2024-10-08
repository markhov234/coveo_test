const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
        use: "babel-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][hash][ext]",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
      favicon: path.resolve(__dirname, "src/images/coveoIcon.png"), // Specify the PNG file here
    }),
  ],
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true, // Enable Hot Module Replacement
  },
  mode: process.env.NODE_ENV || "development",
};
