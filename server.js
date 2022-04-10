//IMPORT ROUTE FOR CSS- FRONT END FILES
const path = require('path');
//IMPORT THE ROUTES TO SERVER.JS, IMPORT SEQUELIZE CONNECTION TO SERVER.JS, AND SEQUELIZE SYNC TO MAKE A CONNECTION TO THE DB
const express = require('express');
//IMPORT LIBRARIES TO RUN SESSION
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//ROUTES DIRECTORY TO CONTROLLERS FOR FRONT-END TO BACKEND MIDDLEWARE
const routes = require('./controllers/');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//SESSIONS COOKIE TO KEEP USER INFO IF SERVER FAILS THEY ARE NOT INTERRUPTED
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//ESTABLISHES HANDLEBARS AS THE TEMPLATE ENGINE OF CHOICE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//CALL SESSIONS FOR COOKIES
app.use(session(sess));

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
