const express = require("express");

const AccountsRouter = require("./accounts/accounts-router")

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.use("*", (req, res) => {
    res.status(404).json({
        message: "Invalid Endpoint - Use /api/accounts"
    })
})

module.exports = server;
