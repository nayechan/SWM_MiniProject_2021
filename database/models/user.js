module.exports = function (sequlize, DataTypes) {
  const user = sequlize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      freezeTableName: false,
      timestamps: true,
      underscored: true,
    }
  )
  
  user.associate = (models) => {
    user.hasMany(models.post);
  }
  return user
}