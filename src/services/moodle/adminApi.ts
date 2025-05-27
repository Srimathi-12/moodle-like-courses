
import { MoodleUser, MoodleCourse, UserRole } from './types';
import { callMoodleApi } from './api';
import { determineUserRole, getRoleIdByName, assignUserRole, getCourseImageUrl } from './utils';

/**
 * Admin specific API functions
 */
export const adminApi = {
  // Get all users
  getUsers: async (): Promise<MoodleUser[]> => {
    const data = await callMoodleApi<{ users: any[] }>('core_user_get_users', {
      criteria: [{ key: 'auth', value: 'manual' }]
    });
    
    return data.users.map((user: any) => ({
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: determineUserRole(user),
      profileimageurl: user.profileimageurl
    }));
  },
  
  // Create user
  createUser: async (user: Omit<MoodleUser, 'id'> & { password: string }): Promise<number> => {
    // First create the user
    const userData = await callMoodleApi<{id: number}>('core_user_create_users', {
      users: [{
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        auth: 'manual'
      }]
    });
    
    // Then assign the role
    const roleId = getRoleIdByName(user.role);
    if (roleId) {
      await assignUserRole(userData.id, roleId);
    }
    
    return userData.id;
  },
  
  // Get all courses
  getCourses: async (): Promise<MoodleCourse[]> => {
    const data = await callMoodleApi<{courses: any[]}>('core_course_get_courses');
    
    return data.courses.map((course: any) => ({
      id: course.id,
      fullname: course.fullname,
      shortname: course.shortname,
      summary: course.summary,
      categoryid: course.categoryid,
      startdate: course.startdate,
      enddate: course.enddate,
      imageUrl: getCourseImageUrl(course)
    }));
  },
  
  // Create course
  createCourse: async (course: Omit<MoodleCourse, 'id'>): Promise<number> => {
    const data = await callMoodleApi<{id: number}>('core_course_create_courses', {
      courses: [{
        fullname: course.fullname,
        shortname: course.shortname,
        categoryid: course.categoryid,
        summary: course.summary,
        startdate: course.startdate,
        enddate: course.enddate
      }]
    });
    
    return data.id;
  }
};
