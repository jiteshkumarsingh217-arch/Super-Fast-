import { GoogleGenAI, Type } from "@google/genai";
import { TriviaQuestion } from "../types";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTriviaQuestion = async (): Promise<TriviaQuestion | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a fun, simple general knowledge trivia question for a casual game app. Provide 4 options and identify the correct one.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['easy', 'medium', 'hard'] }
          },
          required: ["question", "options", "correctAnswer"],
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as TriviaQuestion;
      // Shuffle options to ensure randomness if the model always puts correct answer first (though typically it doesn't with this prompt)
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching trivia question:", error);
    // Fallback question in case of API failure
    return {
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
      difficulty: "easy"
    };
  }
};

export const getWinningMessage = async (amount: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, exciting congratulatory message for winning ₹${amount} in a game app. Keep it under 15 words. Hindi-English mix (Hinglish) is preferred.`,
    });
    return response.text || "Congratulations! You won!";
  } catch (error) {
    return `Wow! You won ₹${amount}!`;
  }
};