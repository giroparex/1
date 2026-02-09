import React from 'react';
import { useAppContext } from '../context/AppContext';

const Agenda: React.FC = () => {
  const { sessions, students } = useAppContext();

  // Simplified calendar generation
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Header Section */}
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Agenda del Centro</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Socorrismo Aqualandia • Mayo 2024</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm">Mes</button>
            <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Semana</button>
            <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Día</button>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:border-slate-800 mx-2"></div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <span className="material-icons">chevron_left</span>
          </button>
          <button className="px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg">Hoy</button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
      </header>

      {/* Calendar Grid and Side Panel */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            {/* Day Headers */}
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
              <div key={d} className="bg-slate-50 dark:bg-slate-900 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                {d}
              </div>
            ))}

            {/* Days (Simplified) */}
            {days.map(day => {
              const daySessions = sessions.filter(s => parseInt(s.date.split('/')[0]) === day);
              const isToday = day === 7;

              return (
                <div key={day} className={`bg-white dark:bg-slate-900 min-h-[120px] p-2 flex flex-col gap-1 ${isToday ? 'ring-2 ring-primary ring-inset z-10' : ''}`}>
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${isToday ? 'bg-primary text-white' : 'text-slate-900 dark:text-white'}`}>
                    {day}
                  </span>
                  {daySessions.map(session => (
                    <div
                      key={session.id}
                      className={`text-[10px] p-1.5 rounded-md border-l-2 leading-tight font-medium ${
                        session.type === 'theory' ? 'bg-blue-50 dark:bg-blue-900/30 text-primary border-primary' :
                        session.type === 'practice' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-500' :
                        session.type === 'exam' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 border-amber-500' :
                        'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-400'
                      }`}
                    >
                      {session.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Detail Panel */}
        <aside className="hidden lg:flex w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex-col shrink-0">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-bold text-lg">Martes, 7 Mayo</h2>
            <p className="text-sm text-slate-500">2 Sesiones programadas</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {sessions.filter(s => s.date === '07/05/2024').map(session => (
              <div key={session.id} className={`relative pl-4 border-l-4 ${session.type === 'theory' ? 'border-primary' : 'border-emerald-500'}`}>
                <p className={`text-[10px] font-bold uppercase mb-1 ${session.type === 'theory' ? 'text-primary' : 'text-emerald-600'}`}>{session.time}</p>
                <h3 className="font-semibold text-sm mb-2">{session.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="material-icons text-sm">place</span>
                  {session.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="material-icons text-sm">person</span>
                  Prof. {session.instructor}
                </div>
                {session.attendees.length > 0 && (
                  <div className="mt-3 flex -space-x-2">
                    {session.attendees.slice(0, 3).map(sid => (
                      <img key={sid} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover" src={students.find(s => s.id === sid)?.avatar} alt="Student" />
                    ))}
                    {session.attendees.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold border-2 border-white dark:border-slate-900">
                        +{session.attendees.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-32 relative">
              <img className="w-full h-full object-cover grayscale opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCaANxWNyKusYJHjU6NpcFv9ERokP2Xb_tgEVGX8Qr7UM7pjmJvfJaMkZ2qAhZ2bOufeJiMDL4lc-cnxl-ohp6KQZmeOKVS2K7hkFKCMBvkJ_PKu1FBjNYqP0i0XpWkytHk5gGFUvew17u2LryXfxPEPeqRafZ5nokPBosZQGYcOqSbPnBoFhuaE_yDvL-LVBltBhQPyhGfUgF-NidAV-EmugTiY-pw6F5uCuGhjSOsY11jB6mXYEhDtU1Sw7-o1tXOQdS5kjWSQ" alt="Pool" />
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg shadow-xl flex items-center gap-2">
                  <span className="material-icons text-primary text-base">location_on</span>
                  <span className="text-[10px] font-bold">Instalaciones</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
            <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 flex items-center justify-center gap-2">
              <span className="material-icons">add</span>
              Nueva Sesión
            </button>
          </div>
        </aside>
      </div>

      {/* Floating Action Button for Mobile */}
      <button className="lg:hidden fixed bottom-20 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50">
        <span className="material-icons text-3xl">add</span>
      </button>
    </div>
  );
};

export default Agenda;
