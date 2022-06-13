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
      this.belongsToMany(models.Room, {
        foreignKey: "roomId",
      })
      this.belongsToMany(models.User, {
        foreignKey: "userId",
      })
      this.hasOne(models.Order, {
        uniqueKey: "cartId",
      })
    }
  }
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    roomId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Room',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};