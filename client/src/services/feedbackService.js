import axios from "axios";

export const submitFeedback = async (params) => {
    try {
      const { data } = await axios.post(`http://127.0.0.1:3000/feedback/save`, params);
      return { data };
    } catch (error) {
      return { error };
    }
};