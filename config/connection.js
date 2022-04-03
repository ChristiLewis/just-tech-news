//IMPORT SEQUELIZE CONSTRUCTOR FROM THE LIB
const Sequelize = require('sequelize');

// CONNECT DB - PASSED IN USERNAME AND PASSWORD- REPLACED AND BETTER PROTECTED BY THE .ENV FILE

require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });

module.exports = sequelize;