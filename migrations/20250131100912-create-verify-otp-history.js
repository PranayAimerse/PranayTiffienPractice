'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VerifyOtpHistory', { // 👈 Explicit table name
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING, defaultValue: null },
      user_id: { type: Sequelize.INTEGER, defaultValue: null },
      token_user: { type: Sequelize.STRING, defaultValue: null },
      user_type: { type: Sequelize.FLOAT, defaultValue: null },
      username: { type: Sequelize.FLOAT, defaultValue: null },
      otp: { type: Sequelize.FLOAT, defaultValue: null },
      for: { type: Sequelize.STRING, defaultValue: null },
      type: { 
        type: Sequelize.STRING, 
        defaultValue: null,
        validate: { isIn: [['mobile', 'email', 'username']] }
      },
      devicetype: { type: Sequelize.STRING, allowNull: false },
      device_token: { type: Sequelize.STRING, allowNull: false },
      device_latitude: { type: Sequelize.STRING, defaultValue: null },
      device_longitude: { type: Sequelize.INTEGER, defaultValue: null },
      name_country: { type: Sequelize.INTEGER, defaultValue: null },
      name_state: { type: Sequelize.STRING },
      name_city: { type: Sequelize.STRING },
      update_by: { type: Sequelize.STRING, defaultValue: null },
      updated_user_type: { type: Sequelize.STRING, defaultValue: null },
      created_by: { type: Sequelize.STRING, defaultValue: null },
      created_user_type: { type: Sequelize.STRING, defaultValue: null },
      createdAt: { 
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VerifyOtpHistory'); 
  }
};
