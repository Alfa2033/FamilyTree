const config = require('../../dependencies/Config')

module.exports = {
    user: config.USER_SQL,
    password: config.PASSWORD,
    database: config.DATABASE,
    server: config.SERVER_SQL,
    port: Number(config.PORT_SQL),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}