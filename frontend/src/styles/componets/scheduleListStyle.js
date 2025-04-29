export const styles = {
  scheduleContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop:'10px',
    gap: "5px",
    position: "relative",
    height: "100%",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      // ซ่อน scrollbar สำหรับ Chrome/Safari
      display: "none",
    },
    msOverflowStyle: "none", // ซ่อน scrollbar สำหรับ IE/Edge
    scrollbarWidth: "none",
  },

  dayRow: {
    display: "flex",
    alignItems: "center",
    gap: "0px",
    width: "100%",
    color: "white",
    marginBottom: "10px",
  },
  dayCircle: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
  },
  dayLabelContainer: {
    width: "60px",

    minWidth: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dayLabel: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "white",
  },
  dayCoursesContainer: {
    flex: 1,
    display: "flex",
    borderRadius: "12px",
    minHeight: "80px",
    padding: "10px",
    gap: "2px",
  },
  coursesList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyDaySlot: {
    height: "80px",
    backgroundColor: "transparent",
    borderRadius: "12px",
  },
  dayCircleWrapper: {
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: "10px",
    height: "100%",
  },
  verticalLine: {
    position: "absolute",
    top: "-2.5px",
    bottom: "-2.5px",
    height: "130%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "2px",
    backgroundColor: "rgb(255, 255, 255)",
    zIndex: 0,
  },
};
