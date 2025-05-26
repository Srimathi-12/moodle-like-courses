
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
// import { Play } from 'lucide-react'; Replaced with unicode

interface LectureItemProps {
  title: string;
  duration: string;
  imageUrl?: string;
  imageFallback: string;
}

const LectureItem: React.FC<LectureItemProps> = ({ title, duration, imageUrl, imageFallback }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-academic-card flex items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <Avatar className="h-12 w-12 rounded-lg mr-4">
          <AvatarImage src={imageUrl} alt={title} />
          <AvatarFallback className="rounded-lg bg-academic-light-blue text-academic-blue">{imageFallback}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-sm text-gray-800">{title}</h4>
          <p className="text-xs text-academic-dark-gray">🕒 {duration}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-academic-blue bg-academic-blue/10 hover:bg-academic-blue/20 rounded-full"
        onClick={() => toast({ title: "Play Lecture", description: `Playing: ${title}`})}
      >
        <span className="text-lg">▶</span>
      </Button>
    </div>
  );
};

export default LectureItem;
