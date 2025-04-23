import React from 'react';
import '../styles/cardCourse.css';

export default function CourseCard({ data, color }) {
  const {
    courseName = "",
    courseCode = "",
    section = "",
    room = "",
    startTime = "",
    endTime = ""
  } = data;

  return (
    <div className="card">
      <div className="cardSideBar" style={{ backgroundColor: color }} />
      <div className="cardContent">
        <div className="courseInfo">
          <h3 className="courseName">{courseName}</h3>
          <div className="locationInfo">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 3.05a7 7 0 119.9 9.9l-4.95 4.95-4.95-4.95a7 7 0 010-9.9zM10 9a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="roomText">{courseCode} - {section}</span>
          </div>
        </div>
        <div className="timeInfo">
          <span className="timeText">{startTime}</span>
          <span className="timeText">{endTime}</span>
        </div>
      </div>
    </div>
  );
}