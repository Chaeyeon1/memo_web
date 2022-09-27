import React from 'react';
import Calender from '../../utils/Calendar';
import Todo from '../../utils/todo';
import "./MainPage.css";

function MainPage() {
  return (
      <div className="all">
          <div className="left"> { /* left */}
              <div className="calender"> { /* calender */}
                  <Calender />
              </div>
              <div className="todo"> { /* todo */}
                  <Todo />
              </div>
          </div>

          <div className="right"> {/* right */}
              
          </div>
      </div>
  )
}

export default MainPage;
