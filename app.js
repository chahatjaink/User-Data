const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const MONGODB_URI = 'mongodb+srv://node_complete:poquTpfHh0WKdP77@cluster0.u6qsphc.mongodb.net/shop?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes)

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });