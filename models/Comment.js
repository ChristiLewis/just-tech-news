const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init({
    //DEFINE COLUMNS
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
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            //REFERENCES THE MODELS/USER.JS FILE TO SET THE KEY ID OF THE USER MAKING THE COMMENT
            model: 'user',
            //SQL FOREIGN KEY
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    }

},
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;