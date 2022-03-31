const { Router } = require("express");
const { route } = require("express/lib/application");
const { UPSERT } = require("sequelize/types/query-types");

//GET ALL USERS
router.get('/', (req, res) => {
    //ACCESS USER MODEL AND USE .FINDALL() METHOD SIM TO SQL COMMAND: SELECT * FROM users;
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET ONE USER AT A TIME SIM TO SQL: SELECT * FROM users WHERE id = 1
router.get('/:id', (req,res) => {
    //SEQUELIZE .FINDONE() METHOD
    User.findOne({
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
route.post('/', (req,res) => {
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
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT ROUTE TO UPDATE EXISTING DATA USES SEQUELIZE .UPDATE() METHOD COMBINING PARAMETERS FOR BOTH CREATING AND LOOKING-UP DATA BY PASSING-IN BOTH REQ.BODY AND REQ.PARAMS.ID. THE SQL EQUIVALENT:
/*
UPDATE users
SET username = "Lernantino", email = "<ACTUAL.EMAIL>", password = "<ACTUAL-PASSWD>"
WHERE id = 1;
*/
router.put('/:id', (req, res) => {
    //EXPECTS KEY/VALUE PAIRS TO MATCH MODEL
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id.' });
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
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});