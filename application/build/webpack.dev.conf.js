'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
	output: {
		path: path.resolve(__dirname, '../dev-assets'),
		publicPath: '/dev-assets/',
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
			minChunks: 2
		}),
		new ExtractTextPlugin({
			filename: 'global.css',
			allChunks: true
		})
	]
});

module.exports = devWebpackConfig;
