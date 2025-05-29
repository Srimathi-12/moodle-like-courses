
import React from 'react';
import { BookOpenText } from 'lucide-react';
import ModuleSectionLayout from './ModuleSectionLayout';

interface IntroductionModuleProps {
  courseTitle: string;
  moduleTitle: string;
}

const IntroductionModule: React.FC<IntroductionModuleProps> = ({ courseTitle, moduleTitle }) => (
  <ModuleSectionLayout
    icon={<BookOpenText className="h-5 w-5 text-academic-blue" />}
    title="Module Introduction"
  >
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
  </ModuleSectionLayout>
);

export default IntroductionModule;
