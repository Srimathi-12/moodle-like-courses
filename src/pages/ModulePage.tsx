import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, BookOpenText, Users, Video, TrendingUp, FileText, Award, MessageSquare, CalendarCheck,
  UserCog, LogIn, LogOut, Hourglass
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
  avatarUrl: '/lovable-uploads/a0ea16b1-c036-4d64-b3be-66cfb7fcd71e.png',
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
              <p>This module, "{moduleTitle}," serves as the foundational starting point for your journey in {courseTitle}. We're excited to guide you through the essential concepts that will set you up for success in the subsequent modules.</p>
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" 
                alt="Introduction to learning concepts" 
                className="my-4 rounded-lg shadow-md w-full max-w-md mx-auto"
              />
              <p>Understanding this introductory material thoroughly is key to grasping more complex topics later on. Take your time, engage with the content, and don't hesitate to revisit sections as needed.</p>
              
              <h4 className="font-semibold text-gray-700 mt-4 mb-2">Key Learning Outcomes:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Familiarize yourself with the core concepts and fundamental terminology of {courseTitle}.</li>
                <li>Gain a clear overview of the entire module structure and specific learning objectives for each section.</li>
                <li>Understand any prerequisites for this course and how to best prepare for the learning ahead.</li>
                <li>Learn how to navigate the course platform and access learning materials and support resources.</li>
                <li>Set personal learning goals for what you aim to achieve by completing this module.</li>
              </ul>
              <p className="mt-3">We recommend going through all introductory materials, including any linked resources or welcome videos, before proceeding to the first content section. This will ensure you have a solid foundation.</p>
            </>
          )}

          {moduleSlug === 'operations' && renderModuleSection(
            <Users className="h-5 w-5 text-academic-blue" />,
            "Operations & Platform Management",
            <>
              <p>Master the operational aspects of running and managing an educational platform. This comprehensive module covers everything from student management to platform optimization.</p>
              
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
                alt="Educational platform operations" 
                className="my-4 rounded-lg shadow-md w-full max-w-md mx-auto"
              />
              
              <h4 className="font-semibold text-gray-700 mt-4 mb-2">Core Operational Areas:</h4>
              
              <div className="space-y-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h5 className="font-semibold text-blue-800 mb-2">📚 Course & Content Management</h5>
                  <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                    <li>Course creation workflows and content standards</li>
                    <li>Version control for educational materials</li>
                    <li>Quality assurance and content review processes</li>
                    <li>Multi-format content delivery (video, text, interactive)</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h5 className="font-semibold text-green-800 mb-2">👥 Student Lifecycle Management</h5>
                  <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                    <li>Enrollment processes and automated workflows</li>
                    <li>Progress tracking and performance analytics</li>
                    <li>Support ticket management and student communications</li>
                    <li>Graduation and certification processes</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h5 className="font-semibold text-purple-800 mb-2">⚙️ Platform Administration</h5>
                  <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                    <li>User role management and access controls</li>
                    <li>System maintenance and update procedures</li>
                    <li>Data backup and disaster recovery planning</li>
                    <li>Integration management with third-party tools</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                  <h5 className="font-semibold text-orange-800 mb-2">📊 Analytics & Reporting</h5>
                  <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                    <li>Learning analytics and student engagement metrics</li>
                    <li>Platform usage statistics and optimization</li>
                    <li>Financial reporting and revenue tracking</li>
                    <li>Compliance reporting and audit trails</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h5 className="font-semibold text-red-800 mb-2">🛡️ Security & Compliance</h5>
                  <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                    <li>Data privacy regulations (GDPR, FERPA) compliance</li>
                    <li>Security protocols and threat management</li>
                    <li>Academic integrity monitoring</li>
                    <li>Regular security audits and assessments</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-700 mt-6 mb-2">Practical Tools & Exercises:</h4>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Operations Dashboard:</strong> Learn to build and interpret key performance indicators for educational platforms</li>
                  <li><strong>Workflow Automation:</strong> Set up automated processes for common operational tasks</li>
                  <li><strong>Crisis Management:</strong> Develop protocols for handling platform outages and emergency situations</li>
                  <li><strong>Scalability Planning:</strong> Design systems that can grow with your student base</li>
                  <li><strong>Customer Support:</strong> Implement efficient support systems for students and instructors</li>
                </ul>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button className="bg-academic-blue hover:bg-academic-blue/90">
                  Access Operations Dashboard
                </Button>
                <Button variant="outline">
                  Download Operations Checklist
                </Button>
              </div>
              
              <p className="mt-4 text-sm text-gray-600 italic">
                This module includes hands-on simulations, real-world case studies from successful educational platforms, 
                and practical templates you can customize for your own operations.
              </p>
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
