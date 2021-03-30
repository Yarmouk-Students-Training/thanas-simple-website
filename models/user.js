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
    static associate({post ,comment,reaction,relationship,refreshtoken}) {
      // define association here
      this.hasMany(post , {foreignKey :"userId" , as: "posts"});
      this.hasMany(comment , {foreignKey :"userId" , as: "comments"});
      this.hasMany(reaction , {foreignKey : "userId" , as: "reactions"});
      this.belongsToMany(this , {through: relationship , as: 'user1' , foreignKey:'user2'});
      this.hasOne(refreshtoken , {foreignKey:'userId'});
    }
    
  };
  user.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    first_name:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
        notNull: {msg: "A user must have a first name"},
        notEmpty:{msg: "A first name must not be empty"}
       }
      },
    last_name:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
        notNull: {msg: "A user must have a last name"},
        notEmpty:{msg: "A last name must not be empty"}
       }
      },
    DOB: {
      type: DataTypes.DATEONLY, //What format does it allow?
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail:{msg:"Must enter a valid email address"},
        notEmpty:{msg:"You must enter an email"}
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
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
