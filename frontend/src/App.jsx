import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SchedulePage  from './screens/schedulePage.jsx';


function App() {
  return (
    <BrowserRouter>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" />} />

          <Route path="/schedule" element={<SchedulePage/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
