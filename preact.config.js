const pkg = require('./package.json');
const webpack = require('webpack');

export default function (config, env, helpers) {
  if (pkg.homepage !== undefined) config.output.publicPath = pkg.homepage;
  if (process.env.HOMEPAGE !== undefined) config.output.publicPath = process.env.HOMEPAGE;
  if (env.isProd) {
    config.devtool = false; // disable sourcemaps
    const loader = config.module.loaders.find(x => x.loader === 'babel-loader');
    Object.assign(loader, {
      loader: 'babel-loader',
      test: /\.js$/
    });
    loader.options.plugins.push('recharts');
    loader.options.compact = true;
  }

  const { loader: cssLoader } =
    helpers.getLoadersByName(config, 'css-loader')[0];
  cssLoader.options.modules = false;
}

require('./node_modules/postcss');