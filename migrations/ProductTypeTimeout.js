'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_type_timeouts', {
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
      url_icon: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // meal_plan_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'ProductMealPlans', // Replace with the correct table name
      //     key: 'id',
      //   },
      //   defaultValue: null,
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_meal_plan: {
        type: Sequelize.STRING,
      },
      timeout_value: {
        type: Sequelize.INTEGER,
      },
      timeout_type: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['minute', 'hour', 'day']],
        },
      },
      status: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['active', 'disable']],
        },
      },
      // updated_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with the correct table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      updated_user_type: {
        type: Sequelize.STRING,
      },
      // created_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with the correct table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      created_user_type: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('product_type_timeouts');
  },
};
