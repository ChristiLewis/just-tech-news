//SET-UP THE MAIN HOMEPAGE ROUTE - NOW- BECAUSE OF SPECIFYING A TEMPLATE ENGINE LIKE HANDLEBARS- WE CAN USE RES.RENDER() INSTEAD OF RES.SEND() OR RES.SENDFILE() FOR THE RESPONSE
const router = require('express').Router();

//IMPORT MODULES AND MODELS-NOTE LEAVE OUT COMMENT MODEL TO ADD IN LATER const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
    console.log('=====================');
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            //ADD COMMENTS LATER
            //   {
            //     model: Comment,
            //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //     include: {
            //       model: User,
            //       attributes: ['username']
            //     }
            //   },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //HOMEPAGE.HANDLEBARS EXTENSION IS IMPLIED ACTUAL JAVASCRIPT OBJECT TESTED ON LOCAL HOST AND REPLACED BY THE VARIABLE dbPostData
            // res.render('homepage', {
            // id: 1,
            // post_url: 'https://handlebarsjs.com/guide/',
            // title: 'Handlebars Docs',
            // created_at: new Date(),
            // vote_count: 10,
            // comments: [{}, {}],
            // user: {
            //     username: 'test_user'
            // }
            // console.log(dbPostData[0]);
            //DBPOSTDATA IS THEN HANDLEBARRED AS POSTS-BUT YOU NEED TO UPDATE THE HOMEPAGE.HBS CODE

            //MAKE AN ARRAY OF THE JAVASCRIPT OBJECTS FOR HANDLEBARS TO USE
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;