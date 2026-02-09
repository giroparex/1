import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Course, Student, Session } from '../types';

interface AppContextType {
  courses: Course[];
  students: Student[];
  sessions: Session[];
  updateCourse: (updatedCourse: Course) => void;
  deleteCourse: (id: string) => void;
  updateStudent: (updatedStudent: Student) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialCourses: Course[] = [
  { id: '1', name: 'Socorrismo Básico', date: '12/05/2024', studentsCount: 15, maxStudents: 15, icon: 'pool', status: 'full' },
  { id: '2', name: 'RCP Avanzada', date: '15/05/2024', studentsCount: 10, maxStudents: 12, icon: 'medical_services', status: 'open' },
  { id: '3', name: 'Primeros Auxilios', date: '20/05/2024', studentsCount: 22, maxStudents: 25, icon: 'health_and_safety', status: 'open' },
  { id: '4', name: 'Rescate Acuático', date: '25/05/2024', studentsCount: 8, maxStudents: 10, icon: 'lifebuoy', status: 'open' },
];

const initialStudents: Student[] = [
  {
    id: 's1',
    name: 'Alejandro Marín Sanz',
    address: 'Calle del Viento 14, Alicante',
    phone: '+34 965 221 443',
    mobile: '+34 654 321 098',
    email: 'a.marin@email.com',
    courseId: '1',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL55OaBlkHfM_ShQbvdhxGJxe-zrH8WT2ote4IaiJbvuX_BS0-KSPFTs8U8QCrJ0uvdda0n3SuaQMRuakPDhjl_UjREtVnQlxdF0s7tlb7LHkUgge2G5VSe4VkXhFz_Y7zN_nfbnuCDdKXRHeTE7sbrW1j8KiQzvdc4Z6rv7DbmvyWwciFTYlASanDDvPdt0YLTulFsDMjNrPA8Fd7edn93VzW1DDHfRlS43t8FjeFSsCDEp_Lvxq49-TxmkZbTwQGwNvgf8Wi_g',
    attendance: 95
  },
  {
    id: 's2',
    name: 'Elena Garrido López',
    address: 'Av. Mediterráneo 45, Benidorm',
    phone: '+34 966 445 566',
    mobile: '+34 600 112 233',
    email: 'elena.g@gmail.com',
    courseId: '2',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAiqGkdycbpzZvDbpeS91P1PzoJamSqz4Obxi1PnsjBJQqT_LYRdQUkmsn2qd8vGJdsyPNQZ4Ks8zT9sPJVK5f6nNJ4C5WHNycgyoikcGnHGzbpCPEXTijv8W6NywmVnqoQXSzuVeSY7k993BZlIqrApxPdL8ZWObdN3Gy0bTdnVapcY-1K9XaZ23bLWwpeGHr0mpuRfsLBeQJcAAF5XDPlPl8PihbggVdOjUkauZK5yk1zf9hGHxh5I45Xlcnf13tBNgn_nYRhA',
    attendance: 100
  },
  {
    id: 's3',
    name: 'Marcos Ruiz Peñalver',
    address: 'Plaza Mayor 3, Elche',
    phone: '+34 966 331 122',
    mobile: '+34 699 887 766',
    email: 'marcosruiz@outlook.es',
    courseId: '1',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv3hUvWuJDahbmMUBp4vZfA511YFcwyaOX5ALPgIkRxEiuIbrXPsQHGK6dbeXAyVjYhWJSm4WeUlxvuNMlFBPTp7JEI-5xs5uHh9y7dmyThhwJUP6pZrGsrMaJr1SwUHng3WN-FVzKItFKsXZ1MXjnzDSD1HPYpPDZcz7AIu909BB2pOvdEJRPynbsTRhUxO0CVEjGQ9LqrVNhmTWNMHREVBxIoGPuwodc7PH1SGFEGdbK3TqUW-0PcMJGh2R7PvjGT9-noC0iTg',
    attendance: 72
  },
];

const initialSessions: Session[] = [
  { id: 'sess1', title: 'Teoría RCP (G1)', date: '01/05/2024', time: '09:00 - 11:30', location: 'Aula 1', instructor: 'Mario Silva', type: 'theory', attendees: ['s1', 's3'] },
  { id: 'sess2', title: 'Práctica Piscina', date: '03/05/2024', time: '16:00 - 18:00', location: 'Piscina Olímpica Norte', instructor: 'Elena Ruiz', type: 'practice', attendees: ['s1', 's2'] },
  { id: 'sess3', title: 'Socorrismo Int.', date: '07/05/2024', time: '09:00 - 11:30', location: 'Piscina Olímpica Norte', instructor: 'Mario Silva', type: 'theory', group: 'A1', attendees: ['s1', 's3'] },
  { id: 'sess4', title: 'Mantenimiento', date: '07/05/2024', time: '16:00 - 18:00', location: 'Almacén Taller', instructor: 'Elena Ruiz', type: 'maintenance', attendees: [] },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [sessions] = useState<Session[]>(initialSessions);

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  return (
    <AppContext.Provider value={{ courses, students, sessions, updateCourse, deleteCourse, updateStudent }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
