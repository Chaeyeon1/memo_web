import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoItemList = ({ title, todoList, setTodoList, checkedList }) => (
  <div className="todoapp__list">
    {/* props로 부터 title 값을 전달 받음 */}
    <p className="todoapp__list-tit">{title}</p>

    <ul className="todoapp__list-ul">
      {todoList && // todoList가 있을때만 출력
        todoList.map((todoItem, index) => {
          if (todoItem.deleted) return null;
          // checkedList 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력
          if (checkedList !== todoItem.checked) return null;

          return (
            // map을 이용하여 ToDoItem을 출력
            <ToDoItem
              key={index}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          );
        })}
    </ul>
  </div>
);

export default ToDoItemList;
