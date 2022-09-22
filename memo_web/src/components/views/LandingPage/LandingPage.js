import React from "react";
import "./LandingPage.css";

function LandingPage() {
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
        <h1 class="welcome text-center">Welcome to Ice Code</h1>
        <div class="card card-container">
          <h2 class="login_title text-center">Login</h2>

          <form class="form-signin">
            <span id="reauth-email" class="reauth-email"></span>
            <p class="input_title">Email</p>
            <input
              type="text"
              id="inputEmail"
              class="login_box"
              placeholder="user01@IceCode.com"
              required
              autofocus
            />
            <p class="input_title">Password</p>
            <input
              type="password"
              id="inputPassword"
              class="login_box"
              placeholder="******"
              required
            />
            <div id="remember" class="checkbox">
              <label></label>
            </div>
            <button class="btn btn-lg btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
