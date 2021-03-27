'use strict';
const { UUIDV4 } = require('sequelize');
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
      this.belongsTo(post, {foreignKey:"postId" , as: "post"});
      this.belongsTo(user , {foreignKey: "userId" , as: "user"});
    }
  };
  comment.init({
    comment_uuid:{ 
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
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