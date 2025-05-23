import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from "react";
import background from "../assets/backgroundSchedule.png";
import Headbar from "../components/headbar.jsx";
import { styles } from "../styles/schedulePageStyle.js";
import { contentStyles } from "../styles/componets/contentTabbarSyle.js";
import { useScheduleData } from "../services/scheduleApi.jsx";
import ButtonAcademicYear from "../components/buttonAcademicYear.jsx";
import TabBar from "../components/tabbar.jsx";

// Lazy load views for code splitting
const ScheduleListView = lazy(() => import("../components/scheduleListView.jsx"));
const CourseTableView = lazy(() => import("../components/scheduleTable.jsx"));

// Loading component
const LoadingIndicator = () => (
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
);

// Error component
const ErrorIndicator = ({ error, onRetry }) => (
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
      onClick={onRetry}
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
);

export default function SchedulePage() {
  // Get current year once rather than on every render
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [academicYear, setAcademicYear] = useState(currentYear);
  const [semester, setSemester] = useState(1);
  const [activeTab, setActiveTab] = useState("List");
  
  // Get schedule data
  const { schedule, loading, error, currentDay, groupedByDay } =
    useScheduleData(academicYear, semester);

  // Use callbacks for event handlers to prevent unnecessary re-renders
  const handleYearChange = useCallback((change) => {
    setAcademicYear(prev => prev + change);
  }, []);

  const handleSemesterChange = useCallback((newSemester) => {
    setSemester(newSemester);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // Memoize the background style to avoid recreation on every render
  const pageStyle = useMemo(() => ({
    ...styles.page,
    backgroundImage: `url(${background})`
  }), []);

  // Center container style for loading and error states
  const centerContainerStyle = useMemo(() => ({
    ...styles.page,
    backgroundImage: `url(${background})`,
    justifyContent: 'center',
    alignItems: 'center'
  }), []);

  if (loading) {
    return (
      <div style={centerContainerStyle}>
        <Headbar title="Schedule" />
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div style={centerContainerStyle}>
        <Headbar title="Schedule" />
        <ErrorIndicator error={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
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
              <Suspense fallback={<LoadingIndicator />}>
                {activeTab === "List" 
                  ? <ScheduleListView currentDay={currentDay} groupedByDay={groupedByDay} />
                  : <CourseTableView schedule={schedule} />
                }
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
