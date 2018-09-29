const Server = require('./server.js')
const PORT = (process.env.PORT || 3000)
const app = Server.app()
const express = require('express');
// const app = express();

if (process.env.NODE_ENV !== 'production') {
    // const webpack = require('webpack')
    // const webpackDevMiddleware = require('webpack-dev-middleware')
    // const webpackHotMiddleware = require('webpack-hot-middleware')
    // const config = require('./webpack.dev.config.js')
    // const compiler = webpack(config)

    // app.use(webpackHotMiddleware(compiler))
    // app.use(webpackDevMiddleware(compiler, {
    //     noInfo: true,
    //     publicPath: config.output.publicPath
    // }))
}

app.listen(PORT, err => {
    console.log(err || `Server Listening on port ${PORT}`)
})