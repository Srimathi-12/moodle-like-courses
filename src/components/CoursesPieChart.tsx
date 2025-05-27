import React from 'react';
import { Link } from 'react-router-dom';

interface CoursesPieChartProps {
  enrolled: number;
  total: number;
  linkTo: string;
}

const CoursesPieChart: React.FC<CoursesPieChartProps> = ({ enrolled, total, linkTo }) => {
  // Calculate percentages for the pie chart
  const enrolledPercentage = total > 0 ? (enrolled / total) * 100 : 0;
  const remainingPercentage = 100 - enrolledPercentage;

  // Calculate the circumference of the circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Calculate the dash offset for each segment
  const enrolledDashArray = (enrolledPercentage / 100) * circumference;
  const remainingDashArray = (remainingPercentage / 100) * circumference;

  return (
    <Link to={linkTo} className="block mt-4 group-hover:scale-105 transition-transform duration-300">
      <div className="relative w-[100px] h-[100px] mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle (total courses) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#FDBA74" // Orange color for total
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset="0"
            className="transition-all duration-500"
          />

          {/* Foreground circle (enrolled courses) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#2DD4BF" // Teal color for enrolled
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - enrolledDashArray}
            className="transition-all duration-500"
          />

          {/* Inner circle with text */}
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="white"
          />

          {/* Text in the center */}
          <text
            x="50"
            y="48"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold"
          >
            {Math.round(enrolledPercentage)}%
          </text>
          <text
            x="50"
            y="62"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[8px]"
          >
            Enrolled
          </text>
        </svg>

        {/* Legend */}
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#2DD4BF] rounded-full mr-1"></div>
            <span>{enrolled} Enrolled</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#FDBA74] rounded-full mr-1"></div>
            <span>{total} Total</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoursesPieChart;