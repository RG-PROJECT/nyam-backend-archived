const mongoose = require('mongoose')

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    status: { type: String, required: true }
})

module.exports = mongoose.model('Member', memberSchema)