import React from "react";
import Todo from "../../utils/todo/todo";
import Slider from "../../utils/slider";
import "./MainPage.css";

function MainPage() {

  return (
    <div className="all">
      <div className="left">
        {" "}
        {/* left */}
        <div className="todo">
          {" "}
          {/* todo - 캘린더 & 투두리스트*/}
          <Todo/>
        </div>
        <div className="slider">
          {" "}
          {/* slider */}
          <Slider />
        </div>
      </div>
      <div className="right"> {/* right */}</div>
    </div>
  );
}

export default MainPage;
