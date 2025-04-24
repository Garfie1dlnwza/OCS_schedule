// Utility functions for schedule processing

/**
 * Gets the current day abbreviation
 * @returns {string} Current day abbreviation (MON, TUE, etc.)
 */
export const getCurrentDay = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[new Date().getDay()];
  };
  
  /**
   * Formats instructor names from the API data
   * @param {Array} instructors - Array of instructor objects
   * @returns {string} Formatted instructor names
   */
  export const formatInstructorName = (instructors) => {
    if (!instructors || instructors.length === 0) return 'TBA';
    
    return instructors
      .map(i => `${i.position_en || ''} ${i.first_name_en || ''} ${i.last_name_en || ''}`)
      .filter(Boolean)
      .join(', ');
  };
  
  /**
   * Processes raw schedule data from API to more usable format
   * @param {Array} details - Raw schedule details from API
   * @returns {Array} Processed schedule data
   */
  export const processScheduleData = (details) => {
    // ใช้ Map เพื่อเก็บคอร์สที่มีการประมวลผลแล้ว
    const uniqueCourses = new Map();
    
    details.forEach(course => {
      if (!course.periods || course.periods.length === 0) {
        return;
      }
  
      // จัดกลุ่มคาบเรียนตามวัน
      const periodsByDay = {};
      
      course.periods.forEach(period => {
        const day = period.weekday || 'MON';
        if (!periodsByDay[day]) {
          periodsByDay[day] = [];
        }
        periodsByDay[day].push(period);
      });
      
      // สร้างรายการคอร์สสำหรับแต่ละวัน
      Object.entries(periodsByDay).forEach(([day, periods]) => {
        // เรียงคาบเรียนตามเวลาเริ่ม
        periods.sort((a, b) => (a.time_start || '').localeCompare(b.time_start || ''));
        
        // ใช้คาบเรียนแรกของวันนั้นเป็นตัวแทน
        const firstPeriod = periods[0];
        const courseKey = `${course.subject_code}-${course.section_code}-${day}`;
        
        // ตรวจสอบว่ามีข้อมูลนี้แล้วหรือไม่
        if (!uniqueCourses.has(courseKey)) {
          uniqueCourses.set(courseKey, {
            courseName: course.subject_name_en || 'Unknown Course',
            courseCode: course.subject_code,
            section: course.section_code,
            room: firstPeriod.room_name_en || 'TBA',
            instructor: formatInstructorName(course.instructor),
            day: day,
            startTime: firstPeriod.time_start || 'TBA',
            endTime: firstPeriod.time_end || 'TBA'
          });
        }
      });
    });
    
    // แปลงจาก Map เป็น Array
    return Array.from(uniqueCourses.values());
  };