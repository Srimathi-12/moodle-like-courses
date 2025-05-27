import React from 'react';
import { FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AssignmentGraph, { Assignment } from './AssignmentGraph';

interface AssignmentsTabProps {
  assignments: Assignment[];
}

const AssignmentsTab: React.FC<AssignmentsTabProps> = ({ assignments }) => {
  // Get pending assignments and sort by due date
  const pendingAssignments = assignments
    .filter(assignment => !assignment.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-6">
      <AssignmentGraph
        assignments={assignments}
        pending={assignments.filter(a => !a.completed).length}
      //completed={assignments.filter(a => a.completed).length}
      />

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Upcoming Assignments</h3>

        {pendingAssignments.length > 0 ? (
          <div className="space-y-4">
            {pendingAssignments.map(assignment => (
              <div key={assignment.id} className="flex p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="mr-3">
                  <FileText className="h-10 w-10 p-2 bg-blue-100 text-[#9b87f5] rounded-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{assignment.title}</h3>
                  <p className="text-xs text-gray-500">{assignment.courseName}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" /> Due: {assignment.dueDate}
                  </p>
                </div>
                <Link
                  to={`/courses/${assignment.courseId}/assignments/${assignment.id}`}
                  className="self-center text-xs text-[#9b87f5] hover:underline"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">No pending assignments.</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentsTab;