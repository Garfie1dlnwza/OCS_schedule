import React, { useState, useEffect } from "react";
import background from "../assets/backgroundSchedule.png";
import Headbar from "../components/headbar.jsx";
import { styles } from "../styles/schedulePageStyle.js";
import { contentStyles } from "../styles/componets/contentTabbarSyle.js";
import { useScheduleData } from "../services/scheduleApi.jsx";
import ButtonAcademicYear from "../components/buttonAcademicYear.jsx";
import TabBar from "../components/tabbar.jsx";
import ScheduleListView from "../components/scheduleListView.jsx";
import CourseTableView from "../components/scheduleTable.jsx";

export default function SchedulePage() {
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear] = useState(currentYear);
  const [semester, setSemester] = useState(1);
  const [activeTab, setActiveTab] = useState("List");
  const { schedule, loading, error, currentDay, groupedByDay } =
    useScheduleData(academicYear, semester);

  // ดักการเปลี่ยนแปลงขนาดหน้าจอเพื่อปรับการแสดงผล
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleYearChange = (change) => {
    setAcademicYear((prev) => prev + change);
  };

  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // แสดงส่วน loading สวยงาม
  if (loading) {
    return (
      <div style={{ 
        ...styles.page, 
        backgroundImage: `url(${background})`,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Headbar title="Schedule" />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '30px',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '20px', marginBottom: '15px' }}>กำลังโหลดข้อมูล...</div>
          <div style={{ width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  // แสดงข้อความแจ้งเตือนถ้าเกิดข้อผิดพลาด
  if (error) {
    return (
      <div style={{ 
        ...styles.page, 
        backgroundImage: `url(${background})`,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Headbar title="Schedule" />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          padding: '30px',
          borderRadius: '12px',
          border: '1px solid #ff5555',
          color: 'white'
        }}>
          <div style={{ fontSize: '20px', marginBottom: '15px' }}>เกิดข้อผิดพลาด</div>
          <div>{error}</div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 15px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${background})` }}>
      <Headbar title="Schedule" />

      <div style={{marginTop:20}} />
      
      <div style={contentStyles.academicYearContainer}>
        <ButtonAcademicYear
          academicYear={academicYear}
          semester={semester}
          onYearChange={handleYearChange}
          onSemesterChange={handleSemesterChange}
        />
      </div>
      
      <div style={contentStyles.spacer} />
      
      <div style={styles.body}>
        <div style={{...styles.container, ...contentStyles.containerModified}}>
          {/* TabBar Container */}
          <div style={contentStyles.tabBarWrapper}>
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          
          {/* Content Container */}
          <div style={contentStyles.contentWrapper}>
            <div style={contentStyles.scheduleViewContainer}>
              {activeTab === "List" 
                ? <ScheduleListView currentDay={currentDay} groupedByDay={groupedByDay} />
                : <CourseTableView schedule={schedule} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}