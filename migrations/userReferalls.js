'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_referrals', {
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
      code_referal: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Adjust to match actual Users table name
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
        defaultValue: null,
      },
      // user_id2: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Adjust to match actual Users table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_user2: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      User_type2: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      date_expire: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'expired', 'cancelled'),
      },
      updated_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // updatated_user_type: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      // },
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
    await queryInterface.dropTable('user_referrals');
  },
};
