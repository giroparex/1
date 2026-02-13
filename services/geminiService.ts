import { GoogleGenAI, Type } from "@google/genai";
import { Student } from "../types"; // Importación corregida hacia la carpeta superior

// Usamos import.meta.env para mayor compatibilidad con Vite en producción
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI(API_KEY || "");

const COURSE_OPTIONS = ["LUNES A VIERNES", "V, S Y D", "INTENSIVO 1", "INTENSIVO 2"];

export const generateSampleStudents = async (count: number = 5): Promise<Student[]> => {
  // Se utiliza el modelo estable para evitar errores de preview en GitHub
  const model = ai.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `Genera una lista de ${count} objetos de estudiantes realistas en formato JSON. 
  Los nombres deben ser comunes en español. El campo 'photo' debe ser una cadena vacía. 
  Incluye phone1, phone2 y un campo 'course' que sea uno de: ${COURSE_OPTIONS.join(', ')}.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Error en la generación de IA:", error);
    return [];
  }
};

export const refineStudentData = async (students: Student[]): Promise<Student[]> => {
  const model = ai.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `Refina esta lista de estudiantes: estandariza nombres, verifica edades y asegura formato consistente.
  Datos: ${JSON.stringify(students)}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Error al refinar datos:", error);
    return students;
  }
};
