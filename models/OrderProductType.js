'use strict';
const { Model, DataTypes } = require('sequelize');
const { CreateToken } = require('../utils/generateToken');

module.exports = (sequelize) => {
  class OrderProductType extends Model {}

  OrderProductType.init(
    {
      token: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
     
      token_order: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['active', 'disable']],
        },
      },
      update_by: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      updated_user_type: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      created_by: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      created_user_type: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'OrderProductType',
      tableName: 'order_product_types',
      timestamps: true,
      hooks: {
        afterCreate: async (orderProductType) => {
          orderProductType.token = CreateToken('orderProductType');
          await orderProductType.save();
        },
      },
    }
  );

  return OrderProductType;
};
