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
      // define association here
      Order.hasMany(models.OrderDetail, { foreignKey: 'order_id' });
      Order.hasMany(models.Payment, { foreignKey: 'order_id' });
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.belongsTo(models.Address, { foreignKey: 'address_id' });
    }
  }
  Order.init({
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    order_date: DataTypes.DATE,
    address_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'InProcess', 'Shipped', 'Delivered']
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true // atau false, tergantung kebutuhan Anda
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};