const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: { type: String, required: true },
    text: { type: String, required: true }
})

module.exports = mongoose.model('Comment', commentSchema)