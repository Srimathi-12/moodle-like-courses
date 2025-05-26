
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpenText, Users, Video, TrendingUp, FileText, Award, MessageSquare, CalendarCheck } from 'lucide-react'; // Added more icons
import { formatSlugToTitle } from '@/lib/utils';

const ModulePage: React.FC = () => {
  const { courseSlug, moduleSlug } = useParams<{ courseSlug: string; moduleSlug: string }>();
  
  const courseTitle = courseSlug ? formatSlugToTitle(courseSlug) : 'Course';
  const moduleTitle = moduleSlug ? formatSlugToTitle(moduleSlug) : 'Module';

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
            <p><strong>Features (Placeholder):</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>FAQ section for common queries.</li>
              <li>Discussion forum to ask new questions.</li>
              <li>Direct messaging with instructors (subject to availability).</li>
              <li>Scheduled Q&A sessions.</li>
            </ul>
            <Button className="mt-4">Ask a Question</Button>
          </>
        )}

        {moduleSlug === 'attendance' && renderModuleSection(
          <CalendarCheck className="h-5 w-5 text-green-700" />, // Changed icon
          "Attendance Tracking",
          <>
            <p>Track your attendance for the "{moduleTitle}" module and overall for {courseTitle}.</p>
            <p><strong>Your Current Status (Placeholder):</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>Module Attendance: 80%</li>
              <li>Overall Course Attendance: 75%</li>
              <li>Required Attendance: 70%</li>
            </ul>
            <p className="mt-2">Please ensure you meet the minimum attendance requirements. Contact support if you see any discrepancies.</p>
            <Button variant="outline" className="mt-4">Report an Issue</Button>
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

        {/* Fallback for modules not explicitly handled yet */}
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
    </Layout>
  );
};

export default ModulePage;
