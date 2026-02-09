export interface Student {
  id: string;
  name: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  courseId: string;
  avatar: string;
  attendance: number; // Percentage
}

export interface Course {
  id: string;
  name: string;
  date: string;
  studentsCount: number;
  maxStudents: number;
  icon: string;
  status: 'active' | 'full' | 'open';
}

export interface Session {
  id: string;
  title: string;
  date: string; // ISO string or just DD/MM/YYYY
  time: string;
  location: string;
  instructor: string;
  type: 'theory' | 'practice' | 'exam' | 'maintenance';
  group?: string;
  attendees: string[]; // List of student IDs or just count
}

export interface AppState {
  courses: Course[];
  students: Student[];
  sessions: Session[];
}
