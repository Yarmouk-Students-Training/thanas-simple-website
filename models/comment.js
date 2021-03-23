'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post, user}) {
      // define association here
      this.belongsTo(post);
      this.belongsTo(user);
    }
  };
  comment.init({
    comment_id:{ 
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false,
    },
    content: {
      type: DataTypes.TEXT,
      validate:{
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};