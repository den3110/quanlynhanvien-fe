import axios from "axios";
const path = "attendance/";

export const attendanceAPI = {
   async fetchWiffi() {
      return await axios.get(path + "wiffi");
   },

   async personal(query) {
      return await axios.get(path + "personal", { params: query });
   },

   async today(query) {
      return await axios.get(path + "today", { params: query });
   },

   async userAttendance(query) {
      return await axios.get("user/attendance", { params: query });
   },

   async createOrUpdate(payload) {
      return await axios.post(path + "create-or-update", payload);
   },

   async getAttendanceByUser(query = {}) {
      return await axios.get(path + "detail-to-user", { params: query });
   },
};
