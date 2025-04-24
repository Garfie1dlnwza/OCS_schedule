export const styles = {
  page: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',          // Added
    flexDirection: 'column',
    '&::-webkit-scrollbar': {  // ซ่อน scrollbar สำหรับ Chrome/Safari
        display: 'none'
      },
      msOverflowStyle: 'none',  // ซ่อน scrollbar สำหรับ IE/Edge
      scrollbarWidth: 'none' 
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 8px',
    display: 'flex',
    justifyContent: 'center',
    flex: '1',     
    flexDirection: 'column',
    alignItems: 'center',
    padding:'16px',
    '&::-webkit-scrollbar': {  // ซ่อน scrollbar สำหรับ Chrome/Safari
      display: 'none'
    },
    msOverflowStyle: 'none',  // ซ่อน scrollbar สำหรับ IE/Edge
    scrollbarWidth: 'none' 
  },
  yearSelectorContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tableContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '8px',
    overflow: 'auto',
    maxWidth: '100%',
    fontSize: '0.875rem',
    height: '80vh',
  },
  tableWrapper: {
    width: '100%',
    height: '100%',   
    overflow: 'auto',
    position: 'relative',
    maxHeight: '80vh',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'thin',
    scrollbarColor: '#cbd5e1 #f1f5f9',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f5f9',
      borderRadius: '10px',
      margin: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#94a3b8',
      borderRadius: '10px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
      '&:hover': {
        background: '#64748b'
      }
    },
  },
  table: {
    width: 'auto',
    minWidth: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    tableLayout: 'fixed',
    fontSize: 'inherit',
  },
  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e2e8f0',
  },
  cornerHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 20,
    backgroundColor: '#ffffff',
    width: '80px',
    padding: '8px',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'center',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  timeHeader: {
    width: '80px',
    minWidth: '80px',
    padding: '6px',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'center',
    fontWeight: '500',
    color: '#64748b',
    whiteSpace: 'nowrap',
    fontSize: '0.7rem',
  },
  dayHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 10,
    width: '80px',
    padding: '8px',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'center',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'white',
    whiteSpace: 'nowrap',
    backgroundColor: '#475569',
    boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
  },
  timeCell: {
    padding: '4px',
    width: '80px',
    minWidth: '80px',
    height: '100px',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  courseBlock: {
    height: '90%',
    padding: '8px',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    margin: '2px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  courseBlockHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  courseName: {
    fontSize: '0.75rem',
    fontWeight: '600',
    marginBottom: '2px',
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  courseCode: {
    fontSize: '0.7rem',
    color: '#64748b',
    marginBottom: '2px'
  },
  timeText: {
    fontSize: '0.65rem',
    color: '#64748b',
    marginBottom: '2px'
  },
  roomText: {
    fontSize: '0.65rem',
    color: '#64748b',
    marginTop: 'auto'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  },
  loadingSpinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    marginTop: '12px',
    color: '#64748b',
    fontSize: '0.9rem'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '20px'
  },
  errorBox: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    maxWidth: '350px',
    width: '100%'
  },
  errorTitle: {
    marginBottom: '12px',
    fontSize: '1.15rem',
    fontWeight: '600',
    color: '#dc2626'
  },
  errorMessage: {
    color: '#4b5563',
    fontSize: '0.9rem'
  },
  errorButton: {
    marginTop: '12px',
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2563eb'
    }
  },
  overlapIndicator: {
    position: 'absolute',
    top: '3px',
    right: '3px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    fontSize: '0.65rem',
    padding: '2px 3px',
    borderRadius: '3px',
    fontWeight: '500',
    zIndex: 1
  },
  compactTimeFormat: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'inline'
    }
  },
  fullTimeFormat: {
    display: 'inline',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  scrollHint: {
    display: 'none',
    '@media (max-width: 767px)': {
      display: 'block',
      textAlign: 'center',
      margin: '4px 0',
      color: '#64748b',
      fontSize: '0.8rem',
      fontStyle: 'italic'
    }
  },
  '@supports (-webkit-overflow-scrolling: touch)': {
    tableWrapper: {
      '-webkit-overflow-scrolling': 'touch',
    }
  },
  '@media (max-width: 768px)': {
    tableContainer: {
      maxHeight: 'calc(100vh - 120px)',
      overflow: 'auto'
    },
    tableWrapper: {
      maxHeight: '80vh',
      '&::-webkit-scrollbar': {
        width: '6px',
        height: '6px'
      }
    },
  },
  '@media (max-width: 375px)': {
    timeHeader: {
      width: '65px',
      minWidth: '65px',
    },
    timeCell: {
      width: '65px',
      minWidth: '65px',
      height: '55px',
    },
    cornerHeader: {
      width: '38px',
    },
    dayHeader: {
      width: '38px',
    },
  },
  '@media (prefers-reduced-motion: no-preference)': {
    '*': {
      transition: 'font-size 0.3s ease, padding 0.3s ease, margin 0.3s ease, height 0.3s ease, width 0.3s ease'
    }
  }
};