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
      this.belongsTo(models.Cart, {
        uniqueKey: "cartId",
      })
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code: DataTypes.STRING,
    date: DataTypes.DATE,
    status: {
      allowNull: false,
      type: DataTypes.ENUM('pending','reject','success'),
      defaultValue: 'pending'
    },
    adminAction: {
      type: DataTypes.ENUM('cancel','accept'),
    },
    payment: DataTypes.STRING,
    cartId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Cart',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true
  });
  return Order;
};