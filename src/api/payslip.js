import axios from "axios";
const path = "payslip/";

export const payslipAPI = {
   async list() {
      return await axios.get(path);
   },

   async detail(query) {
      return await axios.get(path + "detail?", { params: query });
   },

   async findOne(id) {
      return await axios.get(path + id);
   },

   // async listByEmployees(id) {
   //    return await axios.get(path + "employees/" + id);
   // },

   async findByUserId(id) {
      return await axios.get(path + "by-user/" + id);
   },

   // async listByWorker(id) {
   //    return await axios.get(path + "worker/" + id);
   // },

   async ListByUser(id) {
      return await axios.get(path + "user/" + id);
   },

   async createPayslip(payload) {
      return await axios.post(path, payload);
   },

   async updatePayslip(id, payload) {
      return await axios.patch(path + id, payload);
   },

   async remove(id) {
      return await axios.delete(path + id);
   },
};
