'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Order, { foreignKey: 'order_id' });

    }
  }
  Payment.init({
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    invoice: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    payment_date: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    payment_method: {
      type: DataTypes.ENUM,
      values: ['BankTransfer','COD', 'EWallet']
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Completed', 'Failed']
    },
    invoice_due_date: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};