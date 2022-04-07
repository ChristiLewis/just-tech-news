const router = require('express').Router();
const { User } = require('../../models');

/*
const { Router } = require("express");
const { route } = require("express/lib/application");
const { USER } = require("sequelize/types/query-types");
*/

//GET ALL USERS
router.get('/', (req, res) => {
    //ACCESS USER MODEL AND USE .FINDALL() METHOD SIM TO SQL COMMAND: SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET ONE USER AT A TIME SIM TO SQL: SELECT * FROM users WHERE id = 1
router.get('/:id', (req, res) => {
    //SEQUELIZE .FINDONE() METHOD
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST ROUTE TO CREATE A USER
router.post('/', (req, res) => {
    //ALL INFO FROM USER MODEL TABLE IE USERNAME, EMAIL, PASSWORD THIS SEQUELIZE METHOD .CREATE() IS SIM TO SQL COMMANDS: 
    /*
    INSERT INTO users
        (username, email, password)
    VALUES
        ("<actual username>", "<actual email>", "<actual password>");
    */
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        //UPDATE FOR SESSIONS
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//VERIFY NEW USERS WITH A QUERY IN A POST ROUTE SINCE INFO IS IN THE MORE SECURE BODY OF THE CODE RATHER THAN IN THE URL LIKE A GET ROUTE
router.post('/login', (req, res) => {
    //EXPECTS {EMAIL" 'XYZ@GMAIL.COM', PASSWORD: 'PASSWORD1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        //VERIFY USER CODE TO SYNC WITH BCRYPT
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            //DECLARE SESSION VARIABLES
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

//LOGOUT ROUTE USING DESTROY() METHOD
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


//PUT ROUTE TO UPDATE EXISTING DATA USES SEQUELIZE .UPDATE() METHOD COMBINING PARAMETERS FOR BOTH CREATING AND LOOKING-UP DATA BY PASSING-IN BOTH REQ.BODY AND REQ.PARAMS.ID. THE SQL EQUIVALENT:
/*
UPDATE users
SET username = "<ACTUAL-NAME>", email = "<ACTUAL.EMAIL>", password = "<ACTUAL-PASSWD>"
WHERE id = 1;
*/
router.put('/:id', (req, res) => {
    //EXPECTS KEY/VALUE PAIRS TO MATCH MODEL
    //PASS-IN REQ.BODY INSTEAD TO ONLY UPDATE WHAT IS PASSED THROUGH
    User.update(req.body, {
        //ADDING CODE TO UPDATE HOOKS FOR BCRYPT
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE A SPECIFIC USER FROM THE DB VIA THE SEQUELIZE .DESTROY() METHOD AND ID WHERE TO REMOVE DATA FROM THE USER DB TABLE
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;