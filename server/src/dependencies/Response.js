const utils = require('../utils/Utils')

class Response {
  constructor () {
    this.IsOk = false
    this.StatusCode = 200
    this.Content = utils.StringEmpty()
    this.MessageOperation = utils.StringEmpty()
  }

  set _MessageOperation (messageOperation) {
    this.MessageOperation = messageOperation
  }

  set _StatusCode (statusCode) {
    this.StatusCode = Number(statusCode)
  }

  set _IsOk (isOk) {
    this.IsOk = Boolean(isOk)
  }

  set _Content (content) {
    this.Content = content
  }

  get _Content () {
    return this.Content
  }

  get _IsOk () {
    return this.IsOk
  }

  get _StatusCode () {
    return this.StatusCode
  }

  get _MessageOperation () {
    return this.MessageOperation
  }
}

module.exports = Response