module.exports = {
	mode: 'jit', // Just-In-Time mode for Tailwind
	content: ['./src/**/*.{js,jsx,ts,tsx}'], // Đảm bảo Tailwind quét đúng file
	theme: {
		extend: {
			colors: {
				primary: '#dec986',
				secondary: '#ffed99',
				black: '#000000',
				gray: '#707070',
				tintWhite: '#f3f3f3',
				white: '#ffffff',
				red: '#F65252',
				redLight: '#F77D7D',
				green: '#00FF38',
				greenLight: '#66FF8C',
				darkGreen: '#3ecc2c',
				blue: '#2898FF',
				offWhite: '#f7f7f7',
				lightGray: '#dddddd',
				lightGray1: '#e4e4e4',
				lightGray2: '#d8d8db',
				yellow: '#FFC107',
				orange: '#FF5722',
				purple: '#9C27B0',
				teal: '#009688',
				pink: '#E91E63',
				darkBlue: '#1A237E',
				lightBlue: '#03A9F4',
				primaryLight: '#F4E1A3',
				primaryDark: '#BFA05D',
				success: '#4CAF50',
				info: '#2196F3',
				warning: '#FF9800',
				danger: '#F44336',
			},
			fontFamily: {
				body: ['"Open Sans"'],
			},
			screens: {
				sm: '640px', // Small screens
				md: '768px', // Medium screens
				lg: '1024px', // Large screens
				xl: '1280px', // Extra-large screens
				'2xl': '1536px', // 2X Extra-large screens
				tablet: '640px',
				laptop: '1024px',
				desktop: '1280px',
			},
		},
	},
	plugins: [],
};
