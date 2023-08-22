const net = require('net');

const md5 = require('md5');

class Socket {
    constructor(address, port, password) {
        this.address = address;
        this.port = port;
        this.password = md5(password);
        this.socket = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.socket = net.createConnection(this.port, this.address, () => {
                this.socket.write(this.password);
                resolve();
                this.socket.on('data', (data) => {
                    if (data.toString().includes('Authenticated')) {
                        if(data.toString().includes('0')) {
                            console.log('Wrong password!');
                            return rcon.close();
                        }
                        return this.socket.emit('Authenticated', data.toString());
                    }
                    if(!data.toString().startsWith('{')) {
                        return;
                    }
                    const json = JSON.parse(data.toString());
                    this.socket.emit(json.Command, json[json.Command])
                });
            });
        });
    }

    send(data) {
        return new Promise((resolve, reject) => {
            this.socket.write(data, () => {
                resolve();
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.socket.end(() => {
                resolve();
            });
        });
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }
}

module.exports = Socket;