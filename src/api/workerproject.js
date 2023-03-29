import axios from "axios";
const path = "worker-project/";

export const workerProjectAPI = {
   async create(payload) {
      return await axios.post(path, payload);
   },

   async listByProject(id) {
      return await axios.get(path + "project/" + id);
   },
};
