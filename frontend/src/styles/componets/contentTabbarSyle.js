export const contentStyles = {
    tabBarWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative', 
      zIndex: 2,
      marginBottom: '15px',

    },
    contentWrapper: {
      width: '100%',
      flex: 1, 
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scheduleViewContainer: {
      height: 'auto',
      width: '100%',
      overflowY: 'visible',
      overflowX: 'visible',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 

    },
    tableViewContent: {
      minHeight: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px',
      color: 'rgba(255, 255, 255, 0.8)',
      width: '100%',
    },
    containerModified: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'auto',
      width: '100%',
      overflowY: 'visible',
      overflowX: 'visible',
    },
    spacer: {
      height: 30,
    },
    academicYearContainer: {
      justifyContent: "center", 
      display: "flex",
      marginBottom: "10px"
      
    },
    hideScrollbar: {
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    
    // เพิ่ม responsive style
    '@media (max-width: 768px)': {
      scheduleViewContainer: {
        padding: '5px 0',
      },
      tableViewContent: {
        minHeight: '200px',
        fontSize: '16px',
      },
      spacer: {
        height: 15,
      }
    },
    
    '@media (max-width: 480px)': {
      spacer: {
        height: 10,
      },
      tableViewContent: {
        minHeight: '150px',
        fontSize: '14px',
      }
    }
  };