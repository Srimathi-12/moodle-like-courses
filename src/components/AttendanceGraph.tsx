import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CoursesType, AttendanceRecord, ClassSession, StatusCounts, AttendanceStat, ReportViewType, ChartDataPoint } from '../utlis/types';

const AttendanceGraph = ({ attendanceData }) => {
  const ATTENDANCE_COLORS = ['#10B981', '#EF4444', '#F59E0B']; // Green for present, Red for absent, Orange for excused
  const [reportData, setReportData] = useState<ChartDataPoint[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handlePieClick = (data: any) => {
    // Set the status filter to show the clicked status
    if (data && data.name) {
      setStatusFilter(data.name.toLowerCase());
    }
  };

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

  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart>
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

        <Legend
          layout="horizontal" // Legend items arranged horizontally
          verticalAlign="bottom" // Legend placed at the bottom
          align="center" // Legend aligned to the center
          iconType="circle" // Icon shape for legend items
          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} // Inline style for the legend wrapper
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AttendanceGraph;