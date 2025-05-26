
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ModuleCard from '@/components/ModuleCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { generateSlug } from '@/lib/utils'; // Import generateSlug

const moduleData = [
  { title: 'Clear all your doubts', seed: 'doubts' },
  { title: 'Attendance', seed: 'attendance' },
  { title: 'Introduction', seed: 'introduction' },
  { title: 'Operations', seed: 'operations' },
  { title: 'Management', seed: 'management' },
  { title: 'Virtual Classroom', seed: 'classroom' },
  { title: 'Trends Discussion', seed: 'trends' },
  { title: 'Assignment & Assessment', seed: 'assessment' },
  { title: 'Certificate', seed: 'certificate' },
];

// Helper to format slug back to title (simple version)
const formatSlugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CourseOverviewPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const courseTitle = courseSlug ? formatSlugToTitle(courseSlug) : 'Course Overview';

  // Use placeholder images from context if available, otherwise picsum
  const placeholderImages = [
    'photo-1461749280684-dccba630e2f6', // code on monitor
    'photo-1487058792275-0ad4aaf24ca7', // colorful code
    'photo-1649972904349-6e44c42644a7', // woman with laptop
    'photo-1581091226825-a6a2a5aee158', // woman with laptop (another)
    'photo-1500673922987-e212871fec22', // yellow lights
  ];

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/" className="inline-flex items-center text-academic-blue hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">{courseTitle}</h1>
        </div>
      </div>

      <p className="text-academic-dark-gray mb-6">
        Welcome to {courseTitle}. Explore the modules below to get started with your learning journey.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleData.map((item, index) => {
          const unsplashId = placeholderImages[index % placeholderImages.length];
          const imageUrl = index < placeholderImages.length 
            ? `https://images.unsplash.com/${unsplashId}?w=400&h=300&fit=crop`
            : `https://picsum.photos/seed/${item.seed}/400/300`;
          
          const moduleSlug = generateSlug(item.title); // Generate module slug

          return (
            <ModuleCard
              key={item.title}
              title={item.title}
              imageUrl={imageUrl}
              altText={item.title}
              courseSlug={courseSlug || ''} // Pass courseSlug
              moduleSlug={moduleSlug} // Pass moduleSlug
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default CourseOverviewPage;
