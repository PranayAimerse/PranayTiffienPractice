'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_query_responses', {
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
      user_Type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: null,
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
      title_category: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM('active', 'disable', 'blocked', 'deleted'),
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
    await queryInterface.dropTable('user_query_responses');
  },
};
