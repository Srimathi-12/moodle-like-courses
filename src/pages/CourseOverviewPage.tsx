import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ModuleCard from '@/components/ModuleCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { generateSlug, formatSlugToTitle } from '@/lib/utils'; // Import formatSlugToTitle from utils
import { courseModules } from '@/lib/courseData'; // Import courseModules

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
  
  // Example: Choose a banner image based on the courseSlug or a default
  const courseBannerImageId = courseSlug === 'cinema-4d' ? 'photo-1500673922987-e212871fec22' : 'photo-1488590528505-98d2b5aba04b';
  const courseBannerImageUrl = `https://images.unsplash.com/${courseBannerImageId}?w=1200&h=400&fit=crop`;


  return (
    <Layout>
      {/* Moved Back to Dashboard link and Title above the banner */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/" className="inline-flex items-center text-academic-blue hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">{courseTitle}</h1>
        </div>
      </div>

      {/* Course Banner Image */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={courseBannerImageUrl} 
          alt={`${courseTitle} Banner`} 
          className="w-full h-64 object-cover" 
        />
      </div>
      
      {/* Attractive Content Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-academic-blue mb-3">About this Course</h2>
        <p className="text-academic-dark-gray mb-4 leading-relaxed">
          Welcome to the "{courseTitle}" course! This comprehensive program is designed to equip you with
          essential skills and knowledge in {courseTitle.toLowerCase()}. Whether you're a beginner looking to start your journey
          or an experienced professional aiming to upgrade your expertise, this course offers a structured path
          to mastering the core concepts and practical applications.
        </p>
        <p className="text-academic-dark-gray leading-relaxed">
          Throughout this course, you will dive deep into engaging modules, participate in hands-on activities,
          and collaborate with peers. Our expert instructors are dedicated to providing you with a supportive
          and interactive learning environment. Get ready to unlock new opportunities and achieve your learning goals!
        </p>
      </section>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Modules</h2>
      <p className="text-academic-dark-gray mb-6">
        Explore the modules below to get started with your learning journey in {courseTitle}. Each module is crafted to build upon the last, ensuring a cohesive learning experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseModules.map((item, index) => { // Use imported courseModules
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
