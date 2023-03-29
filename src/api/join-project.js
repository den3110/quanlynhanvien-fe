import axios from "axios";
const path = "join-project/";

export const joinProjectAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },
};
