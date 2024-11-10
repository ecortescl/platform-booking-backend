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
                let messages = []
                let prevId = 0
                let idToDelete = []
                let _idToDelete = []
                for (const row of rows) {
                    if (prevId != row.senderId && prevId != 0) {

                        let cli = undefined
                        try {
                            cli = await User.finOne({
                                attributes: ['names', 'surnames'],
                                where: { id: prevId }
                            });

                            clients.push({
                                id: prevId,
                                name: cli.name + ' ' + cli.surnames,
                                messages: messages
                            })

                            idToDelete = idToDelete.concat(_idToDelete);
                        } catch (err) {

                        } finally {
                            messages = []
                            _idToDelete = []
                        }
                    }

                    messages.push(row.msg)
                    _idToDelete.push(row.id)
                    prevId = row.senderId
                }

                //Se envían los datos al usuario que se une
                let sendFlag = false;
                try {
                    ws.send(JSON.stringify({
                        type: 'join',
                        data: clients
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
                            data: {
                                senderId: data.senderId,
                                receiverId: data.receiverId,
                                message: data.message
                            }
                        }));
                    } catch (err) {
                        //Sí hay un error de conexión y el socket está cerrado se guarda el mensaje en BBDD
                        if (socketMsg.readyState === WebSocket.CLOSING || socketMsg.readyState === WebSocket.CLOSED) {
                            const stmt = db.prepare('insert into message (senderId, receiverId, msg) values (?, ?, ?');
                            stmt.run(data.senderId, data.receiverId, data.message);
                            stmt.finalize();
                        }
                    }
                } else {
                    //Si el usuario a recibir el mensaje no está conectado, se guarda el mensaje en BBDD
                    const stmt = db.prepare('insert into message (senderId, receiverId, msg) values (?, ?, ?');
                    stmt.run(data.senderId, data.receiverId, data.message);
                    stmt.finalize();
                }

                break;

            case 'disconnect':
                //Se cierra el socket y se elimina el socket de la lista de desconectados
                const socketToDis = sokcets.get(data.id);
                socketToDis.close();
                sockets.delete(data.id);
                break;
        }
    })
}

module.exports = handleConnection;