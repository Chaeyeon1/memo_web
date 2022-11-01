const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {auth} = require("./middleware/auth");
const {User} = require("./models/User");
const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
//application/json
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.post('/api/register', (req, res) => {
    const user = new User(req.body);
  
    user.save((err, userInfo) => {
        if(err) {
            return res.json({
                success : false, 
                message : err 
            });
        }
        return res.status(200).json({
            success : true,
            message : "회원가입 완료"
        });
    });
});

// main login
app.post('/api', (req, res) => {
    User.findOne({id:req.body.id}, (err, user) => {
      if(!user) {
        return res.json({
          login : false,
          message : "제공된 아이디에 해당하는 유저가 없습니다."
        })
      }

    user.comparePassword(req.body.password, (err,isMatch) => {
      if(!isMatch)
      return res.json({login : false, message : "비밀번호가 틀렸습니다"})
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err);
        res.cookie("x_authExp", user.tokenExp);
        res.cookie("x_auth",user.token)
        .status(200)
        .json({login : true,
          user_Id : user._id,
          id : user.id,
          message : "로그인 완료"
        })
      })
    })
  })
})

// role 0 : 일반 유저, 그 외는 관리자
app.get('/api/auth',auth,(req, res)=> {
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    id:req.user.id,
    name : req.user.name,
    role : req.user.role
  })
})

app.get('/api/logout',auth,(req, res)=> {
  User.findOneAndUpdate({_id : req.user._id},{token : "", tokenExp: "" },(err,user) => {
      if(err) return res.json({success : false, err});
      return res.status(200).send({
        success : true
      })
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
