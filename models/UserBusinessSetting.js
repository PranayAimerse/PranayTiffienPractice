"use strict";
const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");
const { generateUniqueToken, generateSlug } = require("../utils/helperMethod");
const { GET_LIST } = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
  class UserBusinessSetting extends Model {


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
          // if (record?.options) {
          //   record.options = JSON.parse(record.options);
          // }
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

  UserBusinessSetting.init(
    {
      token: { type: DataTypes.STRING, allowNull: true },
      slug: { type: DataTypes.STRING, allowNull: true },
      token_business: { type: DataTypes.STRING, defaultValue: null },
      key_name: { type: DataTypes.STRING, allowNull: true },
      business_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_by: { type: DataTypes.STRING, defaultValue: null },
      created_by: { type: DataTypes.STRING, defaultValue: null },
      title: { type: DataTypes.STRING, allowNull: true },
      options: { type: DataTypes.STRING, allowNull: true },
      type: { type: DataTypes.STRING, allowNull: true },
      value: { type: DataTypes.STRING, allowNull: true },
      value_type: { type: DataTypes.ENUM("fixed", "percentage"), allowNull: true },
      limit: { type: DataTypes.INTEGER, allowNull: true },
      key_unit: { type: DataTypes.STRING, allowNull: true },
      title_group: { type: DataTypes.STRING, allowNull: true },
      order_by: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.ENUM("active", "disable"), allowNull: true },
      updated_user_type: { type: DataTypes.STRING, allowNull: true },
      created_user_type: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      timestamps:false,
      modelName: "UserBusinessSetting",
      tableName: "userbusinesssettings",
      // hooks: {
      //   afterCreate: async (userBusinessSetting) => {
      //     userBusinessSetting.token = CreateToken("userBusinessSetting");
      //     await userBusinessSetting.save();
      //   },
      //   afterSave: async (userBusinessSetting) => {
      //     if (userBusinessSetting.title && !userBusinessSetting.slug) {
      //       userBusinessSetting.slug = CreateSlug(userBusinessSetting.title);
      //       await userBusinessSetting.save();
      //     }
      //   },
      // },
    }
  );

  return UserBusinessSetting;
};

