'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_query_response_attachments', {
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
      // query_response_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'user_query_responses', // Adjust to the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      token_querry_response: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      type: {
        type: Sequelize.ENUM('image', 'pdf', 'video', 'music'),
      },
      // sender_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Adjust to the actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      description: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      token_sender: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      sender_type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_attachment: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM('active', 'disable', 'blocked'),
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
    await queryInterface.dropTable('user_query_response_attachments');
  },
};
