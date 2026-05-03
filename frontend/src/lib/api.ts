import axios from 'axios';

const API_URL = 'https://prompt-war-99378412040.europe-west1.run.app';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatWithAI = async (message: string, sessionId: string, language: string = 'en') => {
  const response = await api.post('/api/chat', { message, session_id: sessionId, language });
  return response.data;
};

export const getElectionTimeline = async () => {
  const response = await api.get('/api/election/timeline');
  return response.data;
};

export const factCheckClaim = async (claim: string) => {
  const response = await api.post('/api/factcheck', { claim });
  return response.data;
};

export const getQuizQuestions = async (count: number = 10) => {
  const response = await api.get(`/api/quiz/questions?count=${count}`);
  return response.data;
};

export const lookupVoter = async (data: { epic?: string, name?: string, dob?: string }) => {
  const response = await api.post('/api/voter/lookup', data);
  return response.data;
};
