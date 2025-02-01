'use strict';
const { Model, DataTypes } = require('sequelize');
const { generateUniqueToken, generateSlug } = require("../utils/helperMethod");
const { GET_LIST } = require("../config/constant");
const fs = require('fs');
const path = require('path');

module.exports = (sequelize) => {
  class ProductTypeTimeout extends Model {
    // Static method to create a product type timeout
    static async getBySlug(slug, loginUserId = 0, loginUserType = null) {
      try {
        let record = await this.findOne({ where: { slug } });
        if (record) {
        }
        return record;
      } catch (error) {
        throw new Error(`Error fetching data by ID: ${error.message}`);
        return null;
      }
    }
    static async getById(id, loginUserId = 0, loginUserType = null) {
      try {
        let record = await this.findByPk(id);
        if (record) {
          if (record?.options) {
            record.options = JSON.parse(record.options);
          }
        }
        return record;
      } catch (error) {
        throw new Error(`Error fetching data by ID: ${error.message}`);
        return null;
      }
    }
    static async getByKey(
      requiredValueType = GET_LIST,
      keyValueSet = null,
      inKeyValueSet = null,
      notInKeyValueSet = null,
      dataLimit = 10,
      dataOffset = 0,
      orderBy = "id",
      orderType = "desc",
      loginUserId = 0,
      loginUserType = null
    ) {
      try {
        const where = {
          ...(keyValueSet || {}),
          // Add the `whereIn` conditions to the query if they exist
          ...Object.keys(inKeyValueSet || {}).reduce((acc, column) => {
            acc[column] = { [Sequelize.Op.in]: inKeyValueSet[column] };
            return acc;
          }, {}),
          // Add the `whereNotIn` conditions to the query if they exist
          ...Object.keys(notInKeyValueSet || {}).reduce((acc, column) => {
            acc[column] = { [Sequelize.Op.notIn]: notInKeyValueSet[column] };
            return acc;
          }, {})
        };
        const options = {
          where: { ...where },
          limit: dataLimit || 10, // Pagination limit
          offset: (dataOffset || 0) * (dataLimit || 10), // Pagination offset
          order: orderBy ? [[orderBy, orderType]] : [] // Sorting order (default to ASC)
        };

        // Combine all conditions using `Op.or`
        let results = null;
        if (requiredValueType === GET_LIST) { 
          results = await this.findAll(options);
        } else {
          results = await this.findOne({ where: { ...where } });
          // results = await this.getById(result?.id, loginUserId, loginUserType);
        }

        return results;
      } catch (error) {
        throw new Error(`Error during search: ${error.message}`);
      }
    }

    static getColumnNames() {
      return Object.keys(this.getAttributes());
    }
    static async getFullById(id, loginUserId = 0, loginUserType = null) {
      try {
        let record = await this.getById(id, loginUserId, loginUserType);
        if (record) {
          // record.unknown="";
        }
        return record;
      } catch (error) {
        throw new Error(`Error fetching data by ID: ${error.message}`);
        return null;
      }
    }
    static async filterValidAttributes(data) {
      const validAttributes = await this.getColumnNames();
      return Object.keys(data).reduce((filtered, key) => {
        if (validAttributes.includes(key)) {
          filtered[key] = data[key];
        }
        return filtered;
      }, {});
    }

    static async insertData(dataTemp, loginUserId = 0, loginUserType = null) {
      try {
        const token = await generateUniqueToken(this, "AO");
        const slug = await generateSlug(
          this,
          dataTemp?.title || "admin-offer-" + token
        );
        // Create a new user
        let tempUpdateDataset = { ...dataTemp, token: token, slug: slug };

        if (loginUserId && loginUserType) {
          tempUpdateDataset = {
            ...tempUpdateDataset,
            created_by: loginUserId,
            created_user_type: loginUserType,
            updated_by: loginUserId,
            updated_user_type: loginUserType
          };
        }
        const dataSet = await this.filterValidAttributes(tempUpdateDataset);

        const insertData = await this.create(dataSet);
        if (insertData) {
          console.log("Data created successfully:", insertData?.token);
          return this.getFullById(insertData?.id, loginUserId, loginUserType);
        } else {
          console.log("Data created successfully:", insertData?.token);
        }
      } catch (error) {
        console.error("Error inserting data:", error);
        throw new Error(`Error updating data: ${error.message}`);
        return null;
      }
    }

    static async updateData(data, id, loginUserId = 0, loginUserType = null) {
      try {
        const oldData = await this.findByPk(id);
        if (oldData) {
          let tempUpdateDataset = { ...oldData, ...data };
          if (loginUserId && loginUserType) {
            tempUpdateDataset = {
              ...tempUpdateDataset,
              updated_by: loginUserId,
              updated_user_type: loginUserType
            };
          }
          const dataSet = await this.filterValidAttributes(tempUpdateDataset);
          const result = await oldData?.update(dataSet);
          if (result) {
          }
          return await this.getById(id, loginUserId, loginUserType);
        } else {
          return null;
        }
      } catch (error) {
        throw new Error(`Error updating data: ${error.message}`);
      }
    }

    static async deleteData(id) {
      try {
        const data = await this.findByPk(id);
        if (data) {
          // Delete the single record matching the condition
          const result = await this.destroy({
            where: { id: data?.id },
            limit: 1
          });
          if (result) {
            return true; // Record successfully deleted
          }
        }
        throw new Error("No records found matching the specified conditions.");
        return null;
      } catch (error) {
        throw new Error(`Error deleting record: ${error.message}`);
      }
    }
  }

  ProductTypeTimeout.init(
    {
      token: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      url_icon: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      url_image: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      token_meal_plan: {
        type: DataTypes.STRING,
      },
      timeout_value: {
        type: DataTypes.INTEGER,
      },
      timeout_type: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['minute', 'hour', 'day']],
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['active', 'disable']],
        },
      },
      created_user_type: {
        type: DataTypes.STRING,
      },
      updated_user_type: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'ProductTypeTimeout',
      tableName: 'product_type_timeouts',
      timestamps: false,
      // hooks: {
      //   afterCreate: async (productTypeTimeout) => {
      //     productTypeTimeout.token = CreateToken('ProductTypeTimeout');
      //     productTypeTimeout.slug = CreateSlug(productTypeTimeout.token_meal_plan || productTypeTimeout.timeout_type);
      //     await productTypeTimeout.save();
      //   },
      // },
    }
  );

  return ProductTypeTimeout;
};
