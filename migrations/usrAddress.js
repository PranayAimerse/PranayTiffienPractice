// migrations/XXXXXX-create-useraddress.js

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('useraddresses', {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: true
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: true
        },
        // user_id: {
        //   type: Sequelize.BIGINT,
        //   references: {
        //     model: 'users', // Assuming the Users table exists
        //     key: 'id'
        //   },
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE'
        // },
        token_user: {
          type: Sequelize.STRING,
          allowNull: true
        },
        user_type: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        mobile: {
          type: Sequelize.STRING,
        },
        alt_mobile: {
          type: Sequelize.STRING,
        },
        mobile_code: {
          type: Sequelize.STRING,
        },
        name_country: {
          type: Sequelize.STRING,
        },
        name_state: {
          type: Sequelize.STRING,
        },
        name_city: {
          type: Sequelize.STRING,
        },
        pincode: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        landmark: {
          type: Sequelize.STRING,
        },
        device_latitude: {
          type: Sequelize.FLOAT,
          defaultValue: null
        },
        device_longitude: {
          type: Sequelize.FLOAT,
          defaultValue: null
        },
        status: {
          type: Sequelize.ENUM('active', 'disable'),
        },
        is_primary: {
          type: Sequelize.ENUM('yes', 'no'),
        },
        remark: {
          type: Sequelize.STRING,
        },
        // updated_by: {
        //   type: Sequelize.BIGINT,
        //   references: {
        //     model: 'users', // Assuming the Users table exists
        //     key: 'id'
        //   },
        //   onDelete: 'SET NULL',
        //   onUpdate: 'CASCADE'
        // },
        updated_user_type: {
          type: Sequelize.STRING,
        },
        // created_by: {
        //   type: Sequelize.BIGINT,
        //   references: {
        //     model: 'users', // Assuming the Users table exists
        //     key: 'id'
        //   },
        //   onDelete: 'SET NULL',
        //   onUpdate: 'CASCADE'
        // },
        created_user_type: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        }
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('useraddresses');
    }
  };
  