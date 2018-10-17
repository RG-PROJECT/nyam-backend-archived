const mongoose = require('mongoose')

const contentsSchema = mongoose.Schema({
    img: { type: String },
    text: { type: String, required: true }
})

module.exports = mongoose.model('Contents', contentsSchema)