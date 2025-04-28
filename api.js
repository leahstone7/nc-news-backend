const express = require("express")
const app = express()
const db = require("./db/connection")

const { getApi } = require('./app/controllers/api.controller.js')

app.get("/api", getApi)

module.exports = app