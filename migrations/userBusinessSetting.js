'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userbusinesssettings', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },
     
      token_business: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      key_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      options: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      value_type: {
        type: Sequelize.ENUM('fixed', 'percentage'),
        allowNull: true,
      },
      limit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      key_unit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title_group: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      order_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'disable'),
        allowNull: true,
      },
      business_id:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        // references: {
        //   model: 'users',
        //   key: 'id',
        // },
        allowNull: true,
      },
      updated_user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        // references: {
        //   model: 'users',
        //   key: 'id',
        // },
        allowNull: true,
      },
      created_user_type: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('userbusinesssettings');
  },
};
