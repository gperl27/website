const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new TerserPlugin({
      test: /\.[tj]sx?$/,
      terserOptions: {
        compress: true,
      },
    })],
  },
  externals: {
    nodegit: "commonjs nodegit",
  },
}
