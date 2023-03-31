const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins']
			},
			backgroundImage: {
				crowd: "url('/bg.png')"
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
