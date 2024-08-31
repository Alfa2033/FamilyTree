const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
    path: path.resolve(__dirname, `../${process.env.ENVIRONMENT}.env`)
})

module.exports = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_PORT: process.env.SERVER_PORT,
    URL_WEB_APP: process.env.URL_WEB_APP
}