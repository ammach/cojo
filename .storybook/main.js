const path = require('path');

module.exports = {
	stories: ['./stories/*.stories.js'],
	addons: [
		'@storybook/addon-knobs/register',
		'@storybook/addon-viewport/register',
		'@storybook/addon-actions/register',
		'@storybook/addon-a11y',
	],
	webpackFinal: async (config, { configType }) => {
		config.resolve.alias = {
			'@pages': path.resolve(__dirname, '../src/pages/'),
			'@components': path.resolve(__dirname, '../src/components/'),
			'@services': path.resolve(__dirname, '../src/services/'),
			'@hooks': path.resolve(__dirname, '../src/hooks/'),
			'@utils': path.resolve(__dirname, '../src/utils/'),
			'@theme': path.resolve(__dirname, '../src/theme/'),
		};

		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test.test('.svg')
		);
		fileLoaderRule.exclude = /\.svg$/;
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack', 'url-loader'],
		});

		config.module.rules.push({
			loader: 'babel-loader',
			exclude: /node_modules/,
			test: /\.(js|jsx)$/,
			options: {
				presets: ['@babel/react'],
				plugins: [
					['import', {
						libraryName: 'antd',
						libraryDirectory: 'es',
						style: true
					}]
				]
			},
		});

		config.module.rules.push({
			test: /\.less$/,
			loaders: [
				'style-loader',
				'css-loader',
				{
					loader: 'less-loader',
					options: {
						lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
							modifyVars: {
								'primary-color': '#D4C382'
							},
							javascriptEnabled: true,
						},
					}
				}
			],
			include: [
				path.resolve(__dirname, '../src'),
				/[\\/]node_modules[\\/].*antd/
			]
		});

		return config;
	},
};
