// const { Sequelize } = require("sequelize");

// // Kết nối đến cơ sở dữ liệu
// const sequelize = new Sequelize("cardgame", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });

// module.exports = sequelize;
const { Sequelize } = require("sequelize");
// console.log("Haha :", process.env.DB_PASSWORD);
// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  // "",
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
