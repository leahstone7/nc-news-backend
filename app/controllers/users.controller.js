const { selectUsers } = require("../models/users.model.js")

exports.getUsers = (req, res, next) => {
    selectUsers()
    .then((result) => {
        res.status(200).send({users: result})
    })
    .catch((err) => {
        next(err)
    })
}