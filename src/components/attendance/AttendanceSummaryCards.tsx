
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { AttendanceSummaryStat } from '@/types/attendance';

interface AttendanceSummaryCardsProps {
  stats: AttendanceSummaryStat[];
}

const AttendanceSummaryCards: React.FC<AttendanceSummaryCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.id} className="shadow-sm">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${stat.bgColorClass}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColorClass}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceSummaryCards;
