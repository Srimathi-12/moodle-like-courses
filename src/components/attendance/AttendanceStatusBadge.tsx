
import React from 'react';
import { cn } from '@/lib/utils';
import type { AttendanceRecord } from '@/types/attendance';

interface AttendanceStatusBadgeProps {
  status: AttendanceRecord['status'];
}

const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium";
  let specificClasses = "";

  switch (status) {
    case 'Present':
      specificClasses = "bg-green-100 text-green-700";
      break;
    case 'Leave':
      specificClasses = "bg-red-100 text-red-700";
      break;
    case 'Absent':
      specificClasses = "bg-yellow-100 text-yellow-700";
      break;
    case 'Holiday':
      specificClasses = "bg-blue-100 text-blue-700";
      break;
    default:
      specificClasses = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={cn(baseClasses, specificClasses)}>
      {status}
    </span>
  );
};

export default AttendanceStatusBadge;
