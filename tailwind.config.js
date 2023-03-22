/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "blurple-wave": "linear-gradient(to top right, #3f6d85, #7e65ad)",
            },
            fontFamily: {
                "sans": ['Trebuchet MS', 'sans-serif'],
                'sleek': ["Varta", "sans-serif"],
            },
            dropShadow: {
                'xl-c': '0px 0px 6px rgba(0, 0, 0, 0.4)',
                '4xl-c': '0px 0px 33px rgba(20, 20, 20, 0.3)',
            },
            colors: {
                "slate-350": "#adb9c9",
                "gray-350": "#E5E9EF",
                'regal-blue': '#243c5a',
                "link-blue": "#072c42",
                "mid-blue-100": "#4F6482",
                "mid-blue-200": "#3C5375",
                "mid-blue-300": "#3c5375",
                "mid-blue-400": "#364A69",
                "mid-blue-500": "#30425E",
                "mid-blue-600": "#2B3B54",
                "mid-blue-700": "#26354B",
                "mid-blue-800": "#222F43",
                "mid-blue-900": "#1E2A3C",
            },
        }
    },
    plugins: [],
}