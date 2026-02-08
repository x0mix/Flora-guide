
import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { PlantCareInfo } from "../types";

const API_KEY = process.env.API_KEY || '';

export const identifyPlant = async (base64Image: string): Promise<PlantCareInfo> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Identify this plant and provide detailed care instructions. Return the data in valid JSON format.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          scientificName: { type: Type.STRING },
          description: { type: Type.STRING },
          watering: { type: Type.STRING },
          sunlight: { type: Type.STRING },
          soil: { type: Type.STRING },
          temperature: { type: Type.STRING },
          commonIssues: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          funFact: { type: Type.STRING },
        },
        required: ["name", "scientificName", "description", "watering", "sunlight", "soil", "temperature", "commonIssues", "funFact"]
      },
    },
  });

  return JSON.parse(response.text);
};

export const createGardeningChat = (): Chat => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are an expert master gardener. Provide helpful, accurate, and encouraging advice about plants, pests, soil, landscaping, and indoor gardening. Be concise but thorough.",
    },
  });
};
