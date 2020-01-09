const fs = require('fs');

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-preset-env')({
            stage: 4,
            features: {
                'nesting-rules': true,
                'custom-selectors': true,
                'custom-properties': true,
                'custom-media-queries': true,
                'matches-pseudo-class': true,
                'not-pseudo-class': true,
            }
        }),
        require('postcss-size'),
        require('postcss-animation'),
        require('cssnano'),
        require('postcss-modules')({
            getJson: function(fileName, json, outputFileName) {
                const path = require('path');
                const styleName = path.basename(fileName, '.pcss');
                const jsonFileName = path.resolve(__dirname, `${styleName}.json`);
                fs.writeFileSync(jsonFileName, JSON.stringify(json));
            }
        }),
    ]
}