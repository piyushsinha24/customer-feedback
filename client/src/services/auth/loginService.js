import axios from "axios";

export const login = async (params) => {
  try {
    const response = await axios.post(`http://127.0.0.1:3000/login`, params);
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};
