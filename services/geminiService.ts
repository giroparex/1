import { GoogleGenAI, Type } from "@google/genai";
import { Student } from "../types";

// En Vite, usamos import.meta.env para acceder a las variables de entorno
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ No se encontró la API Key en VITE_GEMINI_API_KEY. Las funciones de IA no funcionarán.");
}

const ai = new GoogleGenAI(API_KEY || "");

const COURSE_OPTIONS = ["LUNES A VIERNES", "V, S Y D", "INTENSIVO 1", "INTENSIVO 2"];

export const generateSampleStudents = async (count: number = 5): Promise<Student[]> => {
  const model = ai.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
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
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `Refina esta lista de estudiantes: estandariza nombres (Mayúsculas en iniciales), 
  asegura que los teléfonos tengan formato internacional y que el curso sea válido.
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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Error al refinar datos:", error);
    return students; // Devolvemos los datos originales si falla
  }
};
