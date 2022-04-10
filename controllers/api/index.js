//COLLECTS ENDPOINTS AND PREFIXES THEM
const router = require('express').Router();

const userRoutes = require('./user-routes');
//ADD POST-ROUTE AND OTHERS AFTERWARD
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
//LINK OTHER MODELS AND THEIR ROUTES 
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;