'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
	output: {
		path: path.resolve(__dirname, '../assets'),
		publicPath: '/assets/',
		filename: '[name].[chunkhash].js',
		chunkFilename: '[id].[chunkhash].js'
	},
	performance: {
		hints: 'error'
	},
	devtool: 'hidden-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: 2
		}),
		new ExtractTextPlugin({
			filename: 'global.[contenthash:20].css',
			allChunks: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
});

module.exports = webpackConfig;
