'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Room,{
        foreignKey: "roomId",
      })
      this.belongsToMany(models.User,{
        foreignKey: "userId",
      })
      this.hasOne(models.Order,{
        uniqueKey: "cartId",
      })
    }
  }
  Cart.init({
    quantity: DataTypes.INTEGER,
    userId : DataTypes.INTEGER,
    roomId : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};