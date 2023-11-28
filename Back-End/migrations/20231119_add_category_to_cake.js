'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Cakes', 'category', {
      type: Sequelize.STRING,
      allowNull: true // set to false if you want this field to be required
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cakes', 'category');
  }
};