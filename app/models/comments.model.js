const db = require("../../db/connection")

exports.selectAllArticleComments = (articleId) => {
    return db
    .query(`SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1
    ORDER BY created_at DESC`, [articleId])
    .then((result) => {
        return result.rows
    })
    }

exports.insertComment = (article_id, newComment) => {
    const { username, body } = newComment
    return db
    .query(`INSERT INTO comments (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING *`,
    [article_id, username, body])
    .then((result) => {
        return result.rows[0]
    })
}
