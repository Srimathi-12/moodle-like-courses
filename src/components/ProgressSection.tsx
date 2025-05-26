
import React from 'react';
import { Button } from '@/components/ui/button';
// import { ChevronDown } from 'lucide-react'; Replaced with unicode

const ProgressDetailItem: React.FC<{ value: number; total: number; label: string; colorClass: string }> = ({ value, total, label, colorClass }) => (
  <div className="flex items-center">
    <div className={`w-1 h-8 ${colorClass} rounded-full mr-3`}></div>
    <div>
      <p className="text-lg font-semibold text-gray-800">{value}/{total}</p>
      <p className="text-xs text-academic-dark-gray">{label}</p>
    </div>
  </div>
);

const ProgressSection: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-academic-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">My progress</h3>
        <Button variant="outline" className="bg-white text-academic-blue border-academic-blue hover:bg-academic-light-blue text-xs">
          June 2020 <span className="ml-1">▼</span>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Simplified progress circle display */}
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6" // background circle
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="hsl(var(--academic-blue))" // progress circle
              strokeWidth="3"
              strokeDasharray="70, 100" // 70% progress for example
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-academic-blue">134</span>
            <span className="text-xs text-academic-dark-gray">Total hours</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2 sm:mt-0 sm:ml-6">
          <ProgressDetailItem value={75} total={115} label="Visited lectures" colorClass="bg-academic-blue" />
          <ProgressDetailItem value={32} total={94} label="Completed tasks" colorClass="bg-purple-400" />
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
