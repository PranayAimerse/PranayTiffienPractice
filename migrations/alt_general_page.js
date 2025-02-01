'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alter_general_pages', {
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
      url_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discription: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // order_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      parent_id: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      token_parent: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      show_header: {
        type: Sequelize.ENUM('yes', 'no'), 
      },
      show_footer: {
        type: Sequelize.ENUM('yes', 'no'), 
      },
      is_page: {
        type: Sequelize.ENUM('yes', 'no'), 
      },
      is_Section: {
        type: Sequelize.ENUM('yes', 'no'), 
      },
      status: {
        type: Sequelize.ENUM('active', 'disable'),
        allowNull: false, 
      },
      updated_by: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'users', // Replace with actual table name
        //   key: 'id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updated_user_type: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'users', // Replace with actual table name
        //   key: 'id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
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
    await queryInterface.dropTable('alter_general_pages');
  },
};
