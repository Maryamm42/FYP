// ChatbotService.js
import axios from 'axios';

const BASE_URL = 'http://192.168.0.105:5005'; // Update with your Rasa server URL

export const sendMessageToRasa = async (message) => {
  try {
    const response = await axios.post(`${BASE_URL}/webhooks/rest/webhook`, {
      message: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to Rasa:', error);
    throw error;
  }
};
