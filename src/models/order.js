'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cart,{
        uniqueKey: "cartId",
      })
      }
  }
  Order.init({
    code: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    adminAction: DataTypes.INTEGER,
    payment: DataTypes.STRING,
    cartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};