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
                sans: ['Trebuchet MS', 'sans-serif'],
            },
            dropShadow: {
                'xl-c': '0px 0px 8px rgba(0, 0, 0, 0.3)',
            },
            colors: {
                "gray-350": "#E5E9EF",
                'regal-blue': '#243c5a',
            },
        }
    },
    plugins: [],
}