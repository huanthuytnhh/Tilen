const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

// Định nghĩa các mô hình
const User = require("./userModel"); // Điều chỉnh đường dẫn theo cấu trúc thư mục của bạn
const GameRoom = require("./gameRoomModel"); // Điều chỉnh đường dẫn theo cấu trúc thư mục của bạn

// Thiết lập mối quan hệ
GameRoom.hasMany(User, {
  foreignKey: "gameRoomId", // Khóa ngoại trong bảng User
  //   as: "users", // Tên alias cho mối quan hệ
});

User.belongsTo(GameRoom, {
  foreignKey: "gameRoomId", // Khóa ngoại trong bảng User
  //   as: "gameRoom", // Tên alias cho mối quan hệ
});

// Xuất khẩu các mô hình
const db = {
  sequelize,
  Sequelize,
  User,
  GameRoom,
};

// Xuất khẩu
module.exports = db;
