/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				fluid: "repeat(auto-fit,minmax(15rem,1fr))",
			},
			colors: {
				planned: "#F49F85",
				"in-progress": "#AD1FEA",
				live: "#62BCFA",
			},
			screens: {
				xs: "340px",
			},
		},
	},
	plugins: [],
};
