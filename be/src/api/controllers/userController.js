// src/controllers/userController.js
const userService = require("../services/userService");
const { sequelize } = require("../../config/database");
const saveUserDataController = async (req, res) => {
  try {
    const userData = req.body;
    const savedUser = await userService.setUserDataService(userData);
    return res.status(200).json({ success: true, data: savedUser });
  } catch (error) {
    console.error("Error saving user data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Lấy danh sách người dùng
const getUsersController = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
// const getUsersController = async (req, res) => {
//   try {
//     // Truy vấn SQL Raw để lấy tất cả người dùng
//     const query = `SELECT * FROM users;`;

//     // Chạy truy vấn
//     const [results, metadata] = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT, // Chạy như một câu SELECT
//     });

//     // Kiểm tra kết quả trả về
//     console.log(results); // Kiểm tra kết quả truy vấn

//     if (results && results.length > 0) {
//       res.status(200).json(results); // Trả về kết quả người dùng
//     } else {
//       res.status(404).json({ message: "No users found" });
//     }
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Error fetching users", error });
//   }
// };

// Lấy thông tin người dùng theo ID
const getUserByIdController = async (req, res) => {
  try {
    const user = await userService.getUserByIdService(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Tạo người dùng mới
const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.createUserService({
      name,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Cập nhật thông tin người dùng
const updateUserController = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserService(
      req.params.id,
      req.body
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

// Xóa người dùng
const deleteUserController = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUserService(req.params.id);
    if (deletedUser) {
      res.status(204).send(); // Trả về mã 204 No Content
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

const updateUserGameRoomIdController = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ params
    const { gameRoomId } = req.body; // Lấy gameRoomId từ request body

    const result = await userService.updateUserGameRoomIdService(
      userId,
      gameRoomId
    ); // Gọi service

    if (result.error) {
      return res.status(404).json({ error: result.error }); // Trả về lỗi nếu có
    }

    res.status(200).json({ message: result.message }); // Trả về thông báo thành công
  } catch (error) {
    console.error("Lỗi khi xử lý yêu cầu:", error);
    res.status(500).json({ error: "Không thể xử lý yêu cầu." });
  }
};

const getOnlineUsersController = async (req, res) => {
  try {
    // Gọi service để lấy dữ liệu
    const users = await userService.getOnlineUsersService();

    if (users && users.length > 0) {
      res.status(200).json(users); // Trả về kết quả người dùng
    } else {
      res.status(404).json({ message: "No online users found" });
    }
  } catch (error) {
    console.error("Error fetching online users:", error);
    res.status(500).json({ message: "Error fetching online users", error });
  }
  // try {
  //   const users = await userService.getAllUsersService();
  //   res.status(200).json(users);
  // } catch (error) {
  //   res.status(500).json({ message: "Error fetching users", error });
  // }
};
const inviteUserToRoomController = async (req, res) => {
  const { fromUserId, toUserId, gameRoomId } = req.body;

  if (!fromUserId || !toUserId || !gameRoomId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const inviteResult = await userService.inviteUserToRoomService(
      fromUserId,
      toUserId,
      gameRoomId
    );

    if (inviteResult) {
      res.status(200).json({ message: "Invitation sent successfully" });
    } else {
      res.status(404).json({ message: "User is not online or not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error inviting user to room", error });
  }
};
const updateOnlineStatusController = async (req, res) => {
  const { userId } = req.params;

  try {
    const updated = await userService.updateOnlineStatusService(userId);
    if (updated) {
      res
        .status(200)
        .json({ message: "User online status updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user online status", error });
  }
};
const getUsersOnlineController = async (req, res) => {
  try {
    // Truy vấn SQL Raw để lấy tất cả người dùng
    const query = `SELECT * FROM users;`;

    // Chạy truy vấn
    const [results, metadata] = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT, // Chạy như một câu SELECT
    });

    if (results && results.length > 0) {
      res.status(200).json(results); // Trả về kết quả người dùng
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};
const getUsersInGameRoomController = async (req, res) => {
  const { roomId } = req.params; // Lấy roomId từ URL

  try {
    const users = await userService.getUserInGameRoomService(roomId); // Gọi service
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found in this game room" });
    }

    return res.status(200).json(users); // Trả về danh sách user
  } catch (error) {
    console.error(`Error in getUsersInGameRoomController:`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  saveUserDataController,
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
  updateUserGameRoomIdController,
  getOnlineUsersController,
  getUsersOnlineController,
  inviteUserToRoomController,
  updateOnlineStatusController,
  getUsersInGameRoomController,
};
