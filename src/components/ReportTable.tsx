import React from 'react';
import { AttendanceStat } from '../utlis/types';

interface ReportTableProps {
  title: string;
  data: AttendanceStat[];
}

const ReportTable: React.FC<ReportTableProps> = ({ title, data }) => {
  if (!data.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Range
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Present
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Absent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Late
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Excused
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((stat, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stat.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stat.dateRange}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                  {stat.present}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                  {stat.absent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
                  {stat.late}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {stat.excused}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${stat.attendanceRate >= 90
                            ? 'bg-green-600'
                            : stat.attendanceRate >= 75
                              ? 'bg-yellow-500'
                              : 'bg-red-600'
                          }`}
                        style={{ width: `${stat.attendanceRate}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {stat.attendanceRate}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;