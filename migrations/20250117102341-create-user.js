'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      url_profile: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      user_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'client',
      },
      status: {
        type: Sequelize.ENUM('active', 'disable', 'blocked'),
        allowNull: false,
        defaultValue: 'active',
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      email_verified: {
        type: Sequelize.ENUM('yes', 'no'),
        allowNull: false,
        defaultValue: 'no',
      },
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      mobile: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      mobile_verified: {
        type: Sequelize.ENUM('yes', 'no'),
        allowNull: false,
        defaultValue: 'no',
      },
      mobile_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      device_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      device_latitude: {
        type: Sequelize.DOUBLE(20, 15),
        allowNull: true,
      },
      device_longitude: {
        type: Sequelize.DOUBLE(20, 15),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      remember_token: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_user_type: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_user_type: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
