const express = require("express")
const app = express()
const db = require("./db/connection")

const { getApi } = require('./app/controllers/api.controller.js')
const { getTopics } = require('./app/controllers/topics.controller.js')

app.use(express.json())

app.get("/api", getApi)

app.get("/api/topics", getTopics)

app.use((err, req, res, next) => {
    if(err.code === "22P02"){
        return res.status(400).send({msg: "Bad request"})
    } if(err.status && err.msg){
        return res.status(err.status).send({msg: err.msg})
    }
    res.status(500).send({msg: "Internal Server Error"})
    console.log(err)
})

app.use((req, res) => {
    res.status(404).send({msg: "Not found"})
})
module.exports = app