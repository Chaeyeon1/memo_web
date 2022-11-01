import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import MainPage from "./components/views/MainPage/MainPage";
import Auth from "./hoc/auth";

function App() {
  //null => 모두, true => 로그인한 유저만, false => 로그인한 유저제외
  // -> 로그아웃 버튼이 없어서 임시로 설정함
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthMainPage = Auth(MainPage, true);
  const AuthRegisterPage = Auth(RegisterPage, null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/main" element={<AuthMainPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
