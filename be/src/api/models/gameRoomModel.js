const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./userModel");

const GameRoom = sequelize.define(
  "GameRoom",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playerCount: {
      // Thêm trường để lưu số lượng người chơi
      type: DataTypes.INTEGER,
      defaultValue: 0, // Giá trị mặc định là 0
      allowNull: false, // Không cho phép trường này là null
    },
  },
  {
    sequelize,
    modelName: "GameRoom",
    tableName: "gamerooms",
    timestamps: false, // Ngăn không cho Sequelize tự động thêm createdAt và updatedAt
  }
);

// Define the one-to-many relationship
GameRoom.hasMany(User, { foreignKey: "gameRoomId" });
User.belongsTo(GameRoom, { foreignKey: "gameRoomId" });

module.exports = GameRoom;
