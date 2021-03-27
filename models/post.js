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
      this.belongsTo(user , {foreignKey:"userId" , as : "user"});
      this.hasMany(comment , {foreignKey :"postId" , as: "comments"});
      this.hasMany(reaction , {foreignKey :"postId" , as: "reactions"});
    }
  };
  post.init({
    post_id:{ 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    content:{ 
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{msg:"You cannot create an empty post"}
      }
    },
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};