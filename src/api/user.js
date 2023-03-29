import axios from "axios";
const path = "user/";

export const userAPI = {
   listClient() {
      return axios.get(path + "client");
   },

   listClientByEmployees(id) {
      return axios.get(path + "client-role-employees/" + id);
   },

   listEmployees() {
      return axios.get(path + "employees");
   },

   listWorkerExcellent() {
      return axios.get(path + "worker/excellent");
   },

   listEmployeesByUserId(id) {
      return axios.get(path + "employees-by-user/" + id);
   },

   // listEmployeesByWorker(id) {
   //    return axios.get(path + "employees-role-worker/" + id);
   // },

   listWorker() {
      return axios.get(path + "worker");
   },

   listWorkerByClient(id) {
      return axios.get(path + "worker-by-role/" + id);
   },

   // listWorkerByEmployees(id) {
   //    return axios.get(path + "worker-role-employees/" + id);
   // },

   listUserSalary() {
      return axios.get(path + "salary");
   },

   listTodayAttendance(query) {
      return axios.get(path + "today-attendance", { params: query });
   },

   listTodayOvertime(query) {
      return axios.get(path + "today-overtime", { params: query });
   },

   workerNoAssign() {
      return axios.get(path + "worker-no-assign");
   },

   workerProjectClient(filter = {}) {
      return axios.get(path + "worker-project-by-client?", {
         params: filter,
      });
   },

   sumWorkHourInMonthOfWorker(query = {}) {
      return axios.get(path + "sum-workhour-in-month?", {
         params: query,
      });
   },

   profile(id) {
      return axios.get(path + id);
   },

   payroll(query = {}) {
      return axios.get(path + "payroll", {
         params: query,
      });
   },

   async createClient(payload) {
      return await axios.post(path + "client", payload);
   },

   async createEmployees(payload) {
      return await axios.post(path + "employees", payload);
   },

   async createWorker(payload) {
      return await axios.post(path + "worker", payload);
   },

   async updateEmployees(id, payload) {
      return await axios.patch(path + "employees/" + id, payload);
   },

   async updateClient(id, payload) {
      return await axios.patch(path + "client/" + id, payload);
   },

   async updateWorker(id, payload) {
      return await axios.patch(path + "worker/" + id, payload);
   },

   remove(id) {
      return axios.delete(path + id);
   },
};
