import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { courses, students, sessions } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 md:p-10 pb-24 overflow-y-auto">
      {/* Header Section */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Panel Principal</h1>
          <p className="text-slate-500 dark:text-slate-400 font-light mt-1">Socorrismo Aqualandia Management</p>
        </div>
        <div className="hidden md:flex bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 items-center gap-3">
          <span className="material-icons-round text-primary">notifications</span>
          <span className="text-sm font-medium">3 Alertas activas</span>
        </div>
      </header>

      {/* Welcome Banner */}
      <section className="mb-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#0086c9] p-8 text-white">
        <div className="relative z-10 max-w-md">
          <h2 className="text-2xl font-semibold mb-2">¡Hola, Javier!</h2>
          <p className="text-white/80 leading-relaxed mb-6">Tienes 2 exámenes de certificación pendientes de corregir para el curso de salvamento avanzado.</p>
          <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold text-sm shadow-lg hover:bg-slate-50 transition-colors">
            Revisar ahora
          </button>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute right-10 bottom-0 opacity-20">
          <span className="material-icons-round text-[160px]">pool</span>
        </div>
      </section>

      {/* Main Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cursos Card */}
        <button
          onClick={() => navigate('/courses')}
          className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition-all text-left flex flex-col"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-icons-round text-3xl">school</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Cursos</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Gestión de formación, certificaciones y materiales didácticos.</p>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700 w-full">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{courses.length} Cursos activos</span>
            <span className="material-icons-round text-primary">arrow_forward</span>
          </div>
        </button>

        {/* Alumnos Card */}
        <button
          onClick={() => navigate('/students')}
          className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition-all text-left flex flex-col"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-icons-round text-3xl">groups</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Alumnos</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Base de datos de alumnos, expedientes médicos y asistencia.</p>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700 w-full">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{students.length} Alumnos</span>
            <span className="material-icons-round text-primary">arrow_forward</span>
          </div>
        </button>

        {/* Agenda Card */}
        <button
          onClick={() => navigate('/agenda')}
          className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition-all text-left flex flex-col"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-icons-round text-3xl">calendar_month</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Agenda</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Horarios de clases, exámenes y reservas de piscina.</p>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700 w-full">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Próximas Sesiones</span>
            <span className="material-icons-round text-primary">arrow_forward</span>
          </div>
        </button>
      </div>

      {/* Recent Activity */}
      <section className="mt-12">
        <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          Próximas Sesiones
        </h4>
        <div className="space-y-4">
          {sessions.slice(0, 2).map((session) => (
            <div key={session.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-lg flex flex-col items-center justify-center border border-slate-200 dark:border-slate-600">
                <span className="text-[10px] font-bold uppercase text-slate-400">{session.date.split('/')[1]}</span>
                <span className="text-lg font-bold leading-none">{session.date.split('/')[0]}</span>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-sm">{session.title}</h5>
                <p className="text-xs text-slate-500">{session.location} • {session.time}</p>
              </div>
              <div className="flex -space-x-2">
                {session.attendees.slice(0, 2).map((sid) => (
                  <img
                    key={sid}
                    className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800"
                    src={students.find(s => s.id === sid)?.avatar}
                    alt="User"
                  />
                ))}
                {session.attendees.length > 2 && (
                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    +{session.attendees.length - 2}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
          <span className="material-icons-round text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
