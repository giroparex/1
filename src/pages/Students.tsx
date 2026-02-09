import React from 'react';
import { useAppContext } from '../context/AppContext';

const Students: React.FC = () => {
  const { students, courses, updateStudent } = useAppContext();

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gestión de Alumnos</h2>
          <p className="text-sm text-slate-500 mt-1">Administra los candidatos a socorrista</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-95">
          <span className="material-icons-round">add</span>
          <span>Nuevo Alumno</span>
        </button>
      </header>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordenar por:</span>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-white dark:bg-slate-700 shadow-sm text-primary">Nombre A-Z</button>
            <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Curso</button>
          </div>
        </div>
        <div className="relative hidden sm:block">
          <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input
            className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 w-64 transition-all"
            placeholder="Buscar alumno..."
            type="text"
          />
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
        {students.map(student => (
          <div key={student.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Pic */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="relative w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                  <span className="material-icons-round text-slate-400 text-4xl group-hover:text-primary transition-colors">photo_camera</span>
                  <img src={student.avatar} alt={student.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                </div>
              </div>
              {/* Data Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                <div className="sm:col-span-2 lg:col-span-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</h3>
                  <div className="flex items-center mt-2 text-slate-500 text-sm">
                    <span className="material-icons-round text-primary text-base mr-2">place</span>
                    <span>{student.address}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                    <span className="material-icons-round text-primary text-base mr-2">phone</span>
                    <span>{student.mobile}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                    <span className="material-icons-round text-primary text-base mr-2">smartphone</span>
                    <span>{student.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm overflow-hidden text-ellipsis">
                    <span className="material-icons-round text-primary text-base mr-2">mail</span>
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="pt-1">
                    <select
                      className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium focus:ring-primary focus:border-primary px-2 py-1"
                      value={student.courseId}
                      onChange={(e) => updateStudent({ ...student, courseId: e.target.value })}
                    >
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                      <option value="none">Sin curso</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-8 text-center pb-20">
          <p className="text-slate-400 text-sm italic">Fin de la lista de alumnos activos.</p>
        </div>
      </div>
    </div>
  );
};

export default Students;
