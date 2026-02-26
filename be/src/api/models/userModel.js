const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other user fields as necessary
    // avatarUrl: {
    //   type: DataTypes.STRING, // Dùng chuỗi để lưu trữ URL
    //   allowNull: true, // Cho phép null nếu người dùng không có avatar
    // },
    gameRoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: "gamerooms", // Must match the table name for GameRoom
        key: "id",
      },
      allowNull: true,
    },
    lastActive: {
      type: DataTypes.DATE, // Lưu trữ thời gian dưới dạng chuỗi
      allowNull: true,
      defaultValue: () => new Date().toISOString(), // Mặc định là thời gian hiện tại dưới dạng chuỗi
    },
    role: {
      type: DataTypes.ENUM("admin", "player"), // Chỉ cho phép "admin" hoặc "player"
      defaultValue: "player", // Vai trò mặc định là "player"
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, // Add createdAt and updatedAt automatically
  }
);

module.exports = User;
