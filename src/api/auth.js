import axios from "axios";
const path = "auth/";

export const authAPI = {
   async login(payload) {
      return await axios.post(path + "login", payload);
   },

   async register(payload) {
      return await axios.post(path + "register", payload);
   },

   async registerUser(payload) {
      return await axios.post(path + "register-user", payload);
   },

   async me() {
      return await axios.post(path + "me");
   },
};
