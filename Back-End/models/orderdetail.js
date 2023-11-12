'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Cake, { foreignKey: 'cake_id' });
      OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id' });

    }
  }
  OrderDetail.init({
    order_detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: DataTypes.INTEGER,
    cake_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    sub_total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};