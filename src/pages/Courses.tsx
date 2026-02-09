import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Courses: React.FC = () => {
  const { courses, updateCourse, deleteCourse } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-primary/10 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestión de Cursos</h1>
          <p className="text-sm text-slate-500">Administra y edita la oferta formativa actual.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
            <span className="material-icons text-sm">add</span>
            <span>Nuevo Curso</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                placeholder="Buscar por nombre de curso..."
                type="text"
              />
            </div>
            <button className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-primary/5 text-slate-600 dark:text-slate-400 flex items-center justify-center">
              <span className="material-icons">filter_list</span>
            </button>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-center gap-6"
              >
                <div
                  className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 cursor-pointer"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <span className="material-icons text-3xl">{course.icon}</span>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre del curso</label>
                    <input
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-1 focus:ring-primary py-2 text-slate-900 dark:text-white font-medium px-3"
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse({ ...course, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fecha de las clases</label>
                    <div className="relative">
                      <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-1 focus:ring-primary py-2 text-slate-900 dark:text-white font-medium pl-10"
                        type="text"
                        value={course.date}
                        onChange={(e) => updateCourse({ ...course, date: e.target.value })}
                      />
                      <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_today</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nº de alumnos</label>
                    <div className="flex items-center gap-3 py-2">
                      <span className="px-4 py-1.5 bg-primary/5 text-primary font-bold rounded-lg border border-primary/10">
                        {course.studentsCount.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs text-slate-400 italic">
                        {course.studentsCount >= course.maxStudents ? 'Cupo completo' : `${course.maxStudents - course.studentsCount} plazas libres`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 shrink-0">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-icons">save</span></button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-icons">delete_outline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Bar */}
      <footer className="h-12 bg-white dark:bg-slate-900 border-t border-primary/10 flex items-center justify-between px-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Sincronizado con el servidor
        </div>
        <div>v2.4.0 Socorrismo Aqualandia</div>
      </footer>
    </div>
  );
};

export default Courses;
