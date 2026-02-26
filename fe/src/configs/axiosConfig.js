import axios from "axios";

let serverUrl = import.meta.env.VITE_SERVER_URL;
const axiosInstance = axios.create({
  // baseURL: "http://localhost:3001/api/v1", // Địa chỉ của API server của bạn

  baseURL: serverUrl + "/api/v1", // Địa chỉ của API server của bạn
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Thời gian tối đa cho một request (10 giây)
  withCredentials: true, // Nếu cần thiết cho cookie
});

// Interceptor trước khi gửi request
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token xác thực vào header nếu có
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý kết quả trả về từ API thành công
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu token hết hạn và thử làm mới token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(serverUrl + "/api/v1", {
          refreshToken,
        });

        // Lưu token mới vào localStorage
        localStorage.setItem("token", data.accessToken);

        // Cập nhật lại token trong header và retry request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Nếu làm mới token thất bại, xử lý đăng xuất người dùng
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        // Điều hướng về trang login nếu cần
      }
    }

    // Trả về lỗi nếu không phải lỗi 401 hoặc retry thất bại
    return Promise.reject(error);
  }
);

export default axiosInstance;
