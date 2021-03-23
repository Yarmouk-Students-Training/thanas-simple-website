'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user , comment,reaction}) {
      // define association here
      this.belongsTo(user);
      this.hasMany(comment);
      this.hasMany(reaction);
    }
  };
  post.init({
    post_id:{ 
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement:true,
      allowNull: false,
      primaryKey:true
    },
    content:{ 
      type: DataTypes.TEXT,
      validate:{
        notEmpty:true
      }
    },
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};