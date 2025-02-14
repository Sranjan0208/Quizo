import axios from "axios";

const API_URL = "http://localhost:5000/quizzes";

export const getQuizzes = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
};

export const createQuiz = async (quiz: {
  title: string;
  description: string;
}) => {
  try {
    await axios.post(API_URL, quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
  }
};

export const updateQuiz = async (
  id: string,
  quiz: { title: string; description: string }
) => {
  try {
    await axios.put(`${API_URL}/${id}`, quiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
  }
};

export const deleteQuiz = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting quiz:", error);
  }
};
