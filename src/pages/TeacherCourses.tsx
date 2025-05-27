import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Users, BookPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Starter course data
const initialCourses = [
  {
    id: 1,
    title: "Creative Coding with JavaScript",
    description: "Learn to code interactive art, animations, and games. Perfect for visual learners.",
    instructor: "Prof. Amy Jackson",
    students: 2145,
    rating: 4.86,
    level: "Beginner",
    category: "Computer Science",
    duration: "10 weeks",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=450&fit=crop&q=60"
  },
  {
    id: 2,
    title: "UX Design Essentials",
    description: "Design impactful digital experiences from scratch with hands-on challenges.",
    instructor: "Ms. Clara Evans",
    students: 1792,
    rating: 4.82,
    level: "All Levels",
    category: "Design",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Data Science Bootcamp",
    description: "Master data analysis and visualization. No prior experience needed.",
    instructor: "Dr. Omar Khalid",
    students: 1240,
    rating: 4.9,
    level: "Intermediate",
    category: "Data Science",
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop&q=60"
  }
];

type Course = typeof initialCourses[number];

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    image: "",
    level: "",
    category: "",
    duration: ""
  });
  const [adding, setAdding] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.instructor || !form.category) return;
    const newCourse: Course = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      instructor: form.instructor,
      students: Math.floor(Math.random() * 1600) + 400,
      rating: parseFloat((Math.random() * 1.5 + 4.2).toFixed(2)),
      level: form.level || "All Levels",
      category: form.category,
      duration: form.duration || "8 weeks",
      image: form.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&q=60"
    };
    setCourses([newCourse, ...courses]);
    setForm({
      title: "",
      description: "",
      instructor: "",
      image: "",
      level: "",
      category: "",
      duration: ""
    });
    setAdding(false);
  };

  return (
    <div className="mx-auto max-w-5xl py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Explore Courses</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Discover engaging, career-focused courses designed to spark curiosity and boost your learning journey.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex gap-2 border-primary text-primary font-semibold hover:bg-primary/10 hover:border-primary"
          onClick={() => setAdding(v => !v)}
        >
          <BookPlus className="h-5 w-5" />
          Add Course
        </Button>
      </div>
      {adding && (
        <form
          className="bg-gradient-to-r from-[#e5deff] to-[#fbed96] border border-primary/30 rounded-lg p-6 mb-6 space-y-4 animate-fade-in"
          onSubmit={handleAddCourse}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Course Title *"
              name="title"
              value={form.title}
              onChange={handleInput}
              required
            />
            <Input
              placeholder="Instructor *"
              name="instructor"
              value={form.instructor}
              onChange={handleInput}
              required
            />
            <Input
              placeholder="Category *"
              name="category"
              value={form.category}
              onChange={handleInput}
              required
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Image URL"
              name="image"
              value={form.image}
              onChange={handleInput}
            />
            <Input
              placeholder="Level (e.g. Beginner)"
              name="level"
              value={form.level}
              onChange={handleInput}
            />
            <Input
              placeholder="Duration (e.g. 8 weeks)"
              name="duration"
              value={form.duration}
              onChange={handleInput}
            />
          </div>
          <Input
            placeholder="Short Description"
            name="description"
            value={form.description}
            onChange={handleInput}
            className="col-span-3"
          />
          <div className="flex gap-3">
            <Button type="submit" className="bg-primary/90 hover:bg-primary text-white font-bold">
              Add Course
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setAdding(false)}
              className="border border-destructive/30 text-destructive"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {courses.length === 0 ? (
        <div className="text-center text-lg text-muted-foreground py-12">
          No courses available. Be the first to add one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-2xl border-primary/10 bg-gradient-to-br from-[#fbed96] via-[#e5deff] to-[#fff] animate-enter relative transition-all duration-200">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                />
                <Badge className="absolute top-2 right-2 bg-primary/95 text-white shadow-md">
                  {course.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold line-clamp-2 text-dark">{course.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">{course.level}</Badge>
                  <Badge variant="outline">{course.duration}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">By {course.instructor}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{course.rating.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;