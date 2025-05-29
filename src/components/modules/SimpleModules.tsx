
import React from 'react';
import { Video, TrendingUp, FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModuleSectionLayout from './ModuleSectionLayout';

export const VirtualClassroomModule: React.FC<{ moduleTitle: string }> = ({ moduleTitle }) => (
  <ModuleSectionLayout
    icon={<Video className="h-5 w-5 text-academic-blue" />}
    title="Virtual Classroom"
  >
    <p>Join live sessions, watch recorded lectures, and interact with instructors and peers in the "{moduleTitle}" virtual classroom.</p>
    <p><strong>Classroom features (Placeholder):</strong></p>
    <ul className="list-disc list-inside ml-4">
      <li>Schedule of upcoming live classes.</li>
      <li>Access to recordings of past sessions.</li>
      <li>Interactive whiteboards and screen sharing.</li>
      <li>Breakout rooms for group discussions.</li>
    </ul>
    <Button className="mt-4">Join Upcoming Session</Button>
  </ModuleSectionLayout>
);

export const TrendsDiscussionModule: React.FC<{ moduleTitle: string; courseTitle: string }> = ({ 
  moduleTitle, 
  courseTitle 
}) => (
  <ModuleSectionLayout
    icon={<TrendingUp className="h-5 w-5 text-academic-blue" />}
    title="Trends Discussion"
  >
    <p>Stay updated with the latest trends and developments in {moduleTitle.toLowerCase()}.</p>
    <p><strong>Discussion points (Placeholder):</strong></p>
    <ul className="list-disc list-inside ml-4">
      <li>Industry news and articles.</li>
      <li>Emerging technologies and methodologies.</li>
      <li>Forum for discussing future outlooks.</li>
    </ul>
    <p className="mt-2">Engage in discussions about how {courseTitle} is evolving.</p>
  </ModuleSectionLayout>
);

export const AssignmentAssessmentModule: React.FC<{ moduleTitle: string; courseTitle: string }> = ({ 
  moduleTitle, 
  courseTitle 
}) => (
  <ModuleSectionLayout
    icon={<FileText className="h-5 w-5 text-academic-blue" />}
    title="Assignments & Assessments"
  >
    <p>Submit your assignments and take assessments for the "{moduleTitle}" module of {courseTitle}.</p>
    <p><strong>Current tasks (Placeholder):</strong></p>
    <ul className="list-disc list-inside ml-4">
      <li>Assignment 1: Due [Date] - Status: Not Started</li>
      <li>Quiz 1: Available until [Date] - Status: Pending</li>
      <li>Final Project Guidelines.</li>
    </ul>
    <p className="mt-2">Ensure you complete all tasks by their respective deadlines.</p>
    <Button variant="secondary" className="mt-4">View All Assessments</Button>
  </ModuleSectionLayout>
);

export const CertificateModule: React.FC<{ courseTitle: string }> = ({ courseTitle }) => (
  <ModuleSectionLayout
    icon={<Award className="h-5 w-5 text-academic-blue" />}
    title="Course Certificate"
  >
    <p>Information about your certificate of completion for {courseTitle}.</p>
    <p><strong>Eligibility and Status (Placeholder):</strong></p>
    <ul className="list-disc list-inside ml-4">
      <li>Completion Status: 70% (example)</li>
      <li>Minimum Requirement for Certificate: All modules completed, final assessment passed.</li>
      <li>Certificate Availability: Upon successful completion.</li>
    </ul>
    <p className="mt-2">Once you meet all requirements, your certificate will be available for download here.</p>
    <Button disabled className="mt-4">Download Certificate (Not Yet Available)</Button>
  </ModuleSectionLayout>
);
