import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, students } = useAppContext();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === id);
  const courseStudents = students.filter(s => s.courseId === id);

  if (!course) return <div className="p-8 text-center">Curso no encontrado</div>;

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 px-6 py-6 border-b border-slate-200 dark:border-slate-800 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/courses')}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
            >
              <span className="material-icons text-slate-600 dark:text-slate-300">chevron_left</span>
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{course.name}</h1>
              <p className="text-xs font-medium text-primary uppercase tracking-wider">Módulo: Primeros Auxilios Avanzados</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium text-slate-500">En Directo</span>
          </div>
        </div>
      </header>

      {/* Content Scroller */}
      <div className="flex-1 overflow-y-auto ios-scroller p-4 lg:p-6 space-y-6">
        {/* Calendar / Day Tracker */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Calendario de Asistencia</h2>
            <span className="text-xs text-primary font-medium">Hoy: 22 de Mayo</span>
          </div>
          <div className="flex space-x-3 overflow-x-auto ios-scroller pb-2">
            {[20, 21].map(day => (
              <button key={day} className="flex-shrink-0 w-16 h-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-1 transition-all">
                <span className="text-[10px] font-bold text-slate-400">{day === 20 ? 'LUN' : 'MAR'}</span>
                <span className="text-lg font-bold">{day}</span>
              </button>
            ))}
            <button className="flex-shrink-0 w-16 h-20 rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 flex flex-col items-center justify-center space-y-1 scale-110 mx-2">
              <span className="text-[10px] font-bold opacity-80">MIÉ</span>
              <span className="text-lg font-bold">22</span>
            </button>
            {[23, 24].map(day => (
              <button key={day} className="flex-shrink-0 w-16 h-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-1 opacity-50">
                <span className="text-[10px] font-bold text-slate-400">{day === 23 ? 'JUE' : 'VIE'}</span>
                <span className="text-lg font-bold">{day}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Student List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Alumnos Inscritos ({courseStudents.length})</h2>
            <button className="text-xs font-semibold text-primary flex items-center">
              <span className="material-icons text-sm mr-1">done_all</span> Marcar todos
            </button>
          </div>
          <div className="space-y-3">
            {courseStudents.map(student => (
              <div key={student.id} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img className="w-full h-full object-cover" src={student.avatar} alt={student.name} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{student.name}</p>
                    <p className="text-[10px] text-slate-400">Asistencia: {student.attendance}%</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-6 h-6 rounded-full text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Observations */}
        <section className="pb-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Observaciones Diarias</h2>
            <span className="material-icons text-slate-400 text-sm">edit_note</span>
          </div>
          <div className="relative">
            <textarea
              className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400"
              placeholder="Añade notas sobre el desempeño del grupo, incidencias o material necesario..."
              rows={5}
            ></textarea>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400"><span className="material-icons text-base">attach_file</span></button>
              <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400"><span className="material-icons text-base">mic</span></button>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Footer Action Button */}
      <div className="absolute bottom-6 right-6 left-6 flex space-x-3 pointer-events-none">
        <div className="flex-1"></div>
        <button className="pointer-events-auto h-16 px-8 rounded-full bg-primary text-white font-bold flex items-center justify-center space-x-3 shadow-2xl shadow-primary/40 active:scale-95 transition-transform">
          <span className="material-icons">save</span>
          <span>GUARDAR SESIÓN</span>
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
