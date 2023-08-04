const express = require('express');
const Consultants = require('../models/Consultants');
const router = express.Router();
const { body , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchconsultant = require('../middleware/fetchconsultant');


const JWT_SECRET = 'Harryisagoodboy';

const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json()); 

router.post('/create',[
    body('consultant_name','Enter a valid name').isLength({ min: 3  }),
    body('consultant_email','Enter a valid email').isEmail(),
    body('consultant_password','Password must be atleast 5 characters').isLength({ min: 5  }),
] , async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return (res.status(400).json({errors: errors.array()}));
    }

   // console.log(req.body);
   // const consultant = Consultants(req.body);
   // consultant.save();
   // res.json(req.body);

   try{

        let consultants = await Consultants.findOne({consultant_email: req.body.consultant_email});
        console.log(consultants);
        if(consultants){
            return res.status(400).json({error : "Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.consultant_password , salt);

        consultants = await Consultants.create({
            consultant_name : req.body.consultant_name,
            consultant_email : req.body.consultant_email,
            consultant_password : secPass,
        })

        const data={
            consultants:{
                id: consultants.id
            }
        }

        const consultantToken = jwt.sign(data, JWT_SECRET);
        //console.log(jwtData);
        //res.json(consultants) 
        res.json(consultantToken);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some Error Occured");
   }    
})


router.post('/login',[
    body('consultant_email','Enter a valid email').isEmail(),
    body('consultant_password','Password cannot be blank').exists(),
] , async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return (res.status(400).json({errors: errors.array()}));
    }
    const {consultant_email,consultant_password} = req.body;
    
    try {
        let consultants = await Consultants.findOne({consultant_email});
        console.log("I am here in Try".consultants);
        if(!consultants){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(consultant_password,consultants.consultant_password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data={
            consultants:{
                id: consultants.id
            }
        }

        const consultantToken = jwt.sign(data, JWT_SECRET);
        //console.log(jwtData);
        //res.json(consultants) 
        res.json(consultantToken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})    

// Route 3: Get Logged In Consultant Details 
router.get('/getconsultant', fetchconsultant , async (req, res) => {

    try {
        consultantId = req.consultant.id;
        const consultant = await Consultants.findById(consultantId).select("-password");
        res.send(consultant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;