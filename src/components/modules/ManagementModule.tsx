
import React from 'react';
import { Users, Target, BarChart3, CheckCircle, Clock, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModuleSectionLayout from './ModuleSectionLayout';

const ManagementModule: React.FC = () => (
  <ModuleSectionLayout
    icon={<Users className="h-5 w-5 text-academic-blue" />}
    title="Management Strategies & Leadership"
  >
    <p>Master essential management principles and leadership strategies to effectively lead teams, projects, and educational initiatives in today's dynamic learning environment.</p>
    
    <img 
      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
      alt="Team collaboration and management in educational settings" 
      className="my-4 rounded-lg shadow-md w-full max-w-md mx-auto"
    />
    
    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Core Management Competencies:</h4>
    
    <div className="space-y-4 mt-4">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
          <Target className="h-4 w-4 mr-2" />
          Strategic Planning & Goal Setting
        </h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>SMART goals framework and implementation strategies</li>
          <li>Long-term vision development and communication</li>
          <li>Resource allocation and budget management</li>
          <li>Risk assessment and mitigation planning</li>
          <li>Performance metrics and KPI development</li>
        </ul>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h5 className="font-semibold text-green-800 mb-2 flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Team Leadership & Development
        </h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Building high-performing teams and fostering collaboration</li>
          <li>Conflict resolution and negotiation techniques</li>
          <li>Employee motivation and engagement strategies</li>
          <li>Coaching and mentoring best practices</li>
          <li>Delegation and empowerment frameworks</li>
        </ul>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        <h5 className="font-semibold text-purple-800 mb-2 flex items-center">
          <BarChart3 className="h-4 w-4 mr-2" />
          Performance Management
        </h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Setting clear expectations and accountability measures</li>
          <li>Regular feedback and performance review processes</li>
          <li>Professional development planning and career pathing</li>
          <li>Recognition and reward systems design</li>
          <li>Performance improvement plans and corrective action</li>
        </ul>
      </div>
      
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
        <h5 className="font-semibold text-orange-800 mb-2 flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" />
          Project Management Excellence
        </h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Agile and waterfall methodology implementation</li>
          <li>Timeline management and milestone tracking</li>
          <li>Stakeholder communication and expectation management</li>
          <li>Quality assurance and deliverable standards</li>
          <li>Change management and scope control</li>
        </ul>
      </div>
      
      <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
        <h5 className="font-semibold text-red-800 mb-2 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Time & Resource Management
        </h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Priority setting and task management systems</li>
          <li>Efficient meeting management and communication</li>
          <li>Workflow optimization and process improvement</li>
          <li>Technology tools for productivity enhancement</li>
          <li>Work-life balance and stress management</li>
        </ul>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
        <h5 className="font-semibold text-indigo-800 mb-2 flex items-center">
          <Brain className="h-4 w-4 mr-2" />
          Decision Making & Problem Solving
        </h5>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
          <li>Critical thinking and analytical reasoning</li>
          <li>Data-driven decision making processes</li>
          <li>Creative problem-solving techniques</li>
          <li>Crisis management and emergency response</li>
          <li>Ethical decision making in complex situations</li>
        </ul>
      </div>
    </div>
    
    <h4 className="font-semibold text-gray-700 mt-6 mb-2">Management Frameworks & Models:</h4>
    <div className="bg-gray-50 p-4 rounded-lg mt-3">
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li><strong>Situational Leadership:</strong> Adapting leadership style based on team maturity and task complexity</li>
        <li><strong>OKRs (Objectives and Key Results):</strong> Aligning team goals with organizational objectives</li>
        <li><strong>Scrum & Kanban:</strong> Agile methodologies for iterative project management</li>
        <li><strong>PDCA Cycle:</strong> Plan-Do-Check-Act for continuous improvement</li>
        <li><strong>Balanced Scorecard:</strong> Comprehensive performance measurement framework</li>
        <li><strong>Change Management (Kotter's 8-Step):</strong> Leading organizational transformation</li>
      </ul>
    </div>
    
    <h4 className="font-semibold text-gray-700 mt-6 mb-2">Practical Management Tools:</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h6 className="font-semibold text-gray-800 mb-2">📊 Analytics Dashboard</h6>
        <p className="text-sm text-gray-600">Track team performance, project progress, and key metrics in real-time</p>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h6 className="font-semibold text-gray-800 mb-2">📝 1:1 Meeting Templates</h6>
        <p className="text-sm text-gray-600">Structured templates for effective one-on-one conversations</p>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h6 className="font-semibold text-gray-800 mb-2">📋 Project Planning Toolkit</h6>
        <p className="text-sm text-gray-600">Comprehensive templates for project initiation and planning</p>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h6 className="font-semibold text-gray-800 mb-2">🎯 Goal Setting Framework</h6>
        <p className="text-sm text-gray-600">Interactive tools for setting and tracking SMART goals</p>
      </div>
    </div>
    
    <h4 className="font-semibold text-gray-700 mt-6 mb-2">Case Studies & Real-World Applications:</h4>
    <div className="space-y-3 mt-3">
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <h6 className="font-semibold text-yellow-800 mb-1">Case Study 1: Leading Remote Teams</h6>
        <p className="text-sm text-gray-700">Explore strategies for managing distributed teams and maintaining productivity in virtual environments.</p>
      </div>
      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-400">
        <h6 className="font-semibold text-teal-800 mb-1">Case Study 2: Educational Technology Implementation</h6>
        <p className="text-sm text-gray-700">Learn from a successful large-scale technology rollout in an educational institution.</p>
      </div>
      <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
        <h6 className="font-semibold text-pink-800 mb-1">Case Study 3: Crisis Management During Pandemic</h6>
        <p className="text-sm text-gray-700">Analyze leadership decisions and strategies during the COVID-19 educational disruption.</p>
      </div>
    </div>
    
    <div className="flex gap-3 mt-6">
      <Button className="bg-academic-blue hover:bg-academic-blue/90">
        Access Management Toolkit
      </Button>
      <Button variant="outline">
        Download Leadership Assessment
      </Button>
      <Button variant="secondary">
        Join Management Forum
      </Button>
    </div>
    
    <div className="bg-blue-100 p-4 rounded-lg mt-6 border border-blue-200">
      <h6 className="font-semibold text-blue-800 mb-2">📚 Recommended Reading & Resources:</h6>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• "The Five Dysfunctions of a Team" by Patrick Lencioni</li>
        <li>• "Good to Great" by Jim Collins</li>
        <li>• "The Manager's Path" by Camille Fournier</li>
        <li>• Harvard Business Review Management Articles</li>
        <li>• MIT Sloan Management Review</li>
      </ul>
    </div>
    
    <p className="mt-4 text-sm text-gray-600 italic">
      This module combines theoretical foundations with practical applications, featuring interactive simulations, 
      peer learning opportunities, and mentorship from experienced educational leaders.
    </p>
  </ModuleSectionLayout>
);

export default ManagementModule;
