import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  courseId: number | string;
  courseName: string;
  completed: boolean;
}

interface AssignmentGraphProps {
  assignments: Assignment[];
  pending: number;
  className?: string;
}

const AssignmentGraph: React.FC<AssignmentGraphProps> = ({ assignments, pending, className }) => {

  // Calculate completed assignments directly from the assignments array
  const completed = assignments.filter(a => a.completed).length;

  // Calculate total assignments as the sum of pending and completed.
  // This ensures consistency even if 'assignments.length' might include other states.
  const total = pending + completed;

  // Calculate percentages for visual display
  const pendingPercentage = total > 0 ? (pending / total) * 100 : 0;
  const completedPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className={`mt-4 ${className || ''}`}> {/* Applied className prop here */}
      <div className="flex justify-between text-xs text-gray-500 mb-1 font-sans"> {/* Added font-sans */}
        <span>Pending: {pending}</span>
        <span>Completed: {completed}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        {total > 0 ? (
          <>
            <div
              className="h-full bg-amber-500 float-left transition-all duration-300 ease-in-out"
              style={{ width: `${pendingPercentage}%` }}
            ></div>
            <div
              className="h-full bg-green-500 float-left transition-all duration-300 ease-in-out"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </>
        ) : (
          <div className="h-full w-full bg-gray-300"></div>
        )}
      </div>
      <div className="flex justify-between text-xs mt-1 font-sans"> {/* Added font-sans */}
        <span className="text-amber-500 font-medium">{Math.round(pendingPercentage)}%</span>
        <span className="text-green-500 font-medium">{Math.round(completedPercentage)}%</span>
      </div>
    </div>
  );
};

export default AssignmentGraph;
