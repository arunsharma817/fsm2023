const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');
var fetchowner = require('../middleware/fetchowner')
const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());


//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('user_first_name', 'Enter a valid Company name').isLength({ min: 3 }),
    body('user_email', 'Enter a valid email').isEmail(),
    body('user_password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let users = await Users.findOne({ user_email: req.body.user_email });
        console.log("I am just after client finds".users);

        if (users) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { user_first_name, user_email, user_password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.user_password, salt);

        //clients = await Users.create({
        //    user_first_name : req.body.user_first_name,
        //  user_email : req.body.user_email,
        //   user_password : secPass,
        //      consultants : req.consultants.id
        //})

        const user = new Users({ user_first_name, user_email, user_password});
        const saveUsers = await user.save();

        res.json(saveUsers);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const users = await Users.find();
        res.json(users)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { user_first_name, user_email, user_password } = req.body;

    try {

        // Create a new client object

        const newUser =  {};

        if (user_first_name) { newUser.user_first_name = user_first_name };

        if (user_email) { newUser.user_email = user_email };

        if (user_password) { newUser.user_password = user_password };

        // Find the note to be updated and update it .

        let clientFind = await Users.findOne({ user_email: req.body.user_email });
        console.log("I am just after client finds".clientFind);

        if (clientFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let user = await Users.findById(req.params.id);

        console.log('Checking User After Find' + user);
        if (!user) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        user = await Users.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json({ user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing Clients  using: Delete  Method "/api/clients/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { user_first_name, user_email, user_password } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let user = await Users.findById(req.params.id); 
     console.log('Checking Note After Find'+user);
     if(!user){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     user = await Users.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , user : user });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})



// Route : Delete Multiple Inspectors , Selected from the list of Inspectors . "/api/inspectors/deletemultipleins"

router.delete('/delmultipleusers', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiusers"+ids);
      try {
        await Users.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Users have been deleted" , users : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})



module.exports = router;