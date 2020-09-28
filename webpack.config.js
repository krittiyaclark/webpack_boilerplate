// Webpack uses this to work with directories
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
	// Path to your entry point. From this file Webpack will begin his work
	entry: './src/javascript/index.js',

	// Path and filename of your result bundle.
	// Webpack will bundle all JavaScript into this file
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	// Default mode for Webpack is production.
	// Depending on mode Webpack will apply different things
	// on final bundle. For now we don't need production's JavaScript
	// minifying and other thing so let's set mode to development
	mode: 'development',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
						},
					},
				],
			},
		],
	},
	watch: true,

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'bundle.css',
		}),
	],
}
