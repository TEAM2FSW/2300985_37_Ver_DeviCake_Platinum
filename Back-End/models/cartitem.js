'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id' });
      CartItem.belongsTo(models.Cake, { foreignKey: 'cake_id' });

    }
  }
  CartItem.init({
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cart_id: DataTypes.INTEGER,
    cake_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    sub_total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};