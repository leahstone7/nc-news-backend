const { selectTopics } = require("../models/topics.model.js")

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((result) => {
        console.log(result, "<<<<<<<")
        res.status(200).send({topics: result})
    })
    .catch((err) => {
        next(err)
    })
}