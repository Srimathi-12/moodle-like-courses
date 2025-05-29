import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { formatSlugToTitle } from '@/lib/utils';

// Import attendance components
import UserInfoDisplay from '@/components/attendance/UserInfoDisplay';
import AttendanceSummaryCards from '@/components/attendance/AttendanceSummaryCards';
import AttendanceLogTable from '@/components/attendance/AttendanceLogTable';
import type { AttendanceUser, AttendanceSummaryStat, AttendanceRecord } from '@/types/attendance';

// Import new module components
import ModuleRenderer from '@/components/modules/ModuleRenderer';

interface Question {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  module: string;
}

// Mock Data for Attendance Page
const mockUser: AttendanceUser = {
  name: 'Maria Smith',
  role: 'Software Developer',
  avatarUrl: '/lovable-uploads/a0ea16b1-c036-4d64-b3be-66cfb7fcd71e.png',
  employeeId: 'IM06587UT',
  joiningDate: '12 January 2015',
  department: 'Account',
};

const mockSummaryStats: AttendanceSummaryStat[] = [
  { id: '1', label: 'Average Working Hour', value: '08:00', icon: 'UserCog', iconColorClass: 'text-blue-600', bgColorClass: 'bg-blue-100' },
  { id: '2', label: 'Average In Time', value: '10:30 AM', icon: 'LogIn', iconColorClass: 'text-green-600', bgColorClass: 'bg-green-100' },
  { id: '3', label: 'Average Out Time', value: '07:30 PM', icon: 'LogOut', iconColorClass: 'text-orange-600', bgColorClass: 'bg-orange-100' },
  { id: '4', label: 'Average Break Time', value: '01:00', icon: 'Hourglass', iconColorClass: 'text-red-600', bgColorClass: 'bg-red-100' },
];

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', date: '27 MAY, 2025', checkIn: '09:00 am', checkOut: '05:01 pm', status: 'Present' },
  { id: '2', date: '26 MAY, 2025', checkIn: '09:05 am', checkOut: '04:55 pm', status: 'Present' },
  { id: '3', date: '23 MAY, 2025', checkIn: 'N/A', checkOut: 'N/A', status: 'Leave' }, // Friday
  { id: '4', date: '22 MAY, 2025', checkIn: '08:58 am', checkOut: '05:03 pm', status: 'Present' },
  { id: '5', date: '21 MAY, 2025', checkIn: '09:10 am', checkOut: '05:00 pm', status: 'Present' },
  { id: '6', date: '20 MAY, 2025', checkIn: '09:00 am', checkOut: '05:00 pm', status: 'Present' },
  { id: '7', date: '19 MAY, 2025', checkIn: 'N/A', checkOut: 'N/A', status: 'Holiday' }, // Victoria Day (Example Holiday)
  { id: '8', date: '16 APR, 2025', checkIn: '09:15 am', checkOut: '05:10 pm', status: 'Present' },
  { id: '9', date: '15 APR, 2025', checkIn: 'N/A', checkOut: 'N/A', status: 'Absent' },
  { id: '10', date: '14 APR, 2025', checkIn: '08:55 am', checkOut: '04:50 pm', status: 'Present' },
  { id: '11', date: '11 APR, 2025', checkIn: '09:00 am', checkOut: '05:00 pm', status: 'Present' },
  { id: '12', date: '10 APR, 2025', checkIn: '09:02 am', checkOut: '05:02 pm', status: 'Present' },
  { id: '13', date: '09 APR, 2025', checkIn: 'N/A', checkOut: 'N/A', status: 'Leave' },
  { id: '14', date: '08 APR, 2025', checkIn: '08:59 am', checkOut: '04:58 pm', status: 'Present' },
  { id: '15', date: '07 APR, 2025', checkIn: '09:03 am', checkOut: '05:00 pm', status: 'Present' },
];

const ModulePage: React.FC = () => {
  const { courseSlug, moduleSlug } = useParams<{ courseSlug: string; moduleSlug: string }>();
  
  const courseTitle = courseSlug ? formatSlugToTitle(courseSlug) : 'Course';
  const moduleTitle = moduleSlug ? formatSlugToTitle(moduleSlug) : 'Module';

  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAskQuestion = (newQuestion: Question) => {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  return (
    <Layout>
      <div className="mb-6">
        <Link 
          to={`/course/${courseSlug}`} 
          className="inline-flex items-center text-academic-blue hover:underline mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {courseTitle} Overview
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">{moduleTitle}</h1>
      </div>

      {moduleSlug === 'attendance' ? (
        <div className="space-y-6">
          <UserInfoDisplay user={mockUser} />
          <AttendanceSummaryCards stats={mockSummaryStats} />
          <AttendanceLogTable records={mockAttendanceRecords} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Welcome to {moduleTitle}</h2>
          <p className="text-academic-dark-gray">
            This is the dedicated page for the "{moduleTitle}" module of the "{courseTitle}" course. 
            Below you'll find placeholder content specific to this module type.
          </p>

          <ModuleRenderer
            moduleSlug={moduleSlug || ''}
            moduleTitle={moduleTitle}
            courseTitle={courseTitle}
            questions={questions}
            onAskQuestion={handleAskQuestion}
          />
        </div>
      )}
    </Layout>
  );
};

export default ModulePage;
