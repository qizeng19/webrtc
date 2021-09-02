const isProd = process.env.NODE_ENV == 'production'
const fs = require('fs')
const path = require('path')
module.exports = {
    plugins: [
        {
            plugin: 'html-webpack-plugin',
            option: (() => {
                let loading = {
                    html: fs.readFileSync(path.join(__dirname, './public/loading.html')),
                    css: '<style>' + fs.readFileSync(path.join(__dirname, './public/loading.css')) + '</style>'
                }
                return {
                    template: path.resolve(__dirname, `./public/${isProd ? 'index.html' : 'index.dev.html'}`),
                    title: process.env.SITE_TITLE,
                    loading
                }
            })()
        }
    ]
}