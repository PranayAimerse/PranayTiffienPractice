'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userexecutives', {
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
      url_profile: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
      },
      dob: {
        type: Sequelize.STRING,
      },
      order_by: {
        type: Sequelize.STRING,
      },
      user_Type: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('active', 'disable', 'block', 'pending'),
      },
      email: {
        type: Sequelize.STRING,
      },
      email_verified: {
        type: Sequelize.ENUM('yes', 'no'),
      },
      email_verifiedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      mobile_verifiedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      mobile_code: {
        type: Sequelize.STRING,
      },
      name_country: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      name_state: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      name_city: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      pincode: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      address: {
        type: Sequelize.STRING,
      },
      landmark: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_token: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_latiitude: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      device_longitude: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
      },
      remember_token: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('userexecutives');
  },
};
