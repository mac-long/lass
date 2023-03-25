const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					light: 'hsl(153 60% 53%)',
					dark: 'hsl(153 60% 43%)'
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
