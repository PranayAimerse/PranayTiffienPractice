'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_subscription_delivery_schedules', {
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
        defaultValue: null,
      },
      // user_subscription_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'user_subscriptions', // Replace with the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_user_subscription: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // User_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_user: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      user_type: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      meal_type: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      delivery_address: {
        type: Sequelize.STRING,
      },
      date_schedule: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.ENUM('upcoming', 'active', 'completed', 'disable'),
      },
      update_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      updated_user_type: {
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
    await queryInterface.dropTable('user_subscription_delivery_schedules');
  },
};
