//IMPORT LIBRARIES
//PASSWORD PROTECTION BCRYPT
const bcrypt = require('bcrypt');

const { Model, DataTypes } = require('sequelize');

//IMPORT DB CONNECTION FROM CONFIG - CONNECTION.JS
const sequelize = require('../config/connection');

//INITIALIZE USER MODEL - EXTEND OFF SEQUELIZE'S MODEL CLASS
class User extends Model {}

//ADD ASYNC-AWAIT VERSION OF HOOKS FUNCTION

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
        //ADD HOOKS FOR BCRYPT USE- WITH ASYNC-AWAIT SYNTAX
        hooks: {
            //BEFORECREATE LIFECYCLE HOOK FUNCTIONALITY
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hashSync(newUserData.password, 10);
                return newUserData;
            },
            //BEFOREUPDATE LIFECYCLE HOOK FUNCTIONALITY
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hashSync(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
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

//BCRYPT HASHING ASYNC WITH PROMISE CALLBACK - CODE FROM BCRYPT DOCUMENTATION https://www.npmjs.com/package/bcrypt
// bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
//     // Store hash in your password DB.
// });

module.exports = User;