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

// แก้ไขฟังก์ชัน downloadTableAsPDF
const downloadTableAsPDF = () => {
    const tableElement = document.getElementById("course-table");
    if (!tableElement) return;
  
    // สร้าง clone ของตารางเพื่อปรับแต่งก่อนใช้ html2canvas
    const cloneTable = tableElement.cloneNode(true);
    
    // สร้าง div ชั่วคราวเพื่อเก็บตาราง clone
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '-9999px';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '1200px'; // กำหนดความกว้างที่มากพอ
    
    // ตั้งค่า style ของ clone table ให้แสดงเต็มขนาดโดยไม่มี transform scale
    const tableWrapper = cloneTable.querySelector('div');
    if (tableWrapper) {
      const table = tableWrapper.querySelector('table');
      if (table) {
        // รีเซ็ต transform และขนาด
        table.style.transform = 'none';
        table.style.width = '100%';
        table.style.maxWidth = '100%';
        
        // เพิ่มขอบตารางให้ชัดเจนใน PDF
        table.style.border = '1px solid #ccc';
        
        // ปรับขนาดฟอนต์
        Array.from(table.querySelectorAll('th, td')).forEach(cell => {
          cell.style.fontSize = '12px';
        });
      }
    }
    
    // เพิ่ม clone table ลงใน temp div
    tempDiv.appendChild(cloneTable);
    document.body.appendChild(tempDiv);
    
    // ปรับค่า style ของ clone table เพื่อให้แสดงได้เต็มที่
    cloneTable.style.overflow = 'visible';
    cloneTable.style.maxWidth = 'none';
    cloneTable.style.width = '1100px'; // กำหนดความกว้างที่มากพอ
    cloneTable.style.padding = '10px';
    cloneTable.style.backgroundColor = 'white';
    
    // สร้าง PDF
    html2canvas(cloneTable, {
      scale: 1.5, // ปรับ scale ให้เหมาะสม
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false, // ปิดการแสดงข้อความ log
      width: 1100, // กำหนดความกว้างที่แน่นอน
      height: cloneTable.scrollHeight,
      windowWidth: 1200,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      try {
        // กำหนดขนาดและทิศทางของ PDF
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });
  
        // คำนวณขนาดของภาพให้พอดีกับ PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - 20; // เหลือ margin 10mm ทั้งซ้าย-ขวา
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // เพิ่มภาพลงใน PDF
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  
        // ตรวจสอบว่าเนื้อหายาวเกินหน้า A4 หรือไม่
        if (imgHeight > pdfHeight - 20) { // 20 = margin บน+ล่าง
          // คำนวณจำนวนหน้าที่ต้องการ
          const pageCount = Math.ceil((imgHeight + 20) / pdfHeight);
          
          // สร้างหน้าเพิ่มเติมหากจำเป็น
          for (let i = 1; i < pageCount; i++) {
            pdf.addPage();
            // คำนวณส่วนของภาพที่จะแสดงในแต่ละหน้า
            pdf.addImage(
              imgData, "PNG",
              10, // x
              10 - (pdfHeight * i), // y - shift ภาพขึ้นตามจำนวนหน้า
              imgWidth, imgHeight
            );
          }
        }
  
        // บันทึก PDF
        pdf.save("course-schedule.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง");
      }
  
      // ลบ tempDiv
      document.body.removeChild(tempDiv);
    }).catch(error => {
      console.error("Error capturing table:", error);
      alert("เกิดข้อผิดพลาดในการแคปเจอร์ตาราง กรุณาลองใหม่อีกครั้ง");
      document.body.removeChild(tempDiv);
    });
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
