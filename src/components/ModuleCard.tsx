import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  title: string;
  imageUrl: string;
  altText: string;
  courseSlug: string; // Added courseSlug
  moduleSlug: string; // Added moduleSlug
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, imageUrl, altText, courseSlug, moduleSlug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (courseSlug && moduleSlug) {
      navigate(`/student/courses/${courseSlug}/${moduleSlug}`);
    } else {
      // Fallback toast if slugs are not available, though they should be
      toast({
        title: `Opening ${title}`,
        description: `This would open the ${title} module. Slugs not provided.`,
        variant: "destructive",
      });
    }
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