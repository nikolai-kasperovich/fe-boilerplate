const fs = require('fs');

module.exports = {
    plugins: [
        require('postcss-preset-env'),
        require('postcss-animation'),
        require('postcss-size'),
        require('autoprefixer'),
        require('cssnano'),
        require('postcss-modules')({
            getJSON: function(cssFileName, json, outputFileName) {
                const path = require("path");
                const cssName = path.basename(cssFileName, ".pcss");
                const jsonFileName = path.resolve(__dirname, `${cssName}.json`);
                fs.writeFileSync(jsonFileName, JSON.stringify(json));
              }
        }),
    ]
}