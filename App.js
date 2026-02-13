import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
// Asegúrate de que estos archivos también existan como .js
import { generateSampleStudents, refineStudentData } from './services/geminiService.js';

const COURSE_OPTIONS = ["LUNES A VIERNES", "V, S Y D", "INTENSIVO 1", "INTENSIVO 2"];

const App = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [sortKey, setSortKey] = useState('none');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const fileInputRefs = useRef({});

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleAddStudent = () => {
    const newStudent = {
      id: crypto.randomUUID(),
      name: '',
      age: 18,
      email: '',
      phone1: '',
      phone2: '',
      course: 'LUNES A VIERNES',
      photo: ''
    };
    setStudents([newStudent, ...students]);
  };

  const handleUpdateStudent = (id, field, value) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handlePhotoUpload = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      handleUpdateStudent(id, 'photo', event.target.result);
      setFeedback({ type: 'success', message: 'Foto actualizada' });
    };
    reader.readAsDataURL(file);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(students, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estudiantes.json`;
    a.click();
    setFeedback({ type: 'success', message: 'Archivo exportado' });
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderizado compatible con navegador (React.createElement)
  return React.createElement('div', { className: 'min-h-screen pb-32' }, [
    // Navbar
    React.createElement('nav', { key: 'nav', className: 'sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between' }, [
      React.createElement('div', { key: 'logo', className: 'flex items-center gap-3' }, [
        React.createElement('div', { className: 'bg-indigo-600 p-2 rounded-lg text-white' }, React.createElement(Lucide.Users, { size: 24 })),
        React.createElement('h1', { className: 'text-xl font-bold' }, 'Gestor Estudiantes')
      ]),
      React.createElement('button', { 
        key: 'print',
        onClick: () => window.print(),
        className: 'px-4 py-2 border rounded-xl flex items-center gap-2'
      }, [React.createElement(Lucide.Printer, { size: 18 }), 'Imprimir'])
    ]),

    // Main Content
    React.createElement('main', { key: 'main', className: 'max-w-5xl mx-auto px-4 mt-8' }, [
      // Botón Añadir
      React.createElement('div', { key: 'actions', className: 'mb-8 flex gap-4' }, [
        React.createElement('button', {
          onClick: handleAddStudent,
          className: 'px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold'
        }, '+ Añadir Estudiante'),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Buscar...',
          className: 'border p-2 rounded-xl flex-1',
          onChange: (e) => setSearchTerm(e.target.value)
        })
      ]),

      // Lista de Estudiantes
      React.createElement('div', { key: 'list', className: 'space-y-4' }, 
        filteredStudents.map(student => (
          React.createElement('div', { key: student.id, className: 'bg-white p-6 rounded-2xl border shadow-sm flex gap-6' }, [
            // Foto
            React.createElement('div', { key: 'img', className: 'w-24 h-24 bg-slate-100 rounded-xl overflow-hidden' }, 
              student.photo ? React.createElement('img', { src: student.photo, className: 'w-full h-full object-cover' }) : null
            ),
            // Datos
            React.createElement('div', { key: 'data', className: 'flex-1' }, [
              React.createElement('input', {
                key: 'name',
                className: 'text-lg font-bold block w-full border-none',
                value: student.name,
                placeholder: 'Nombre del alumno',
                onChange: (e) => handleUpdateStudent(student.id, 'name', e.target.value)
              }),
              React.createElement('select', {
                key: 'course',
                className: 'mt-2 border rounded p-1 text-sm',
                value: student.course,
                onChange: (e) => handleUpdateStudent(student.id, 'course', e.target.value)
              }, COURSE_OPTIONS.map(opt => React.createElement('option', { key: opt, value: opt }, opt)))
            ]),
            // Borrar
            React.createElement('button', {
              key: 'del',
              onClick: () => handleDeleteStudent(student.id),
              className: 'text-red-500'
            }, React.createElement(Lucide.Trash2, { size: 20 }))
          ])
        ))
      )
    ]),

    // Floating Footer
    React.createElement('div', { key: 'footer', className: 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border p-4 rounded-3xl shadow-2xl flex gap-8' }, [
      React.createElement('button', { key: 'exp', onClick: handleExportJson, className: 'flex flex-col items-center' }, [
        React.createElement(Lucide.Download, { size: 20 }),
        React.createElement('span', { className: 'text-[10px]' }, 'EXPORTAR')
      ]),
      React.createElement('div', { key: 'count', className: 'text-center' }, [
        React.createElement('div', { className: 'text-xl font-bold' }, students.length),
        React.createElement('div', { className: 'text-[10px]' }, 'ALUMNOS')
      ])
    ])
  ]);
};

export default App;
