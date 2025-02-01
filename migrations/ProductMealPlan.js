'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_meal_plans', {
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
      url_icon: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_images: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // category_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'ProductCategories', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_category: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // business_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'UserBusinesses', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_business: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      amount_mrp: {
        type: Sequelize.FLOAT,
        defaultValue: 45,
      },
      amount_discount: {
        type: Sequelize.FLOAT,
        defaultValue: 30,
      },
      amount_rate: {
        type: Sequelize.FLOAT,
        defaultValue: 20,
      },
      type_food: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['veg', 'non-veg', 'mixed']],
        },
      },
      types: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      type_items: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      type_timeouts: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      type_availability: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount_min_value: {
        type: Sequelize.FLOAT,
        defaultValue: null,
      },
      amount_delivery: {
        type: Sequelize.FLOAT,
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['active', 'disable']],
        },
      },
      // order_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // updated_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
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
      //     model: 'users', // Replace with actual table name
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
    await queryInterface.dropTable('product_meal_plans');
  },
};
