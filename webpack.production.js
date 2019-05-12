const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin({
      test: /\.[tj]sx?$/,
      terserOptions: {
        compress: true
      }
    })],
  },
}
