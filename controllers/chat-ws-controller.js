const User = require('../models/').User
const { getAllRows, db } = require('../util/SQLiteDB')

function handleConnection(ws, sockets) {
    ws.on('message', async (message) => {
        const data = JSON.parse(message)

        switch (data.type) {
            case 'join':
                // Se asocia el socket a la lista de sockets conectados
                sockets.set(data.id, ws);

                //Se obtienen los mensajes enviados al usuario que se une cuando estaba offline
                let rows = []
                try {
                    rows = await getAllRows('select id, senderId, msg from message where receiverId = ? ORDER BY senderId ASC', [data.id]);
                } catch (err) {
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Error con la BBDD Sqlite'
                    }))
                }

                //Se agrupan los mensajes por cada usuario, se estiman los mensajes a eliminar
                const clients = []
                let idToDelete = []
                for (const row of rows) {
                    const client = clients.find(client => client.id === row.senderId);

                    if (client) {
                        client.messages.push(row.msg)
                        idToDelete.push(row.id)
                    } else {
                        let cli = undefined
                        try {
                            cli = await User.findOne({
                                attributes: ['names', 'surnames'],
                                where: { id: row.senderId }
                            });

                            clients.push({
                                id: row.senderId,
                                name: cli.name + ' ' + cli.surnames,
                                messages: [row.msg]
                            })

                            idToDelete.push(row.id)
                        } catch (err) {
                            console.log(err.message)
                            ws.send(JSON.stringify({
                                type: 'error',
                                message: 'Error al obtener mensajes, intente unirse nuevamente'
                            }));
                            idToDelete = []
                            break;
                        }
                    }
                }

                //Se envían los datos al usuario que se une
                let sendFlag = false;
                try {
                    ws.send(JSON.stringify({
                        type: 'join',
                        message: 'Conexión establecida',
                        clients: clients
                    }))
                    sendFlag = true
                } catch (err) { }

                //Se eliminan los mensajes que se han enviado
                if (sendFlag) {
                    idToDelete.forEach(id => {
                        db.run('delete from message where id = ?', [id])
                    })
                }
                break;

            case 'message':
                //Se obtiene el socket asociado al usuario
                const socketMsg = sockets.get(data.receiverId);

                if (socketMsg) {
                    //Si el usuario que recibirá el mensaje está concetado se envía el mensaje
                    try {
                        socketMsg.send(JSON.stringify({
                            type: 'message',
                            senderId: data.senderId,
                            message: data.message
                        }));
                    } catch (err) {
                        //Sí hay un error de conexión y el socket está cerrado se guarda el mensaje en BBDD
                        if (socketMsg.readyState === WebSocket.CLOSING || socketMsg.readyState === WebSocket.CLOSED) {
                            const stmt = db.prepare('insert into message (senderId, receiverId, msg) values (?, ?, ?)');
                            stmt.run(data.senderId, data.receiverId, data.message);
                            stmt.finalize();
                        }
                    }
                } else {
                    //Si el usuario a recibir el mensaje no está conectado, se guarda el mensaje en BBDD
                    const stmt = db.prepare('insert into message (senderId, receiverId, msg) values (?, ?, ?)');
                    stmt.run(data.senderId, data.receiverId, data.message);
                    stmt.finalize();
                }

                break;

            case 'disconnect':
                //Se cierra el socket y se elimina el socket de la lista de desconectados
                try {
                    const socketToDis = sockets.get(data.id);
                    sockets.delete(data.id);
                    socketToDis.close();
                } catch (err) { }
                break;
        }
    })
}

module.exports = handleConnection;