const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    outputDir: 'build',
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ]
    }
}