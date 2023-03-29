import axios from "axios";
const path = "part-task/";

export const partTaskAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },
};
