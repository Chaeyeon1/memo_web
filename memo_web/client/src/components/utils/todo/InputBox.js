import React, { useEffect, useRef, useState } from "react";
import "./todo.css";

function InputBox(props) {
  const [Text, setText] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (event) => {
    setText(event.currentTarget.value); // 현재 적혀져있는 값을 state에 넣음
  };

  const addHandler = () => {
    props.refreshFunction(Text); // 추가 버튼을 누르면 props에 Text가 전해짐
    setText(""); // input의 값을 초기화 시킴
    inputRef.current.focus(); // 커서가 그쪽으로 감
  };

  useEffect(() => {
    console.log(props.todoList);
  }, [props.todoList]);

  return (
    <div className="todoapp__inputbox">
      {/* 아이템 내용 입력 input */}
      <input
        type="text"
        name="todoItem"
        placeholder="할 일을 입력해주세요"
        className="todoapp__inputbox-inp"
        value={Text}
        ref={inputRef}
        onChange={onChangeInput}
      />

      {/* 입력 후 아이템 추가 버튼 */}
      <button
        type="submit"
        className="todoapp__inputbox-add-btn"
        onClick={addHandler}
      >
        추가
      </button>
    </div>
  );
}

export default InputBox;
