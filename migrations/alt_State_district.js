'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alter_state_districts', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name_state: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      state_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      name_country: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['active', 'disable']],
        },
      },
      // updated_by: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
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
      //   onDelete: 'SET NULL',
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
    await queryInterface.dropTable('alter_state_districts');
  },
};
