// src/api/routes/gameRoomRoutes.js
const express = require("express");
const router = express.Router();
const gameRoomController = require("../controllers/gameRoomController");

// Định nghĩa route cho GET gamerooms
router.get("/", gameRoomController.getGameRoomsController); // Xử lý GET /api/v1/gameroom
router.post("/", gameRoomController.createGameRoomController); // Xử lý POST /api/v1/gameroom
router.post("/join", gameRoomController.joinGameRoomController);
router.post("/leave", gameRoomController.leaveGameRoomController);
// Có thể thêm các route khác như GET theo ID, cập nhật và xóa
router.get("/:id", gameRoomController.getGameRoomByIdController);
router.put("/:id", gameRoomController.updateGameRoomController);
router.delete("/:id", gameRoomController.deleteGameRoomController);
router.get("/:id/players", gameRoomController.getPlayersInRoomController);

module.exports = router;
