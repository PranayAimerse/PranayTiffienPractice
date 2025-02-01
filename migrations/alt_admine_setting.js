'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alter_admin_settings', {
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
      // key_name: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'users', // Replace with actual table name
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      value: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      value_type: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['fixed', 'percentage']],
        },
      },
      limit: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      key_unit: {
        type: Sequelize.STRING,
        defaultValue: 'true',
      },
      title_group: {
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
    await queryInterface.dropTable('alter_admin_settings');
  },
};
