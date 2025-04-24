import React from 'react';

export default function ButtonAcademicYear({
  academicYear,
  semester,
  onYearChange,
  onSemesterChange
}) {
  // Hover effect handlers
  const handleMouseEnter = (e) => {
    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
  };

  const handleMouseLeave = (e, isActive) => {
    e.target.style.background = isActive 
      ? 'rgba(255, 255, 255, 0.25)' 
      : 'rgba(255, 255, 255, 0.1)';
  };

  return (
    <div style={styles.container}>
      <div style={styles.yearSelector}>
        <button
          style={styles.arrowButton}
          onClick={() => onYearChange(-1)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={(e) => handleMouseLeave(e, false)}
          aria-label="Previous Year"
        >
          <svg style={styles.svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div style={styles.selectedYear}>
          ปีการศึกษา {academicYear + 542}
        </div>
        
        <button
          style={styles.arrowButton}
          onClick={() => onYearChange(1)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={(e) => handleMouseLeave(e, false)}
          aria-label="Next Year"
        >
          <svg style={styles.svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div style={styles.semesterContainer}>
        {[1, 2, 3].map((sem) => {
          const isActive = semester === sem;
          const semesterText = sem === 3 ? 'S' : sem.toString();
          
          return (
            <button
              key={sem}
              style={{
                ...styles.semesterButton,
                ...(isActive ? styles.activeSemester : {})
              }}
              onClick={() => onSemesterChange(sem)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, isActive)}
            >
              {semesterText}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: 'max-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)',
    borderRadius: '20px',
    padding: '8px 12px',
    color: 'white',

  },
  yearSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  selectedYear: {
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  arrowButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    padding: '0',
  },
  semesterContainer: {
    display: 'flex',
    gap: '6px',
  },
  semesterButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
  },
  activeSemester: {
    background: 'rgba(255, 255, 255, 0.25)',
    fontWeight: 'bold',
    boxShadow: '0 0 6px rgba(255, 255, 255, 0.15)',
  },
  svg: {
    width: '12px',
    height: '12px',
  }
};