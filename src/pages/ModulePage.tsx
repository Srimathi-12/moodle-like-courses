import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { formatSlugToTitle } from '@/lib/utils';

const ModulePage: React.FC = () => {
  const { courseSlug, moduleSlug } = useParams<{ courseSlug: string; moduleSlug: string }>();
  
  const courseTitle = courseSlug ? formatSlugToTitle(courseSlug) : 'Course';
  const moduleTitle = moduleSlug ? formatSlugToTitle(moduleSlug) : 'Module';

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
          Relevant content, learning materials, activities, and assessments for this module will be displayed here.
        </p>
        <p className="text-academic-dark-gray mt-4">
          For now, this is placeholder content. You can replace this with the actual module information.
        </p>
        {/* Example of adding more specific content based on moduleSlug if needed in the future */}
        {moduleSlug === 'clear-all-your-doubts' && (
          <div className="mt-6 p-4 border-l-4 border-academic-blue bg-blue-50">
            <h3 className="text-lg font-medium text-academic-blue">Doubts Section</h3>
            <p className="text-academic-dark-gray mt-2">
              Here you would find resources and tools to ask questions and get clarifications.
            </p>
          </div>
        )}
        {moduleSlug === 'attendance' && (
          <div className="mt-6 p-4 border-l-4 border-green-500 bg-green-50">
            <h3 className="text-lg font-medium text-green-700">Attendance Tracking</h3>
            <p className="text-academic-dark-gray mt-2">
              Information about your attendance for this module/course would be shown here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ModulePage;
