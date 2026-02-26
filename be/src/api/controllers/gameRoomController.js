// src/api/controllers/gameRoomController.js
const gameRoomService = require("../services/gameRoomService");
const GameRoom = require("../models/gameRoomModel");
const User = require("../models/userModel");

// Tạo phòng game mới
const createGameRoomController = async (req, res) => {
  try {
    const { name, playerCount } = req.body; // Lấy playerCount từ request body
    const newGameRoom = await gameRoomService.createRoomService(
      name,
      playerCount
    ); // Gọi service với playerCount
    res.status(201).json(newGameRoom);
  } catch (error) {
    res.status(500).json({ error: "Không thể tạo phòng game." });
  }
};

// Lấy danh sách phòng game
const getGameRoomsController = async (req, res) => {
  try {
    const gameRooms = await gameRoomService.getAllRoomsService();
    res.status(200).json(gameRooms);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách phòng game." });
  }
};

// Lấy thông tin phòng game theo ID
const getGameRoomByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const gameRoom = await gameRoomService.getRoomByIdService(id);
    res.status(200).json(gameRoom);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cập nhật thông tin phòng game
const updateGameRoomController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, playerCount } = req.body; // Lấy playerCount từ request body
    const updatedRoom = await gameRoomService.updateRoomService(
      id,
      name,
      playerCount
    ); // Gọi service với playerCount
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: "Không thể cập nhật phòng game." });
  }
};

// Xóa phòng game
const deleteGameRoomController = async (req, res) => {
  try {
    const { id } = req.params;
    await gameRoomService.deleteRoomService(id);
    res.status(204).send(); // Gửi lại mã trạng thái 204 không có nội dung
  } catch (error) {
    res.status(500).json({ error: "Không thể xóa phòng game." });
  }
};

// Tham gia phòng game
const joinGameRoomController = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    const gameRoom = await gameRoomService.getRoomByIdService(roomId);
    if (!gameRoom) {
      return res.status(404).json({ error: "Phòng game không tồn tại." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }

    if (user.gameRoomId) {
      return res
        .status(400)
        .json({ error: "Người chơi đã tham gia một phòng khác." });
    }

    // Gán gameRoomId cho user
    user.gameRoomId = roomId;
    await user.save();

    res.status(200).json({ message: "Tham gia phòng game thành công." });
  } catch (error) {
    console.error("Lỗi khi tham gia phòng game:", error);
    res.status(500).json({ error: "Không thể tham gia phòng game." });
  }
};

// Lấy danh sách người chơi trong phòng game theo ID
const getPlayersInRoomController = async (req, res) => {
  try {
    const gameRoomId = req.params.id; // Lấy gameRoomId từ URL params

    // Tìm tất cả người chơi trong phòng
    const users = await User.findAll({
      where: { gameRoomId },
    });

    // Nếu không có người chơi nào trong phòng
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: "Không có người chơi nào trong phòng." });
    }

    // Trả về danh sách người chơi
    res.status(200).json({ players: users });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người chơi:", error);
    res.status(500).json({ error: "Không thể lấy danh sách người chơi." });
  }
};

// Rời phòng game
const leaveGameRoomController = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }

    // Lưu gameRoomId trước khi xóa
    const gameRoomId = user.gameRoomId;

    // Đặt lại gameRoomId cho người dùng
    user.gameRoomId = null;
    await user.save();

    if (gameRoomId) {
      // Kiểm tra số người còn lại trong phòng
      const remainingPlayers = await User.count({
        where: { gameRoomId: gameRoomId },
      });

      // Nếu không còn ai trong phòng, xóa phòng
      if (remainingPlayers === 0) {
        await gameRoomService.deleteRoomService(gameRoomId);
        console.log(`Phòng ${gameRoomId} đã được xóa do không còn người chơi`);
      }
    }

    res.status(200).json({ message: "Đã rời phòng thành công." });
  } catch (error) {
    console.error("Lỗi khi rời phòng game:", error);
    res.status(500).json({ error: "Không thể rời phòng game." });
  }
};

module.exports = {
  createGameRoomController,
  getGameRoomsController,
  getGameRoomByIdController,
  updateGameRoomController,
  deleteGameRoomController,
  joinGameRoomController,
  getPlayersInRoomController,
  leaveGameRoomController,
};
