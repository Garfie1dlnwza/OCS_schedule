import React from 'react';
import CourseCard from './cardCourse.jsx';

export default function DaySchedule({ day, courses, color }) {
  return (
    <div style={styles.daySchedule}>
      <div style={styles.dayLine}>
        {/* <div 
          style={{
            ...styles.dayMarker,
            backgroundColor: color
          }}
        /> */}
      </div>
      <div style={styles.dayContent}>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} style={styles.cardWrapper}>
              <CourseCard data={course} color={color} />
            </div>
          ))
        ) : (
          <div style={styles.emptyDaySlot}></div>
        )}
      </div>
    </div>
  );
}

const styles = {
  daySchedule: {
    display: 'flex',
    marginBottom: '10px',
  },
  dayLine: {
    width: '10px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  dayMarker: {
    width: '4px',
    height: '100%',
    borderRadius: '2px',
  },
  dayContent: {
    flex: 1,
    paddingLeft: '10px',
  },
  cardWrapper: {
    marginBottom: '8px',
  },
  emptyDaySlot: {
    height: '80px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    marginBottom: '8px',
  },
};