//IMPORT THE USER MODEL AND EXPORT AN OBJECT WITH THE USER MODEL + ANY OTHERS ADDED AS ITS PROPERTY:

const User = require('./User');

const Post = require('./Post');

//CREATE ASSOCIATIONS
//BELOW DEFINES THE RELATIONSHIP OF THE POST MODEL TO THE USER
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//EACH CONSTANT ADDED ABOVE TO BE REQUIRED IS ADDED TO THE ARRAY INSIDE THE CURLY BRACKETS BELOW
module.exports = { User, Post };