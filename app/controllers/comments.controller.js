const { selectAllArticleComments, insertComment, deleteSpecifiedCommentId } = require("../models/comments.model.js")

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

exports.postComments = (req, res, next) => {
    const { article_id } = req.params
    const { username, body } = req.body

    if(!body){
        return res.status(400).send({msg: "missing comment body"})
        
    }
    insertComment(article_id, {username, body})
    .then((comment) => {
        res.status(201).send({comment})
})  .catch((err) => {
         next(err)
})
}

exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params
    
    if(isNaN(comment_id)){
        return next({status: 400, msg: "Bad request"})
    }

    deleteSpecifiedCommentId(comment_id)
    .then((result) => {
        if(!result) {
            return next({status: 404, msg: "Not found"})
        }
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}