/**
 * Webpack Config for Gutenberg blocks
 *
 * @author Loïc Blascos
 * @since 1.0.0
 */

const glob    = require("glob");
const Extract = require("extract-text-webpack-plugin");
const editor  = new Extract("./editor.build.css");
const style   = new Extract("./style.build.css");

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	context: __dirname +  "/blocks/",
	entry: glob.sync(__dirname +  "/blocks/**/index.js"),
	plugins: [
		editor,
		style
	],
	output: {
		path: __dirname + "/assets",// Path to produce the output.
		filename: "editor.build.js" // Built Filename.
	},
	stats: {
		children: false
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // Identifies which files should be transformed.
				use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
				exclude: /(node_modules|bower_components)/ // JavaScript files to be ignored.
			},
			{
				test: /editor\.s?css$/, // Identifies which files should be transformed.
				use: editor.extract({ // css/sass loader to transpile in css.
					use: ["css-loader","sass-loader"]
				}),
			},
			{
				test: /style\.s?css$/, // Identifies which files should be transformed.
				use: style.extract({ // css/sass loader to transpile in css.
					use: ["css-loader","sass-loader"]
				}),
			}
		]
	}
};
