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

//login
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
        .json({
          success : true,
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
    id:req.user.id,
    name : req.user.name,
    isAuth : true,
    // 잠시 주석으로 변경함
    // isAdmin : req.user.role === 0 ? false : true,
    // role : req.user.role
  })
})

// todolist
app.post("/api/main", auth, (req, res) => {
  
  let today = new Date(req.body.date);
  today = today.toLocaleDateString();
  // console.log(req.body.todolist , req.body.date, today);
  // 후에 캘린더에서 선택한 일자로 변경할 것, today -> req.body.date
  
  User.findOne({_id : req.user._id},
    (err, userInfo) => {        
        let select_date = false;
        let user_todo = []
        let user_date = ""

        // 해당 user에게 선택한 일자의 todolist가 있는지 확인
        userInfo.todolist.forEach((item) => {
            if(item.date === today) {
              select_date = true;
              user_todo = item.todo
              user_date = item.date
            }
        })

        if(!req.body.input_true) { // 현재 입력이 없고 선택한 일자에 todolist가 있다면
          if(select_date) {
            res.status(200).json({
              date : user_date,
              todolist : user_todo, 
            })
          }
        }
        else { // 현재 입력이 있고 선택한 일자에 todolist가 있다면 -> 일자 찾아서 todo update
          if(select_date) {
            User.findOneAndUpdate(
                {_id:req.user._id, "todolist.date": today},
                { $set: { "todolist.$.todo" : req.body.todolist } },
                // 캘린더를 누르고 해당 일자의 todo를 가져왔기 때문에 현재 todo는 모두 변경했음 -> 추후 변경 가능

                {new : true},
                (err,userInfo) => {
                    if(err) return res.status(400).json({success : false, err})
                    userInfo.todolist.forEach((item) => {if(item.date === today) {user_todo = item.todo; user_date = item.date }})
                    res.status(200).json({
                      date : user_date,
                      todolist :  user_todo, 
                    }) // 해당 일자의 todo와 일자만 return
                }
            )
          }
          // 현재 입력이 있고 선택한 일자에 todolist가 없다면 -> 일자와 함께 todo update
          else {
              User.findOneAndUpdate(
                {_id:req.user._id},
                {$push : {
                      todolist : {
                            date : today,
                            todo : req.body.todolist
                        }}
                },
                {new : true},
                (err,userInfo) => {
                    if(err) return res.status(400).json({success : false, err})
                    userInfo.todolist.forEach((item) => {if(item.date === today) {user_todo = item.todo; user_date = item.date }})
                    res.status(200).json({
                      date : user_date,
                      todolist :  user_todo, 
                    })
                }
            )
          }
        }
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
