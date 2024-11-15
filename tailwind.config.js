module.exports = {
    content: [
        "./resources/**/*.html",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.ts",
        "./resources/**/*.tsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                mont: ["Montserrat", "sans-serif"],
            },
            boxShadow: {
                lightblue: "0 0 30px rgba(173, 216, 230, 0.8)",
            },
        },
    },
    plugins: [],
};
