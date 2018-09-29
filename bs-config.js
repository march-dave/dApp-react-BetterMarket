module.exports = {
    port: process.env.PORT || 8080,
    files: ['.src/**/*.{html,htm,css,js}'],
    server:{
        baseDir: ["./src", "./build/contracts"]
    }
};