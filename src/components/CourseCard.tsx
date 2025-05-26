
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Using shadcn Progress
import { ChevronRight } from 'lucide-react'; // Allowed icon
import { toast } from "@/hooks/use-toast";

interface CourseCardProps {
  title: string;
  description: string;
  progressValue: number;
  progressMax: number;
  bgColorClass?: string; // e.g., 'bg-academic-light-blue' or 'bg-academic-light-purple'
  gradientClass?: string; // e.g. 'from-blue-100 to-purple-100'
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, progressValue, progressMax, bgColorClass = 'bg-white', gradientClass }) => {
  const percentage = (progressValue / progressMax) * 100;

  return (
    <div className={`p-6 rounded-xl shadow-academic-card flex flex-col justify-between h-full min-h-[200px] ${gradientClass ? `bg-gradient-to-br ${gradientClass}` : bgColorClass}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-academic-dark-gray mb-4">{description}</p>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2 text-xs text-academic-dark-gray">
          <span>{`${progressValue}/${progressMax}`}</span>
        </div>
        <Progress value={percentage} className="h-2 [&>div]:bg-academic-blue" />
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-3 -ml-2 text-academic-blue hover:bg-academic-blue/10"
          onClick={() => toast({ title: "Continue Course", description: `Continuing ${title}`})}
        >
          Continue <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
