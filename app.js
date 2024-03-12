var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport= require('passport');

var usersRouter = require('./routes/users');
// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/userModel');

//------------------mongo session-----------------
const store = MongoStore.create({
    mongoUrl: 'mongodb+srv://prakashv124421:myQg3sisrpw6Grkv@cluster0.hfqi2tc.mongodb.net/',
    crypto: {
    secret: 'keyboard cat'
  },
    touchAfter: 24 * 3600 // time period in seconds
  })


store.on('error',(err)=>{
  console.log('error in mongos session store',err);
});
//----------------------------------------------------
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());

app.use(session({
  store: store,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());




// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);


app.listen(4000,()=>{
  console.log('server running with port 4000');
});

module.exports = app;
