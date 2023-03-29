import axios from "axios";
const path = "contract/";

export const contractAPI = {
   createOrUpdate(payload) {
      return axios.post(path + "create-or-update", payload);
   },
};
