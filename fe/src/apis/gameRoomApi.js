import axiosInstance from "../configs/axiosConfig";

const gameRoomApi = {
  // Tạo một phòng mới
  createRoom: async (data) => {
    const response = await axiosInstance.post("/gameroom", data);
    return response; // Trả về dữ liệu từ phản hồi
  },

  // Người chơi tham gia vào một phòng
  joinRoom: async (roomId, userId) => {
    try {
      const response = await axiosInstance.post(`/gameroom/join`, {
        roomId: roomId,
        userId: userId,
      });
      return response;
    } catch (error) {
      console.error("Error joining room:", error);
      throw error; // Để có thể xử lý lỗi ở nơi khác
    }
  },

  // Lấy danh sách người chơi trong phòng
  getPlayersInRoom: async (roomName) => {
    const response = await axiosInstance.get(`/gameroom/${roomName}/players`);
    return response;
  },
  getGameRooms: async () => {
    const response = await axiosInstance.get(`/gameroom`);
    return response;
  },

  // Cập nhật trạng thái trò chơi
  updateGameState: async (roomName, gameState) => {
    const response = await axiosInstance.patch(
      `/rooms/${roomName}/game-state`,
      gameState
    );
    return response;
  },
  getRoomName: async (roomId) => {
    try {
      const response = await axiosInstance.get(`/gameroom/${roomId}`);
      return response.data.name; // Trả về dữ liệu tên phòng
    } catch (error) {
      console.error("Error fetching room name:", error);
      throw error; // Để xử lý lỗi ở nơi khác nếu cần
    }
  },

  // Người chơi thực hiện nước đi
  playerMove: async (roomName, selectedCards) => {
    const response = await axiosInstance.post(`/gameroom/${roomName}/move`, {
      selectedCards,
    });
    return response;
  },

  // Lấy thông tin trò chơi hiện tại
  getCurrentGame: async (roomName) => {
    const response = await axiosInstance.get(
      `/gameroom/${roomName}/current-game`
    );
    return response;
  },

  // Bắt đầu trò chơi
  startGame: async (roomName) => {
    const response = await axiosInstance.post(`/gameroom/${roomName}/start`);
    return response;
  },

  // Người chơi rời khỏi phòng
  leaveRoom: async (userId) => {
    alert("Dang leaving");
    try {
      const response = await axiosInstance.post(`/gameroom/leave`, {
        userId: userId,
      });
      return response.data; // Có thể trả về dữ liệu phản hồi nếu cần
    } catch (error) {
      console.error("Error leaving room:", error);
      throw error; // Để có thể xử lý lỗi ở nơi khác
    }
  },
};

export default gameRoomApi;
