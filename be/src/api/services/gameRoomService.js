// src/api/services/gameRoomService.js
const GameRoom = require("../models/gameRoomModel");
const User = require("../models/userModel");

const gameRoomService = {
  createRoomService: async (name, playerCount) => {
    // Khởi tạo playerCount là 0
    const newGameRoom = await GameRoom.create({ name, playerCount });
    return newGameRoom;
  },

  joinRoomService: async (roomId, userId) => {
    const gameRoom = await GameRoom.findByPk(roomId);
    if (!gameRoom) throw new Error("Phòng game không tồn tại.");

    // Kiểm tra nếu người chơi đã tham gia phòng
    const user = await User.findByPk(userId);
    if (!user) throw new Error("Người dùng không tồn tại.");

    // Nếu người chơi chưa tham gia phòng, tăng playerCount
    if (!user.gameRoomId) {
      user.gameRoomId = roomId; // Gán roomId cho user
      await user.save(); // Lưu thay đổi
      gameRoom.playerCount += 1; // Tăng playerCount
      await gameRoom.save(); // Lưu phòng game với playerCount đã cập nhật
    } else {
      throw new Error("Người chơi đã tham gia một phòng khác.");
    }

    return gameRoom;
  },

  getRoomByIdService: async (roomId) => {
    const gameRoom = await GameRoom.findByPk(roomId);
    if (!gameRoom) throw new Error("Phòng game không tồn tại.");
    return gameRoom;
  },

  getAllRoomsService: async () => {
    return await GameRoom.findAll();
  },

  updateRoomService: async (roomId, name, playerCount) => {
    const gameRoom = await gameRoomService.getRoomByIdService(roomId); // Sử dụng hàm getRoomById để kiểm tra
    await gameRoom.update({ name, playerCount });
    return gameRoom;
  },

  deleteRoomService: async (roomId) => {
    const gameRoom = await gameRoomService.getRoomByIdService(roomId);
    await gameRoom.destroy();
  },

  getPlayersInRoomService: async (roomId) => {
    const players = await User.findAll({
      include: [
        {
          model: GameRoom, // Thay đổi thành model tương ứng với bảng GameRoom của bạn
          where: { id: roomId },
          through: { attributes: [] }, // Nếu bạn sử dụng bảng trung gian, có thể không cần thuộc tính này
        },
      ],
    });
    return players; // Trả về danh sách người chơi
  },
};

module.exports = gameRoomService;
