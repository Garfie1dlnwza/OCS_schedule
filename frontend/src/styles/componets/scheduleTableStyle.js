export const styles = {

  tableContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    overflow: 'auto',
    maxWidth: '100%',
    height: 'auto',
  },

  tableWrapper: {
    width: '100%',
    height: 'auto',
    overflow: 'auto',
    position: 'relative',
    borderRadius: '10px',
  },

  table: {
    width: '100%', 
    minWidth: '900px',
    borderCollapse: 'separate',
    borderSpacing: '0',
    tableLayout: 'fixed',
    transform: 'none',
    transformOrigin: 'top left',
    borderRadius: '8px',
    overflow: 'hidden',
  },

  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 15,
    backgroundColor: 'white',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
    borderBottom: '1px solid #f1f5f9',
  },

  cornerHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 20,
    backgroundColor: '#f8fafc',
    width: '60px',
    padding: '12px 4px',
    textAlign: 'center',
    fontWeight: '600',
    color: '#475569',
    boxSizing: 'border-box', 
    fontSize: '0.85rem',
    borderBottom: '1px solid #e2e8f0',
    borderRight: '1px solid #e2e8f0',
  },

  timeHeader: {
    width: '100px',
    minWidth: '80px',
    borderRight: '1px solid rgb(224, 224, 224)',
    padding: '12px 4px',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'center',
    fontWeight: '500',
    color: '#334155',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    fontSize: '0.85rem',
  },

  dayHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 10,
    width: '60px',
    minWidth: '60px',
    padding: '12px 4px',
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    whiteSpace: 'nowrap',
    backgroundColor: '#3b82f6',
    boxShadow: 'rgba(0, 0, 0, 0.05) 1px 0 4px',
    boxSizing: 'border-box', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.5px',
  },

  timeCell: {
    padding: '6px',
    width: '80px',
    minWidth: '80px', 
    height: 'auto',
    minHeight: '76px',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'top',
    position: 'relative',
    backgroundColor: 'white',
    transition: 'background-color 0.2s ease',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: '#fafafa',
    }
  },

  courseBlock: {
    height: '17vh',
    maxHeight: '150px',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    transition: 'all 0.15s ease-out',
    cursor: 'pointer',
    border: '1px solid rgba(203, 213, 225, 0.4)', // เพิ่มเส้นขอบจากแบบเก่า

    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    boxSizing: 'border-box',
    marginBottom: '2px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
      backgroundColor: 'white',
      borderColor: '#cbd5e1', // เปลี่ยนสีขอบทั่วไปเมื่อ hover
    }
  },

  courseName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.3'
  },

  courseCode: {
    fontSize: '0.75rem',
    color: '#64748b',
    marginBottom: '3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: '500',
  },

  timeText: {
    fontSize: '0.7rem',
    color: '#64748b',
    marginBottom: '3px',
    whiteSpace: 'nowrap',
    fontWeight: '400',
  },

  roomText: {
    fontSize: '0.75rem',
    color: '#2563eb',
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
    marginBottom: '20px',
    marginTop: '8px',
  },
  
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '400',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    }
  },
  
  downloadIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
  },
  
  downloadText: {
    lineHeight: 1,
    letterSpacing: '0.03em',
  },

  '@media (max-width: 1024px)': {
    timeCell: {
      width: '65px',
      minWidth: '65px',
      minHeight: '70px',
    },
    timeHeader: {
      width: '65px',
      minWidth: '65px',
      padding: '10px 4px',
    },
    dayHeader: {
      width: '60px',
      minWidth: '60px',
      padding: '10px 4px',
    },
    cornerHeader: {
      padding: '10px 4px',
    },
    courseBlock: {
      padding: '8px',
      minHeight: '60px',
      borderLeft: '3px solid #3b82f6', // คงเส้นขอบซ้าย
    },
  },
  
  '@media (max-width: 768px)': {
    tableContainer: {
      padding: '8px',
      borderRadius: '12px',
    },
    table: {
      transform: 'scale(0.9)',
      transformOrigin: 'top left',
      borderRadius: '6px',
    },
    cornerHeader: {
      width: '50px',
      minWidth: '50px',
      padding: '8px 3px',
      fontSize: '0.75rem',
    },
    dayHeader: {
      width: '50px',
      minWidth: '50px',
      padding: '8px 3px',
      fontSize: '0.75rem',
    },
    timeHeader: {
      width: '55px',
      minWidth: '55px',
      padding: '8px 2px',
      fontSize: '0.75rem',
    },
    timeCell: {
      width: '55px',
      minWidth: '55px',
      minHeight: '65px',
      padding: '4px',
    },
    courseBlock: {
      padding: '6px',
      minHeight: '58px',
      borderRadius: '6px',
      borderLeft: '2px solid #3b82f6', // ลดขนาดขอบซ้ายลงสำหรับหน้าจอขนาดกลาง
    },
    courseName: {
      fontSize: '0.75rem',
      marginBottom: '3px',
    },
    courseCode: {
      fontSize: '0.7rem',
    },
    timeText: {
      fontSize: '0.65rem',
    },
    roomText: {
      fontSize: '0.7rem',
    },
    downloadButton: {
      padding: '6px 14px',
      fontSize: '13px',
      borderRadius: '6px',
    }
  },

  '@media (max-width: 480px)': {
    tableContainer: {
      padding: '6px',
      borderRadius: '10px',
    },
    table: {
      transform: 'scale(0.7)',
      transformOrigin: 'top left',
      borderRadius: '4px',
    },
    cornerHeader: {
      width: '45px',
      minWidth: '45px',
      padding: '6px 2px',
      fontSize: '0.7rem',
    },
    dayHeader: {
      width: '45px',
      minWidth: '45px',
      padding: '6px 2px',
      fontSize: '0.7rem',
    },
    timeHeader: {
      width: '45px',
      minWidth: '45px',
      fontSize: '0.65rem',
      padding: '6px 1px',
    },
    timeCell: {
      width: '45px',
      minWidth: '45px',
      minHeight: '55px',
      padding: '2px',
    },
    courseBlock: {
      padding: '5px',
      minHeight: '50px',
      borderRadius: '5px',
      borderLeft: '2px solid #3b82f6', // คงเส้นขอบซ้ายสำหรับหน้าจอขนาดเล็ก
      border: '1px solid rgba(203, 213, 225, 0.3)', // ทำให้เส้นขอบบางลงในหน้าจอเล็ก
    },
    courseName: {
      fontSize: '0.7rem',
      WebkitLineClamp: 1,
      marginBottom: '2px',
    },
    courseCode: {
      fontSize: '0.65rem',
      marginBottom: '1px',
    },
    timeText: {
      fontSize: '0.6rem',
      marginBottom: '1px',
    },
    roomText: {
      fontSize: '0.65rem',
    },
    downloadButton: {
      padding: '5px 10px',
      fontSize: '12px',
      borderRadius: '5px',
    },
    downloadText: {
      display: 'none',
    },
    downloadIcon: {
      margin: '0',
    }
  },
};