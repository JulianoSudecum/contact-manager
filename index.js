const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');
const contactRoutes = require('./routes/contacts');
const reportRoutes = require('./routes/report');
const groupRoutes = require('./routes/groups');
const contact_groupRoutes = require('./routes/contacts_groups');



dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/contacts', contactRoutes);
app.use('/report', reportRoutes);
app.use('/groups', groupRoutes);
app.use('/contacts-groups', contact_groupRoutes);


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
