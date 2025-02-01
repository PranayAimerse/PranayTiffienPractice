'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_review_and_ratings', {
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
      // ref_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
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
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
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
      // count_rating: {
      //   type: Sequelize.INTEGER, // Adjust if referencing another table
      //   references: {
      //     model: 'users', // Replace if it references another table
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      message: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('active', 'disabled', 'blocked'),
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
    await queryInterface.dropTable('user_review_and_ratings');
  },
};
