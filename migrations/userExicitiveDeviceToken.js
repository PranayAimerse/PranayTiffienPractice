'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userexecutivedevicetokens', {
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
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      token_user: {
        type: Sequelize.STRING,
      },
      user_Type: {
        type: Sequelize.STRING,
      },
      device_type: {
        type: Sequelize.STRING,
      },
      device_token: {
        type: Sequelize.STRING,
      },
      device_ref_id: {
        type: Sequelize.STRING,
      },
      device_info: {
        type: Sequelize.STRING,
      },
      device_latitude: {
        type: Sequelize.FLOAT,
      },
      device_longitude: {
        type: Sequelize.FLOAT,
      },
      is_login: {
        type: Sequelize.ENUM('yes', 'no'),
      },
      logout_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userexecutivedevicetokens');
  },
};
