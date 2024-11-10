const db = require("./util/SQLiteDB");

const stmt = db.prepare("insert into message (proId, cliId, msg) values (1, 1, 'Test')");
stmt.run()
stmt.finalize()

db.all('select * from message', [], (err, rows) => {
  rows.forEach((row) => {
    console.log(row)
  })
})