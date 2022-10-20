import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Id, setId] = useState("")
  const [Password, setPassword] = useState("")

  const onIdHandler = (event) => {
    setId(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }
    
  const loginHandler = (event) => {
    event.preventDefault();

    let body = {
      id : Id,
      password : Password
    }

    dispatch(loginUser(body))
            .then(response => {
              //console.log(response)
                if(response.payload.login) {
                    navigate('/main')
                } else {
                    alert('login Error')
                }
            })
    //navigate("/main");
  };

  const registerHandler = () => {
    navigate("/register");
  };

  return (
    <div>
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

      <script src="https://use.typekit.net/ayg4pcz.js"></script>
      {/* <script>try{Typekit.load({ async: true });}catch(e){}</script> */}

      <div className="container">
        <h1 className="welcome text-center">Welcome to Memo Web</h1>
        <div className="card card-container">
          <h2 className="login_title text-center">로그인</h2>

          <form className="form-signin">
            <span id="reauth-email" className="reauth-email"></span>
            <p className="input_title">Id</p>
            <input
              type="text"
              id="id"
              className="login_box"
              placeholder="Id"
              value={Id}
              onChange={onIdHandler}
              required
              // autofocus
            />
            <p className="input_title">Password</p>
            <input
              type="password"
              id="password"
              className="login_box"
              placeholder="Password"
              value={Password}
              onChange ={onPasswordHandler}
              required
            />
            <div id="remember" className="checkbox">
              <label></label>
            </div>
            <button
              className="btn btn-lg btn-primary"
              type="submit"
              onClick={loginHandler}
            >
              로그인
            </button>

            <br />

            <Link
              to="register"
              style={{ color: "white", textDecoration: "none" }}
            >
              <button
                className="btn btn-lg btn-primary"
                type="submit"
                onClick={registerHandler}
              >
                회원가입
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
