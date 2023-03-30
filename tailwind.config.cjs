const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins']
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
