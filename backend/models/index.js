const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const User = require("./user")(sequelize, DataTypes);
const Task = require("./task")(sequelize, DataTypes);

//Add {Alter:true} in the sync({Alter:true}) to update database every time server starts

sequelize
  .sync()
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.error("Unable to create database & tables:", err));

module.exports = {
  sequelize,
  User,
  Task,
};
