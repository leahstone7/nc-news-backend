const { selectArticleId, selectArticles, updateVotes } = require("../models/articles.model.js")

exports.getArticleId = (req, res, next) => {
    const { article_id } = req.params
    
    if(isNaN(article_id)){
        return next({status: 400, msg: "Bad request"})
    }
    
    return selectArticleId(article_id)
    .then((result) => {
        res.status(200).send({article: result})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((result) => {
        res.status(200).send({articles: result})
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchArticles = (req, res, next) => {
    const { article_id} = req.params
    const { newVote } = req.body
    
    if(isNaN(article_id)){
        return next({status: 400, msg: "Bad request"})
    }

    updateVotes(article_id, newVote)
    .then((votes) => {
        res.status(200).send({article: votes})
    })
    .catch((err) => {
        next(err)
    })
}