import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Library, School } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    title: "Khan Academy",
    category: "Mathematics & Science",
    type: "Educational Platform",
    rating: "4.8/5",
    icon: School
  },
  {
    title: "Coursera",
    category: "Multiple Disciplines",
    type: "Online Courses",
    rating: "4.7/5",
    icon: Library
  },
  {
    title: "MIT OpenCourseWare",
    category: "Higher Education",
    type: "Academic Resources",
    rating: "4.9/5",
    icon: BookOpen
  }
];

export default function ThirdPartyContents() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Third Party Contents</h1>
        <p className="text-muted-foreground">Curated external educational resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground mt-1">
              Trusted educational platforms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000+</div>
            <p className="text-xs text-muted-foreground mt-1">
              External materials
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground mt-1">
              User satisfaction
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-primary/10">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{resource.type}</Badge>
                        <Badge variant="outline">{resource.category}</Badge>
                        <Badge variant="outline">★ {resource.rating}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Visit Platform
                    </Button>
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