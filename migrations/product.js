'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: Sequelize.STRING(100),
        defaultValue: null
      },
      slug: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      url_icon: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      url_image: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      title: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      description: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      status: {
        type: Sequelize.ENUM('active', 'disable', 'expire'),
        defaultValue: 'active',
        allowNull: false
      },
      order_by: {
        type: Sequelize.INTEGER(11),
        defaultValue: null
      },
      updated_by: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      updated_user_type: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      created_by: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      created_user_type: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
