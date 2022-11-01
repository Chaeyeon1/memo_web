const { User } = require('../models/User');
const moment = require('moment');

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;
    const tokenExp = req.cookies.x_authExp;

    var now = moment().valueOf();
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true})

        if (tokenExp < now) return res.json({isAuth: false, error: true})

        req.tokenExp = tokenExp;
        req.token = token
        req.user = user

        next()
    })
}

module.exports = { auth };