import axios from "axios";
const path = "overtime/";

export const overtimeAPI = {
   async create(payload) {
      return axios.post(path, payload);
   },
};
