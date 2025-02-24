import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple';

export const fetchQuizQuestions = async () => {
    try {
        const response = await axios.get(API_URL);
  return response.data.results;
    } catch (error) {
        console.log("-=-=-=- error", error)
    }
  
};
