import React, { useEffect, useRef, useState } from "react";
import "./todo.css";
import {addtolist} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'

function InputBox(props, date) {
  const [Text, setText] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const onChangeInput = (event) => {
    setText(event.currentTarget.value); // 현재 적혀져있는 값을 state에 넣음
  };

  const onPressSubmitButton = (event) => {
    event.preventDefault();

    if(Text.trim() !== "") { // 공백이 아닐때만 실행
      props.refreshFunction(Text.trim()); // 추가 버튼을 누르면 props에 Text가 전해짐 + 앞뒤 공백제거
      setText(""); // input의 값을 초기화 시킴
    }

    inputRef.current.focus(); // 커서가 그쪽으로 감
  };

  useEffect(() => {
    // console.log("props.date :" , props.date);

    let body = {
      //date 추가 예정
      todolist : props.todoList,
      date : props.date,
      input_true : props.todoList.length === 0 ? false : true
    }
    
    dispatch(addtolist(body))
    .then(response => {
        if(props.todoList.length === 0) {
            console.log(response.payload)
            console.log(props.date)
        }   
    })

  }, [dispatch, props.todoList]);

  return (
    <form onSubmit={onPressSubmitButton} className="todo_inputBox">
      <div className="todoapp__inputbox">
        {/* 아이템 내용 입력 input */}
        <input
          type="text"
          name="todoItem"
          placeholder="할 일을 입력해주세요"
          className="todoapp__inputbox-inp"
          value={Text}
          date={date}
          ref={inputRef}
          onChange={onChangeInput}
        />

        {/* 입력 후 아이템 추가 버튼 */}
        <button
          type="submit"
          className="todoapp__inputbox-add-btn"
        >
          추가
        </button>
      </div>
    </form>
  );
}

export default InputBox;
