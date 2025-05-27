import React from 'react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Math Teacher",
      image: "https://i.pravatar.cc/150?img=1",
      content: "Shiksak LMS has transformed how I teach mathematics. The interactive features and analytics help me understand my students' progress better.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Student",
      image: "https://i.pravatar.cc/150?img=2",
      content: "The platform is incredibly user-friendly and makes learning enjoyable. I especially love the progress tracking features.",
      rating: 5
    },
    {
      name: "Dr. Emily Brown",
      role: "University Professor",
      image: "https://i.pravatar.cc/150?img=3",
      content: "As an educator, I appreciate the robust features and flexibility that Shiksak LMS provides. It's made remote teaching much more effective.",
      rating: 5
    },
    {
      name: "Tom Wilson",
      role: "High School Student",
      image: "https://i.pravatar.cc/150?img=4",
      content: "The interactive lessons and instant feedback have helped me improve my grades significantly. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] to-white pt-16">
      <MainHeader />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-[#1A1F2C] mb-6">
            What Our Users Say
          </h1>
          <p className="text-gray-600 text-lg">
            Read what educators and students have to say about their experience with Shiksak LMS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.role}</p>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#9b87f5] text-[#9b87f5]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;
