const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true, unique : true},
    email: { type: String, required: true, unique : true},
    pw: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema);
