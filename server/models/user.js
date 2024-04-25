const Op = require('sequelize').Op;

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
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
  
  User.associate = function(models) {
    User.hasMany(models.Duration, { as: 'durations'});
  }

  User.addScopes = function (models) {
    User.addScope('withDurations', {
      attributes: [

      ],
      include: [
        { model: sequelize.model('Duration'), as: 'Duration' }
      ]
    });
  };

  return User;
};
