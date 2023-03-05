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
                "mid-blue": "#3c5375",
                "link-blue": "#072c42"
            },
        }
    },
    plugins: [],
}