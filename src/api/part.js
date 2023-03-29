import axios from "axios";
const path = "part/";

export const partAPI = {
   async listByIdProject(id) {
      return await axios.get(path + id + "/project");
   },

   async child(query = {}) {
      return await axios.get(path + "child", { params: query });
   },

   async checkPartNotAssignTask(filter = {}) {
      return await axios.get(path + "not-task?", { params: filter });
   },

   async checkNotAssignPart(id) {
      return await axios.get("user/not-assign-part/" + id);
   },

   async create(payload) {
      return await axios.post(path, payload);
   },

   async createUserJoinPart(payload) {
      return await axios.post("join-part", payload);
   },

   async precentPartByIdProject(filter = {}) {
      return await axios.get(path + "precent", { params: filter });
   },

   async removeUserInPart(id) {
      return await axios.delete("join-part/" + id);
   },
};
