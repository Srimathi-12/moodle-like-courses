
import type { LucideIcon } from 'lucide-react';

export interface AttendanceUser {
  name: string;
  role: string;
  avatarUrl?: string;
  employeeId: string;
  joiningDate: string; // e.g., "12 January 2015"
  department: string;
}

export interface AttendanceSummaryStat {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  iconColorClass: string;
  bgColorClass: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Leave' | 'Absent' | 'Holiday';
}
