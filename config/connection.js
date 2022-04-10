//IMPORT SEQUELIZE CONSTRUCTOR FROM THE LIB
const Sequelize = require('sequelize');

// CONNECT DB - PASSED IN USERNAME AND PASSWORD- REPLACED AND BETTER PROTECTED BY THE .ENV FILE-CHANGED TO JAWSDB FOR HEROKU DEPLOYMENT

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;