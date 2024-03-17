/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./Screens/LoginScreen.{js,jsx,ts,tsx}",
		"./Components/primaryButton.{js,jsx,ts,tsx}",
		"./Screens/SignUp.{js,jsx,ts,tsx}",
		"./Screens/Home.{js,jsx,ts,tsx}",
		"./Screens/CaptureImage.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primaryBlue: "#0062f5",
				rippleBlue: "#002861ff",
				BGblue: "#1e00c7",
			},
		},
	},
	plugins: [],
};
