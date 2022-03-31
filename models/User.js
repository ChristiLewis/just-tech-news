//IMPORT LIBRARIES
const { Model, Dataypes, DataTypes } = require('sequelize');

//IMPORT DB CONNECTION FROM CONFIG - CONNECTION.JS
const sequelize = require('../config/connection.js');

//INITIALIZE USER MODEL - EXTEND OFF SEQUELIZE'S MODEL CLASS
class User extends Model {}

//SET UP USER MODEL RULES
User.init(
    {
       //COLUMNS 
       //ID COLUMN
       id: {
           //SEQUELIZE DATATYPES OBJECT
           type: DataTypes.INTEGER,
           //SQL NOT NULL:
           allowNull: false,
           //SQL PRIMARY KEY:
           primaryKey: true,
           //SQL AUTO INCREMENT:
           autoIncrement: true
       },

       //USERNAME COLUMN
       username: {
           type: DataTypes.STRING,
           allowNull: false
       },

       //EMAIL COLUMN
       email: {
           type: DataTypes.STRING,
           allowNull: false,
           //NO DUPLICATE EMAILS RULE
           unique: true,
           //IF ALLOWNULL = FALSE THEN DATA CAN BE VALIDATED
           validate: {
                isEmail: true
           }          
       },
       //PASSWORD COLUMN
       password: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               //SET A PASSWORD LENGTH RULE
               len: [4]
           }
       }
    },
    {
        //TABLE CONFIG OPTIONS
        //SEQUELIZE CONNECTION
        sequelize,
        //STOP AUTO TIMESTAMPS
        timestamps: false,
        //PREVENT ACCIDENTALLY PLURALIZING THE DB TABLE
        freezeTableName: true,
        //RULE TO USER UNDERSCORE NOT CAMEL - CASE DATA
        underscored: true,
        //RULE TO MAKE MODEL NAME ALL LOWERCASE LETTERS
        modelName: 'user'
    }
);

module.exports = User;