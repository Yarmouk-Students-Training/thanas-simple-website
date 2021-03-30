'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
      // define association here
      this.belongsTo(user , {foreignKey: 'userId' })
    }
  };
  RefreshToken.init({
    token: DataTypes.TEXT,
    userId:{type: DataTypes.UUID,
    unique:true
    }
  }, {
    sequelize,
    modelName: 'refreshtoken',
  });
  return RefreshToken;
};