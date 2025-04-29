import React from "react";
import CourseCard from "./cardCourse.jsx";
import { dayColors, daysOrder } from "../utils/scheduleConstants.js";
import { styles } from "../styles/componets/scheduleListStyle.js";

const ScheduleListView = ({ currentDay, groupedByDay }) => {
  return (
    <div style={styles.scheduleContainer}>
      {daysOrder.map((day) => (
        <div key={day} style={styles.dayRow}>
          <div style={styles.dayLabelContainer}>
            <div style={styles.dayLabel}>{day}</div>
          </div>

          <div style={styles.dayCircleWrapper}>
            <div style={styles.verticalLine} />
            <div
              style={{
                ...styles.dayCircle,
                backgroundColor: dayColors[day],
                boxShadow:
                  day === currentDay ? "0 0 8px 2px white" : "none",
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>

          <div
            style={{
              ...styles.dayCoursesContainer,
              backgroundColor:
                groupedByDay[day].length > 0
                  ? "rgba(255, 255, 255, 0.85)"
                  : "rgba(255, 255, 255, 0.17)",
              border:
                groupedByDay[day].length > 0
                  ? "none"
                  : "2px solid rgba(255, 255, 255, 0.01)",
            }}
          >
            <div style={styles.coursesList}>
              {groupedByDay[day].length > 0 ? (
                groupedByDay[day].map((course, index) => (
                  <div
                    key={`${course.courseCode}-${course.section}-${index}`}
                    style={styles.cardWrapper}
                  >
                    <CourseCard data={course} color={dayColors[day]} />
                  </div>
                ))
              ) : (
                <div style={styles.emptyDaySlot} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleListView;