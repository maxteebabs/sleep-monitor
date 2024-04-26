const Op = require('sequelize').Op;

module.exports = function (sequelize, DataTypes) {
  const Duration = sequelize.define(
    'Duration',
    {
    sleepTimeDuration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sleepDate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      paranoid: true,
      indexes: [
      ],
      defaultScope: {
      },
      scopes: {
      }
    }
  );
  Duration.associate = function (models) {
    // associations can be defined here
    Duration.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        field: 'UserId',
        allowNull: false
      }
    });
  };

  return Duration;
};
