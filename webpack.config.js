const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
const { join } = require("path");
const outputPath = join(process.cwd(), "/dist");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const options = { port: 8000 };

module.exports = {
  module: {
    // Bundle styles into main.css
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  mode: "development",
  // an example entry definition
  entry: [
    "webpack-plugin-serve/client", // ← important: this is required, where the magic happens in the browser
    "./src/index.js",
  ],
  output: {
    filename: "main.js",
    path: outputPath,
  },
  plugins: [new MiniCssExtractPlugin(), new Serve(options)],
  watch: true, // ← important: webpack and the server will continue to run in watch mode
  devServer: {
    static: "./dist",
    hot: true,
  },
};
