import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, School } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const tutorials = [
  {
    title: "Introduction to Programming",
    category: "Computer Science",
    level: "Beginner",
    duration: "2 hours",
    author: "Dr. Sarah Johnson",
    icon: School,
  },
  {
    title: "Advanced Mathematics",
    category: "Mathematics",
    level: "Advanced",
    duration: "3 hours",
    author: "Prof. Michael Chen",
    icon: GraduationCap,
  },
  {
    title: "Scientific Writing",
    category: "Academic Skills",
    level: "Intermediate",
    duration: "1.5 hours",
    author: "Dr. Emily Brown",
    icon: BookOpen,
  }
];

export default function Tutorials() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tutorials</h1>
        <p className="text-muted-foreground">Browse through our collection of educational tutorials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Tutorials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all subjects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hours of Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">
              High-quality material
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Featured Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Curated selections
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Tutorials</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-primary/10">
                      <tutorial.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{tutorial.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{tutorial.category}</Badge>
                        <Badge variant="outline">{tutorial.level}</Badge>
                        <Badge variant="outline">{tutorial.duration}</Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tutorial.author}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}