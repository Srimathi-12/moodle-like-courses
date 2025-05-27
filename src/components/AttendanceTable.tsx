import React from 'react';
import { AttendanceRecord, CoursesType } from '../utlis/types';

interface AttendanceTableProps {
  filteredAttendanceRecords: AttendanceRecord[];
  courses: CoursesType[];
  editingRecord: string | null;
  getStatusColorClass: (status: string) => string;
  handleStatusChange?: (recordId: string, newStatus: 'present' | 'absent' | 'late' | 'excused') => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  filteredAttendanceRecords,
  courses,
  editingRecord,
  getStatusColorClass,
  handleStatusChange
}) => {
  // If no records to display, show a message
  if (filteredAttendanceRecords.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-gray-500">No attendance records found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAttendanceRecords.map((record) => {
            const course = courses.find((c) => c.id === record.courseId);

            if (!course) return null;

            return (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{course.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(
                      record.status
                    )}`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;