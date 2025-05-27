import { Assignment } from '@/components/AssignmentGraph';

/**
 * Processes event data to extract assignment information
 */
export const processAssignmentData = (events: any[]): Assignment[] => {
  if (!events || !Array.isArray(events)) {
    return [];
  }

  // Filter events that are assignments
  const assignmentEvents = events.filter(event => event.type === 'assignment');

  // Transform to Assignment structure
  return assignmentEvents.map(event => {
    // Extract course name from title (assuming format "Assignment Due: Course Name")
    const courseName = event.title.replace('Assignment Due: ', '');

    // Parse the date string
    const dateString = event.date.split(',')[0];

    return {
      id: event.id,
      title: event.title,
      dueDate: event.date,
      courseId: event.courseId || 0, // Default if not available
      courseName,
      completed: false // Default all extracted assignments to not completed
    };
  });
};

/**
 * Generate sample completed assignments based on pending assignments
 * for demonstration purposes only
 */
export const getAssignmentData = (pendingAssignments: Assignment[]): Assignment[] => {
  // In a real app, this would fetch from an API
  // For now, we'll create some completed assignments based on the pending ones
  // without adding sample data
  const completedAssignments: Assignment[] = [];

  // Return the combined list
  return [...pendingAssignments, ...completedAssignments];
};