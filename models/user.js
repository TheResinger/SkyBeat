module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define("user", {
    userName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
    }
  });

  User.associate = models => {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };
  
  return User;
};
