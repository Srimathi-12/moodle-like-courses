
import { MoodleCourse, MoodleAssignment } from './types';
import { callMoodleApi } from './api';
import { determineAssignmentStatus, getCourseImageUrl } from './utils';

/**
 * Student specific API functions
 */
export const studentApi = {
  // Get student's courses
  getCourses: async (userId: number): Promise<MoodleCourse[]> => {
    const data = await callMoodleApi<{ courses: any[] }>('core_enrol_get_users_courses', {
      userid: userId
    });

    return data.courses.map((course: any) => ({
      id: course.id,
      fullname: course.fullname,
      shortname: course.shortname,
      summary: course.summary || '',
      categoryid: course.category,
      progress: course.progress,
      startdate: course.startdate,
      enddate: course.enddate,
      imageUrl: getCourseImageUrl(course),
    }));
  },

  // Get assignments for a student
  getAssignments: async (userId: number): Promise<MoodleAssignment[]> => {
    // First get all courses
    const courses = await studentApi.getCourses(userId);
    const assignments: MoodleAssignment[] = [];

    // Then get assignments for each course
    for (const course of courses) {
      const courseAssignments = await callMoodleApi<{ courses: any[] }>('mod_assign_get_assignments', {
        courseids: [course.id]
      });

      courseAssignments.courses.forEach((courseData) => {
        courseData.assignments.forEach((assign: any) => {
          // Get submission status if exists
          const status = determineAssignmentStatus(assign);

          assignments.push({
            id: assign.id,
            name: assign.name,
            course: course.fullname,
            duedate: assign.duedate,
            intro: assign.intro,
            status
          });
        });
      });
    }

    return assignments;
  },

  // Submit assignment
  submitAssignment: async (
    assignmentId: number,
    userId: number,
    submissionText: string
  ): Promise<void> => {
    await callMoodleApi('mod_assign_save_submission', {
      assignmentid: assignmentId,
      userid: userId,
      onlinetext: submissionText
    });
  }
};
