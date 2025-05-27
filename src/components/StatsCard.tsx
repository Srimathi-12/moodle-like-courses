import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';


const StatsCard = ({ title, value, icon, change, link, className, children, isCoursesCard }) => {
  const changeColorClass = change?.type === 'increase' ? 'text-green-500' :
    change?.type === 'decrease' ? 'text-red-500' :
      change?.type === 'urgent' ? 'text-red-500' : 'text-gray-500';

  return (
    <Card className={`flex flex-col justify-between bg-white rounded-lg shadow-sm border border-gray-200 pb-4 border-b-4 border-blue-600 ${className}`}>
      <CardHeader className="flex flex-row items-center space-x-2 pb-2">
        {icon}
        <CardTitle className="text-base font-bold text-blue-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {value}
        </div>
        {change && (
          <p className={`text-xs ${changeColorClass} flex items-center`}>
            {change.type === 'increase' && <ArrowUp className="h-3 w-3 mr-1" />}
            {change.type === 'decrease' && <ArrowDown className="h-3 w-3 mr-1" />}
            {change.value}
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
