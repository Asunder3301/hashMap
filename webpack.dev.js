import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import ESLintWebpackPlugin from "eslint-webpack-plugin";

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ["js", "mjs"],
      fix: true,
      emitWarning: true,
      emitError: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
