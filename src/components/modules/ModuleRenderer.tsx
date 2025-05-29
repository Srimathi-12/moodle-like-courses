
import React from 'react';
import IntroductionModule from './IntroductionModule';
import OperationsModule from './OperationsModule';
import ManagementModule from './ManagementModule';
import ClearDoubtsModule from './ClearDoubtsModule';
import {
  VirtualClassroomModule,
  TrendsDiscussionModule,
  AssignmentAssessmentModule,
  CertificateModule,
} from './SimpleModules';

interface Question {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  module: string;
}

interface ModuleRendererProps {
  moduleSlug: string;
  moduleTitle: string;
  courseTitle: string;
  questions: Question[];
  onAskQuestion: (question: Question) => void;
}

const ModuleRenderer: React.FC<ModuleRendererProps> = ({
  moduleSlug,
  moduleTitle,
  courseTitle,
  questions,
  onAskQuestion,
}) => {
  switch (moduleSlug) {
    case 'introduction':
      return <IntroductionModule courseTitle={courseTitle} moduleTitle={moduleTitle} />;
    
    case 'operations':
      return <OperationsModule />;
    
    case 'management':
      return <ManagementModule />;
    
    case 'clear-all-your-doubts':
      return (
        <ClearDoubtsModule
          moduleTitle={moduleTitle}
          questions={questions}
          onAskQuestion={onAskQuestion}
        />
      );
    
    case 'virtual-classroom':
      return <VirtualClassroomModule moduleTitle={moduleTitle} />;
    
    case 'trends-discussion':
      return <TrendsDiscussionModule moduleTitle={moduleTitle} courseTitle={courseTitle} />;
    
    case 'assignment-and-assessment':
      return <AssignmentAssessmentModule moduleTitle={moduleTitle} courseTitle={courseTitle} />;
    
    case 'certificate':
      return <CertificateModule courseTitle={courseTitle} />;
    
    default:
      return (
        <p className="text-academic-dark-gray mt-4">
          Content for the "{moduleTitle}" module is currently under development. Please check back soon!
        </p>
      );
  }
};

export default ModuleRenderer;
