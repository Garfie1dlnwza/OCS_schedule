export const styles = {
    page: {
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      overflow: 'auto', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      

    },
    body: {
      width: "80%",
      flex: 1, // เปลี่ยนจาก height: "100%" เป็น flex: 1
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',

      flexDirection: "column",
      alignItems: "center",
      overflow: "visible", // เปลี่ยนจาก "auto" เป็น "visible"
      paddingBottom: "20px", 
    },

    container: {
      width: "75%",
      height: "auto",
      maxWidth: "1400px",
      display: "flex",
      alignItems: 'center',
      flexDirection: "column",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // ปรับความทึบให้มากขึ้น
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)", // ปรับให้ border บางลงและใส่มากขึ้น
      padding: "20px",
      margin: "20px 0",
      overflow: "visible",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
    },


  
       
    '@media (max-width: 768px)': {
      container: {
        width: "75%",
        padding: "15px",
      },
      downloadButton: {
        fontSize: "14px",
        padding: "8px 16px",
      }
    },
    
    '@media (max-width: 480px)': {
      container: {
        width: "75%",
        padding: "10px",
        margin: "10px 0",
      },
      downloadButton: {
        fontSize: "12px",
        padding: "6px 12px",
      }
    }
};