export type CoursesType = {
  id: string;
  name: string;
};

export type AttendanceRecord = {
  id: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
};

export type ClassSession = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  classNumber: number;
};

export type StatusCounts = {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  presentPercent: number;
};

export type AttendanceStat = {
  period: string;
  dateRange: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
};

export type ReportViewType = 'weekly' | 'monthly' | 'annual';

export type ChartDataPoint = {
  name: string;
  value: number;
  color: string;
};