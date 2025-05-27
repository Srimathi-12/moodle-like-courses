import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { BookOpen, Users, BarChart2, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-[#9b87f5]" />,
      title: "Interactive Learning",
      description: "Engage with dynamic course content, live sessions, and multimedia resources."
    },
    {
      icon: <Users className="h-8 w-8 text-[#9b87f5]" />,
      title: "Collaborative Environment",
      description: "Connect with peers and instructors through discussion forums and group projects."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-[#9b87f5]" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and progress reports."
    },
    {
      icon: <Star className="h-8 w-8 text-[#9b87f5]" />,
      title: "Personalized Learning",
      description: "Adaptive learning paths tailored to your individual needs and pace."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] to-white pt-16">
      <MainHeader />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-[#1A1F2C] mb-6">
            Features that Empower Your Learning
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the tools and features that make Shiksak LMS the perfect platform for your educational journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#F1F0FB]">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Features;
