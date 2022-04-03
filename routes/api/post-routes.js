//ADD LIBS
const router = require('express').Router();
const req = require('express/lib/request');
const { Post, User } = require('../../models');

//GET ALL POSTS
router.get('/', (req, res) => {
    Post.findAll({
            attributes: ['id', 'post_url', 'title', 'created_at'],
            //ADD THE ORDER PROPERTY SO THE MOST CURRENT POSTS SHOW FIRST
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET ONE POST
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'post_url', 'title', 'created_at'],
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    //EXPECTS{ TITLE:'XYZPOST', PST_URL: 'HTTPS//XYZ.COM/PRESS', USER_ID: 1} 
    Post.create({
            title: req.body.title,
            post_url: req.body.post_url,
            user_id: req.body.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Post.update({
            title: req.body.title
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;