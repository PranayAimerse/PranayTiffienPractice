'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userfavourites', {
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
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      token_user: {
        type: Sequelize.STRING,
      },
      user_type: {
        type: Sequelize.STRING,
        defaultValue: 'vendor',
      },
      ref_id: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
      token_ref: {
        type: Sequelize.STRING,
      },
      ref_type: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        defaultValue: null,
      },
      updated_user_type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      created_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        defaultValue: null,
      },
      created_user_type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userfavourites');
  },
};
