module.exports = {
	entry: './application/assets/custom/index.js',
	output: {
		filename: './application/assets/custom/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
};
