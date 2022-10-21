import React, { useState } from "react";
import "../LandingPage/LandingPage";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Name, setName] = useState("");
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
    };

    let body = {
      name : Name,
      id : Id,
      password : Password

    };

    dispatch(registerUser(body))
      .then(response => {
      if(response.payload.success) {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
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
          <h2 className="login_title text-center">회원가입</h2>

          <form className="form-signin" onSubmit={onSubmitHandler}>
            <span id="reauth-email" className="reauth-email"></span>
            <p className="input_title">Name</p>
            <input
              type="text"
              id="name"
              className="login_box"
              placeholder="Name"
              value={Name}
              onChange={onNameHandler}
              required
            />
            <p className="input_title">Id</p>
            <input
              type="text"
              id="id"
              className="login_box"
              placeholder="Id"
              value={Id}
              onChange={onIdHandler}
              required
            />
            <p className="input_title">Password</p>
            <input
              type="password"
              id="password"
              className="login_box"
              placeholder="password"
              value={Password}
              onChange={onPasswordHandler}
              required
            />
            <p className="input_title">Confirm Password</p>
            <input
              type="password"
              id="confirmPassword"
              className="login_box"
              placeholder="password check"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
              required
            />
            <button
              className="btn btn-lg btn-primary"
              type="submit"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
