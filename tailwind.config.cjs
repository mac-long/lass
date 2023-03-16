const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#A0FF1F',
					dark: '#619e0f'
				}
			},
			fontFamily: {
				sans: ['Poppins']
			}
		}
	},
	plugins: []
};

module.exports = config;
