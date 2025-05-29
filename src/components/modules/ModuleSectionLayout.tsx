
import React from 'react';

interface ModuleSectionLayoutProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ModuleSectionLayout: React.FC<ModuleSectionLayoutProps> = ({ icon, title, children }) => (
  <div className="mt-6 p-4 border-l-4 border-academic-blue bg-blue-50 rounded-r-lg">
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-lg font-medium text-academic-blue ml-2">{title}</h3>
    </div>
    <div className="text-academic-dark-gray space-y-2">
      {children}
    </div>
  </div>
);

export default ModuleSectionLayout;
