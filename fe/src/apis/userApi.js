import axiosInstance from "../configs/axiosConfig"; // Nhập axiosInstance

const userApi = {
  saveUserData: (data) => {
    return axiosInstance.post("user/set-user-data", data);
  },
  getProfile: () => {
    return axiosInstance.get("/user/me");
  },
  getUser: async (userId) => {
    return axiosInstance.get(`/user/${userId}`);
  },
  getAllUsers: () => {
    return axiosInstance.get("/user/getAll");
  },
  getFriendRequest: (page, limit) => {
    return axiosInstance.get("/friend-request/get-my", {
      params: {
        page,
        limit,
      },
    });
  },
  getFriendList: (userId) => {
    return axiosInstance.get(`/user/get-detail/${userId}/friend-list`);
  },
  searchUsers: (name, page = 1, limit = 10) => {
    return axiosInstance.get("/user/search", {
      params: {
        name,
        page,
        limit,
      },
    });
  },
  editProfile: (data) => {
    return axiosInstance.patch("/user/me/edit-profile", data);
  },
  addFriend: (data) => {
    return axiosInstance.post("/friend-request/add-friend", data);
  },
  acceptFriendRequest: (friendRequestId, status) => {
    return axiosInstance.patch(`/friend-request/update/${friendRequestId}`, {
      status,
    });
  },
  updateUserGameRoomId: async (userId, gameRoomId) => {
    try {
      const response = await axiosInstance.put(`/user/${userId}/gameroom`, {
        gameRoomId: gameRoomId,
      });
      console.log("Updating user gameRoomId with:", userId, response.data.id);
      return response.data;
    } catch (error) {
      console.error("Error updating user gameRoomId:", error);
      throw error; // Để có thể xử lý lỗi ở nơi khác
    }
  },
  //Lấy danh sách người dùng online**
  getOnlineUsers: async () => {
    try {
      const response = await axiosInstance.get("/user/online");
      return response.data; // Trả về danh sách người dùng online
    } catch (error) {
      console.error("Error fetching online users:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  },
  //  Gửi lời mời người dùng vào phòng**
  inviteUserToRoom: async (userId, gameRoomId) => {
    try {
      const response = await axiosInstance.post(`/user/${userId}/invite`, {
        gameRoomId: gameRoomId,
      });
      console.log(`User ${userId} invited to room ${gameRoomId}`);
      return response.data; // Trả về phản hồi của server
    } catch (error) {
      console.error("Error inviting user to room:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  },
  // **3. Cập nhật trạng thái online**
  updateOnlineStatus: async (userId) => {
    try {
      const response = await axiosInstance.put(`/user/${userId}/online`);
      // console.log(`User ${userId} online status updated`);
      return response.data; // Trả về phản hồi của server
    } catch (error) {
      console.error("Error updating user online status:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  },
  getUsersInRoom: async (roomId) => {
    try {
      const response = await axiosInstance.get(`/user/${roomId}/users`);
      // console.log(`Users in room ${roomId} fetched successfully`);
      return response.data; // Trả về danh sách người dùng
    } catch (error) {
      // console.error(`Error fetching users in room ${roomId}:`, error);
      // throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  },
};

export default userApi;
