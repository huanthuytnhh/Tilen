// src/services/userService.js
const User = require("../models/userModel");
const { Op } = require("sequelize");
const setUserDataService = async (data) => {
  try {
    // Kiểm tra người dùng trong database
    const user = await User.findOne({ where: { email: data.email } });

    if (user) {
      // Nếu người dùng đã tồn tại, giữ nguyên role hiện tại
      const updatedData = { ...data, role: user.role }; // Role từ database
      return await user.update(updatedData);
    } else {
      // Nếu người dùng chưa tồn tại, mặc định role là "player"
      const newUserData = { ...data, role: "player" };
      return await User.create(newUserData);
    }
  } catch (error) {
    console.error("Error in setUserDataService:", error);
    throw new Error("Database error");
  }
};

// Lấy tất cả người dùng
const getAllUsersService = async () => {
  return await User.findAll();
};

// Lấy người dùng theo ID
const getUserByIdService = async (id) => {
  return await User.findByPk(id);
};

// Tạo người dùng mới
// const createUserService = async (userData) => {
//   return await User.create(userData);
// };

// Cập nhật người dùng
const updateUserService = async (id, userData) => {
  const { role, ...otherData } = userData;
  if (role && !["admin", "player"].includes(role)) {
    throw new Error("Invalid role");
  }
  const user = await User.findByPk(id);
  if (user) {
    return await user.update({ ...otherData, ...(role && { role }) });
  }
  return null;
};

// Xóa người dùng
const deleteUserService = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};

// const User = require("../models/User");

const getOnlineUsersService = async () => {
  // moment().utc().add(7, "hours").toDate();
  const fiveMinutesAgo = new Date(
    Date.now() + 7 * 60 * 60 * 1000 - 5 * 60 * 1000
  ); // 5 phút trước
  console.log("temp :" + fiveMinutesAgo);
  return await User.findAll({
    where: {
      lastActive: {
        [Op.gte]: fiveMinutesAgo, // Tìm user có `lastActive` lớn hơn thời điểm này
      },
    },
    attributes: ["id", "username", "email"], // Chỉ lấy các trường cần thiết
  });
};
const inviteUserToRoomService = async (fromUserId, toUserId, gameRoomId) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000); // 5 phút trước

  // Tìm user được mời
  const invitedUser = await User.findOne({
    where: {
      id: toUserId,
      lastActive: {
        [Op.gt]: fiveMinutesAgo, // Kiểm tra nếu user online
      },
    },
  });

  if (invitedUser) {
    // Cập nhật gameRoomId cho user được mời
    invitedUser.gameRoomId = gameRoomId;
    await invitedUser.save();
    console.log(
      `User ${fromUserId} invited user ${toUserId} to join room ${gameRoomId}`
    );
    return true;
  }
  return false;
};
const moment = require("moment-timezone");
const updateOnlineStatusService = async (userId) => {
  const user = await User.findByPk(userId);

  if (user) {
    user.lastActive = moment().utc().add(7, "hours").toDate(); // Cộng thêm 7 giờ;
    // console.log("Hehe :" + user.lastActive);
    await user.save();
    return true;
  }

  return false; // User không tồn tại
};
const updateUserGameRoomIdService = async (userId, gameRoomId) => {
  const user = await User.findByPk(userId);

  if (user) {
    // user.lastActive = moment().utc().add(7, "hours").toDate(); // Cộng thêm 7 giờ;
    user.gameRoomId = gameRoomId;
    console.log("Hehe :" + user.lastActive);
    await user.save();
    return true;
  }

  return false; // User không tồn tại
};
const getUserInGameRoomService = async (gameRoomId) => {
  try {
    const usersInRoom = await User.findAll({
      where: {
        gameRoomId: gameRoomId, // Tìm tất cả người dùng có gameRoomId bằng với roomId
      },
      // Trả về toàn bộ các trường của user
    });

    return usersInRoom;
  } catch (error) {
    console.error(`Error fetching users in game room ${gameRoomId}:`, error);
    throw new Error("Database error");
  }
};
module.exports = {
  setUserDataService,
  getAllUsersService,
  getUserByIdService,
  // createUserService,
  updateUserService,
  deleteUserService,
  getOnlineUsersService,
  inviteUserToRoomService,
  updateOnlineStatusService,
  updateUserGameRoomIdService,
  getUserInGameRoomService,
};
