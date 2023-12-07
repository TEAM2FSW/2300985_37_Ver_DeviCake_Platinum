'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: 'user_id' });
      Address.hasMany(models.Order, { foreignKey: 'address_id' });

    }
  }
  Address.init({
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
    recipient_name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone_number: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true // atau false, tergantung kebutuhan Anda
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};