import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import CourseTable from './screens/courseTable.jsx';
import SchedulePage from './screens/schedulePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" />} />
          <Route path="/schedule" element={<SchedulePage/>} />
          <Route path="/course-table" element={<CourseTable />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
