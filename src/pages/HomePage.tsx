import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useMoodleAuth } from '@/hooks/useMoodleAuth';
import { ArrowRight, BookOpen, ChevronRight, GraduationCap, Users, PenTool, BarChart2, Award } from 'lucide-react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { cn } from "@/lib/utils";

const Homepage = () => {
  const { isAuthenticated, currentUser } = useMoodleAuth();
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  const handleTeacherLogin = () => {
    navigate('/teacher-login');
  };

  const handleDashboardRedirect = () => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'teacher') {
        navigate('/teacher-login');
      } else {
        navigate('/student-login');
      }
    } else {
      navigate('/student-login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] to-white pt-16 overflow-hidden">
      <MainHeader />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-purple-100">
                <span className="bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-full">New</span>
                <span className="text-sm text-gray-600">Learn at your own pace</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1F2C] leading-[1.2]">
              Explore Creativity Through
              <span className="text-[#9b87f5]"> Hands-On Classes</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Join our platform and unlock a world of interactive learning experiences. Perfect for students and educators alike.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className={cn(
                  "bg-[#9b87f5] hover:bg-[#8a74f8] text-lg px-8",
                  "transition-all duration-300 transform hover:translate-y-[-3px]",
                  "hover:shadow-lg active:translate-y-0"
                )}
                onClick={handleDashboardRedirect}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                onClick={() => navigate('/student-courses')}
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 border-white bg-[#E5DEFF]",
                      "flex items-center justify-center text-[#9b87f5]",
                      "transform transition-transform hover:scale-110 hover:z-10"
                    )}
                  >
                    <Users className="h-5 w-5" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold">50K+ Students</p>
                <p className="text-sm text-gray-500">Already enrolled</p>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in animation-delay-300">
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#E5DEFF] rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-[#D3E4FD] rounded-full opacity-50 blur-3xl"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-purple-100 transform transition-transform hover:translate-y-[-10px] duration-500">
              {/* <div className="relative rounded-lg overflow-hidden aspect-video">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-young-female-student-working-in-the-library-6798-large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div> */}
              <div className="relative rounded-lg overflow-hidden aspect-video">
                <img
                  src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg"
                  alt="Educational platform background"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-purple-100 transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-[#9b87f5]" />
                  <div>
                    <p className="font-semibold">Live Classes</p>
                    <p className="text-sm text-gray-500">Interactive Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Options */}
      <div className="bg-[#F8F9FF] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Whether you're here to learn or to teach, we have the perfect portal for you to get started with your educational journey.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                <div className="w-16 h-16 rounded-full bg-[#E5DEFF] flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Student Portal</h3>
                <p className="text-gray-600 mb-6">
                  Access your courses, assignments, and track your academic progress. Connect with teachers and peers.
                </p>
                <Button
                  onClick={handleStudentLogin}
                  className={cn(
                    "w-full bg-[#9b87f5] hover:bg-[#8a74f8]",
                    "transition-all duration-300 transform hover:translate-y-[-2px]"
                  )}
                >
                  Student Login <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                <div className="w-16 h-16 rounded-full bg-[#E5DEFF] flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Teacher Portal</h3>
                <p className="text-gray-600 mb-6">
                  Manage your courses, create assignments, and track student performance. Engage with your class.
                </p>
                <Button
                  onClick={handleTeacherLogin}
                  className={cn(
                    "w-full bg-[#9b87f5] hover:bg-[#8a74f8]",
                    "transition-all duration-300 transform hover:translate-y-[-2px]"
                  )}
                >
                  Teacher Login <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Shiksak LMS?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a comprehensive set of tools designed to enhance the learning experience for both students and educators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool className="h-10 w-10 text-[#9b87f5]" />,
                title: "Interactive Content",
                description: "Engage with dynamic learning materials that make complex concepts easier to understand."
              },
              {
                icon: <BarChart2 className="h-10 w-10 text-[#9b87f5]" />,
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed analytics and performance insights."
              },
              {
                icon: <Award className="h-10 w-10 text-[#9b87f5]" />,
                title: "Certification",
                description: "Earn recognized certificates upon completion of courses to showcase your skills."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "bg-white p-8 rounded-xl shadow-sm border border-gray-100",
                  "transform transition-all duration-300 hover:shadow-lg hover:border-purple-100",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;