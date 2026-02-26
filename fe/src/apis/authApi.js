import axiosInstance from "../configs/axiosConfig"; // Đường dẫn đến file cấu hình axios

const authApi = {
  login: (data) => {
    return axiosInstance.post("/auth/login", data);
  },
  logout: () => {
    return axiosInstance.post("/auth/logout");
  },
  resetAccessToken: (refreshToken) => {
    return axiosInstance.post("/auth/refresh-token", { refreshToken });
  },
  register: (data) => {
    return axiosInstance.post("/auth/register", data);
  },
};

export default authApi;
