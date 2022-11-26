import React, { useEffect, useRef, useState } from "react";
import "./todo.css";
import {addtolist} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'

function InputBox(props) {
  const [Text, setText] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const mounted = useRef(false)

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
    if (!mounted.current) { //해당 useEffect는 마운트때 실행 x
      mounted.current = true
    }
    else {
      let body = {
        todolist : props.todoList,
        date : props.date.toLocaleDateString(),
        update : true,
        deleted : props.todoList.length === 0 ? true : false //delete로 인해 todolist에 아무것도 없을 떄
      }
      
      dispatch(addtolist(body))
      .then(response => {
            console.log('데이터 업데이트 : ', response.payload)
      })
    }

  }, [dispatch, props.todoList]); //props.date 넣지 않고 분리함 (warning 무시)
  
  useEffect(() => {
    let body = {
      date : props.date.toLocaleDateString(),
      update : false,
    }
    
    dispatch(addtolist(body))
    .then(response => {
          console.log('데이터 가져오기 : ', response.payload)
    })

  }, [dispatch, props.date]);

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
          date={props.date}
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
