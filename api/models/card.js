const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    regdate: { type: Date, default: Date.now },
    contents: { type: mongoose.Schema.Types.ObjectId, ref: 'Contents', required: true },
    reactionList: [Schema.Types.ObjectId],
    commentList: [Schema.Types.ObjectId]
})

module.exports = mongoose.model('Card', cardSchema)