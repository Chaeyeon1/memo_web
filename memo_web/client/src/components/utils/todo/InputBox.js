import React, { useEffect, useRef, useState } from "react";
import "./todo.css";
import {addtolist} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'

function InputBox(props) {
  const [Text, setText] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const onChangeInput = (event) => {
    setText(event.currentTarget.value); // 현재 적혀져있는 값을 state에 넣음
  };

  const addHandler = () => {
    if(Text.trim() !== "") { // 공백이 아닐때만 실행
      props.refreshFunction(Text.trim()); // 추가 버튼을 누르면 props에 Text가 전해짐 + 앞뒤 공백제거
      setText(""); // input의 값을 초기화 시킴
    }
    inputRef.current.focus(); // 커서가 그쪽으로 감
  };

  const OnKeyPress = (event) => { // Enter 누르면 버튼 기능 실행
    if (event.key === 'Enter') addHandler();
  };

  useEffect(() => {
    console.log(props.todoList);

    let body = {
      //date 추가 예정
      todolist : props.todoList,
      input_true : props.todoList.length === 0 ? false : true
    }
    dispatch(addtolist(body))
    .then(response => {
        if(props.todoList.length === 0) {
            console.log(response.payload)
        }   
    })

  }, [dispatch, props.todoList]);

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
        onKeyPress={OnKeyPress}
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
