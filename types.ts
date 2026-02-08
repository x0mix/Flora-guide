
export interface PlantCareInfo {
  name: string;
  scientificName: string;
  description: string;
  watering: string;
  sunlight: string;
  soil: string;
  temperature: string;
  commonIssues: string[];
  funFact: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppTab {
  IDENTIFY = 'identify',
  CHAT = 'chat',
  HISTORY = 'history'
}
