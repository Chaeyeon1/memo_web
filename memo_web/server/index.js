const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require("./middleware/auth");
const {User} = require("./models/User");
const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.post('/register', (req, res) => {
    const user = new User(req.body)
  
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
app.post('/', (req, res) => {
    User.findOne({name:req.body.name}, (err, user) => {
      if(!user) {
        return res.json({
          loginSuccess : false,
          message : "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }

    user.comparePassword(req.body.password, (err,isMatch) => {
      if(!isMatch)
      return res.json({loginSuccess : false, message : "비밀번호가 틀림"})
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err);

        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess : true, userId : user._id})
      })
    })
  })
})

// role 0 : 일반 유저, 그 외는 관리자
app.get('/auth',auth,(req, res)=> {
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    name : req.user.name,
    role : req.user.role
  })
})

app.get('/logout',auth,(req, res)=> {
  User.findOneAndUpdate({_id : req.user._id},{token : ""},(err,user) => {
      if(err) return res.json({success : false, err});
      return res.status(200).send({
        success : true
      })
  })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});