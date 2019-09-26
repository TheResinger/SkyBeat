module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define("User", {
    userName: DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    verified: DataTypes.BOOLEAN
  });
  return User;
};
