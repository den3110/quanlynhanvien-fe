import axios from "axios";
const path = "assign-task/";

export const assignTaskAPI = {
   async createAssign(payload) {
      return await axios.post(path, payload);
   },

   // async createAssignByPart(payload) {
   //    return await axios.post(path + "part", payload);
   // },

   async list() {
      return await axios.get(path);
   },

   async listByTask(id) {
      return await axios.get(path + "task/" + id);
   },

   async listByProject(id) {
      return await axios.get(path + "project/" + id);
   },

   async checkNotAssignTask(filter = {}) {
      return await axios.get("worker-project/assign-task/", { params: filter });
   },

   async updatePerform(id, payload) {
      return await axios.patch(path + "perform/" + id, payload);
   },

   async updateFinish(id, payload) {
      return await axios.patch(path + "finish/" + id, payload);
   },

   async performTrueByIdProject(id) {
      return await axios.get(path + "perform/" + id + "/project");
   },

   async finishTrueByIdProject(id) {
      return await axios.get(path + "finish/" + id + "/project");
   },

   async precentTaskPerfrom(id) {
      return await axios.get(path + "task/perform/" + id + "/project");
   },

   async precentTaskFinish(id) {
      return await axios.get(path + "task/finish/" + id + "/project");
   },

   async precentFinish(id) {
      return await axios.get(path + "precent-finish/" + id + "/project");
   },
};
