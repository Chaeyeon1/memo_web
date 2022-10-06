import React, { useState, useRef } from "react";
import "./todo.css";
import InputBox from "./InputBox";
import ToDoItemList from "./ToDoItemList";

const Home = () => {
  const [todoList, setTodoList] = useState([]);

  const nextId = useRef(4);

  const updateText = (newText) => {
    const todo = {
      id: nextId.current,
      text: newText,
      checked: false,
      deleted: false,
    };

    setTodoList([...todoList, todo]);
    nextId.current++;
  };

  return (
    <div className="homepage__container">
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox todoList={todoList} refreshFunction={updateText} />

      <ToDoItemList
        title={"할 일"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false}
      />

      <ToDoItemList
        title={"완료한 항목"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true}
      />
    </div>
  );
};

export default Home;
