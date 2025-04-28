const { selectArticleId} = require("../models/article_id.model.js")

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