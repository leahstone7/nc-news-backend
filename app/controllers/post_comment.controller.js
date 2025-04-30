const { insertComment } = require("../models/post_comment.model.js")

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