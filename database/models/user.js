module.exports = function (sequlize, DataTypes) {
  const user = sequlize.define(
    'user',
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(20),
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