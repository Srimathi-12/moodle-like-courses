import React from 'react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] to-white pt-16">
      <MainHeader />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-[#1A1F2C] mb-6">About Shiksak LMS</h1>
          <p className="text-gray-600 text-lg">
            Transforming education through innovative technology and personalized learning experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Team collaboration" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                At Shiksak LMS, we're dedicated to making quality education accessible to everyone. 
                Our platform combines cutting-edge technology with proven pedagogical methods to create 
                an engaging and effective learning environment.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                We envision a world where quality education knows no boundaries. Through our platform, 
                we aim to empower both educators and students with the tools they need to succeed in 
                the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;