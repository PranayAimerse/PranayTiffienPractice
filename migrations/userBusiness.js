'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userbusinesses', {
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
      // user_id: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   references: {
      //     model: 'users', // Referencing the Users table
      //     key: 'id', // The primary key in the Users table
      //   },
      //   allowNull: false,
      // },
      token_user: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url_profile: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_banner: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      url_image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_temp_closed: {
        type: Sequelize.ENUM('yes', 'no'),
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('veg', 'non-veg', 'mixed'),
        allowNull: true,
      },
      count_rating_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count_rating_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count_rating_3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count_rating_4: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count_rating_5: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count_rating_overall: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      step: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('incomplete', 'pending', 'approved', 'blocked'),
        allowNull: true,
      },
      name_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device_latitude: {
        type: Sequelize.DOUBLE,
        defaultValue: null,
      },
      device_longitude: {
        type: Sequelize.DOUBLE,
        defaultValue: null,
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
      // created_at: {
      //   type: Sequelize.DATE,
      //   defaultValue: null
      // },
      // updated_at: {
      //   type: Sequelize.DATE,
      //   defaultValue: null
      // },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userbusinesses');
  },
};
