/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}', // If using Next.js 13 with the app directory
		'./pages/**/*.{js,ts,jsx,tsx}', // If using the pages directory
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layout/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}', // Include any other directories where you have components
	],
	theme: {
		extend: {
			animation: {
				fadeIn: 'fadeIn 0.5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0, transform: 'translateY(10px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
}
