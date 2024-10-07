const app = require("./app")
const { PORT } = require("./config")

async function main() {
    try {
        app.listen(PORT)
        console.log("Servidor iniciado.");
    }catch(error) {
        console.error(error);
    }
}

main();