import axiosInstance from "../configs/axiosConfig"; // Đường dẫn đến file cấu hình axios

const chatApi = {
  sendMessage: (roomId, message) => {
    return axiosInstance.post(`/rooms/${roomId}/messages`, { message });
  },
  getMessages: (roomId) => {
    return axiosInstance.get(`/rooms/${roomId}/messages`);
  },
  getChatHistory: (roomId) => {
    return axiosInstance.get(`/rooms/${roomId}/chat-history`);
  },
};

export default chatApi;
