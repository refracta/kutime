'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[id].[name].js'
	},
	performance: {
		hints: 'warning'
	},
	devtool: 'eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: '[name].js',
			minChunks: function (module) {
				if (module.resource && /\.(css|scss|sass)$/.test(module.resource)) {
					return false;
				}

				return module.context && module.context.includes('node_modules');
			}
		}),
		new ExtractTextPlugin({
			filename: 'global.css',
			allChunks: true
		})
	]
});

module.exports = devWebpackConfig;
