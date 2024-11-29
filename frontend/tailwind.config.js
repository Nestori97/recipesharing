/** @type {import('tailwindcss').Config} */
export default {
    content: ['index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                custom: {
                    primary: '#DD614A',
                    secondary: '#F48668',
                    accent: '#73A580',
                    neutral: '#C5C392',
                    background: '#eeeddf',
                    'base-100': '#f3f4f6',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};
