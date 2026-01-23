import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./features/**/*.{js,ts,jsx,tsx}",
        "./shared/**/*.{js,ts,jsx,tsx}",
        "./index.tsx"
    ],
    theme: {
        extend: {
            colors: {
                cherry: {
                    DEFAULT: '#FF2F6E',
                    dark: '#C20055',
                    neon: '#FF4D82',
                    light: '#FFEAF2',
                },
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
            },
            keyframes: {
                'pick-pop': {
                    '0%': { transform: 'scale(1)' },
                    '40%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.98)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                'pick-pop': 'pick-pop 0.24s ease-out',
                fadeIn: 'fadeIn 0.3s ease-out',
            },
        },
    },
    plugins: [
        forms,
        function ({ addUtilities }) {
            addUtilities({
                '.pb-safe': {
                    'padding-bottom': 'max(16px, env(safe-area-inset-bottom))',
                },
            });
        },
    ],
}
