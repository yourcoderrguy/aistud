// KEEP YOUR EXACT IP ADDRESS HERE
const BASE_URL = 'http://10.184.151.38:5000/api';

// Helper to build the request body correctly
const buildRequest = (payload: { text?: string; file?: any }) => {
  if (payload.file) {
    const formData = new FormData();
    // React Native requires this specific formatting to send files
    formData.append('file', {
      uri: payload.file.uri,
      name: payload.file.name,
      type: payload.file.mimeType || 'application/pdf',
    } as any);
    
    // If they typed text AND attached a file, send both
    if (payload.text) formData.append('text', payload.text);
    
    return {
      body: formData,
      headers: { 'Accept': 'application/json' }, // NO Content-Type here!
    };
  } else {
    return {
      body: JSON.stringify({ text: payload.text }),
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
    };
  }
};

export const generateSummary = async (payload: { text?: string; file?: any }) => {
  const { body, headers } = buildRequest(payload);
  const response = await fetch(`${BASE_URL}/summarize`, { method: 'POST', headers, body });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

export const generateQuiz = async (payload: { text?: string; file?: any }) => {
  const { body, headers } = buildRequest(payload);
  const response = await fetch(`${BASE_URL}/quiz`, { method: 'POST', headers, body });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

export const generateFlashcards = async (payload: { text?: string; file?: any }) => {
  const { body, headers } = buildRequest(payload);
  const response = await fetch(`${BASE_URL}/flashcards`, { method: 'POST', headers, body });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};