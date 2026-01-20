/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx"
    ],
    theme: {
        extend: {
            colors: {
                cherry: '#FF2F6E',
                ink: '#1A1A1A',
                gray: {
                    50: '#F8F9FA',
                    100: '#F1F3F5',
                    200: '#E9ECEF',
                    300: '#DEE2E6',
                    400: '#CED4DA',
                    500: '#ADB5BD',
                    600: '#868E96',
                    700: '#495057',
                    800: '#343A40',
                    900: '#212529',
                },
                // Mapping missing colors to gray scale for compatibility
                silver: {
                    light: '#F1F3F5', // gray-100
                    metal: '#ADB5BD', // gray-500
                    dark: '#868E96',  // gray-600
                },
                coolGray: '#868E96', // gray-600
            },
            fontFamily: {
                sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
