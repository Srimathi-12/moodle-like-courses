import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Book, Star, Users, BookOpen } from "lucide-react";

const popularCourses = [
    {
        id: 1,
        title: "Advanced Mathematics",
        description: "Deep dive into calculus, algebra, and statistics with interactive learning modules.",
        instructor: "Dr. Sarah Miller",
        students: 1250,
        rating: 4.8,
        level: "Advanced",
        category: "Mathematics",
        duration: "12 weeks",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        title: "Physics Fundamentals",
        description: "Comprehensive coverage of mechanics, thermodynamics, and quantum physics.",
        instructor: "Prof. Michael Chang",
        students: 980,
        rating: 4.7,
        level: "Intermediate",
        category: "Physics",
        duration: "10 weeks",
        image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "Chemistry Mastery",
        description: "From basic elements to complex organic chemistry with virtual lab experiments.",
        instructor: "Dr. Emma Watson",
        students: 850,
        rating: 4.9,
        level: "All Levels",
        category: "Chemistry",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        title: "Biology Essentials",
        description: "Explore cellular biology, genetics, and ecosystems through interactive content.",
        instructor: "Prof. James Wilson",
        students: 1100,
        rating: 4.6,
        level: "Beginner",
        category: "Biology",
        duration: "14 weeks",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60"
    }
];

const Courses = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/student-login');
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] to-white pt-16">
            <MainHeader />
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="flex flex-col space-y-1.5">
                    <h1 className="text-3xl font-bold text-primary">Popular Courses</h1>
                    <p className="text-muted-foreground">
                        Discover our most sought-after courses crafted by expert educators
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularCourses.map((course) => (
                        <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-200" onClick={handleCardClick}>
                            <div className="aspect-video relative overflow-hidden rounded-t-lg">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                                />
                                <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
                                    {course.category}
                                </Badge>
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl font-semibold line-clamp-2">
                                        {course.title}
                                    </CardTitle>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Badge variant="outline">{course.level}</Badge>
                                    <Badge variant="outline">{course.duration}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CardDescription className="line-clamp-2">
                                    {course.description}
                                </CardDescription>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <BookOpen className="h-4 w-4" />
                                        <span className="text-sm">By {course.instructor}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t pt-4">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {course.students.toLocaleString()} students
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm font-medium">{course.rating}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Courses;