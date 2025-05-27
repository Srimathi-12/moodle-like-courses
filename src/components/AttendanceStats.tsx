import React from 'react';
import { StatusCounts } from '../utlis/types';

interface AttendanceStatsProps {
  stats: StatusCounts;
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="text-gray-600 font-semibold">Total</div>
        <div className="text-2xl font-bold mt-1">{stats.total}</div>
        <div className="text-sm text-gray-500 mt-1">students</div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="text-green-600 font-semibold">Present</div>
        <div className="text-2xl font-bold mt-1">{stats.present}</div>
        <div className="text-sm text-green-500 mt-1">{stats.presentPercent}% of total</div>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="text-red-600 font-semibold">Absent</div>
        <div className="text-2xl font-bold mt-1">{stats.absent}</div>
        <div className="text-sm text-red-500 mt-1">{stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0}% of total</div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="text-yellow-600 font-semibold">Late</div>
        <div className="text-2xl font-bold mt-1">{stats.late}</div>
        <div className="text-sm text-yellow-500 mt-1">{stats.total > 0 ? Math.round((stats.late / stats.total) * 100) : 0}% of total</div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="text-blue-600 font-semibold">Excused</div>
        <div className="text-2xl font-bold mt-1">{stats.excused}</div>
        <div className="text-sm text-blue-500 mt-1">{stats.total > 0 ? Math.round((stats.excused / stats.total) * 100) : 0}% of total</div>
      </div>
    </div>
  );
};

export default AttendanceStats;