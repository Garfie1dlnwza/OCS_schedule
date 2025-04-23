import React, { useState, useEffect } from 'react';
import Headbar from '../components/headbar.jsx';
import background from '../assets/backgroundSchedule.png';
import CourseCard from '../components/cardCourse.jsx';
import { dayColors, daysOrder } from '../utils/scheduleConstants.js';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current day for highlighting
  const getCurrentDay = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date().getDay();
    return days[today];
  };
  
  const currentDay = getCurrentDay();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/schedule`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ student_code: import.meta.env.VITE_STUDENT_ID }),
        });
        const result = await response.json();
        console.log('API Response:', result);

        if (!result?.data?.[0]?.schedules?.[0]?.details) {
          throw new Error('Invalid schedule data structure');
        }
        
        // Transform the schedule data
        const courseDetails = result.data[0].schedules[0].details.map(course => {
          console.log('Processing course:', course);
          
          if (!course.periods || course.periods.length === 0) {
            console.warn('Course has no periods:', course.subject_code);
            return null;
          }

          // Create separate entries for each period (each day the course occurs)
          const courseEntries = [];
          
          course.periods.forEach(period => {
            courseEntries.push({
              courseName: course.subject_name_en || 'Unknown Course',
              courseCode: course.subject_code,
              section: course.section_code,
              room: period.room_name_en || 'TBA',
              instructor: course.instructor?.map(i => 
                `${i.position_en || ''} ${i.first_name_en || ''} ${i.last_name_en || ''}`
              ).filter(Boolean).join(', ') || 'TBA',
              day: period.weekday || 'MON',
              startTime: period.time_start || 'TBA',
              endTime: period.time_end || 'TBA'
            });
          });
          
          return courseEntries;
        }).filter(Boolean);
        
        // Flatten the array of arrays
        const flattenedCourses = courseDetails.flat();
        
        console.log('Transformed data:', flattenedCourses);
        
        setSchedule(flattenedCourses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schedule:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Group courses by day
  const groupedByDay = {};
  daysOrder.forEach(day => {
    groupedByDay[day] = schedule
      .filter(course => course.day === day)
      .sort((a, b) => {
        // Sort by start time
        return a.startTime.localeCompare(b.startTime);
      });
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${background})` }}>
      <div>
        <Headbar title="Schedule" />
      </div>
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={styles.scheduleContainer}>
            {daysOrder.map(day => (
          <div key={day} style={styles.dayRow}>
          <div style={styles.dayLabelContainer}>
            <div style={styles.dayLabel}>{day}</div>
          </div>  
          
          <div style={styles.dayCircleWrapper}>
            {/* Vertical line that connects circles */}
            <div style={styles.verticalLine} />
            <div style={{
              ...styles.dayCircle,
              backgroundColor: dayColors[day],
              boxShadow: day === currentDay ? '0 0 8px 2px white' : 'none',
              position: 'relative', // Add this to keep circle above line
              zIndex: 1, // Add this to keep circle above line
            }} />
          </div>
                {/* Courses for this day */}
                <div style={styles.dayCoursesContainer}>
                  <div style={styles.coursesList}>
                    {groupedByDay[day].length > 0 ? (
                      groupedByDay[day].map((course, index) => (
                        <div key={index} style={styles.cardWrapper}>
                          <CourseCard data={course} color={dayColors[day]} />
                        </div>
                      ))
                    ) : (
                      <div style={styles.emptyDaySlot}></div>
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

const styles = {
  page: {
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80vw',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    borderColor: 'gray',
    borderWidth: '2px',
    borderStyle: 'solid', 
    boxShadow: '0 4px 30px rgba(255, 0, 0, 0.1)',
    padding: '20px',
    overflow: 'auto',
  },
  scheduleContainer: {
       display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '5px',
    position: 'relative', // Add this to contain absolute positioned line
    height: '100%',
  },
  dayRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    color: 'white',
  },

  dayCircle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  dayLabelContainer: {
    width: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dayLabel: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  dayCoursesContainer: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '12px',
    minHeight: '80px',
    padding: '10px',
    gap: '10px',
  },
  coursesList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 0 10px 10px',
  },
  cardWrapper: {
    width: '100%',
  },
  emptyDaySlot: {
    height: '80px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
  },
  dayCircleWrapper: {
    width: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%', 
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: '100%', // Add this
    zIndex: 0,
  },
};
