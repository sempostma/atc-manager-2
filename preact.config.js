const pkg = require('./package.json');
const webpack = require('webpack');
const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');
const path = require('path');
const asyncPlugin = require('preact-cli-plugin-fast-async');

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
  
  asyncPlugin(config);

  const precacheConfig = {
    importScripts: [
      // assume this js file is written manually outside of webpack
      { filename: 'assets/push-notifications.js' }
    ]
  };
  config = preactCliSwPrecachePlugin(config, precacheConfig);
  return config;
}

require('./node_modules/postcss');