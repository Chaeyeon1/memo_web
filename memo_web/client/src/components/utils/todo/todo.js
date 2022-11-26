import React, { useState, useRef } from "react";
import "./todo.css";
import InputBox from "./InputBox";
import ToDoItemList from "./ToDoItemList";
import Calendar from "../calender/Calendar";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const nextId = useRef(4);
  
  // 캘린더 날짜
  const [date, setDate] = useState(new Date());
  const getDate = (date) => {
    setDate(date);
  };

  const updateText = (newText) => {
    const todo = {
      // userid : user.userData.id,
      id: nextId.current,
      text: newText,
      // date: date.toLocaleDateString(),
      checked: false,
      // deleted: false,
    };

    setTodoList([...todoList, todo]);
    nextId.current++;
  };

  return (
    <div className="homepage__container">
      <Calendar 
        date={date} 
        getDate={getDate}  
      />

      <br/>
      
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox 
        todoList={todoList} 
        date={date}
        refreshFunction={updateText} 
      />

      <ToDoItemList
        title={"할 일"}
        todoList={todoList}
        date={date}
        setTodoList={setTodoList}
        checkedList={false}
      />

      <ToDoItemList
        title={"완료한 항목"}
        todoList={todoList}
        date={date}
        setTodoList={setTodoList}
        checkedList={true}
      />
      {/* {console.log('todo.js',date.toLocaleDateString())} */}
    </div>
  );
};

export default Todo;
