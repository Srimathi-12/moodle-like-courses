import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Filter,
  Download,
  Search,
  ChevronDown,
  AlertTriangle,
  PieChart
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatDateString, formatDateRange } from '../utlis/date';
import AttendanceTable from '@/components/AttendanceTable';
import ReportTable from '@/components/ReportTable';
import { CoursesType, AttendanceRecord, ClassSession, StatusCounts, AttendanceStat, ReportViewType, ChartDataPoint } from '../utlis/types';

// Main AttendanceDashboard component
const Attendance = () => {
  // State management
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [classSessions, setClassSessions] = useState<ClassSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [savingChanges, setSavingChanges] = useState<boolean>(false);

  // Report state
  const [reportView, setReportView] = useState<ReportViewType>('weekly');
  const [reportData, setReportData] = useState<ChartDataPoint[]>([]);
  const [weeklyReportData, setWeeklyReportData] = useState<AttendanceStat[]>([]);
  const [monthlyReportData, setMonthlyReportData] = useState<AttendanceStat[]>([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // In a real application, these would be actual API calls
        const [coursesResponse, sessionsResponse] = await Promise.all([
          fetchCourses(),
          fetchClassSessions()
        ]);

        setCourses(coursesResponse);
        setClassSessions(sessionsResponse);

        // If there are sessions, select the most recent one by default
        if (sessionsResponse.length > 0) {
          // Sort sessions by date (most recent first)
          const sortedSessions = [...sessionsResponse].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setSelectedSession(sortedSessions[0].id);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch attendance records when a session is selected
  useEffect(() => {
    if (selectedSession) {
      fetchAttendanceForSession(selectedSession);
    }
  }, [selectedSession]);

  // Generate report data when report view changes or attendance records update
  useEffect(() => {
    generateReportData();
    generateAttendanceReports();
  }, [reportView, attendanceRecords, classSessions, courses]);

  // Simulated API calls - replace with actual API endpoints in production
  const fetchCourses = async (): Promise<CoursesType[]> => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Simulated courses data
    return [
      { id: 'c1', name: 'Hotel Management Induction' },
      { id: 'c2', name: 'sample' },
      { id: 'c3', name: 'sample 1' }
    ];
  };

  const fetchClassSessions = async (): Promise<ClassSession[]> => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const sessions: ClassSession[] = [];
    const startTimes = ['08:30 AM', '10:00 AM', '01:00 PM', '03:30 PM'];
    const endTimes = ['10:00 AM', '11:30 AM', '02:30 PM', '05:00 PM'];

    // Start date: March 1, 2025
    const startDate = new Date(2025, 2, 1); // Month is 0-indexed (2 = March)

    // Current date (for end date)
    const today = new Date();

    // Calculate number of days between start date and today
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Create sequential sessions from March 1, 2025 to today
    for (let i = 0; i <= diffDays; i++) {
      // Create a new date by adding i days to the start date
      const sessionDate = new Date(startDate);
      sessionDate.setDate(startDate.getDate() + i);
      const dateString = sessionDate.toISOString().split('T')[0];

      // Use a deterministic pattern for class times based on day of week
      const dayOfWeek = sessionDate.getDay(); // 0 = Sunday, 6 = Saturday

      // Skip weekends (Saturday and Sunday)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }

      const startTimeIndex = dayOfWeek % startTimes.length;
      const endTimeIndex = Math.min(startTimeIndex + 1, endTimes.length - 1);

      sessions.push({
        id: `session-${i + 1}`,
        title: `Class ${i + 1}`,
        date: dateString,
        startTime: startTimes[startTimeIndex],
        endTime: endTimes[endTimeIndex],
        classNumber: i + 1
      });
    }

    // Sort sessions by date (ascending order)
    sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return sessions;
  };

  const fetchAttendanceForSession = async (sessionId: string) => {
    try {
      setLoading(true);

      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 700));

      // Find the selected session to get its date
      const session = classSessions.find(s => s.id === sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      // Generate random attendance records for all courses
      const statuses: ('present' | 'absent' | 'late' | 'excused')[] = ['present', 'absent', 'late', 'excused'];
      const statusWeights = [0.7, 0.1, 0.15, 0.05];
      const getRandomStatus = (): 'present' | 'absent' | 'late' | 'excused' => {
        const random = Math.random();
        let sum = 0;

        for (let i = 0; i < statuses.length; i++) {
          sum += statusWeights[i];
          if (random < sum) {
            return statuses[i];
          }
        }

        return 'present';
      };
      const records: AttendanceRecord[] = courses.map(course => {
        const status = getRandomStatus();

        return {
          id: `attendance-${session.id}-${course.id}`,
          courseId: course.id,
          date: session.date,
          status: status,
        };
      });

      setAttendanceRecords(records);
      setLoading(false);
    } catch (err) {
      setError('Failed to load attendance records');
      setLoading(false);
    }
  };

  // Generate random attendance records for multiple sessions
  const generateAttendanceForDateRange = (
    startDate: Date,
    endDate: Date
  ): AttendanceRecord[] => {
    const records: AttendanceRecord[] = [];

    // Filter sessions within the date range
    const sessionsInRange = classSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= startDate && sessionDate <= endDate;
    });

    // For each session, create attendance records for each course
    sessionsInRange.forEach(session => {
      courses.forEach(course => {
        // Generate a random status with a bias towards 'present'
        const random = Math.random();
        let status: 'present' | 'absent' | 'late' | 'excused';

        if (random < 0.7) {
          status = 'present';
        } else if (random < 0.8) {
          status = 'absent';
        } else if (random < 0.95) {
          status = 'late';
        } else {
          status = 'excused';
        }

        records.push({
          id: `attendance-${session.id}-${course.id}`,
          courseId: course.id,
          date: session.date,
          status: status,
        });
      });
    });

    return records;
  };

  // Generate attendance data for reports based on actual class session dates
  const generateReportData = () => {
    if (!classSessions.length || !courses.length) return;

    const today = new Date();
    let filteredSessions = [];
    let records: AttendanceRecord[] = [];

    // Filter sessions based on the selected report view
    switch (reportView) {
      case 'weekly':
        // Get sessions from the past 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        filteredSessions = classSessions.filter(session =>
          new Date(session.date) >= oneWeekAgo && new Date(session.date) <= today
        );
        records = generateAttendanceForDateRange(oneWeekAgo, today);
        break;
      case 'monthly':
        // Get sessions from the past 30 days
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(today.getDate() - 30);
        filteredSessions = classSessions.filter(session =>
          new Date(session.date) >= oneMonthAgo && new Date(session.date) <= today
        );
        records = generateAttendanceForDateRange(oneMonthAgo, today);
        break;
      case 'annual':
        // Get sessions from the past 365 days
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        filteredSessions = classSessions.filter(session =>
          new Date(session.date) >= oneYearAgo && new Date(session.date) <= today
        );
        records = generateAttendanceForDateRange(oneYearAgo, today);
        break;
    }

    // Count attendance statuses
    let presentCount = records.filter(r => r.status === 'present').length;
    let absentCount = records.filter(r => r.status === 'absent').length;
    let lateCount = records.filter(r => r.status === 'late').length;
    let excusedCount = records.filter(r => r.status === 'excused').length;

    // Create chart data array
    const data = [
      { name: 'Present', value: presentCount, color: '#10B981' },
      { name: 'Absent', value: absentCount, color: '#EF4444' },
      { name: 'Late', value: lateCount, color: '#F59E0B' },
      { name: 'Excused', value: excusedCount, color: '#3B82F6' },
    ];

    setReportData(data);
  };

  // Helper function to get the start of week (Monday)
  const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Helper function to get the end of week (Sunday)
  const getWeekEnd = (date: Date): Date => {
    const weekStart = getWeekStart(date);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
  };

  // Generate weekly and monthly report data based on actual class sessions
  const generateAttendanceReports = () => {
    if (!classSessions.length || !courses.length) return;

    // Get the first and last session dates
    const sortedSessions = [...classSessions].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (sortedSessions.length === 0) return;

    const firstSessionDate = new Date(sortedSessions[0].date);
    const lastSessionDate = new Date(sortedSessions[sortedSessions.length - 1].date);

    // Generate weekly report data based on actual class sessions
    const weeklyData: AttendanceStat[] = [];

    // Start from the week containing the first session
    let currentWeekStart = getWeekStart(firstSessionDate);
    let weekNumber = 1;

    while (currentWeekStart <= lastSessionDate) {
      const currentWeekEnd = getWeekEnd(currentWeekStart);

      // Get sessions in this week range
      const weekSessions = classSessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= currentWeekStart && sessionDate <= currentWeekEnd;
      });

      // Only process weeks that have sessions
      if (weekSessions.length > 0) {
        // Generate attendance records for this week
        const weekRecords = generateAttendanceForDateRange(currentWeekStart, currentWeekEnd);

        // Count statuses
        const present = weekRecords.filter(r => r.status === 'present').length;
        const absent = weekRecords.filter(r => r.status === 'absent').length;
        const late = weekRecords.filter(r => r.status === 'late').length;
        const excused = weekRecords.filter(r => r.status === 'excused').length;

        const total = present + absent + late + excused;
        const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

        weeklyData.push({
          period: `Week ${weekNumber}`,
          dateRange: formatDateRange(currentWeekStart, currentWeekEnd),
          present,
          absent,
          late,
          excused,
          attendanceRate
        });

        weekNumber++;
      }

      // Move to next week
      currentWeekStart = new Date(currentWeekStart);
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    // Generate monthly report data based on actual class sessions
    const monthlyData: AttendanceStat[] = [];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    // Get unique months that have sessions
    const sessionMonths = new Set<string>();
    classSessions.forEach(session => {
      const sessionDate = new Date(session.date);
      const monthKey = `${sessionDate.getFullYear()}-${sessionDate.getMonth()}`;
      sessionMonths.add(monthKey);
    });

    // Convert to sorted array of month objects
    const sortedMonths = Array.from(sessionMonths)
      .map(monthKey => {
        const [year, month] = monthKey.split('-').map(Number);
        return { year, month };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });

    // Generate data for each month that has sessions
    sortedMonths.forEach(({ year, month }) => {
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0); // Last day of the month

      // Get sessions in this month
      const monthSessions = classSessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= monthStart && sessionDate <= monthEnd;
      });

      if (monthSessions.length > 0) {
        // Generate attendance records for this month
        const monthRecords = generateAttendanceForDateRange(monthStart, monthEnd);

        // Count statuses
        const present = monthRecords.filter(r => r.status === 'present').length;
        const absent = monthRecords.filter(r => r.status === 'absent').length;
        const late = monthRecords.filter(r => r.status === 'late').length;
        const excused = monthRecords.filter(r => r.status === 'excused').length;

        const total = present + absent + late + excused;
        const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

        const monthName = months[month];
        const yearStr = year !== new Date().getFullYear() ? ` ${year}` : '';

        monthlyData.push({
          period: `${monthName}${yearStr}`,
          dateRange: formatDateRange(monthStart, monthEnd),
          present,
          absent,
          late,
          excused,
          attendanceRate
        });
      }
    });

    setWeeklyReportData(weeklyData);
    setMonthlyReportData(monthlyData);
  };

  // Handle attendance status change
  const handleStatusChange = async (recordId: string) => {
    // Begin editing this record
    setEditingRecord(recordId);

    // Update the record in the local state first (optimistic update)
    setAttendanceRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId ? { ...record } : record
      )
    );

    try {
      // Simulate API call to update attendance
      setSavingChanges(true);
      await new Promise(resolve => setTimeout(resolve, 600));

      setSavingChanges(false);
      setEditingRecord(null);
    } catch (err) {
      // If the update fails, revert the optimistic update
      setSavingChanges(false);
      setError('Failed to update attendance status');

      // Refresh the data to ensure consistency
      if (selectedSession) {
        fetchAttendanceForSession(selectedSession);
      }
    }
  };

  // Export attendance data as CSV
  const exportAttendanceData = () => {
    // Find the selected session
    const session = classSessions.find(s => s.id === selectedSession);
    if (!session) return;

    // Create CSV content
    let csvContent = "Course Name,Status\n";

    attendanceRecords.forEach(record => {
      const course = courses.find(c => c.id === record.courseId);
      if (course) {
        csvContent += `"${course.name}","${record.status}"\n`;
      }
    });

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance-${session.date}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate attendance statistics
  const calculateStats = () => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status === 'present').length;
    const absent = attendanceRecords.filter(r => r.status === 'absent').length;
    const late = attendanceRecords.filter(r => r.status === 'late').length;
    const excused = attendanceRecords.filter(r => r.status === 'excused').length;

    const presentPercent = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, late, excused, presentPercent };
  };

  const stats = calculateStats();

  // Get the status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{data.name}</p>
          <p>Count: {data.value}</p>
          <p>Percentage: {((data.value / reportData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  // Handle pie chart segment click
  const handlePieClick = (data: any) => {
    // Set the status filter to show the clicked status
    if (data && data.name) {
      setStatusFilter(data.name.toLowerCase());
    }
  };

  // Render loading state
  if (loading && !attendanceRecords.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading attendance data...</p>
      </div>
    );
  }

  // Render error state
  if (error && !attendanceRecords.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle size={32} />
        <p className="mt-2">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setError(null);
            if (selectedSession) {
              fetchAttendanceForSession(selectedSession);
            }
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Filter attendance records based on search query and status filter
  const filteredAttendanceRecords = attendanceRecords.filter(record => {
    const course = courses.find(c => c.id === record.courseId);

    // Status filter
    if (statusFilter !== 'all' && record.status !== statusFilter) {
      return false;
    }

    // Search query filter
    if (searchQuery && course) {
      const query = searchQuery.toLowerCase();
      return course.name.toLowerCase().includes(query);
    }

    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Attendance Management</h2>

      {/* Attendance Reports and Visualization Section */}
      <div className="mb-8 border-b pb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <PieChart size={20} className="mr-2 text-blue-500" />
          Attendance Reports
        </h3>

        {/* Report Type Selector */}
        <div className="flex mb-6 space-x-2">
          <button
            onClick={() => setReportView('weekly')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${reportView === 'weekly'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setReportView('monthly')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${reportView === 'monthly'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setReportView('annual')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${reportView === 'annual'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Annual
          </button>
        </div>

        {/* Attendance Chart */}
        <div className="mt-4" style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <RechartsPieChart>
              <Pie
                data={reportData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onClick={handlePieClick}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                cursor="pointer"
                animationDuration={800}
              >
                {reportData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly and Monthly Attendance Reports */}
        <div className="mt-8">
          <ReportTable
            title="Weekly Attendance Report"
            data={weeklyReportData}
          />

          <ReportTable
            title="Monthly Attendance Report"
            data={monthlyReportData}
          />
        </div>
      </div>

      {/* Session selector and stats panel */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Class Session</label>
          <div className="relative">
            <select
              value={selectedSession || ''}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {classSessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {formatDateString(session.date)} - Class {session.classNumber} ({session.startTime})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search box */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Filter size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">Filter:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="excused">Excused</option>
          </select>
        </div>

        {/* Export button */}
        <button
          onClick={exportAttendanceData}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          <Download size={16} className="mr-2" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Courses attendance table */}
      <AttendanceTable
        filteredAttendanceRecords={filteredAttendanceRecords}
        courses={courses}
        editingRecord={editingRecord}
        getStatusColorClass={getStatusColorClass}
        handleStatusChange={handleStatusChange}
      />

      {/* Loading overlay for saving changes */}
      {savingChanges && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
            <p>Saving changes...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;