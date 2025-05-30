
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserCog, LogIn, LogOut, Hourglass } from 'lucide-react';
import type { AttendanceSummaryStat } from '@/types/attendance';

interface AttendanceSummaryCardsProps {
  stats: AttendanceSummaryStat[];
}

// Icon mapping to convert string names to actual icon components
const iconMap = {
  UserCog: UserCog,
  LogIn: LogIn,
  LogOut: LogOut,
  Hourglass: Hourglass,
};

const AttendanceSummaryCards: React.FC<AttendanceSummaryCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
        
        return (
          <Card key={stat.id} className="shadow-sm">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${stat.bgColorClass}`}>
                {IconComponent && (
                  <IconComponent className={`h-6 w-6 ${stat.iconColorClass}`} />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AttendanceSummaryCards;
