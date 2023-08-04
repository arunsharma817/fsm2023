const express = require('express');
const Owners = require('../models/Owners');
const router = express.Router();
const { body , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchowner = require('../middleware/fetchowner');


const JWT_SECRET = 'Harryisagoodboy';

const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json()); 

router.post('/create',[
    body('owner_name','Enter a valid name').isLength({ min: 3  }),
    body('owner_email','Enter a valid email').isEmail(),
    body('owner_password','Password must be atleast 5 characters').isLength({ min: 5  }),
] , async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return (res.status(400).json({errors: errors.array()}));
    }

    console.log(req.body);
   // const consultant = Owners(req.body);
   // consultant.save();
   // res.json(req.body);

   try{
    console.log("I am in try block");
    console.log("I am in try block before salt");
        let owners = await Owners.findOne({owner_email: req.body.owner_email});
        
        console.log(owners);
        
        if(owners){
            return res.status(400).json({error : "Sorry an Owner with this email already exists"})
        }
       
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.owner_password , salt);

        owners = await Owners.create({
            owner_name : req.body.owner_name,
            owner_email : req.body.owner_email,
            owner_password : secPass,
        })

        const data={
            owners:{
                id: owners.id
            }
        }

        const ownerToken = jwt.sign(data, JWT_SECRET);
        //console.log(jwtData);
        //res.json(Owners) 
        res.json(ownerToken);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some Error Occured");
   }    
})


router.post('/login',[
    body('owner_email','Enter a valid email').isEmail(),
    body('owner_password','Password cannot be blank').exists(),
] , async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return (res.status(400).json({errors: errors.array()}));
    }
    const {owner_email,owner_password} = req.body;
    
    try {
        let owners = await Owners.findOne({owner_email});
        console.log("I am here in Try".owners);
        if(!owners){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(owner_password,owners.owner_password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data={
            owners:{
                id: owners.id
            }
        }

        const ownerToken = jwt.sign(data, JWT_SECRET);
        //console.log(jwtData);
        //res.json(consultants) 
        res.json(ownerToken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})    

// Route 3: Get Logged In Consultant Details 
router.get('/getowner', fetchowner , async (req, res) => {

    try {
        ownerId = req.owner.id;
        const owner = await Owners.findById(ownerId).select("-password");
        res.send(owner);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//Route 4 : Update an existing Owner  using: Put Method "/api/auth/updateprofile". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {

    const { owner_name , owner_email ,  owner_password } = req.body;
  
    try {
              
    // Create a new note object
    
    const newOwner = {};
  
    if(owner_name){newOwner.owner_name = owner_name };  
    if(owner_email){newOwner.owner_email = owner_email };  
    if(owner_password){newOwner.owner_password = owner_password };
  
    const salt  = await bcrypt.genSalt(10);
  
    const secPass = await bcrypt.hash(owner_password,salt);
  
    console.log("Sec Pass");
  
    if(owner_password){newOwner.owner_password = secPass };
  
    // Find the note to be updated and update it .
  
    let ownerUpdate = await Owners.findById(req.params.id);
  
    console.log('Checking User After Find'+ownerUpdate);
    if(!ownerUpdate){return res.status(404).send("Not Found")}
  
    ownerUpdate = await Owners.findByIdAndUpdate(req.params.id, {$set: newOwner} , {new:true} );
    res.json({ownerUpdate});
  
    }  catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }  
  })



module.exports = router;