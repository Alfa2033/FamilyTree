class Server {
    constructor (port) {
        this.port = Number(port);
    }

    get _port() {
        return this._port;
    }
}

module.exports = Server;