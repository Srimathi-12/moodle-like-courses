export const teacherProfile = {
    id: "t1",
    name: "Sarah Miller",
    email: "sarah.miller@eduexpert.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    role: "Senior Teacher",
    department: "Mathematics",
    phone: "+1 (555) 123-4567",
    address: "123 Academic Lane, Knowledge City, KC 12345",
    bio: "Sarah Miller is a dedicated mathematics teacher with over 10 years of experience in secondary education. She specializes in advanced calculus and has helped hundreds of students achieve excellence in mathematics competitions.",
    education: [
      { degree: "Ph.D. in Mathematics Education", institution: "University of Education", year: 2015 },
      { degree: "M.Sc. in Applied Mathematics", institution: "State University", year: 2010 },
      { degree: "B.Sc. in Mathematics", institution: "Liberal Arts College", year: 2008 }
    ],
    certifications: [
      "Advanced Pedagogical Techniques (2021)",
      "Digital Learning Expert (2020)",
      "Mathematical Problem Solving Methods (2018)"
    ],
    expertise: ["Calculus", "Algebra", "Statistics", "Mathematical Modeling", "STEM Integration"]
  };
  
  // Classes data
  export const classesData = [
    {
      id: "c1",
      name: "Advanced Calculus",
      code: "MATH401",
      grade: "12th Grade",
      schedule: "Mon, Wed, Fri 09:00 - 10:30 AM",
      room: "Math Lab 3",
      totalStudents: 24,
      average: 87,
      progress: 68,
      nextClass: "2025-04-22T09:00:00",
      description: "This course covers advanced calculus concepts including multivariable calculus, vector analysis, and their applications.",
    },
    {
      id: "c2",
      name: "Algebra II",
      code: "MATH302",
      grade: "11th Grade",
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      room: "Room 201",
      totalStudents: 28,
      average: 82,
      progress: 75,
      nextClass: "2025-04-21T11:00:00",
      description: "This course focuses on quadratic expressions, equations, and functions, while extending algebraic concepts to polynomial, rational, and radical functions.",
    },
    {
      id: "c3",
      name: "Statistics Fundamentals",
      code: "MATH305",
      grade: "11th Grade",
      schedule: "Mon, Wed 01:00 - 02:30 PM",
      room: "Computer Lab 2",
      totalStudents: 22,
      average: 79,
      progress: 60,
      nextClass: "2025-04-22T13:00:00",
      description: "This course introduces students to the fundamentals of statistical analysis, probability theory, and data interpretation.",
    },
    {
      id: "c4",
      name: "Geometry",
      code: "MATH201",
      grade: "10th Grade",
      schedule: "Tue, Thu 09:00 - 10:30 AM",
      room: "Room 105",
      totalStudents: 30,
      average: 84,
      progress: 80,
      nextClass: "2025-04-21T09:00:00",
      description: "This course explores Euclidean geometry concepts, emphasizing proofs, geometric reasoning, and spatial relationships.",
    },
    {
      id: "c5",
      name: "Mathematical Modeling",
      code: "MATH405",
      grade: "12th Grade",
      schedule: "Fri 01:00 - 03:30 PM",
      room: "Math Lab 1",
      totalStudents: 18,
      average: 91,
      progress: 85,
      nextClass: "2025-04-26T13:00:00",
      description: "This advanced course teaches students to create and analyze mathematical models for real-world problems and scenarios.",
    }
  ];
  
  // Students data
  export const studentsData = [
    {
      id: "s1",
      name: "Emma Johnson",
      grade: "12th",
      class: "MATH401",
      email: "emma.johnson@student.edu",
      attendance: 95,
      average: 94,
      lastActivity: "Submitted Assignment #4",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&auto=format"
    },
    {
      id: "s2",
      name: "Liam Wilson",
      grade: "12th",
      class: "MATH401",
      email: "liam.wilson@student.edu",
      attendance: 89,
      average: 86,
      lastActivity: "Viewed chapter 7 materials",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format"
    },
    {
      id: "s3",
      name: "Olivia Brown",
      grade: "11th",
      class: "MATH302",
      email: "olivia.brown@student.edu",
      attendance: 98,
      average: 91,
      lastActivity: "Completed quiz #3",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&auto=format"
    },
    {
      id: "s4",
      name: "Noah Davis",
      grade: "11th",
      class: "MATH302",
      email: "noah.davis@student.edu",
      attendance: 82,
      average: 78,
      lastActivity: "Started Assignment #3",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&auto=format"
    },
    {
      id: "s5",
      name: "Ava Martinez",
      grade: "11th",
      class: "MATH305",
      email: "ava.martinez@student.edu",
      attendance: 94,
      average: 89,
      lastActivity: "Participated in discussion",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format"
    },
    {
      id: "s6",
      name: "Ethan Thompson",
      grade: "10th",
      class: "MATH201",
      email: "ethan.thompson@student.edu",
      attendance: 86,
      average: 84,
      lastActivity: "Viewed resources for chapter 5",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&auto=format"
    },
    {
      id: "s7",
      name: "Sophia Garcia",
      grade: "12th",
      class: "MATH405",
      email: "sophia.garcia@student.edu",
      attendance: 97,
      average: 95,
      lastActivity: "Submitted final project",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&auto=format"
    }
  ];
  
  // Assignments data
  export const assignmentsData = [
    {
      id: "a1",
      title: "Limits and Continuity Applications",
      class: "MATH401",
      dueDate: "2025-04-25",
      status: "Active",
      submissions: 15,
      totalStudents: 24,
      type: "Problem Set",
      description: "A comprehensive problem set exploring the applications of limits and continuity in real-world scenarios.",
      created: "2025-04-10"
    },
    {
      id: "a2",
      title: "Quadratic Functions Assessment",
      class: "MATH302",
      dueDate: "2025-04-23",
      status: "Active",
      submissions: 20,
      totalStudents: 28,
      type: "Quiz",
      description: "An assessment of students' understanding of quadratic functions, their properties, and applications.",
      created: "2025-04-12"
    },
    {
      id: "a3",
      title: "Statistical Data Analysis Project",
      class: "MATH305",
      dueDate: "2025-05-05",
      status: "Active",
      submissions: 8,
      totalStudents: 22,
      type: "Project",
      description: "Students will collect and analyze real-world data, applying statistical methods to draw meaningful conclusions.",
      created: "2025-04-08"
    },
    {
      id: "a4",
      title: "Geometric Proofs Exercise",
      class: "MATH201",
      dueDate: "2025-04-22",
      status: "Upcoming",
      submissions: 0,
      totalStudents: 30,
      type: "Problem Set",
      description: "A series of geometric proofs that require students to apply logical reasoning and geometric principles.",
      created: "2025-04-15"
    },
    {
      id: "a5",
      title: "Differential Equations Midterm",
      class: "MATH401",
      dueDate: "2025-04-18",
      status: "Graded",
      submissions: 24,
      totalStudents: 24,
      type: "Exam",
      description: "A comprehensive midterm examination covering differential equations and their applications.",
      created: "2025-04-01",
      avgScore: 83
    },
    {
      id: "a6",
      title: "Mathematical Modeling Case Study",
      class: "MATH405",
      dueDate: "2025-05-10",
      status: "Active",
      submissions: 5,
      totalStudents: 18,
      type: "Project",
      description: "Students will develop a mathematical model for a real-world problem of their choice, documenting their process and findings.",
      created: "2025-04-05"
    }
  ];
  
  // Attendance data
  export const attendanceData = [
    {
      id: "att1",
      class: "MATH401",
      date: "2025-04-19",
      present: 22,
      absent: 2,
      late: 0,
      excused: 1,
      totalStudents: 24,
      attendance: [
        { studentId: "s1", status: "present" },
        { studentId: "s2", status: "present" },
        // Additional student records would follow...
      ]
    },
    {
      id: "att2",
      class: "MATH302",
      date: "2025-04-19",
      present: 25,
      absent: 1,
      late: 2,
      excused: 0,
      totalStudents: 28,
      attendance: [
        { studentId: "s3", status: "present" },
        { studentId: "s4", status: "late" },
        // Additional student records would follow...
      ]
    },
    {
      id: "att3",
      class: "MATH305",
      date: "2025-04-19",
      present: 19,
      absent: 2,
      late: 1,
      excused: 0,
      totalStudents: 22,
      attendance: [
        { studentId: "s5", status: "present" },
        // Additional student records would follow...
      ]
    },
    {
      id: "att4",
      class: "MATH201",
      date: "2025-04-18",
      present: 28,
      absent: 1,
      late: 1,
      excused: 0,
      totalStudents: 30,
      attendance: [
        { studentId: "s6", status: "present" },
        // Additional student records would follow...
      ]
    },
    {
      id: "att5",
      class: "MATH405",
      date: "2025-04-18",
      present: 17,
      absent: 0,
      late: 1,
      excused: 0,
      totalStudents: 18,
      attendance: [
        { studentId: "s7", status: "present" },
        // Additional student records would follow...
      ]
    }
  ];
  
  // Resources data
  export const resourcesData = [
    {
      id: "r1",
      title: "Calculus Reference Guide",
      type: "Document",
      format: "PDF",
      class: "MATH401",
      size: "4.2 MB",
      uploaded: "2025-03-15",
      downloads: 128,
      description: "A comprehensive reference guide covering all key calculus concepts for the semester.",
      tags: ["calculus", "reference", "advanced"]
    },
    {
      id: "r2",
      title: "Algebra II Interactive Problems",
      type: "Interactive",
      format: "HTML",
      class: "MATH302",
      size: "2.8 MB",
      uploaded: "2025-03-20",
      downloads: 86,
      description: "Interactive problems and exercises for Algebra II students with immediate feedback.",
      tags: ["algebra", "interactive", "practice"]
    },
    {
      id: "r3",
      title: "Introduction to Statistics Lecture Series",
      type: "Video",
      format: "MP4",
      class: "MATH305",
      size: "256 MB",
      uploaded: "2025-03-18",
      downloads: 74,
      description: "A 10-part video lecture series introducing fundamental statistical concepts and methods.",
      tags: ["statistics", "lectures", "fundamentals"]
    },
    {
      id: "r4",
      title: "Geometry Visualization Tools",
      type: "Software",
      format: "ZIP",
      class: "MATH201",
      size: "15.7 MB",
      uploaded: "2025-04-02",
      downloads: 62,
      description: "Interactive software tools to help students visualize and explore geometric concepts.",
      tags: ["geometry", "visualization", "tools"]
    },
    {
      id: "r5",
      title: "Mathematical Modeling Case Studies",
      type: "Document",
      format: "PDF",
      class: "MATH405",
      size: "8.3 MB",
      uploaded: "2025-04-10",
      downloads: 42,
      description: "A collection of real-world case studies demonstrating the application of mathematical modeling.",
      tags: ["modeling", "case studies", "applications"]
    },
    {
      id: "r6",
      title: "Probability Theory Workbook",
      type: "Document",
      format: "PDF",
      class: "MATH305",
      size: "3.5 MB",
      uploaded: "2025-03-25",
      downloads: 68,
      description: "A comprehensive workbook with exercises on probability theory and its applications.",
      tags: ["probability", "workbook", "exercises"]
    },
    {
      id: "r7",
      title: "Differentiation Techniques",
      type: "Presentation",
      format: "PPTX",
      class: "MATH401",
      size: "5.1 MB",
      uploaded: "2025-04-05",
      downloads: 54,
      description: "A detailed presentation on advanced differentiation techniques and their applications.",
      tags: ["calculus", "differentiation", "techniques"]
    }
  ];
  
  // Dashboard analytics data
  export const analyticsData = {
    studentPerformance: {
      averageGrades: [
        { class: "MATH401", grade: 87 },
        { class: "MATH302", grade: 82 },
        { class: "MATH305", grade: 79 },
        { class: "MATH201", grade: 84 },
        { class: "MATH405", grade: 91 }
      ],
      assignmentCompletion: 78,
      studentsAtRisk: 12,
      improvementRate: 15
    },
    attendanceStats: {
      overallAttendance: 92,
      monthly: [
        { month: "Jan", rate: 94 },
        { month: "Feb", rate: 91 },
        { month: "Mar", rate: 93 },
        { month: "Apr", rate: 90 }
      ],
      byClass: [
        { class: "MATH401", rate: 91 },
        { class: "MATH302", rate: 89 },
        { class: "MATH305", rate: 94 },
        { class: "MATH201", rate: 93 },
        { class: "MATH405", rate: 95 }
      ]
    },
    recentActivities: [
      { 
        type: "Assignment", 
        description: "Created new assignment 'Limits and Continuity Applications'", 
        time: "2 hours ago",
        class: "MATH401" 
      },
      { 
        type: "Grading", 
        description: "Graded 24 submissions for 'Differential Equations Midterm'", 
        time: "5 hours ago",
        class: "MATH401" 
      },
      { 
        type: "Resource", 
        description: "Uploaded resource 'Mathematical Modeling Case Studies'", 
        time: "1 day ago",
        class: "MATH405" 
      },
      { 
        type: "Attendance", 
        description: "Marked attendance for all classes", 
        time: "1 day ago" 
      },
      { 
        type: "Feedback", 
        description: "Provided feedback to 15 students on their projects", 
        time: "2 days ago",
        class: "MATH305" 
      }
    ],
    upcomingEvents: [
      {
        title: "Advanced Calculus Class",
        time: "Tomorrow, 09:00 AM",
        location: "Math Lab 3",
        type: "class"
      },
      {
        title: "Faculty Meeting",
        time: "Tomorrow, 02:00 PM",
        location: "Conference Room A",
        type: "meeting"
      },
      {
        title: "Algebra II Quiz Due",
        time: "Apr 23, 2025",
        class: "MATH302",
        type: "assignment"
      },
      {
        title: "Parent-Teacher Conference",
        time: "Apr 24, 2025, 04:00 PM",
        location: "Main Building",
        type: "meeting"
      },
      {
        title: "Limits Assignment Due",
        time: "Apr 25, 2025",
        class: "MATH401",
        type: "assignment"
      }
    ]
  };
  