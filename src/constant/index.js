export const api = "http://localhost:3000/";
// export const api = "https://manager-company-be-production.up.railway.app/";
export const alphaNumericPattern = /^[a-zA-Z0-9_ .-]*$/;
export const emailrgx =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
// export const phonergx = /^[a-zA-Z0-9_ .-]*$/;
export const phonergx = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;

export var customText = (str) => {
   return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
};

export const formatMoney = (money) => {
   return money?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const formatMoneyVND = (money) => {
   return money?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const timeCustom = (time) => {
   const timed = `${
      Math.floor(time / 3600) < 10 ? "0" + Math.floor(time / 3600) : Math.floor(time / 3600)
   }:${
      Math.floor((time - Math.floor(time / 3600) * 3600) / 60) < 10
         ? "0" + Math.floor((time - Math.floor(time / 3600) * 3600) / 60)
         : Math.floor((time - Math.floor(time / 3600) * 3600) / 60)
   }`;
   return timed === "00:00" ? "..." : timed;
};

export const formatHourToSecond = (time) => {
   return time?.slice(0, 2) * 3600 + time?.slice(3, 5) * 60;
};

export const avartarFAKE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
export const logoFAKE =
   "https://fce.com.vn/wp-content/uploads/2022/12/logo_fce_trong_suot-2048x1229.png";

export const EmployeeDepartmentType = {
   MARKETING: "marketing",
   RECRUIT: "recruit",
   BUSSINESS: "bussiness",
   ACCOUNTANT: "accountant",
};

export const UserRoleType = {
   ADMIN: "Admin",
   CLIENT: "Client",
   EMPLOYEE: "Employee",
   WORKER: "Worker",
   LEADER: "Leader",
};

export const ProjectPriorityEnum = {
   LOW: 0,
   MEDIUM: 1,
   HIGH: 2,
};

export const ProjectStatusEnum = {
   CANCEL: 0,
   NEWPROJECTS: 1,
   RUNNING: 2,
   ONHOLD: 3,
   FINISHED: 4,
};

export const TaskStatusType = {
   START: 0,
   INPROGRESS: 1,
   COMPLETED: 2,
};

export const overtimeType = {
   MORNING: "morning",
   EVERNINGS: "evernings",
   SHIFTS: "shifts",
};

export const overtimeOpition = [
   { value: overtimeType.MORNING, label: "Ca sáng" },
   { value: overtimeType.EVERNINGS, label: "Ca tối" },
   { value: overtimeType.SHIFTS, label: "Ca gãy" },
];

export const prioritys = [
   { value: 0, label: "Thấp" },
   { value: 1, label: "Trung bình" },
   { value: 2, label: "Cao" },
];

export const statusProject = [
   { value: 1, label: "Dự án mới" },
   { value: 2, label: "Đang chạy" },
   { value: 4, label: "Hoàn thành" },
];

export const EmployeeDepartmentOpition = [
   {
      value: EmployeeDepartmentType.ACCOUNTANT,
      label: "Kế toán",
   },
   {
      value: EmployeeDepartmentType.MARKETING,
      label: "Marketing",
   },
   {
      value: EmployeeDepartmentType.RECRUIT,
      label: "Tuyển dụng",
   },
   {
      value: EmployeeDepartmentType.BUSSINESS,
      label: "Kinh doanh",
   },
];

export const EmployeesRoleOpition = [
   {
      value: UserRoleType.EMPLOYEE,
      label: "Nhân viên",
   },
   {
      value: UserRoleType.LEADER,
      label: "Leader",
   },
];

export const ExcellentOpition = [
   {
      value: false,
      label: "Người lao dộng",
   },
   {
      value: true,
      label: "Trưởng nhóm",
   },
];
