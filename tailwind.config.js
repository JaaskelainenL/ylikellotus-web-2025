/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {},
        fontFamily: {
            'airstrike': ['Airstrike', 'sans-serif'],
            'RobotoMono': ["Roboto Mono", "monospace"]
        }
    },
    plugins: [
        require('daisyui'),
    ],
}

