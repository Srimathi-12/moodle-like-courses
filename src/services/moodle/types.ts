
// User roles
export type UserRole = 'admin' | 'teacher' | 'student';

// User interface
export interface MoodleUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  profileimageurl?: string;
}

// Course interface
export interface MoodleCourse {
  id: number;
  fullname: string;
  shortname: string;
  summary: string;
  categoryid: number;
  progress?: number;
  startdate: number;
  enddate: number;
  imageUrl?: string;
}

// Assignment interface
export interface MoodleAssignment {
  id: number;
  name: string;
  course: string;
  duedate: number;
  intro: string;
  status: 'pending' | 'overdue' | 'completed';
}
