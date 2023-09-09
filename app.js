const path = require('path');
require('dotenv').config({path: path.join(__dirname, 'config', '.env')});
const express = require('express');
const db = require('./models/index');

const app = express();

async function auth_db_conn(){
    try {
        await db.sequelize.authenticate();
    }
    catch (err){
        console.log('An error occured while authenticating connection with database:');
        console.log(err);
        return;
    }
}

auth_db_conn();

const home_routes = require('./routes/home.routes');
const blogs_routes = require('./routes/blogs.routes');
const recipes_routes = require('./routes/recipes.routes');
const contact_routes = require('./routes/contact.routes');
const newsletter_routes = require('./routes/newsletter.routes');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

app.use('/api/home', home_routes);
app.use('/api/blogs', blogs_routes);
app.use('/api/recipes', recipes_routes);
app.use('/api/contact-us', contact_routes);
app.use('/api/newsletter-subscribe', newsletter_routes);

app.listen(8000);
