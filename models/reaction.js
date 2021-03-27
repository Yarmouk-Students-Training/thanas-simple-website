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
      this.belongsTo(post , {foreignKey:"postId" , as: "post"});
      this.belongsTo(user , {foreignKey: "userId" , as: "user"});
    }
  };
  reaction.init({
    reaction_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
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