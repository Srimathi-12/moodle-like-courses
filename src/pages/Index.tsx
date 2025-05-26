import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import HeaderDashboard from '@/components/HeaderDashboard';
import CourseCard from '@/components/CourseCard';
import ProgressSection from '@/components/ProgressSection';
import LectureItem from '@/components/LectureItem';
import VideoPlayer from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const initialCourses = [
  { title: 'Cinema 4D', description: 'Elements design for web sites and mobile apps', progressValue: 8, progressMax: 12, gradientClass: 'from-purple-50 via-pink-50 to-rose-50' },
  { title: 'UI/UX Design', description: 'From concept to prototype', progressValue: 4, progressMax: 15, gradientClass: 'from-blue-50 via-indigo-50 to-purple-50' },
  { title: 'Graphic design', description: 'Digital computer graphics', progressValue: 1, progressMax: 10, gradientClass: 'from-sky-50 via-cyan-50 to-teal-50' },
].map(course => ({ ...course, slug: generateSlug(course.title) }));

const popularLections = [
  { title: 'Human centered design', duration: '1h 30 min', imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg', imageFallback: 'HC', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'E-learning & digital cultures', duration: '45 min', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg', imageFallback: 'ED', videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4' },
  { title: 'SQL: nothing superfluous', duration: '1h 15 min', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', imageFallback: 'SN', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [playingVideo, setPlayingVideo] = useState<{ url: string; title: string } | null>(null);

  const handleSearch = (query: string) => {
    setSearchTerm(query.toLowerCase());
  };

  const filteredCourses = useMemo(() => {
    if (!searchTerm) {
      return initialCourses;
    }
    return initialCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) || 
      course.description.toLowerCase().includes(searchTerm)
    );
  }, [searchTerm]);

  const handlePlayLecture = (videoUrl: string, title: string) => {
    setPlayingVideo({ url: videoUrl, title });
  };

  const handleClosePlayer = () => {
    setPlayingVideo(null);
  };

  return (
    <Layout>
      <HeaderDashboard onSearch={handleSearch} />

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">My courses</h2>
        </div>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} {...course} slug={course.slug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-academic-dark-gray">
            <p className="text-lg">No courses found matching your search "{searchTerm}".</p>
            {searchTerm && (
              <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2 text-academic-blue">
                Clear search
              </Button>
            )}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressSection />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Popular lections</h2>
            <Button 
              variant="link" 
              className="text-academic-blue hover:text-opacity-80"
              onClick={() => toast({ title: "View All Lections", description: "This would display all popular lections."})}
            >
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {popularLections.map((lection, index) => (
              <LectureItem 
                key={index} 
                {...lection} 
                onPlay={handlePlayLecture}
              />
            ))}
          </div>
        </div>
      </div>

      {playingVideo && (
        <VideoPlayer 
          src={playingVideo.url} 
          title={playingVideo.title}
          onClose={handleClosePlayer} 
        />
      )}
    </Layout>
  );
};

export default Index;
