import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // ชี้ไปที่ Backend

export const getStudentSchedule = async (studentCode) => {
  const response = await axios.post(`${API_BASE_URL}/schedule/${studentCode}`);
  return response.data;
};