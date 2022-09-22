const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        unique : 1,
        maxlength : 50
    },
    password : {
        type : String,
        minlength : 5
    },
    role : {
        type : Number,
        default : 0
    },
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})
const User = mongoose.model('User', userSchema)

module.exports = {User}