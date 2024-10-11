const express = require("express")
const cors = require("cors");
const { ALLOWED_HOSTS } = require("./config");
const userRouter = require('./routes/userRoutes')

const app = express();

app.use(express.json())

app.use(cors({
    origin: ALLOWED_HOSTS,
    credentials: true,
}))

app.use(userRouter);

module.exports = app;