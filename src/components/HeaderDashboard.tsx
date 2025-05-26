
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Search } from 'lucide-react'; // Icon constraint

const LiveBroadcastAvatar: React.FC<{ src?: string; fallback: string }> = ({ src, fallback }) => (
  <Avatar className="h-10 w-10 border-2 border-white -ml-2 first:ml-0 hover:z-10 transition-all duration-200 hover:scale-110">
    <AvatarImage src={src} />
    <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
);

const HeaderDashboard: React.FC = () => {
  const broadcastParticipants = [
    { src: "https://randomuser.me/api/portraits/women/68.jpg", fallback: "P1" },
    { src: "https://randomuser.me/api/portraits/men/75.jpg", fallback: "P2" },
    { src: "https://randomuser.me/api/portraits/women/79.jpg", fallback: "P3" },
    { src: "https://randomuser.me/api/portraits/men/32.jpg", fallback: "P4" },
    { src: "https://randomuser.me/api/portraits/women/44.jpg", fallback: "P5" },
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Live broadcasts</h2>
          <div className="flex items-center">
            <div className="flex">
              {broadcastParticipants.map((p, i) => (
                <LiveBroadcastAvatar key={i} src={p.src} fallback={p.fallback} />
              ))}
            </div>
            <Button variant="outline" size="sm" className="ml-3 bg-white text-academic-blue border-academic-blue hover:bg-academic-light-blue">More</Button>
          </div>
        </div>
        <div className="flex items-center w-full sm:w-auto max-w-md">
          <div className="relative flex-grow">
            {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <Input 
              type="search" 
              placeholder="What do you want to learn?" 
              className="pl-10 pr-4 py-2 w-full rounded-lg border-academic-gray focus:ring-academic-blue focus:border-academic-blue"
            />
          </div>
          <Button className="ml-3 bg-academic-blue hover:bg-opacity-90 text-white">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashboard;
