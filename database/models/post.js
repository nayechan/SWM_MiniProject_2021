module.exports = function (sequlize, DataTypes) {
  let post = sequlize.define(
    'post',
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
	  content: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
    },
    {
      tableName: 'post',
      freezeTableName: false,
      timestamps: true,
      underscored: true,
    }
  );
  
  // console.log(post);
  post.associate = (models) => {
    post.belongsTo(models.user);
  }
  return post
}