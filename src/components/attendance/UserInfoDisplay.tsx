
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCent, CalendarDays, Briefcase } from 'lucide-react'; // Using BadgeCent for Employee ID as placeholder
import type { AttendanceUser } from '@/types/attendance';

interface UserInfoDisplayProps {
  user: AttendanceUser;
}

const InfoCard: React.FC<{ icon: React.ElementType, title: string, value: string, iconBgClass: string, iconColorClass: string }> = ({ icon: Icon, title, value, iconBgClass, iconColorClass }) => (
  <Card className="flex-1">
    <CardContent className="p-4 flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${iconBgClass}`}>
        <Icon className={`h-6 w-6 ${iconColorClass}`} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="md:col-span-1">
        <CardContent className="p-4 flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl || "https://github.com/shadcn.png"} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </CardContent>
      </Card>
      <InfoCard icon={BadgeCent} title="Employee ID" value={user.employeeId} iconBgClass="bg-green-100" iconColorClass="text-green-600" />
      <InfoCard icon={CalendarDays} title="Joining Date" value={user.joiningDate} iconBgClass="bg-blue-100" iconColorClass="text-blue-600" />
      <InfoCard icon={Briefcase} title="Department" value={user.department} iconBgClass="bg-purple-100" iconColorClass="text-purple-600" />
    </div>
  );
};

export default UserInfoDisplay;
