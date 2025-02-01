'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alter_admin_offers', {
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
      // order_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      url_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discripition: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      discount: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      discount_type: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['fixed', 'percentage']],
        },
      },
      date_start: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      date_enc: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      limit_order_value_min: {
        type: Sequelize.FLOAT,
        defaultValue: null,
      },
      limit_order_value_max: {
        type: Sequelize.FLOAT,
        defaultValue: null,
      },
      limit_per_user: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      limit_count_user_max: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      limit_count_user_used: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      terms_conditions: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['upcoming', 'active', 'disable', 'expire']],
        },
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
    await queryInterface.dropTable('alter_admin_offers');
  },
};
