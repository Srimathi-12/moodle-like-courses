// src/utlis/data.js (or .ts)

const COURSES = [
  { id: 'c1', name: 'Hotel Management Induction' },
  { id: 'c2', name: 'Front Office Operations' },
  { id: 'c3', name: 'Food & Beverage Service' },
  { id: 'c4', name: 'Housekeeping Management' },
  { id: 'c5', name: 'Hospitality Marketing' },
];

const CLASS_SESSIONS = [
  { id: 'session-1', title: 'Induction Day 1', date: '2025-03-03', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 1 },
  { id: 'session-2', title: 'Induction Day 2', date: '2025-03-04', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 2 },
  { id: 'session-3', title: 'Induction Day 3', date: '2025-03-05', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 3 },
  { id: 'session-4', title: 'Front Office Basics', date: '2025-03-06', startTime: '10:00 AM', endTime: '01:00 PM', classNumber: 4 },
  { id: 'session-5', title: 'F&B Service Intro', date: '2025-03-07', startTime: '01:00 PM', endTime: '04:00 PM', classNumber: 5 },
  { id: 'session-6', title: 'Housekeeping Standards', date: '2025-03-10', startTime: '09:30 AM', endTime: '12:30 PM', classNumber: 6 },
  { id: 'session-7', title: 'Marketing Fundamentals', date: '2025-03-11', startTime: '11:00 AM', endTime: '02:00 PM', classNumber: 7 },
  { id: 'session-8', title: 'Advanced Front Office', date: '2025-03-12', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 8 },
  { id: 'session-9', title: 'Fine Dining Service', date: '2025-03-13', startTime: '02:00 PM', endTime: '05:00 PM', classNumber: 9 },
  { id: 'session-10', title: 'Room Maintenance', date: '2025-03-14', startTime: '10:00 AM', endTime: '01:00 PM', classNumber: 10 },
  { id: 'session-11', title: 'Digital Marketing', date: '2025-03-17', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 11 },
  { id: 'session-12', title: 'Guest Relations', date: '2025-03-18', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 12 },
  { id: 'session-13', title: 'Beverage Knowledge', date: '2025-03-19', startTime: '01:00 PM', endTime: '04:00 PM', classNumber: 13 },
  { id: 'session-14', title: 'Laundry Operations', date: '2025-03-20', startTime: '09:30 AM', endTime: '12:30 PM', classNumber: 14 },
  { id: 'session-15', title: 'Event Planning', date: '2025-03-21', startTime: '11:00 AM', endTime: '02:00 PM', classNumber: 15 },
  { id: 'session-16', title: 'Concierge Services', date: '2025-03-24', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 16 },
  { id: 'session-17', title: 'Kitchen Operations', date: '2025-03-25', startTime: '02:00 PM', endTime: '05:00 PM', classNumber: 17 },
  { id: 'session-18', title: 'Public Area Cleaning', date: '2025-03-26', startTime: '10:00 AM', endTime: '01:00 PM', classNumber: 18 },
  { id: 'session-19', title: 'Sales Strategies', date: '2025-03-27', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 19 },
  { id: 'session-20', title: 'Revenue Management', date: '2025-03-28', startTime: '09:00 AM', endTime: '12:00 PM', classNumber: 20 },
];

const ATTENDANCE_DATA = [
  { sessionId: 'session-1', courseId: 'c1', status: 'present' },
  { sessionId: 'session-1', courseId: 'c2', status: 'absent' },
  { sessionId: 'session-1', courseId: 'c3', status: 'late' },
  { sessionId: 'session-1', courseId: 'c4', status: 'present' },
  { sessionId: 'session-1', courseId: 'c5', status: 'excused' },

  { sessionId: 'session-2', courseId: 'c1', status: 'present' },
  { sessionId: 'session-2', courseId: 'c2', status: 'present' },
  { sessionId: 'session-2', courseId: 'c3', status: 'present' },
  { sessionId: 'session-2', courseId: 'c4', status: 'late' },
  { sessionId: 'session-2', courseId: 'c5', status: 'absent' },

  { sessionId: 'session-3', courseId: 'c1', status: 'present' },
  { sessionId: 'session-3', courseId: 'c2', status: 'excused' },
  { sessionId: 'session-3', courseId: 'c3', status: 'present' },
  { sessionId: 'session-3', courseId: 'c4', status: 'present' },
  { sessionId: 'session-3', courseId: 'c5', status: 'present' },

  { sessionId: 'session-4', courseId: 'c1', status: 'absent' },
  { sessionId: 'session-4', courseId: 'c2', status: 'present' },
  { sessionId: 'session-4', courseId: 'c3', status: 'late' },
  { sessionId: 'session-4', courseId: 'c4', status: 'present' },
  { sessionId: 'session-4', courseId: 'c5', status: 'present' },

  { sessionId: 'session-5', courseId: 'c1', status: 'present' },
  { sessionId: 'session-5', courseId: 'c2', status: 'present' },
  { sessionId: 'session-5', courseId: 'c3', status: 'absent' },
  { sessionId: 'session-5', courseId: 'c4', status: 'present' },
  { sessionId: 'session-5', courseId: 'c5', status: 'excused' },
  
  { sessionId: 'session-6', courseId: 'c1', status: 'present' },
  { sessionId: 'session-6', courseId: 'c2', status: 'present' },
  { sessionId: 'session-6', courseId: 'c3', status: 'present' },
  { sessionId: 'session-6', courseId: 'c4', status: 'present' },
  { sessionId: 'session-6', courseId: 'c5', status: 'late' },

  { sessionId: 'session-7', courseId: 'c1', status: 'excused' },
  { sessionId: 'session-7', courseId: 'c2', status: 'present' },
  { sessionId: 'session-7', courseId: 'c3', status: 'present' },
  { sessionId: 'session-7', courseId: 'c4', status: 'absent' },
  { sessionId: 'session-7', courseId: 'c5', status: 'present' },

  { sessionId: 'session-8', courseId: 'c1', status: 'present' },
  { sessionId: 'session-8', courseId: 'c2', status: 'late' },
  { sessionId: 'session-8', courseId: 'c3', status: 'present' },
  { sessionId: 'session-8', courseId: 'c4', status: 'excused' },
  { sessionId: 'session-8', courseId: 'c5', status: 'present' },

  { sessionId: 'session-9', courseId: 'c1', status: 'present' },
  { sessionId: 'session-9', courseId: 'c2', status: 'present' },
  { sessionId: 'session-9', courseId: 'c3', status: 'present' },
  { sessionId: 'session-9', courseId: 'c4', status: 'present' },
  { sessionId: 'session-9', courseId: 'c5', status: 'absent' },

  { sessionId: 'session-10', courseId: 'c1', status: 'absent' },
  { sessionId: 'session-10', courseId: 'c2', status: 'present' },
  { sessionId: 'session-10', courseId: 'c3', status: 'late' },
  { sessionId: 'session-10', courseId: 'c4', status: 'present' },
  { sessionId: 'session-10', courseId: 'c5', status: 'present' },

  { sessionId: 'session-11', courseId: 'c1', status: 'present' },
  { sessionId: 'session-11', courseId: 'c2', status: 'present' },
  { sessionId: 'session-11', courseId: 'c3', status: 'absent' },
  { sessionId: 'session-11', courseId: 'c4', status: 'present' },
  { sessionId: 'session-11', courseId: 'c5', status: 'excused' },

  { sessionId: 'session-12', courseId: 'c1', status: 'present' },
  { sessionId: 'session-12', courseId: 'c2', status: 'present' },
  { sessionId: 'session-12', courseId: 'c3', status: 'present' },
  { sessionId: 'session-12', courseId: 'c4', status: 'late' },
  { sessionId: 'session-12', courseId: 'c5', status: 'absent' },

  { sessionId: 'session-13', courseId: 'c1', status: 'present' },
  { sessionId: 'session-13', courseId: 'c2', status: 'excused' },
  { sessionId: 'session-13', courseId: 'c3', status: 'present' },
  { sessionId: 'session-13', courseId: 'c4', status: 'present' },
  { sessionId: 'session-13', courseId: 'c5', status: 'present' },

  { sessionId: 'session-14', courseId: 'c1', status: 'absent' },
  { sessionId: 'session-14', courseId: 'c2', status: 'present' },
  { sessionId: 'session-14', courseId: 'c3', status: 'late' },
  { sessionId: 'session-14', courseId: 'c4', status: 'present' },
  { sessionId: 'session-14', courseId: 'c5', status: 'present' },

  { sessionId: 'session-15', courseId: 'c1', status: 'present' },
  { sessionId: 'session-15', courseId: 'c2', status: 'present' },
  { sessionId: 'session-15', courseId: 'c3', status: 'absent' },
  { sessionId: 'session-15', courseId: 'c4', status: 'present' },
  { sessionId: 'session-15', courseId: 'c5', status: 'excused' },

  { sessionId: 'session-16', courseId: 'c1', status: 'present' },
  { sessionId: 'session-16', courseId: 'c2', status: 'present' },
  { sessionId: 'session-16', courseId: 'c3', status: 'present' },
  { sessionId: 'session-16', courseId: 'c4', status: 'present' },
  { sessionId: 'session-16', courseId: 'c5', status: 'late' },

  { sessionId: 'session-17', courseId: 'c1', status: 'excused' },
  { sessionId: 'session-17', courseId: 'c2', status: 'present' },
  { sessionId: 'session-17', courseId: 'c3', status: 'present' },
  { sessionId: 'session-17', courseId: 'c4', status: 'absent' },
  { sessionId: 'session-17', courseId: 'c5', status: 'present' },

  { sessionId: 'session-18', courseId: 'c1', status: 'present' },
  { sessionId: 'session-18', courseId: 'c2', status: 'late' },
  { sessionId: 'session-18', courseId: 'c3', status: 'present' },
  { sessionId: 'session-18', courseId: 'c4', status: 'excused' },
  { sessionId: 'session-18', courseId: 'c5', status: 'present' },

  { sessionId: 'session-19', courseId: 'c1', status: 'present' },
  { sessionId: 'session-19', courseId: 'c2', status: 'present' },
  { sessionId: 'session-19', courseId: 'c3', status: 'present' },
  { sessionId: 'session-19', courseId: 'c4', status: 'present' },
  { sessionId: 'session-19', courseId: 'c5', status: 'absent' },

  { sessionId: 'session-20', courseId: 'c1', status: 'absent' },
  { sessionId: 'session-20', courseId: 'c2', status: 'present' },
  { sessionId: 'session-20', courseId: 'c3', status: 'late' },
  { sessionId: 'session-20', courseId: 'c4', status: 'present' },
  { sessionId: 'session-20', courseId: 'c5', status: 'present' },
];


export const fetchCourses = async () => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  return COURSES;
};

export const fetchClassSessions = async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return CLASS_SESSIONS;
};

export const fetchAttendanceForSession = async (sessionId) => {
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay
  const sessionRecords = ATTENDANCE_DATA.filter(record => record.sessionId === sessionId);
  const session = CLASS_SESSIONS.find(s => s.id === sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  // Map the attendance data to include the date from the session
  return sessionRecords.map(record => ({
    id: `attendance-${record.sessionId}-${record.courseId}`,
    courseId: record.courseId,
    date: session.date,
    status: record.status,
  }));
};

export const generateAttendanceForDateRange = (startDate, endDate, classSessions, courses) => {
    const records = [];

    const sessionsInRange = classSessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= startDate && sessionDate <= endDate;
    });

    sessionsInRange.forEach(session => {
        courses.forEach(course => {
            // Find a corresponding entry in the fixed ATTENDANCE_DATA
            const existingRecord = ATTENDANCE_DATA.find(
                data => data.sessionId === session.id && data.courseId === course.id
            );

            records.push({
                id: `attendance-${session.id}-${course.id}`,
                courseId: course.id,
                date: session.date,
                status: existingRecord ? existingRecord.status : 'absent', // Default to 'absent' if no fixed data
            });
        });
    });

    return records;
};

// Simulate updating attendance status
export const updateAttendanceStatus = async (recordId, newStatus) => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  // In a real application, you would update your backend here.
  // For this simulation, we'll just acknowledge the update.
  console.log(`Updated record ${recordId} to status: ${newStatus}`);
  return { success: true };
};