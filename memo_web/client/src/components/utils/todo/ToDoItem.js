import React, { useEffect, useState, useRef } from "react";
import "./todo.css";

function ToDoItem({ todoItem, todoList, setTodoList, date }) {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onChangeEditInput = (event) => {
    setNewText(event.target.value);
  };

  const onClickSubmitButton = (event) => {
    if( event.key ===  'Enter') {   // Enter 누르면 버튼 기능 실행
      const nextTodoList = todoList.map((item) => ({
        ...item,
        text: item.id === todoItem.id ? newText : item.text, // 새로운 아이템 내용을 넣어줌
      }));

      setTodoList(nextTodoList); // 새로운 리스트를 넣어줌

      setEdited(false); // 수정모드를 다시 읽기모드로 변경
    }
  };

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      checked: item.id === todoItem.id ? !item.checked : item.checked,
      // checkbox가 켜져있냐, 꺼져있냐에 따라서 checked의 값이 달라짐
    }));

    setTodoList(nextTodoList);
  };

  const onClickDeleteButton = () => {
    if (window.confirm("지우시겠습니까?")) {
      const nextTodoList = todoList.map((item) => ({
        ...item,
        deleted: item.id === todoItem.id ? true : item.deleted,
      }));

      setTodoList(nextTodoList);
    }
  };

  return (
    <li className="todoapp__item">
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
      <input
        type="checkbox"
        className="todoapp__item-checkbox"
        checked={todoItem.checked}
        onChange={onChangeCheckbox}
      />
      {/* 아이템 내용 */}
      {
        // 아이템 내용
        edited ? (
          <input
            type="text"
            value={newText}
            ref={editInputRef} // ref 로 DOM에 접근
            onChange={onChangeEditInput}
          />
        ) : (
          <span
            className={`todoapp__item-ctx ${
              todoItem.checked ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {todoItem.text}
          </span>
        )
      }
      {
        // 수정 버튼
        // 완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
        !todoItem.checked ? (
          edited ? (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickSubmitButton}
            >
              ✔
            </button>
          ) : (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickEditButton}
            >
              ✏
            </button>
          )
        ) : null
      }
      {/* 삭제 버튼 */}
      <button
        type="button"
        className="todoapp__item-delete-btn"
        onClick={onClickDeleteButton}
      >
        🗑
      </button>
    </li>
  );
}

export default ToDoItem;
