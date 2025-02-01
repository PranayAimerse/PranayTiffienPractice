'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_subscriptions', {
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
      // user_id: {
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
      User_type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      order_id: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      taken_order: {
        type: Sequelize.STRING,
      },
      // business_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'userBusinesses', // Replace with the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_business: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // meal_plan_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'ProductMealPlans', // Replace with the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_meal_plan: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      duration_type: {
        type: Sequelize.ENUM('day', 'month', 'year'),
      },
      date_start: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      date_end: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.ENUM('upcoming', 'active', 'completed', 'disable'),
      },
      type: {
        type: Sequelize.STRING,
      },
      delivery_address: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      delivery_instruction: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      remark: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount_creadted_total: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount_creadted_paid: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount_creadted_pending: {
        type: Sequelize.STRING,
        defaultValue: null,
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
    await queryInterface.dropTable('user_subscriptions');
  },
};
