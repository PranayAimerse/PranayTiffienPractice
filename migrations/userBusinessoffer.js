'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userbusinessoffers', {
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
      },
      order_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      business_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      token_business: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discount_type: {
        type: Sequelize.ENUM('fixed', 'percentage'),
        allowNull: true,
      },
      date_start: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      date_end: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      limit_order_value_min: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      limit_order_value_max: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      limit_per_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      limit_count_user_max: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      limit_count_user_used: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      terms_conditions: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('upcoming', 'active', 'disable', 'expire'),
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        // references: {
        //   model: 'users',
        //   key: 'id',
        // },
        allowNull: true,
      },
      updated_user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        // references: {
        //   model: 'users',
        //   key: 'id',
        // },
        allowNull: true,
      },
      created_user_type: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('userbusinessoffers');
  },
};
