var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel = require('../models/userModel');
const LocalStrategy= require('passport-local');
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(userModel.authenticate()));

/* GET users listing. */

router.get('/profile',checkAuthentication, function(req, res, next) {
  res.render('profile');
});

router.get('/', function(req, res, next) {
  res.render('signup');
});


router.post('/', function(req, res, next) {

  console.log(req.body);
  const newuser = new userModel({
    username : req.body.username,
    email : req.body.email
  });

  userModel.register( newuser, req.body.password).then(()=>
  {passport.authenticate('local')(req,res,()=>{res.redirect('/profile')})});

  });

router.get('/login', function(req, res, next) {
  
  res.render('login', { error : req.flash('error')});
});



router.post('/login', 
  passport.authenticate('local', { 
    
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
   }),
  function(req, res) {
    //res.redirect('/profile');
  });

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}
module.exports = router;
