const Dotenv = require("dotenv-webpack")

module.exports = {
  plugins: [new Dotenv({ path: './.env'})],
  externals: {
    nodegit: 'commonjs nodegit'
  },
}
