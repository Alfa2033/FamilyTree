const sql = require('mssql')
const uuid = require('uuid');
const config = require('./Config')
const express = require('express')
const Response = require('./Response')
const ServerConstants = require('../constants/ServerConstants')
const StoreProcedures = require('../constants/StoreProcedures')

const app = express()
module.exports = {
    sql,
    app,
    uuid,
    express,
    Response,
    ServerConstants,
    StoreProcedures,
    URL_WEB_APP: config.URL_WEB_APP,
    SERVER_PORT: config.SERVER_PORT
}