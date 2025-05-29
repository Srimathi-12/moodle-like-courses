
import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModuleSectionLayout from './ModuleSectionLayout';

const OperationsModule: React.FC = () => (
  <ModuleSectionLayout
    icon={<Users className="h-5 w-5 text-academic-blue" />}
    title="Operations & Platform Management"
  >
    <p>Master the operational aspects of running and managing an educational platform. This comprehensive module covers everything from student management to platform optimization.</p>
    
    <img 
      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
      alt="Educational platform operations" 
      className="my-4 rounded-lg shadow-md w-full max-w-md mx-auto"
    />
    
    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Core Operational Areas:</h4>
    
    <div className="space-y-4 mt-4">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h5 className="font-semibold text-blue-800 mb-2">📚 Course & Content Management</h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Course creation workflows and content standards</li>
          <li>Version control for educational materials</li>
          <li>Quality assurance and content review processes</li>
          <li>Multi-format content delivery (video, text, interactive)</li>
        </ul>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h5 className="font-semibold text-green-800 mb-2">👥 Student Lifecycle Management</h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Enrollment processes and automated workflows</li>
          <li>Progress tracking and performance analytics</li>
          <li>Support ticket management and student communications</li>
          <li>Graduation and certification processes</li>
        </ul>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        <h5 className="font-semibold text-purple-800 mb-2">⚙️ Platform Administration</h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>User role management and access controls</li>
          <li>System maintenance and update procedures</li>
          <li>Data backup and disaster recovery planning</li>
          <li>Integration management with third-party tools</li>
        </ul>
      </div>
      
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
        <h5 className="font-semibold text-orange-800 mb-2">📊 Analytics & Reporting</h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Learning analytics and student engagement metrics</li>
          <li>Platform usage statistics and optimization</li>
          <li>Financial reporting and revenue tracking</li>
          <li>Compliance reporting and audit trails</li>
        </ul>
      </div>
      
      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
        <h5 className="font-semibold text-red-800 mb-2">🛡️ Security & Compliance</h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Data privacy regulations (GDPR, FERPA) compliance</li>
          <li>Security protocols and threat management</li>
          <li>Academic integrity monitoring</li>
          <li>Regular security audits and assessments</li>
        </ul>
      </div>
    </div>
    
    <h4 className="font-semibold text-gray-700 mt-6 mb-2">Practical Tools & Exercises:</h4>
    <div className="bg-gray-50 p-4 rounded-lg mt-3">
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li><strong>Operations Dashboard:</strong> Learn to build and interpret key performance indicators for educational platforms</li>
        <li><strong>Workflow Automation:</strong> Set up automated processes for common operational tasks</li>
        <li><strong>Crisis Management:</strong> Develop protocols for handling platform outages and emergency situations</li>
        <li><strong>Scalability Planning:</strong> Design systems that can grow with your student base</li>
        <li><strong>Customer Support:</strong> Implement efficient support systems for students and instructors</li>
      </ul>
    </div>
    
    <div className="flex gap-3 mt-6">
      <Button className="bg-academic-blue hover:bg-academic-blue/90">
        Access Operations Dashboard
      </Button>
      <Button variant="outline">
        Download Operations Checklist
      </Button>
    </div>
    
    <p className="mt-4 text-sm text-gray-600 italic">
      This module includes hands-on simulations, real-world case studies from successful educational platforms, 
      and practical templates you can customize for your own operations.
    </p>
  </ModuleSectionLayout>
);

export default OperationsModule;
