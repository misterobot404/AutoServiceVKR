const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    outputDir: 'docs',
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ]
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/AutoServiceVKR/docs/'
        : '/'
}