
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface ModuleCardProps {
  title: string;
  imageUrl: string;
  altText: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, imageUrl, altText }) => {
  const handleClick = () => {
    toast({
      title: `Opening ${title}`,
      description: `This would open the ${title} module.`,
    });
  };

  return (
    <Card 
      className="overflow-hidden shadow-academic-card hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium text-academic-blue hover:underline">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img src={imageUrl} alt={altText} className="w-full h-48 object-cover" />
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
