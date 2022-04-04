//COLLECTS ENDPOINTS AND PREFIXES THEM
const router = require('express').Router();

const userRoutes = require('./user-routes');
//ADD POST-ROUTE AND OTHERS AFTERWARD
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
//LINK POST MODEL AND ROUTE 
router.use('/posts', postRoutes);

module.exports = router;