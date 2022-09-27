import React from "react";
import "./todo.css";

const Home = () => {
  return (
    <div className="homepage__container">
      <form className="todoapp__inputbox">
        {/* 아이템 내용 입력 input */}
        <input
          type="text"
          name="todoItem"
          placeholder="할 일을 입력해주세요"
          className="todoapp__inputbox-inp"
        />
        {/* 입력 후 아이템 추가 버튼 */}
        <button type="submit" className="todoapp__inputbox-add-btn">
          추가
        </button>
      </form>

      <div className="todoapp__list">
        <p className="todoapp__list-tit">할 일</p>

        <ul className="todoapp__list-ul">
          <li className="todoapp__item">
            {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
            <input type="checkbox" className="todoapp__item-checkbox" />
            <span className="todoapp__item-ctx" type="text">
              공부하기
            </span>
            <p> </p>
            <button type="button" className="todoapp__item-edit-btn">
              ✏
            </button>

            {/* 삭제 버튼 */}
            <button type="button" className="todoapp__item-delete-btn">
              🗑
            </button>
          </li>
        </ul>
        <p className="todoapp__list-tit">완료 목록</p>

        <ul className="todoapp__list-ul">
          <li className="todoapp__item">
            {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
            <input type="checkbox" className="todoapp__item-checkbox" />
            <span className="todoapp__item-ctx" type="text">
              공부하기
            </span>
            <p> </p>
            <button type="button" className="todoapp__item-edit-btn">
              ✏
            </button>

            {/* 삭제 버튼 */}
            <button type="button" className="todoapp__item-delete-btn">
              🗑
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
