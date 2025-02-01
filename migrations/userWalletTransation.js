'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_wallet_histories', {
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
      // wallet_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_wallet: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount_credit: {
        type: Sequelize.FLOAT,
        defaultValue: null,
      },
      amount_debit: {
        type: Sequelize.FLOAT,
        defaultValue: null,
      },
      amount_cashback: {
        type: Sequelize.FLOAT,
        defaultValue: null,
      },
      amount_currency: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount_currency_symbol: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['credit', 'cashback', 'referral']],
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['pending', 'success', 'cancelled', 'failed']],
        },
      },
      ref: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      source: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      remark: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // ref_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_ref: {
        type: Sequelize.STRING,
      },
      ref_type: {
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
    await queryInterface.dropTable('user_wallet_histories');
  },
};
