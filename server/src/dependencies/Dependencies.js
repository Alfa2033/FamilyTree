const uuid = require('uuid');
const config = require('./Config')
const express = require('express')
const Response = require('./Response')
const ServerConstants = require('../constants/ServerConstants')

const app = express()
module.exports = {
    app,
    uuid,
    express,
    Response,
    ServerConstants,
    URL_WEB_APP: config.URL_WEB_APP,
    SERVER_PORT: config.SERVER_PORT
}