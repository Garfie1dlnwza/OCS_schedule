import React, { useState } from 'react';
import Headbar from '../components/headbar';
import ButtonAcademicYear from '../components/buttonAcademicYear';
import { dayColors, daysOrder } from '../utils/scheduleConstants';
import { useScheduleData } from '../services/scheduleApi';
import background from '../assets/backgroundSchedule.png';
import {styles} from '../styles/courseTableStyle';

const TIME_SLOTS = Array.from({ length: 14 }, (_, i) => ({
  start: `${String(i + 8).padStart(2, '0')}:00`,
  end: `${String(i + 9).padStart(2, '0')}:00`
}));


export default function CourseTable() {
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());
  const [semester, setSemester] = useState(1);
  const { schedule, loading, error } = useScheduleData(academicYear, semester);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const handleYearChange = (change) => {
    setAcademicYear(prev => prev + change);
  };

  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
  };

  // Calculate duration in hours between two time strings (HH:MM format)
  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Calculate the total hours (including fractions for minutes)
    const startTotalHours = startHour + startMinute / 60;
    const endTotalHours = endHour + endMinute / 60;
    
    // Return the difference rounded to nearest whole number for colSpan
    return Math.max(1, Math.round(endTotalHours - startTotalHours));
  };

  // Process the schedule to track cell occupancy
  const processSchedule = () => {
    if (!schedule || !Array.isArray(schedule)) return { coursesByDay: {}, cellOccupancy: {} };
    
    const coursesByDay = {};
    const cellOccupancy = {};
    
    // Initialize data structures
    daysOrder.forEach(day => {
      coursesByDay[day] = [];
      cellOccupancy[day] = {};
      TIME_SLOTS.forEach(slot => {
        cellOccupancy[day][slot.start] = false;
      });
    });
    
    // Process each course
    schedule.forEach(course => {
      const duration = calculateDuration(course.startTime, course.endTime);
      const [startHour] = course.startTime.split(':').map(Number);
      
      // Add course info to the appropriate day
      if (coursesByDay[course.day]) {
        coursesByDay[course.day].push({
          ...course,
          duration
        });
        
        // Mark cells as occupied for the duration of this course
        for (let i = 0; i < duration; i++) {
          const hourToMark = startHour + i;
          if (hourToMark < 22) { // Don't go beyond our time grid
            const timeKey = `${String(hourToMark).padStart(2, '0')}:00`;
            cellOccupancy[course.day][timeKey] = true;
          }
        }
      }
    });
    
    return { coursesByDay, cellOccupancy };
  };

  // Find overlapping courses at a specific time slot
  const findOverlappingCourses = (day, timeSlot) => {
    if (!schedule || !Array.isArray(schedule)) return [];
    
    const [slotHour, slotMinute] = timeSlot.start.split(':').map(Number);
    
    return schedule.filter(course => {
      if (course.day !== day) return false;
      
      const [startHour, startMinute] = course.startTime.split(':').map(Number);
      const [endHour, endMinute] = course.endTime.split(':').map(Number);
      
      // Convert to total minutes for easier comparison
      const slotTimeInMinutes = slotHour * 60 + slotMinute;
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      
      // Course overlaps with this time slot if the slot time falls between course start and end
      return slotTimeInMinutes >= startTimeInMinutes && slotTimeInMinutes < endTimeInMinutes;
    });
  };

  // Render a single course block
  const renderCourseBlock = (course, day) => {
    const isHovered = hoveredCourse === `${day}-${course.courseCode}`;
    const color = dayColors[day];
    
    const courseBlockStyle = {
      ...styles.courseBlock,
      backgroundColor: `${color}50`,
      borderLeft: `6px solid ${color}`,
      ...(isHovered ? styles.courseBlockHover : {})
    };
    
    return (
      <div
        style={courseBlockStyle}
        onMouseEnter={() => setHoveredCourse(`${day}-${course.courseCode}`)}
        onMouseLeave={() => setHoveredCourse(null)}
      >
        <div>
          <div style={styles.courseName}>{course.courseName}</div>
          <div style={styles.courseCode}>{course.courseCode}</div>
          <div style={styles.timeText}>
            {course.startTime} - {course.endTime}
          </div>
        </div>
        <div style={styles.roomText}>Room: {course.room}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading your schedule...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorBox}>
          <h2 style={styles.errorTitle}>Error Loading Schedule</h2>
          <p style={styles.errorMessage}>{error}</p>
          <button 
            style={styles.errorButton}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { coursesByDay, cellOccupancy } = processSchedule();
  const pageStyle = {
    ...styles.page,
    backgroundImage: `url(${background})`
  };

  return (
    <div style={pageStyle}>
      <Headbar title="Course Table" />
      
      <div style={styles.yearSelectorContainer}>
        <ButtonAcademicYear
          academicYear={academicYear}
          semester={semester}
          onYearChange={handleYearChange}
          onSemesterChange={handleSemesterChange}
        />
      </div>
      
      <div style={styles.container}>
        <div style={styles.tableContainer}>
          <div className={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.cornerHeader}>
                  Day / Time
                </th>
                {TIME_SLOTS.map((timeSlot) => (
                  <th 
                    key={timeSlot.start} 
                    style={styles.timeHeader}
                  >
                    {timeSlot.start}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOrder.map(day => (
                <tr key={day}>
                  <td 
                    style={{
                      ...styles.dayHeader,
                      backgroundColor: dayColors[day]
                    }}
                  >
                    {day}
                  </td>
                  
                  {TIME_SLOTS.map((timeSlot, timeIndex) => {
                    // Get courses that start at this exact time slot
                    const coursesStartingHere = coursesByDay[day]?.filter(course => {
                      const [courseHour] = course.startTime.split(':').map(Number);
                      const [slotHour] = timeSlot.start.split(':').map(Number);
                      return courseHour === slotHour;
                    }) || [];
                    
                    // Check if this cell is already covered by a course that started earlier
                    const isCellOccupied = cellOccupancy[day]?.[timeSlot.start] || false;
                    
                    // If a previous course spans this cell or there are no courses starting here
                    if (isCellOccupied && coursesStartingHere.length === 0) {
                      return null; // Skip rendering this cell as it's spanned by another course
                    }
                    
                    // If there are courses starting here
                    if (coursesStartingHere.length > 0) {
                      // For now, just handle the first course (we'll add overlapping support later)
                      const course = coursesStartingHere[0];
                      
                      // Check for overlapping courses
                      const allCoursesAtThisTime = findOverlappingCourses(day, timeSlot);
                      const hasOverlap = allCoursesAtThisTime.length > 1;
                      
                      return (
                        <td 
                          key={`${day}-${timeSlot.start}`}
                          style={styles.timeCell}
                          colSpan={course.duration}
                        >
                          <div style={{ position: 'relative', height: '100%' }}>
                            {hasOverlap && (
                              <div style={styles.overlapIndicator}>
                                {allCoursesAtThisTime.length} courses
                              </div>
                            )}
                            {renderCourseBlock(course, day)}
                          </div>
                        </td>
                      );
                    }
                    
                    // Empty cell
                    return (
                      <td 
                        key={`${day}-${timeSlot.start}`}
                        style={styles.timeCell}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}