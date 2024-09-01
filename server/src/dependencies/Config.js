const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
    path: path.resolve(__dirname, `../${process.env.ENVIRONMENT}.env`)
})

module.exports = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_PORT: process.env.SERVER_PORT,
    URL_WEB_APP: process.env.URL_WEB_APP,
    USER_SQL: process.env.USER_SQL,
    PASSWORD: process.env.PASSWORD,
    SERVER_SQL: process.env.SERVER_SQL,
    DATABASE: process.env.DATABASE,
    SERVER_PORT: process.env.SERVER_PORT,
    PORT_SQL: process.env.PORT_SQL
}