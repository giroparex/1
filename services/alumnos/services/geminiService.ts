import { GoogleGenAI, Type } from "@google/genai";
import { Student } from "../types";

// En Vite, las variables de entorno para el cliente deben empezar con VITE_
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ VITE_GEMINI_API_KEY no encontrada. Las funciones de IA no funcionarán.");
}

const ai = new GoogleGenAI(API_KEY || "");

const COURSE_OPTIONS = ["LUNES A VIERNES", "V, S Y D", "INTENSIVO 1", "INTENSIVO 2"];

// ... resto de tus funciones (generateSampleStudents, refineStudentData) se mantienen igual
