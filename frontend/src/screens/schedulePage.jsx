import React, { useState } from 'react';
import Headbar from '../components/headbar.jsx';
import background from '../assets/backgroundSchedule.png';
import CourseCard from '../components/cardCourse.jsx';
import ButtonAcademicYear from '../components/buttonAcademicYear.jsx';
import { dayColors, daysOrder } from '../utils/scheduleConstants.js';
import { useScheduleData } from '../services/scheduleApi.jsx';
import { styles } from '../styles/scheduleStyle.js';

export default function SchedulePage() {
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear] = useState(currentYear);
  const [semester, setSemester] = useState(1);

  const { schedule, loading, error, currentDay, groupedByDay } = useScheduleData(academicYear, semester);

  const handleYearChange = (change) => {
    setAcademicYear(prev => prev + change);
  };

  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${background})` }}>
      <Headbar title="Schedule" />
      <div style={{ height: '30px'}} />
      <div style={{justifyContent: 'center', display: 'flex'}}>
        <ButtonAcademicYear
          academicYear={academicYear}
          semester={semester}
          onYearChange={handleYearChange}
          onSemesterChange={handleSemesterChange}
        />
      </div>
      <div style={{ height: '30px'}} />
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={styles.scheduleContainer}>
            {daysOrder.map(day => (
              <div key={day} style={styles.dayRow}>
                <div style={styles.dayLabelContainer}>
                  <div style={styles.dayLabel}>{day}</div>
                </div>
                
                <div style={styles.dayCircleWrapper}>
                  <div style={styles.verticalLine} />
                  <div style={{
                    ...styles.dayCircle,
                    backgroundColor: dayColors[day],
                    boxShadow: day === currentDay ? '0 0 8px 2px white' : 'none',
                    position: 'relative',
                    zIndex: 1,
                  }} />
                </div>
                
                <div style={{
                  ...styles.dayCoursesContainer,
                  backgroundColor: groupedByDay[day].length > 0 
                    ? 'rgba(255, 255, 255, 0.85)' 
                    : 'rgba(255, 255, 255, 0.17)', 
                  border: groupedByDay[day].length > 0 
                    ? 'none' 
                    : '2px solid rgba(255, 255, 255, 0.01)',
                }}>
                  <div style={styles.coursesList}>
                    {groupedByDay[day].length > 0 ? (
                      groupedByDay[day].map((course, index) => (
                        <div key={`${course.courseCode}-${course.section}-${index}`} style={styles.cardWrapper}>
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
        </div>
      </div>
    </div>
  );
}