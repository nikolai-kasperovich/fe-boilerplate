module.exports = {
    plugins: [
        require('postcss-preset-env'),
        require('postcss-animation'),
        require('postcss-size'),
        require('autoprefixer'),
        require('cssnano')
    ]
}