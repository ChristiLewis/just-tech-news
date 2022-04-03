//IMPORT LIBS
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//CREATE POST MODEL
class Post extends Model {}

Post.init({
        //FIRST PARAMETER - MAKE COLUMNS
        id: {
            //SEQUELIZE DATA
            type: DataTypes.INTEGER,
            //SQL=NOT NULL
            allowNull: false,
            //SQL SIM
            primaryKey: true,
            //SQL SIM
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            //VERIFY THE LINK
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                //REFERENCES THE MODELS/USER.JS FILE TO SET THE KEY ID OF THE USER MAKING THE POST
                model: 'user',
                //SQL FOREIGN KEY
                key: 'id'
            }
        }
    },
    //SECOND PARAMETER DEFINE THE METADATA
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);
//EXPORT THE EXPRESSION
module.exports = Post;