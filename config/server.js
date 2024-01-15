// config/server.js
const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');


module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', './views');
    app.use(express.static('public'));
    app.use(cookieParser());
};
