'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_categories', {
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
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['active', 'disable', 'expire']],
        },
      },
      // order_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },
      // updated_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
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
      //   onDelete: 'CASCADE',
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
    await queryInterface.dropTable('product_categories');
  },
};
