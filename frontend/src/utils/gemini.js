import { GoogleGenerativeAI } from "@google/generative-ai";
const gemKey = import.meta.env.VITE_GEMINI_KEY;

const genAI = new GoogleGenerativeAI(gemKey);
const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default gemini;
