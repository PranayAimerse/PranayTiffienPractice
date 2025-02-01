'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_wallets', {
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
      amount_balance: {
        type: Sequelize.FLOAT,
      },
      amount_creadted_total: {
        type: Sequelize.FLOAT,
      },
      amount_total_debit: {
        type: Sequelize.FLOAT,
      },
      amount_cashback_total: {
        type: Sequelize.FLOAT,
      },
      amount_currency: {
        type: Sequelize.STRING,
      },
      amount_currency_symbol: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('user_wallets');
  },
};
