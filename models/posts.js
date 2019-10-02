module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define("Post", {
    songName: {
      type: DataTypes.STRING,
    },
    artistName: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    },
    genre: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER
    }
  });

  Post.associate = models => {
    Post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
