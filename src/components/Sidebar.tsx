import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: 'dashboard', label: 'Inicio', mobileLabel: 'Panel' },
    { to: '/courses', icon: 'school', label: 'Cursos', mobileLabel: 'Cursos' },
    { to: '/students', icon: 'people', label: 'Alumnos', mobileLabel: 'Alumnos' },
    { to: '/agenda', icon: 'calendar_today', label: 'Agenda', mobileLabel: 'Más' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-20 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col py-8 z-20 transition-all duration-300">
        <div className="px-4 mb-10 flex items-center justify-center lg:justify-start gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
            <span className="material-icons-round text-3xl">waves</span>
          </div>
          <span className="hidden lg:block font-bold text-xl text-primary tracking-tight">Aqualandia</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary border-r-4 border-primary'
                    : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <span className="material-icons-round">{item.icon}</span>
              <span className="hidden lg:block font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-3 flex flex-col gap-4">
          <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-icons-round">settings</span>
            <span className="hidden lg:block font-medium">Ajustes</span>
          </button>
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANNmutF33qo-qqEoHbFhSMI1UPyiCR-oyK5KzNwIHEPSQS2qi9DX9gySe7w7IGfH4XWntDUXsagErHHS3uJWlRMRjmZMXxdMeFskL6SkOWXNjYef0ENasUWvIwZoA99EIenzyxv0obxeBBPn9jMd6GwaXuzhNwy8iCVyvFbEwZY2kgPDSEuGYPOi1ZTb5xHhrSGrN8FPlWxc_2EJhOjp4Y-vYjUA2Jd3i0mXbhJyLz6bbZefAoNdvjpREUWxg66OCLL17QF0T3vA"
                alt="Profile"
              />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">Javier García</p>
              <p className="text-xs text-slate-500">Instructor Jefe</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-3 px-6 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? 'text-primary' : 'text-slate-400'}`
            }
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="text-[10px] mt-1 font-medium">{item.mobileLabel}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
