module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "done"),
      allowNull: false,
      defaultValue: "todo",
    },
  });

  return Task;
};
