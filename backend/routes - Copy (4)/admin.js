const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchconsultant = require('../middleware/fetchconsultant');
const { isValidDateValue } = require('@testing-library/user-event/dist/utils');


const JWT_SECRET = 'Harryisagoodboy';


//Route 1 : Create an admin using Post Method "/api/admin/create". No login required

router.post('/create', [
  body('first_name', "Enter a valid Name").isLength({ min: 5 }),
  body('middle_name', "Enter a valid Name").isLength({ min: 5 }),
  body('last_name', "Enter a valid Name").isLength({ min: 5 }),
  body('email', "Enter a valid email").isEmail(),
  body('username', "Enter a valid name").isLength({ min: 5 }),
  body('password', "Password must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
  
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {


    // Check weather the user with same email exists
    let fsmAdmin = await Admin.findOne({ admin_email: req.body.email });
    console.log(fsmAdmin);
    if (fsmAdmin) {
      return res.status(400).json({ error: "Sorry a user with this email id already exists" })
    }

    const salt  = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(req.body.password,salt);

    fsmAdmin = await Admin.create({
      admin_first_name: req.body.first_name,
      admin_middle_name: req.body.middle_name,
      admin_last_name: req.body.last_name,
      admin_email: req.body.email,
      admin_username: req.body.username,
      admin_password: secPass
    });
    const data = {
        id: fsmAdmin.id
    }
    res.json(fsmAdmin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }

})


// Route 2 : Authenticate an Admin using Post Method "/api/admin/login". No login required

router.post('/login', [
  body('username', "Enter a valid username").isLength({ min: 5 }),
  body('password', "Password can not be blank").exists() 

], async (req, res) => {

      // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {username,password} = req.body;

  try {
    let fsmAdmin  = await Admin.findOne({username});

    if(!fsmAdmin){
      return res.status(400).json({error:"Please try to login with correct username"});
    }
    const passwordCompare = await bcrypt.compare(password,fsmAdmin.admin_password);

    if(!passwordCompare){
      return res.status(400).json({error:"Please try to login with correct password"});
    }

    const data = {
      id: fsmAdmin.id
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    

    
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error ");
  }

})


//Route 3 : Get Logged In User Details Using Post Method "/api/auth/getuser". login required

router.get('/getuser', fetchconsultant , async (req, res) => {

      try {

       adminId = req.user.id;
       console.log(req.adminId); 
       //const user = await User.findById(userId).select("-password");
       const admin = await Admin.findById(adminId).select("-password");
       res.send(admin);
       
      } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error ");

      }

})

//Route 4 : Update an existing User  using: Put Method "/api/auth/updateprofile". Login Required


router.put('/update/:id', fetchconsultant, async (req, res) => {

  const {owner_name , owner_email ,  owner_password } = req.body;

  try {
          

  // Create a new note object
  
  const newAdmin = {};

  if(owner_name){newAdmin.owner_name = owner_password };  
  if(owner_email){newAdmin.owner_email = owner_email };  
  if(owner_password){newAdmin.owner_password = owner_password };

  const salt  = await bcrypt.genSalt(10);

  const secPass = await bcrypt.hash(owner_password,salt);

  console.log("Sec Pass"+secPass);

  if(owner_password){newAdmin.owner_password = secPass };

  // Find the note to be updated and update it .

  let adminUpdate = await Admin.findById(req.params.id);

  console.log('Checking User After Find'+adminUpdate);
  if(!adminUpdate){return res.status(404).send("Not Found")}

  adminUpdate = await Admin.findByIdAndUpdate(req.params.id, {$set: newAdmin} , {new:true} );
  res.json({adminUpdate});


  }  catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error ");
  }

 

})


module.exports = router

