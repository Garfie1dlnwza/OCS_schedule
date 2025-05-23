import React, { useState, useEffect } from "react";
import { dayColors, daysOrder } from "../utils/scheduleConstants";
import { styles } from "../styles/componets/scheduleTableStyle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TIME_SLOTS = Array.from({ length: 14 }, (_, i) => ({
  start: `${String(i + 8).padStart(2, "0")}:00`,
  end: `${String(i + 9).padStart(2, "0")}:00`,
}));

const CourseTableView = ({ schedule }) => {
  const [hoveredCourse, setHoveredCourse] = useState(null);

  // Calculate duration in hours between two time strings (HH:MM format)
  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Calculate the total hours (including fractions for minutes)
    const startTotalHours = startHour + startMinute / 60;
    const endTotalHours = endHour + endMinute / 60;

    // Return the difference rounded to nearest whole number for colSpan
    return Math.max(1, Math.round(endTotalHours - startTotalHours));
  };

  // Process the schedule to track cell occupancy
  const processSchedule = () => {
    if (!schedule || !Array.isArray(schedule))
      return { coursesByDay: {}, cellOccupancy: {} };

    const coursesByDay = {};
    const cellOccupancy = {};

    // Initialize data structures
    daysOrder.forEach((day) => {
      coursesByDay[day] = [];
      cellOccupancy[day] = {};
      TIME_SLOTS.forEach((slot) => {
        cellOccupancy[day][slot.start] = false;
      });
    });

    // Process each course
    schedule.forEach((course) => {
      const duration = calculateDuration(course.startTime, course.endTime);
      const [startHour] = course.startTime.split(":").map(Number);

      // Add course info to the appropriate day
      if (coursesByDay[course.day]) {
        coursesByDay[course.day].push({
          ...course,
          duration,
        });

        // Mark cells as occupied for the duration of this course
        for (let i = 0; i < duration; i++) {
          const hourToMark = startHour + i;
          if (hourToMark < 22) {
            // Don't go beyond our time grid
            const timeKey = `${String(hourToMark).padStart(2, "0")}:00`;
            cellOccupancy[course.day][timeKey] = true;
          }
        }
      }
    });

    return { coursesByDay, cellOccupancy };
  };

  // Render a single course block
  const renderCourseBlock = (course, day) => {
    const isHovered = hoveredCourse === `${day}-${course.courseCode}`;
    const color = dayColors[day];

    const courseBlockStyle = {
      ...styles.courseBlock,
      backgroundColor: `${color}50`,
      borderLeft: `6px solid ${color}`,
      ...(isHovered
        ? {
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transform: "translateY(-2px)",
          }
        : {}),
    };

    return (
      <div
        key={`${day}-${course.courseCode}`}
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

// Optimized downloadTableAsPDF function
const downloadTableAsPDF = () => {
  const tableElement = document.getElementById("course-table");
  if (!tableElement) return;
  
  // Create loading indicator
  const loadingMessage = document.createElement('div');
  loadingMessage.style.position = 'fixed';
  loadingMessage.style.top = '50%';
  loadingMessage.style.left = '50%';
  loadingMessage.style.transform = 'translate(-50%, -50%)';
  loadingMessage.style.backgroundColor = 'rgba(0,0,0,0.7)';
  loadingMessage.style.color = 'white';
  loadingMessage.style.padding = '20px 30px';
  loadingMessage.style.borderRadius = '8px';
  loadingMessage.style.zIndex = '9999';
  loadingMessage.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  loadingMessage.textContent = 'กำลังสร้าง PDF กรุณารอสักครู่...';
  document.body.appendChild(loadingMessage);
  
  // Use setTimeout to allow UI update before heavy processing
  setTimeout(() => {
    // Create a temporary div with controlled dimensions
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '-9999px';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '1400px';
    
    // Clone the table and optimize for PDF
    const cloneTable = tableElement.cloneNode(true);
    
    // Add a title
    const titleDiv = document.createElement('div');
    titleDiv.style.textAlign = 'center';
    titleDiv.style.fontSize = '24px';
    titleDiv.style.fontWeight = 'bold';
    titleDiv.style.marginBottom = '15px';
    titleDiv.textContent = 'ตารางเรียน';
    
    // Optimize table styling
    const tableWrapper = cloneTable.querySelector('div');
    if (tableWrapper) {
      const table = tableWrapper.querySelector('table');
      if (table) {
        // Reset transformations
        table.style.transform = 'none';
        table.style.width = '100%';
        table.style.maxWidth = '100%';
        table.style.tableLayout = 'fixed';
        table.style.borderCollapse = 'collapse';
        table.style.border = '2px solid #ccc';
        
        // Optimize cells
        Array.from(table.querySelectorAll('th, td')).forEach(cell => {
          cell.style.fontSize = '12px';
          cell.style.padding = '4px';
          cell.style.border = '1px solid #ddd';
          cell.style.boxSizing = 'border-box';
          if (cell.colSpan > 1) {
            cell.style.textAlign = 'center';
          }
        });
        
        // Optimize course blocks
        Array.from(table.querySelectorAll('[style*="courseBlock"]')).forEach(course => {
          course.style.minHeight = '50px';
          course.style.fontSize = '12px';
          course.style.padding = '4px';
          course.style.boxShadow = 'none';
          course.style.transform = 'none';
        });
        
        // Optimize header row
        const headerRow = table.querySelector('thead tr');
        if (headerRow) {
          headerRow.style.backgroundColor = '#f5f5f5';
          
          Array.from(headerRow.querySelectorAll('th')).forEach(cell => {
            cell.style.fontWeight = 'bold';
            cell.style.textAlign = 'center';
          });
        }
        
        // Set fixed heights for rows
        Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
          row.style.height = '60px';
        });
      }
    }
    
    // Assemble the temp div
    tempDiv.appendChild(titleDiv);
    tempDiv.appendChild(cloneTable);
    document.body.appendChild(tempDiv);
    
    // Export configuration
    cloneTable.style.overflow = 'visible';
    cloneTable.style.backgroundColor = 'white';
    
    // Render with html2canvas - use lower scale for better performance
    html2canvas(tempDiv, {
      scale: 1.2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 1400,
      height: tempDiv.scrollHeight,
    }).then((canvas) => {
      try {
        // Create PDF with optimal settings
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a3", // Use A3 for better quality
        });
        
        const imgData = canvas.toDataURL("image/jpeg", 0.95); // Use JPEG for smaller file size
        
        // Calculate dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - 20; // 10mm margins on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add the image
        pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
        
        // Save the PDF
        pdf.save("course-schedule.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง");
      } finally {
        // Clean up
        document.body.removeChild(tempDiv);
        document.body.removeChild(loadingMessage);
      }
    }).catch(error => {
      console.error("Error capturing table:", error);
      alert("เกิดข้อผิดพลาดในการแคปเจอร์ตาราง กรุณาลองใหม่อีกครั้ง");
      document.body.removeChild(tempDiv);
      document.body.removeChild(loadingMessage);
    });
  }, 100); // Small delay to allow UI to update
};
 

  // แสดงผลเป็นตารางเสมอไม่ว่าจะเป็นขนาดหน้าจอใดก็ตาม
  const renderTableView = () => {
    const { coursesByDay, cellOccupancy } = processSchedule();

    return (
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.cornerHeader}>วัน/เวลา</th>
            {TIME_SLOTS.map((timeSlot) => (
              <th key={timeSlot.start} style={styles.timeHeader}>
                {timeSlot.start}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOrder.map((day) => (
            <tr key={day}>
              <td
                style={{
                  ...styles.dayHeader,
                  backgroundColor: dayColors[day],
                }}
              >
                {day}
              </td>
              {TIME_SLOTS.map((timeSlot) => {
                const coursesStartingHere =
                  coursesByDay[day]?.filter((course) => {
                    const [courseHour] = course.startTime
                      .split(":")
                      .map(Number);
                    const [slotHour] = timeSlot.start.split(":").map(Number);
                    return courseHour === slotHour;
                  }) || [];

                const isCellOccupied =
                  cellOccupancy[day]?.[timeSlot.start] || false;

                if (isCellOccupied && coursesStartingHere.length === 0) {
                  return null; // ช่องนี้ถูกใช้งานโดยวิชาที่เริ่มก่อนหน้านี้
                }

                if (coursesStartingHere.length > 0) {
                  return (
                    <td
                      key={`${day}-${timeSlot.start}`}
                      style={styles.timeCell}
                      colSpan={coursesStartingHere[0].duration}
                    >
                      <div style={{ position: "relative", height: "100%" }}>
                        {coursesStartingHere.map((course) =>
                          renderCourseBlock(course, day)
                        )}
                      </div>
                    </td>
                  );
                }

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
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={styles.downloadButtonContainer}>
        <button
          onClick={downloadTableAsPDF}
          style={styles.downloadButton}
          title="ดาวน์โหลดเป็น PDF"
        >
          <div style={styles.downloadIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </div>
          <span style={styles.downloadText}>ดาวน์โหลด PDF</span>
        </button>
      </div>

      <div id="course-table" style={styles.tableContainer}>
        <div style={styles.tableWrapper}>{renderTableView()}</div>
      </div>
    </div>
  );
};

export default CourseTableView;
