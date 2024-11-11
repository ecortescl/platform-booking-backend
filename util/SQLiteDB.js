const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('messagesDb.db', (err) => {
    if (err) console.error('Error al conectar con la base de datos SQLite.');
    else console.log('Conexión Establecida. (SQLite)')
})

db.run('CREATE TABLE IF NOT EXISTS message (id INTEGER PRIMARY KEY, senderId INTEGER, receiverId INTEGER, msg TEXT)', (err) => {
    if (err) console.log('Error al crear la tabla.');
    else console.log('Base de datos lista.')
});

function getAllRows(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    db,
    getAllRows
}