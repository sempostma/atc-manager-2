const pkg = require('./package.json');

export default function (config, env, helpers) {
  if (pkg.homepage !== undefined) config.output.publicPath = pkg.homepage;
  if (process.env.HOMEPAGE !== undefined) config.output.publicPath = process.env.HOMEPAGE;
  if (env.isProd) {
    config.devtool = false; // disable sourcemaps
  }
}

require('./node_modules/postcss');