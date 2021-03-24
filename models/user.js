'use strict';
const {
  Model
} = require('sequelize');
const post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post ,comment,reaction,relationship}) {
      // define association here
      this.hasMany(post);
      this.hasMany(comment);
      this.hasMany(reaction);
      this.belongsToMany(this , {through: relationship , as: 'user1' , foreignKey:'user2'});
    }
  };
  user.init({
    first_name:{
       type: DataTypes.STRING,
       allowNull: false,
       notEmpty: true
      },
    last_name:{
       type: DataTypes.STRING,
       allowNull: false,
       notEmpty: true
      },
    DOB: {
      type: DataTypes.DATEONLY, //What format does it allow?
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      primaryKey:true,
      validate:{
        isEmail:true,
        notEmpty:true
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        allowNull: false,
        notEmpty:true,
        notContains:"'"
      }
    },
    gender:
    DataTypes.ENUM('Male','Female')
   
  },{
    sequelize,
    modelName: 'user',
      });
  return user;
};
