'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userdevicetokens', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      // user_id: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      //   allowNull: true,
      //   onDelete: 'SET NULL',
      //   onUpdate: 'CASCADE',
      // },
      token_user: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device_type: {
        type: Sequelize.STRING,
        defaultValue: 'android',
      },
      device_token: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_ref_id: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_info: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_latitude: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      device_longitude: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      is_login: {
        type: Sequelize.ENUM('yes', 'no'),
        allowNull: true,
      },
      logout_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      // updated_by: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      //   allowNull: true,
      //   onDelete: 'SET NULL',
      //   onUpdate: 'CASCADE',
      // },
      updated_user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // created_by: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      //   allowNull: true,
      //   onDelete: 'SET NULL',
      //   onUpdate: 'CASCADE',
      // },
      created_user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userdevicetokens');
  },
};
