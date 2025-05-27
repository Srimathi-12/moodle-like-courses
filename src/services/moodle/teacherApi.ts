
import { MoodleCourse, MoodleAssignment } from './types';
import { callMoodleApi } from './api';
import { getCourseImageUrl } from './utils';

/**
 * Teacher specific API functions
 */
export const teacherApi = {
  // Get teacher's courses
  getCourses: async (userId: number): Promise<MoodleCourse[]> => {
    const data = await callMoodleApi<{courses: any[]}>('core_enrol_get_users_courses', {
      userid: userId
    });
    
    return data.courses.map((course: any) => ({
      id: course.id,
      fullname: course.fullname,
      shortname: course.shortname,
      summary: course.summary || '',
      categoryid: course.category,
      startdate: course.startdate,
      enddate: course.enddate,
      imageUrl: getCourseImageUrl(course)
    }));
  },
  
  // Get assignments for a course
  getAssignments: async (courseId: number): Promise<MoodleAssignment[]> => {
    const data = await callMoodleApi<{courses: any[]}>('mod_assign_get_assignments', {
      courseids: [courseId]
    });
    
    const assignments: MoodleAssignment[] = [];
    
    // Extract assignments from the course
    data.courses.forEach((course) => {
      course.assignments.forEach((assign: any) => {
        assignments.push({
          id: assign.id,
          name: assign.name,
          course: course.fullname,
          duedate: assign.duedate,
          intro: assign.intro,
          status: 'pending' // Status would need to be determined per user
        });
      });
    });
    
    return assignments;
  },
  
  // Create assignment
  createAssignment: async (
    courseId: number, 
    name: string, 
    description: string, 
    dueDate: number
  ): Promise<number> => {
    const data = await callMoodleApi<{assignmentid: number}>('mod_assign_create_assignment', {
      assignmentdata: {
        courseid: courseId,
        name,
        intro: description,
        duedate: dueDate,
        assignsubmission_onlinetext_enabled: 1
      }
    });
    
    return data.assignmentid;
  }
};
