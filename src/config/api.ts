export const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

if (!API_KEY) {
  console.warn('OpenAI API key is not set. Please check your .env file.')
}

export const API_CONFIG = {
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
} 