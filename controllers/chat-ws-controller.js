function handleConnection(ws, rooms) {
    ws.on('message', (message) => {
        const data = JSON.parse(message)

        switch(data.type) {
            case 'join':
                if(data.role === 'professional') {
                    rooms.push({
                        socketPro: ws,
                        professional: {
                            id: data.body.id
                        }
                    });
                }else {
                    rooms.forEach((room) => {
                        if(room.professional.id === data.body.professionalId) {
                            room.socketCli = ws;
                            room.client = { id: data.body.id};
                            return
                        }
                    });
                }

            break;

            case 'message':

            break;
        }
    });


}

module.exports = handleConnection;