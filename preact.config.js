const pkg = require('./package.json');

export default function (config, env, helpers) {
  if (pkg.homepage !== undefined) config.output.publicPath = pkg.homepage;
  if (process.env.HOMEPAGE !== undefined) config.output.publicPath = process.env.HOMEPAGE;
}

require('./node_modules/postcss')