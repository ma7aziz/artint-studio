const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('db');
const passport = require('passport');
const configureServer = require('config/server');
const configureI18n = require('config/i18n');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const User = require('schemas/userSchema');
const langCookieMiddleware = require('middleware/langCookieValueMiddleware')
const cookieParser = require('cookie-parser')
const serverlessHttp = require('serverless-http')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import routes
const publicRoutes = require('routes/publicRoutes');
const adminRoutes = require('routes/adminRoutes');
const authRoutes = require('routes/authRoutes');

// Import global variables
const globals = require('/globals');

app.locals.globals = globals;

configureServer(app);
configureI18n(app);

const initializePassport = require('config/passport');
initializePassport(
    passport,
    email => User.findOne({ email: email }).exec(),
    id => User.findById(id).exec()
);


app.use(bodyParser.urlencoded({limit: '50mb' ,  extended: true  , parameterLimit: 1000000}));
app.use(bodyParser.json());
app.use(flash());
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(langCookieMiddleware);


// Use routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).render('404'); // Render your 404 page
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.handler = serverlessHttp(app);
