//IMPORT THE ROUTES TO SERVER.JS, IMPORT SEQUELIZE CONNECTION TO SERVER.JS, AND SEQUELIZE SYNC TO MAKE A CONNECTION TO THE DB
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TURN ON ROUTES
app.use(routes);

//TURN ON CONNECTIONS TO THE DB AND SERVER- EARLY DEV FORCE: FALSE LATER DEV FORCE : TRUE TO SET ASSOCIATIONS - THEN BACK TO FALSE
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
