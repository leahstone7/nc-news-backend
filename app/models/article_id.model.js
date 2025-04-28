const db = require("../../db/connection")

exports.selectArticleId = (articleId) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: "Not found"})
        } else {
            return result.rows[0]
        }
    })
}