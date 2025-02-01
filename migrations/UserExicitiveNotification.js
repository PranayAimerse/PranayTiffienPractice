'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userexecutivenotifications', {
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
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      token_user: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      user_Type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      message: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      clickAction: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      payloads: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      data_schedule: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      data_sent: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.ENUM('pending', 'sent', 'cancelled'),
      },
      is_user_seen: {
        type: Sequelize.ENUM('yes', 'no'),
      },
      ref_id: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
      token_ref: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      ref_type: {
        type: Sequelize.STRING,
        defaultValue: null,
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
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userexecutivenotifications');
  },
};
