import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, BookOpenText, Users, Video, TrendingUp, FileText, Award, MessageSquare, CalendarCheck,
  UserCog, LogIn, LogOut, Hourglass // Added new icons for attendance stats
} from 'lucide-react';
import { formatSlugToTitle } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// Import new attendance components
import UserInfoDisplay from '@/components/attendance/UserInfoDisplay';
import AttendanceSummaryCards from '@/components/attendance/AttendanceSummaryCards';
import AttendanceLogTable from '@/components/attendance/AttendanceLogTable';
import type { AttendanceUser, AttendanceSummaryStat, AttendanceRecord } from '@/types/attendance';

interface Question {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  module: string; // To associate question with the current module
}

// Mock Data for Attendance Page
const mockUser: AttendanceUser = {
  name: 'Maria Smith',
  role: 'Software Developer',
  avatarUrl: '/lovable-uploads/a0ea16b1-c036-4d64-b3be-66cfb7fcd71e.png', // Using the uploaded image URL as an example if it were a user avatar. Otherwise, use a placeholder.
  employeeId: 'IM06587UT',
  joiningDate: '12 January 2015',
  department: 'Account',
};

const mockSummaryStats: AttendanceSummaryStat[] = [
  { id: '1', label: 'Average Working Hour', value: '08:00', icon: UserCog, iconColorClass: 'text-blue-600', bgColorClass: 'bg-blue-100' },
  { id: '2', label: 'Average In Time', value: '10:30 AM', icon: LogIn, iconColorClass: 'text-green-600', bgColorClass: 'bg-green-100' },
  { id: '3', label: 'Average Out Time', value: '07:30 PM', icon: LogOut, iconColorClass: 'text-orange-600', bgColorClass: 'bg-orange-100' },
  { id: '4', label: 'Average Break Time', value: '01:00', icon: Hourglass, iconColorClass: 'text-red-600', bgColorClass: 'bg-red-100' },
];

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', date: '22 OCT, 2020', checkIn: '09:00 am', checkOut: '05:01 pm', status: 'Present' },
  { id: '2', date: '21 OCT, 2020', checkIn: '09:05 am', checkOut: '04:55 pm', status: 'Present' },
  { id: '3', date: '20 OCT, 2020', checkIn: 'N/A', checkOut: 'N/A', status: 'Leave' },
  { id: '4', date: '19 OCT, 2020', checkIn: '08:58 am', checkOut: '05:03 pm', status: 'Present' },
  { id: '5', date: '18 OCT, 2020', checkIn: '09:10 am', checkOut: '05:00 pm', status: 'Present' },
  { id: '6', date: '17 OCT, 2020', checkIn: '09:00 am', checkOut: '05:00 pm', status: 'Present' },
  { id: '7', date: '16 OCT, 2020', checkIn: 'N/A', checkOut: 'N/A', status: 'Holiday' },
  { id: '8', date: '15 OCT, 2020', checkIn: '09:15 am', checkOut: '05:10 pm', status: 'Present' },
  { id: '9', date: '14 OCT, 2020', checkIn: 'N/A', checkOut: 'N/A', status: 'Absent' },
  { id: '10', date: '13 OCT, 2020', checkIn: '08:55 am', checkOut: '04:50 pm', status: 'Present' },
  { id: '11', date: '12 OCT, 2020', checkIn: '09:00 am', checkOut: '05:00 pm', status: 'Present' },
];

const ModulePage: React.FC = () => {
  const { courseSlug, moduleSlug } = useParams<{ courseSlug: string; moduleSlug: string }>();
  
  const courseTitle = courseSlug ? formatSlugToTitle(courseSlug) : 'Course';
  const moduleTitle = moduleSlug ? formatSlugToTitle(moduleSlug) : 'Module';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [isAskQuestionDialogOpen, setIsAskQuestionDialogOpen] = useState<boolean>(false);

  const handleAskQuestion = () => {
    if (!newQuestionText.trim()) {
      toast({
        title: "Error",
        description: "Question cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    const newQuestion: Question = {
      id: Date.now().toString(), // Simple ID generation
      text: newQuestionText,
      author: "Student", // Hardcoded for now
      timestamp: new Date(),
      module: moduleTitle,
    };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    setNewQuestionText('');
    setIsAskQuestionDialogOpen(false);
    toast({
      title: "Success",
      description: "Your question has been submitted!",
    });
  };

  // Helper function to create a consistent section layout
  const renderModuleSection = (icon: React.ReactNode, title: string, children: React.ReactNode) => (
    <div className="mt-6 p-4 border-l-4 border-academic-blue bg-blue-50 rounded-r-lg">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="text-lg font-medium text-academic-blue ml-2">{title}</h3>
      </div>
      <div className="text-academic-dark-gray space-y-2">
        {children}
      </div>
    </div>
  );

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
          {/* Attendance page custom layout - No bg-white p-6 shadow-md wrapper here, components manage their own Card styling */}
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

          {moduleSlug === 'clear-all-your-doubts' && renderModuleSection(
            <MessageSquare className="h-5 w-5 text-academic-blue" />,
            "Clear All Your Doubts",
            <>
              <p>Welcome to the Doubts Clarification Hub for {courseTitle}!</p>
              <p>Here, you can post your questions about any topic covered in the "{moduleTitle}" module. Our instructors and fellow learners will help you resolve them.</p>
              
              <Dialog open={isAskQuestionDialogOpen} onOpenChange={setIsAskQuestionDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4">Ask a Question</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                  <DialogHeader>
                    <DialogTitle>Ask a New Question</DialogTitle>
                    <DialogDescription>
                      Type your question about "{moduleTitle}" below. It will be visible to instructors and other students.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      id="questionText"
                      placeholder="Type your question here..."
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" onClick={() => setNewQuestionText('')}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAskQuestion}>Submit Question</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-700 mb-3">Asked Questions:</h4>
                {questions.filter(q => q.module === moduleTitle).length > 0 ? (
                  <div className="space-y-4">
                    {questions.filter(q => q.module === moduleTitle).map((question) => (
                      <div key={question.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                        <p className="text-sm text-gray-800">{question.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Asked by: {question.author} on {question.timestamp.toLocaleDateString()} at {question.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No questions have been asked for this module yet. Be the first!</p>
                )}
              </div>
              
              <p className="mt-6"><strong>Other Features (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4 text-sm">
                <li>FAQ section for common queries.</li>
                <li>Direct messaging with instructors (subject to availability).</li>
                <li>Scheduled Q&A sessions.</li>
              </ul>
            </>
          )}

          {moduleSlug === 'introduction' && renderModuleSection(
            <BookOpenText className="h-5 w-5 text-academic-blue" />,
            "Module Introduction",
            <>
              <p>This module, "{moduleTitle}," serves as the foundational starting point for {courseTitle}.</p>
              <p><strong>What you'll learn (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Core concepts and terminology.</li>
                <li>Overview of the module structure and learning objectives.</li>
                <li>Prerequisites (if any) and how to prepare.</li>
              </ul>
              <p className="mt-2">We recommend going through all introductory materials before proceeding to subsequent sections.</p>
            </>
          )}

          {moduleSlug === 'operations' && renderModuleSection(
            <Users className="h-5 w-5 text-academic-blue" />,
            "Operations & Practical Application",
            <>
              <p>Dive into the practical aspects of {moduleTitle} within {courseTitle}.</p>
              <p><strong>Key operational topics (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Hands-on exercises and simulations.</li>
                <li>Case studies of real-world applications.</li>
                <li>Tools and techniques used in {moduleTitle.toLowerCase()}.</li>
              </ul>
              <p className="mt-2">This section focuses on applying theoretical knowledge to solve practical problems.</p>
            </>
          )}
          
          {moduleSlug === 'management' && renderModuleSection(
            <Users className="h-5 w-5 text-academic-blue" />, // Re-using Users icon, consider a more specific one if available
            "Management Strategies",
            <>
              <p>Explore management principles relevant to {moduleTitle} in {courseTitle}.</p>
              <p><strong>Focus areas (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Project management in {moduleTitle.toLowerCase()}.</li>
                <li>Team leadership and collaboration.</li>
                <li>Resource allocation and optimization.</li>
              </ul>
              <p className="mt-2">Learn how to effectively manage projects and teams in this domain.</p>
            </>
          )}

          {moduleSlug === 'virtual-classroom' && renderModuleSection(
            <Video className="h-5 w-5 text-academic-blue" />,
            "Virtual Classroom",
            <>
              <p>Join live sessions, watch recorded lectures, and interact with instructors and peers in the "{moduleTitle}" virtual classroom.</p>
              <p><strong>Classroom features (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Schedule of upcoming live classes.</li>
                <li>Access to recordings of past sessions.</li>
                <li>Interactive whiteboards and screen sharing.</li>
                <li>Breakout rooms for group discussions.</li>
              </ul>
              <Button className="mt-4">Join Upcoming Session</Button>
            </>
          )}

          {moduleSlug === 'trends-discussion' && renderModuleSection(
            <TrendingUp className="h-5 w-5 text-academic-blue" />,
            "Trends Discussion",
            <>
              <p>Stay updated with the latest trends and developments in {moduleTitle.toLowerCase()}.</p>
              <p><strong>Discussion points (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Industry news and articles.</li>
                <li>Emerging technologies and methodologies.</li>
                <li>Forum for discussing future outlooks.</li>
              </ul>
              <p className="mt-2">Engage in discussions about how {courseTitle} is evolving.</p>
            </>
          )}

          {moduleSlug === 'assignment-and-assessment' && renderModuleSection(
            <FileText className="h-5 w-5 text-academic-blue" />,
            "Assignments & Assessments",
            <>
              <p>Submit your assignments and take assessments for the "{moduleTitle}" module of {courseTitle}.</p>
              <p><strong>Current tasks (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Assignment 1: Due [Date] - Status: Not Started</li>
                <li>Quiz 1: Available until [Date] - Status: Pending</li>
                <li>Final Project Guidelines.</li>
              </ul>
              <p className="mt-2">Ensure you complete all tasks by their respective deadlines.</p>
              <Button variant="secondary" className="mt-4">View All Assessments</Button>
            </>
          )}
          
          {moduleSlug === 'certificate' && renderModuleSection(
            <Award className="h-5 w-5 text-academic-blue" />,
            "Course Certificate",
            <>
              <p>Information about your certificate of completion for {courseTitle}.</p>
              <p><strong>Eligibility and Status (Placeholder):</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Completion Status: 70% (example)</li>
                <li>Minimum Requirement for Certificate: All modules completed, final assessment passed.</li>
                <li>Certificate Availability: Upon successful completion.</li>
              </ul>
              <p className="mt-2">Once you meet all requirements, your certificate will be available for download here.</p>
              <Button disabled className="mt-4">Download Certificate (Not Yet Available)</Button>
            </>
          )}

          {![
              'clear-all-your-doubts', 'attendance', 'introduction', 'operations', 
              'management', 'virtual-classroom', 'trends-discussion', 
              'assignment-and-assessment', 'certificate'
            ].includes(moduleSlug || '') && (
            <p className="text-academic-dark-gray mt-4">
              Content for the "{moduleTitle}" module is currently under development. Please check back soon!
            </p>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ModulePage;
