//IMPORT THE USER MODEL AND EXPORT AN OBJECT WITH THE USER MODEL + ANY OTHERS ADDED AS ITS PROPERTY:

const User = require('./User');

const Post = require('./Post');

const Vote = require('./Vote');

//CREATE ASSOCIATIONS
//BELOW DEFINES THE ONE: MANY RELATIONSHIP OF THE USER MODEL TO THE MANY POST MODEL
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//BELOW DEFINES THE BROKERING DONE BY THE VOTE THROUGH TABLE ESTABLISHING A COMMON GROUND FOR THE .BELONGSTOMANY() METHOD FOR THE MANY : MANY RELATIONSHIP OF MANY USERS VOTING ON MANY POSTS
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

//TO SEE A TOTAL COUNT OF VOTES FOR A SINGLE POST AND OTHER FUNCTIONS CALLED AGGREGATED SQL FUNCTIONS BETWEEN MODELS, WE NEED ONE: MANY RELATIONSHIPS DEFINED
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

//EACH CONSTANT ADDED ABOVE TO BE REQUIRED IS ADDED TO THE ARRAY INSIDE THE CURLY BRACKETS BELOW
module.exports = { User, Post, Vote };