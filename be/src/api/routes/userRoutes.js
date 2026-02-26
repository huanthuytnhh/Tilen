// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/set-user-data", userController.saveUserDataController);

router.get("/", userController.getUsersController);
router.get("/online", userController.getOnlineUsersController);
router.post("/", userController.createUserController);
router.get("/:id", userController.getUserByIdController);
router.get("/:roomId/users", userController.getUsersInGameRoomController);
router.put("/:id", userController.updateUserController);
router.put("/:userId/gameroom", userController.updateUserGameRoomIdController);
router.delete("/:id", userController.deleteUserController);

// Định nghĩa route cho cập nhật gameRoomId

// router.get("/online", userController.getOnlineUsersController);
// router.get("/useronline", userController.getUsersOnlineController);
// Route mới: Mời user vào room
router.post("/invite", userController.inviteUserToRoomController);

router.put("/:userId/online", userController.updateOnlineStatusController);
module.exports = router;
