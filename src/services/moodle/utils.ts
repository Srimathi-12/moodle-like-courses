
import { UserRole } from './types';
import { callMoodleApi } from './api';

/**
 * Determine the user role based on capabilities
 */
export function determineUserRole(user: any): UserRole {
  // This is simplified - in reality, you would need to check role assignments
  // A real implementation would use core_role_get_user_roles
  
  // Simplified logic based on capabilities or system roles
  if (user.capabilities && user.capabilities["moodle/site:config"]) {
    return 'admin';
  } else if (user.capabilities && user.capabilities["moodle/course:update"]) {
    return 'teacher';
  } else {
    return 'student';
  }
}

/**
 * Determine assignment status
 */
export function determineAssignmentStatus(assignment: any): 'pending' | 'overdue' | 'completed' {
  const now = Math.floor(Date.now() / 1000);
  
  if (assignment.submissions && assignment.submissions.submitted) {
    return 'completed';
  } else if (assignment.duedate && assignment.duedate < now) {
    return 'overdue';
  } else {
    return 'pending';
  }
}

/**
 * Get role ID by role name
 */
export function getRoleIdByName(roleName: UserRole): number {
  // These IDs should be fetched from Moodle, this is just a placeholder
  const roleMap: Record<UserRole, number> = {
    admin: 1,
    teacher: 3,
    student: 5
  };
  
  return roleMap[roleName];
}

/**
 * Assign a role to a user
 */
export async function assignUserRole(userId: number, roleId: number): Promise<void> {
  await callMoodleApi('core_role_assign_roles', {
    assignments: [{
      roleid: roleId,
      userid: userId,
      contextid: 1 // System context
    }]
  });
}

/**
 * Get course image URL
 */
export function getCourseImageUrl(course: any): string {
  // In real implementation, you would get this from course entity
  return course.overviewfiles?.[0]?.fileurl || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop';
}
