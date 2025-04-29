const { selectAllArticleComments } = require("../models/article_id_comments.model.js")

exports.getArticleComments = (req, res, next) => {
    const { article_id } = req.params

    if(isNaN(article_id)){
        return next({status: 400, msg: "Bad request"})
    }

    return selectAllArticleComments(article_id)
    .then((result) => {
        res.status(200).send({comments: result})
    })
    .catch((err) => {
        next(err)
    })
}