const express = require('express');
const UserType = require('../models/UserType');
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
    body('user_type_title', 'Enter a valid Company name').isLength({ min: 3 }),
    body('user_type_description', 'Enter a valid desc').isLength({ min: 3 }),
    body('user_type_module_permission', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let usertypes = await UserType.findOne({ user_type_title: req.body.user_type_title });
        console.log("I am just after client finds".usertypes); 

        if (usertypes) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { user_type_title, user_type_description, user_type_module_permission } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.user_type_module_permission, salt);

        //clients = await UserType.create({
        //    user_type_title : req.body.user_type_title,
        //  user_type_description : req.body.user_type_description,
        //   user_type_module_permission : secPass,
        //      consultants : req.consultants.id
        //})

        const usertype = new UserType({ user_type_title, user_type_description, user_type_module_permission});
        const saveUsertypes = await usertype.save();

        res.json(saveUsertypes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const usertypes = await UserType.find();
        res.json(usertypes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { user_type_title, user_type_description, user_type_module_permission } = req.body;

    try {

        // Create a new client object

        const newUserType =  {};

        if (user_type_title) { newUserType.user_type_title = user_type_title };

        if (user_type_description) { newUserType.user_type_description = user_type_description };

        if (user_type_module_permission) { newUserType.user_type_module_permission = user_type_module_permission };

        // Find the note to be updated and update it .

        let userTypeFind = await UserType.findOne({ user_type_description: req.body.user_type_description });
        console.log("I am just after user type  finds".userTypeFind);

        if (userTypeFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let user_type = await UserType.findById(req.params.id);

        console.log('Checking User Type After Find' + user_type);
        if (!user_type) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        user_type = await UserType.findByIdAndUpdate(req.params.id, { $set: newUserType }, { new: true });
        res.json({ user_type });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing UserTypes  using: Delete  Method "/api/usertypes/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { user_type_title, user_type_description, user_type_module_permission } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let user_type = await UserType.findById(req.params.id); 
     console.log('Checking User Type After Find'+user_type);
     if(!user_type){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     user_type = await UserType.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , user_type : user_type });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/usertypes/deletemultipleusertypes"

router.delete('/delmultipleusertypes', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiusertypes"+ids);
      try {
        await UserType.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "User Types have been deleted" , usertypes : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})



module.exports = router;