import React from "react";
import "../LandingPage/LandingPage";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const registerHandler = () => {
    navigate("/");
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

      <div class="container">
        <h1 class="welcome text-center">Welcome to Memo Web</h1>
        <div class="card card-container">
          <h2 class="login_title text-center">회원가입</h2>

          <form class="form-signin">
            <span id="reauth-email" class="reauth-email"></span>
            <p class="input_title">이름</p>
            <input
              type="text"
              id="name"
              class="login_box"
              placeholder="Name"
              required
              autofocus
            />
            <p class="input_title">아이디</p>
            <input
              type="text"
              id="id"
              class="login_box"
              placeholder="Id"
              required
              autofocus
            />
            <p class="input_title">비밀번호</p>
            <input
              type="password"
              id="password"
              class="login_box"
              placeholder="password"
              required
            />
            <p class="input_title">비밀번호 확인</p>
            <input
              type="password"
              id="inputPassword"
              class="login_box"
              placeholder="password check"
              required
            />
            <div id="remember" class="checkbox">
              <label></label>
            </div>
            <button
              class="btn btn-lg btn-primary"
              type="submit"
              onClick={registerHandler}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
