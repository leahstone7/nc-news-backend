const express = require("express")
const app = express()
const db = require("./db/connection")

const { getApi } = require('./app/controllers/api.controller.js')
const { getTopics } = require('./app/controllers/topics.controller.js')
const { getArticleId, getArticles, patchArticles } = require('./app/controllers/articles.controller.js')
const { getArticleComments, postComments } = require('./app/controllers/comments.controller.js')

app.use(express.json())

app.get("/api", getApi)

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticleId)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postComments)

app.patch("/api/articles/:article_id", patchArticles)

app.use((err, req, res, next) => {
    console.log("Error:", err)

    if(err.code === "22P02"){
        return res.status(400).send({msg: "Bad request"})
    } if (err.code === '23503') {
        res.status(404).send({msg: "Not found"})
    }
    if(err.status && err.msg){
        return res.status(err.status).send({msg: err.msg})
    }
    res.status(500).send({msg: "Internal Server Error"})
})

app.use((req, res) => {
    res.status(404).send({msg: "Not found"})
})
module.exports = app