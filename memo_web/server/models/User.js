const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        maxlength : 50,
        required: [
            true, 
            "닉네임을 입력하세요."
        ]
    },
    id : {
        type : String,
        unique : true,
        trim : true,
        required: [
            true, 
            "아이디를 입력하세요."
        ],
        match: [
            /[a-z0-9_]{4,20}/,
            "아이디는 4 ~ 20자의 영문(소문자), 숫자, _ 조합으로 입력해야 합니다."
        ]
    },
    password : {
        type : String,
        required: [
            true,
            "비밀번호를 입력하세요"
        ],
        match: [
            /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,20}/,
            "비밀번호는 5 ~ 20자 영문(대소문자), 최소 1개의 숫자 혹은 특수 문자 조합으로 입력해야 합니다."
        ]
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
});

userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // console.log('user',user)
    // console.log('userSchema', userSchema)
    var token =  jwt.sign(user._id.toHexString(),'secret')
    // var oneHour = moment().add(1, 'hour').valueOf();
    // user.tokenExp = oneHour;
    
    // moment download 후 추후 넣을 예정

    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}