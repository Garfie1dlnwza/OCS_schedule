export const styles = {

  tableContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'auto',
    maxWidth: '100%',
    height: 'auto',
  },

  tableWrapper: {
    width: '100%',
    height: 'auto',
    overflow: 'auto',
    position: 'relative',
  },

  table: {
  
    width: '100%', 
    minWidth: '900px',
    borderCollapse: 'separate',
    borderSpacing: '0',
    tableLayout: 'fixed',
    transform: 'none',
    transformOrigin: 'top left',
  },

  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 15,
    backgroundColor: 'white',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e2e8f0',
  },

  cornerHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 20,
    backgroundColor: '#f8fafc',
    width: '60px',
    padding: '8px 4px',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'center',
    fontWeight: '600',
    color: '#64748b',
  },

  timeHeader: {
    width: '80px',
    minWidth: '80px',
    padding: '8px 4px',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'center',
    fontWeight: '500',
    color: '#1e293b',
    whiteSpace: 'nowrap',
  },

  dayHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 10,
    width: '60px',
    padding: '8px 4px',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    whiteSpace: 'nowrap',
    backgroundColor: '#3b82f6',
    boxShadow: '1px 0 3px rgba(0,0,0,0.05)',
  },

  timeCell: {
    padding: '4px',
    width: '70px',
    minWidth: '70px',
    height: 'auto',
    minHeight: '70px',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
    position: 'relative',
    backgroundColor: 'white',
    transition: 'background-color 0.2s ease',
  },

  courseBlock: {
    height: '10vh',
    padding: '8px',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: '1px solid rgba(203, 213, 225, 0.4)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(243, 244, 246, 0.7)',
    overflow: 'hidden',
    marginBottom: '2px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      borderColor: '#3b82f6',
    }
  },

  courseName: {
    fontSize: '0.8rem',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.3'
  },

  courseCode: {
    fontSize: '0.7rem',
    color: '#64748b',
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  timeText: {
    fontSize: '0.65rem',
    color: '#64748b',
    marginBottom: '2px',
    whiteSpace: 'nowrap'
  },

  roomText: {
    fontSize: '0.7rem',
    color: '#3b82f6',
    fontWeight: '500',
    marginTop: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  
  downloadButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '16px',
  },
  
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '400',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }
  },
  
  downloadIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '6px',
  },
  
  downloadText: {
    lineHeight: 1,
    letterSpacing: '0.02em',
  },

  '@media (max-width: 1024px)': {
    timeCell: {
      width: '60px',
      minWidth: '60px',
      minHeight: '65px',
    },
    courseBlock: {
      padding: '6px',
    },
  },
  
  '@media (max-width: 768px)': {
    tableContainer: {
      padding: '8px',
    },
    table: {
      transform: 'scale(0.85)',
      transformOrigin: 'top left',
    },
    cornerHeader: {
      width: '50px',
      padding: '6px 3px',
      fontSize: '0.7rem',
    },
    dayHeader: {
      width: '50px',
      padding: '6px 3px',
      fontSize: '0.7rem',
    },
    timeHeader: {
      width: '60px',
      minWidth: '60px',
      padding: '6px 2px',
      fontSize: '0.7rem',
    },
    timeCell: {
      width: '50px',
      minWidth: '50px',
      minHeight: '60px',
    },
    courseBlock: {
      padding: '5px',
      minHeight: '60px',
    },
    courseName: {
      fontSize: '0.7rem',
    },
    courseCode: {
      fontSize: '0.65rem',
    },
    timeText: {
      fontSize: '0.6rem',
    },
    roomText: {
      fontSize: '0.65rem',
    },
    downloadButton: {
      padding: '5px 10px',
      fontSize: '12px',
    }
  },

  '@media (max-width: 480px)': {
    tableContainer: {
      padding: '5px',
    },
    table: {
      transform: 'scale(0.65)',
      transformOrigin: 'top left',
    },
    cornerHeader: {
      width: '40px',
      padding: '4px 2px',
      fontSize: '0.65rem',
    },
    dayHeader: {
      width: '40px',
      padding: '4px 2px',
      fontSize: '0.65rem',
    },
    timeHeader: {
      width: '45px',
      minWidth: '45px',
      fontSize: '0.6rem',
      padding: '4px 1px',
    },
    timeCell: {
      width: '40px',
      minWidth: '40px',
      minHeight: '50px',
      padding: '1px',
    },
    courseBlock: {
      padding: '4px',
      minHeight: '50px',
    },
    courseName: {
      fontSize: '0.65rem',
      WebkitLineClamp: 1,
      marginBottom: '2px',
    },
    courseCode: {
      fontSize: '0.6rem',
      marginBottom: '1px',
    },
    timeText: {
      fontSize: '0.55rem',
      marginBottom: '1px',
    },
    roomText: {
      fontSize: '0.6rem',
    },
    downloadButton: {
      padding: '4px 8px',
      fontSize: '11px',
    },
    downloadText: {
      display: 'none',
    },
    downloadIcon: {
      margin: '0',
    }
  },
};