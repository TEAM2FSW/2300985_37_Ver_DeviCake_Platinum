'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address, { foreignKey: 'user_id' });
      User.hasMany(models.Cake, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
      User.hasOne(models.Cart, { foreignKey: 'user_id' });

    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['ADMIN', 'USER']
    },
    profile_image: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true // atau false, tergantung kebutuhan Anda
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};