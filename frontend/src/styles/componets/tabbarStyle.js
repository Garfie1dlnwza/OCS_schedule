export const tabBarStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '250px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
    zIndex: 10, // ให้ TabBar อยู่ด้านหน้าเสมอ
    position: 'relative' // ให้ z-index มีผล
  },
  tab: {
    flex: 1,
    padding: '10px 0',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.2s ease',
    position: 'relative'
  },
  activeTab: {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  activeIndicator: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '2px',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease'
  }
};