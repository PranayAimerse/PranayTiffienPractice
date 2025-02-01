'use strict';
const dayjs = require("dayjs");
const {Sequelize} = require("sequelize");
const {generateSlug} = require("../utils/generateSlug");
const {generateUniqueToken} = require("../utils/generateToken");

const {GET_LIST, GET_OBJECT} = require("../config/constant");
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AttrBanner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
        static async getByLike(searchStr, keyValueSet = null, inKeyValueSet = null, notInKeyValueSet = null, dataLimit = 10, dataOffset = 0, orderBy = 'id', orderType = 'desc', loginUserId = 0, loginUserType = null) {
            try {
                if (!searchStr) {
                    throw new Error('Search string is required.');
                }

                // Split the search string into words by spaces
                const words = searchStr.trim().split(/\s+/);

                // if (words.length < 2) {
                //     throw new Error('Please provide at least two words for the search.');
                // }

                // Get all column names from the model
                const columns = this.getColumnNames();

                // Construct `Op.and` condition for each column for the given words
                const orConditions = columns.map(column => ({
                    [column]: {
                        [Sequelize.Op.and]: words.map(word => ({
                            [Sequelize.Op.like]: `%${word}%`,
                        })),
                    },
                }));

                // Combine all conditions using `Op.or`
                const results = await this.findAll({
                    where: {
                        [Sequelize.Op.or]: orConditions,
                    },
                    limit: dataLimit || 10, // Default to 10 results if no limit is provided
                    offset: (dataOffset || 0) * (dataLimit || 10),
                    order: orderBy ? [[orderBy, orderType || 'ASC']] : [], // Sort by the given column and order
                });

                return results;
            } catch (error) {
                throw new Error(`Error during search: ${error.message}`);
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

        static async getFullById(id, loginUserId = 0, loginUserType = null) {
            try {
                let record = await this.getById(id, loginUserId, loginUserType);
                if (record) {

                }
                return record;
            } catch (error) {
                throw new Error(`Error fetching data by ID: ${error.message}`);
                return null;
            }
        }

        static async getByToken(token, loginUserId = 0, loginUserType = null) {
            try {
                let record = await this.findOne({where: {token}});
                if (record) {

                }
                return record;
            } catch (error) {
                throw new Error(`Error fetching data by ID: ${error.message}`);
                return null;
            }
        }

        static async getBySlug(slug, loginUserId = 0, loginUserType = null) {
            try {
                let record = await this.findOne({where: {slug}});
                if (record) {

                }
                return record;
            } catch (error) {
                throw new Error(`Error fetching data by ID: ${error.message}`);
                return null;
            }
        }

        static async getByKey(requiredValueType = GET_LIST, keyValueSet = null, inKeyValueSet = null, notInKeyValueSet = null, dataLimit = 10, dataOffset = 0, orderBy = 'id', orderType = 'desc', loginUserId = 0, loginUserType = null) {
            try {
                const where = {
                    ...(keyValueSet || {}),
                    // Add the `whereIn` conditions to the query if they exist
                    ...Object.keys(inKeyValueSet || {}).reduce((acc, column) => {
                        acc[column] = {[Sequelize.Op.in]: inKeyValueSet[column]};
                        return acc;
                    }, {}),
                    // Add the `whereNotIn` conditions to the query if they exist
                    ...Object.keys(notInKeyValueSet || {}).reduce((acc, column) => {
                        acc[column] = {[Sequelize.Op.notIn]: notInKeyValueSet[column]};
                        return acc;
                    }, {}),
                }
                const options = {
                    where: {...where},
                    limit: dataLimit || 10,         // Pagination limit
                    offset: (dataOffset || 0) * (dataLimit || 10),       // Pagination offset
                    order: orderBy ? [[orderBy, orderType]] : [],  // Sorting order (default to ASC)
                };

                // Combine all conditions using `Op.or`
                let results = null;
                if (requiredValueType === GET_LIST) {
                    results = await this.findAll(options);
                } else {
                    results = await this.findOne({where: {...where}});
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
                const token = await generateUniqueToken(this, "B");
                const slug = await generateSlug(this, dataTemp?.title || ("banner-" + token));
                // Create a new user
                let tempUpdateDataset = {...dataTemp, token: token, slug: slug};

                if (loginUserId && loginUserType) {
                    tempUpdateDataset = {
                        ...tempUpdateDataset,
                        created_by: loginUserId,
                        created_user_type: loginUserType,
                        updated_by: loginUserId,
                        updated_user_type: loginUserType,
                    };
                }
                const dataSet = await this.filterValidAttributes(tempUpdateDataset);

                const insertData = await this.create(dataSet);
                if (insertData) {
                    console.log('Data created successfully:', insertData?.token);
                    return this.getFullById(insertData?.id, loginUserId, loginUserType);
                } else {
                    console.log('Data created successfully:', insertData?.token);
                }
            } catch (error) {
                console.error('Error inserting data:', error);
                throw new Error(`Error updating data: ${error.message}`);
                return null;
            }
        }

        static async updateData(data, id, loginUserId = 0, loginUserType = null) {
            try {
                const oldData = await this.findByPk(id);
                if (oldData) {
                    let tempUpdateDataset = {...oldData, ...data}
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
                    return await this.getById(id, loginUserId, loginUserType)
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
                    const result = await this.destroy({where: {id: data?.id}, limit: 1,});
                    if (result) {
                        return true;  // Record successfully deleted
                    }
                }
                throw new Error('No records found matching the specified conditions.');
                return null;
            } catch (error) {
                throw new Error(`Error deleting record: ${error.message}`);
            }
        }
    }

    AttrBanner.init({
        token: DataTypes.STRING,
        slug: DataTypes.STRING,
        url_image: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        date_start: {
            type: DataTypes.DATE,
            get() {
                return dayjs(this.getDataValue('date_start')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        date_end: {
            type: DataTypes.DATE,
            get() {
                return dayjs(this.getDataValue('date_end')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        type: DataTypes.STRING,
        url: DataTypes.STRING,
        status: DataTypes.ENUM('upcoming', 'running', 'disable', 'expired'),
        order_by: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
        updated_user_type: DataTypes.STRING,
        created_by: DataTypes.INTEGER,
        created_user_type: DataTypes.STRING,
        created_at: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                return dayjs(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        updated_at: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                return dayjs(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    }, {
        sequelize,
        modelName: 'AttrBanner',
        tableName: 'gns_attr_banners',
        underscored: true,  // Use snake_case for column names
    });
    return AttrBanner;
};