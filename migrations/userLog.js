'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_logs', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      app_veer: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_type: {
        type: Sequelize.STRING,
        defaultValue: 'Android',
      },
      device_token: {
        type: Sequelize.STRING,
      },
      ip_address: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      location_address: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      location_at_long: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      user_Token: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      method: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      request_input: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_info: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      value_old: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      value_New: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM('pending', 'success', 'cancelled'),
      },
      updated_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      updatated_user_type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      created_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      created_user_type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_logs');
  },
};
