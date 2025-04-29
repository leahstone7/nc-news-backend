const {selectArticles} = require("../models/articles.model.js")

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((result) => {
        res.status(200).send({articles: result})
    })
    .catch((err) => {
        next(err)
    })
}