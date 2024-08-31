const Server = require('../dependencies/Server')
const { app, Response, ServerConstants } = require('../dependencies/Dependencies')

module.exports.StartServer = (portNumber) => {
    const server = new Server(portNumber);
    app.listen(server.port, () => {
        const response = new Response();
        response.Content = ServerConstants.SERVER_START_SUCCESSFUL,
        response.IsOk = true
        console.log(response)
    })
}