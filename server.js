const sequelize = require('./config/connection');
const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exHbars = require('express-handlebars');
const helpers = require('./utils/helpers');
const helpBars = exHbars.create({ helpers });
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sesh = {
    secret: 'supersecret',
    cookie: {
        expires: 30 * 60 * 1000
    },
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sesh));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', helpBars.engine);

app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});