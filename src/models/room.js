'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToManyMany(models.Category,{
        foreignKey: "categoryId",
      })
      this.hasMany(models.Cart,{
        foreignKey: "roomId",
      })
    }
  }
  Room.init({
    roomName: DataTypes.STRING,
    detail: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    reserve: DataTypes.INTEGER,
    hot: DataTypes.INTEGER,
    active: DataTypes.INTEGER,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};