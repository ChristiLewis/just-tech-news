//IMPORT ROUTE FOR CSS- FRONT END FILES
const path = require('path');
//IMPORT THE ROUTES TO SERVER.JS, IMPORT SEQUELIZE CONNECTION TO SERVER.JS, AND SEQUELIZE SYNC TO MAKE A CONNECTION TO THE DB
const express = require('express');
//ROUTES DIRECTORY TO CONTROLLERS FOR FRONT-END TO BACKEND MIDDLEWARE
const routes = require('./controllers/');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

//ESTABLISHES HANDLEBARS AS THE TEMPLATE ENGINE OF CHOICE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ADD USE FOR FRONT END FILES
app.use(express.static(path.join(__dirname, 'public')));

//TURN ON ROUTES
app.use(routes);

//TURN ON CONNECTIONS TO THE DB AND SERVER- EARLY DEV FORCE: FALSE LATER DEV FORCE : TRUE TO SET ASSOCIATIONS - THEN BACK TO FALSE
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
