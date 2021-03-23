'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post,user}) {
      // define association here
      this.belongsTo(post);
      this.belongsTo(user);
    }
  };
  reaction.init({
    reaction_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey:true,
      autoIncrement: true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'reaction',
  });
  return reaction;
};