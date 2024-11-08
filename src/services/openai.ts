import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateQuestions = async (jobType: string, difficulty: string): Promise<Array<{
  question: string;
  options: string[];
  correctAnswer: string;
}>> => {
  const prompt = `Genera 10 preguntas de opción múltiple para una entrevista de desarrollador de nivel ${difficulty} en ${jobType}. 
  Formatea cada pregunta como un objeto JSON con la siguiente estructura:
  {
    "question": "el texto de la pregunta",
    "options": ["opción1", "opción2", "opción3", "opción4"],
    "correctAnswer": "la opción correcta"
  }
  Devuelve un arreglo de 10 de tales objetos.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error("No response from OpenAI");

    return JSON.parse(response);
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};