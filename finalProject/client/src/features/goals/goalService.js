import axios from "axios";

const API_URL = "/api/goals/";

const authConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// get goals
export const getGoals = async (token) => {
  const response = await axios.get(API_URL, authConfig(token));
  return response.data;
};

// create goal
export const createGoal = async (goalData, token) => {
  const response = await axios.post(API_URL, goalData, authConfig(token));
  return response.data;
};

// delete goal
export const deleteGoal = async (goalId, token) => {
  const response = await axios.delete(API_URL + goalId, authConfig(token));
  return response.data;
};

export default { getGoals, createGoal, deleteGoal };
