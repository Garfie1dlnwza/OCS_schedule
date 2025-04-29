import { useState, useEffect } from 'react';
import { daysOrder } from '../utils/scheduleConstants.js';
import { processScheduleData, getCurrentDay } from '../utils/scheduleUtils.js';


// API configuration
const API_URL = import.meta.env.VITE_API_URL 
const TOKEN = import.meta.env.VITE_TOKEN;
const STUDENT_CODE = import.meta.env.VITE_STUDENT_CODE;
// Fetch raw schedule data
export const fetchScheduleData = async () => {
  try {
    const response = await fetch(`${API_URL}/student/schedule`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student_code: STUDENT_CODE }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};

// Filter schedule by year and semester
export const filterScheduleByTerm = (data, academicYear, semester) => {
  if (!data?.data?.[0]?.schedules) return [];

  const thaiYear = (academicYear + 542).toString();
  const semesterStr = semester.toString();

  const filteredSchedule = data.data[0].schedules.find(
    schedule => schedule.academic_year === thaiYear && schedule.semester === semesterStr
  );

  return filteredSchedule?.details || [];
};

// Main hook for getting schedule data
export function useScheduleData(academicYear, semester) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDay = getCurrentDay();

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setLoading(true);
        const rawData = await fetchScheduleData();
        const filteredData = filterScheduleByTerm(rawData, academicYear, semester);
        const transformedSchedule = processScheduleData(filteredData);
        setSchedule(transformedSchedule);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [academicYear, semester]);

  // Group courses by day
  const groupedByDay = daysOrder.reduce((result, day) => {
    result[day] = schedule
      .filter(course => course.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return result;
  }, {});

  return { 
    schedule, 
    loading, 
    error, 
    currentDay, 
    groupedByDay 
  };
}