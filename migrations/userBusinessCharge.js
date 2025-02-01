'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userbusinesscharges', {
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
      // business_id: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   references: {
      //     model: 'userbusinesses', // Referencing the UserBusiness model
      //     key: 'id',
      //   },
      //   allowNull: false,
      // },
      token_business: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      value_type: {
        type: Sequelize.ENUM('fixed', 'percentage'),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('incomplete', 'pending', 'approved', 'blocked'),
        allowNull: true,
      },
      // updated_by: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      //   allowNull: true,
      // },
      updated_user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // created_by: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      //   allowNull: true,
      // },
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
    await queryInterface.dropTable('userbusinesscharges');
  },
};
