
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_notifications', {
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
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Adjust to the actual table name of the `User` model
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_user: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      message: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      user_Type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      clickAction: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      payloads: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      data_schedule: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      data_sent: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.ENUM('pending', 'sent', 'cancelled'),
      },
      is_user_seen: {
        type: Sequelize.ENUM('yes', 'no'),
      },
      // ref_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Adjust to the actual table name of the `User` model
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_ref: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      ref_type: {
        type: Sequelize.STRING,
        defaultValue: null,
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
    await queryInterface.dropTable('user_notifications');
  },
};
