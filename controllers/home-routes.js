//SET-UP THE MAIN HOMEPAGE ROUTE - NOW- BECAUSE OF SPECIFYING A TEMPLATE ENGINE LIKE HANDLEBARS- WE CAN USE RES.RENDER() INSTEAD OF RES.SEND() OR RES.SENDFILE() FOR THE RESPONSE
const router = require('express').Router();

router.get('/', (req, res) => {
    //HOMEPAGE.HANDLEBARS EXTENSION IS IMPLIED
    res.render('homepage');
});


module.exports = router;