const express = require('express');

const Signupin = require('../models/userModel');

const passport = require('passport');

const router = express.Router();

// const userModel = require('../models/userModel');

// when auser access the signup ('/signup', acallback function(req,res) replies
// back by giving user.pug)
router.get('/signnupin', (req, res) => {
res.render('user.pug');
});

router.post('/register', async (req, res) => {
  try {
  const user = new Signupin(req.body);
  console.log(req.body);
  await Signupin.register(user,req.body.password);
  res.redirect("/api/signnupin");
  } 
  catch (error) {
res.status(400).send({message: "failed to register user"})  
  
  console.log(error);}
});


// login routes
router.get("/login", (req, res) => {
res.render("login.pug") 
})

router.post("/login", passport.authenticate("local",
{ failureRedirect: "/api/login"}), 
(req, res) => {
  req.session.user = req.user
  let loggedinUser = req.session.user.model;
  console.log(loggedinUser);
  // res.render("dashboard");
  // res.redirect("/api/dashboard")
  console.log(req.body);
  console.log(req.session.user.model);

  if(req.session.user.role === "parking ") {
    res.render("parking_.pug");
  } 
//  else if(req.session.user.role === "tire") {
//     res.render("tire_.pug",{inUser:loggedinUser});
//   } 
  // else if(req.session.user.role === "battery") {
  //   res.render("battery_.pug");
  // }
  else{
    res.send("could not route user")
  }
}
);
// for logging out
router.get("/logout", (req, res) => {
  req.session.destroy(()=>{res.redirect("/api/login")});
  console.log("you have been loged out")
})






module.exports = router;