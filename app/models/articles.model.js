const db = require("../../db/connection")
const { sort } = require("../../db/data/test-data/articles")

exports.selectArticles = (sort_by = "created_at", order = "desc") => {
    const allowedInputs = ["article_id", "author", "title", "topic", "created_at", "votes", "article_img_url"]
    const allowedOrders = ["desc", "asc"]

    if(!allowedInputs.includes(sort_by)){
       sort_by = "created_at"
       return Promise.reject({status: 400, msg: "Bad request"})
    }

    if(!allowedOrders.includes(order)){
        order = "desc"
    }

    let queryStr = `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.comment_id) :: INT AS comment_count FROM articles
    LEFT OUTER JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}`
    
    return db.query(queryStr)
    .then((result) => {
        return result.rows
    })
}

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

exports.updateVotes = (articleId, newVote) => {
    return db
    .query(`UPDATE articles 
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *`, [newVote, articleId])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: "Not found"})
        } else {
            return result.rows[0]
        }
    }
  
    )
}
