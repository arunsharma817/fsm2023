const express = require('express');
const Helpdesk = require('../models/Helpdesk');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');
var fetchowner = require('../middleware/fetchowner')
const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());


// Route : Delete Multiple Inspectors , Selected from the list of Inspectors . "/api/inspectors/deletemultipleins"

router.delete('/deletemultiplehelpdesk', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiinspectors"+ids);
      try {
        await Helpdesk.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Inspectors have been deleted" , helpdesk : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})

//Route 1 : Get All the Products using: Get Method "/api/consultants/list". Login Required

router.get('/list', fetchowner, async (req, res) => {
    try {
 
        const helpdesk = await Helpdesk.find();
        res.json(helpdesk);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



router.post('/create', fetchowner, [
    body('request_subject', 'Enter a valid Inspector name').isLength({ min: 3 }),
    body('request_description', 'Enter a valid email').isLength({ min: 3 }),
    body('request_priority', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        

        const { request_subject, request_description, request_priority } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.request_priority, salt);

        const helpdesks = new Helpdesk({ request_subject, request_description, request_priority, request_consultant_id: '1234567' });
        const saveHelpdesk = await helpdesks.save();

        res.json(saveHelpdesk);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log("I am here in update"+req.body);
    const { request_subject, request_description, request_priority } = req.body;

    try {

        // Create a new client object
        const newHelpdesk =  {};

        if (request_subject) { newHelpdesk.request_subject = request_subject };

        if (request_description) { newHelpdesk.request_description = request_description };

        if (request_priority) { newHelpdesk.request_priority = request_priority };

        // Find the note to be updated and update it .

        let helpdeskFind = await Helpdesk.findOne({ request_description: req.body.request_description });
        console.log("I am just after client finds".helpdesk);

        if (helpdeskFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let helpdesk = await Helpdesk.findById(req.params.id);

        console.log('Checking Inspectors After Find' + helpdesk );
        if (!helpdesk) { return res.status(404).send("Not Found") }
        {/* it will be used once we setup inspectors with consultant 
        if (inspector.request_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/ }
        console.log('Checking Inspector Id Here '+req.params.id);
        helpdesk = await Helpdesk.findByIdAndUpdate(req.params.id, { $set: newHelpdesk }, { new: true });
        res.json({ helpdesk });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})

//Route 4 : Delete an existing Inspector  using: Delete  Method "/api/inspectors/delete". Login Required

router.delete('/delete/:id', fetchowner, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let helpdesk = await Helpdesk.findById(req.params.id); 
     console.log('Checking Inspector After Find'+helpdesk);
     if(!helpdesk){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(inspector.request_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }*/}

     helpdesk = await Helpdesk.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "helpdesk has been deleted" , helpdesk : helpdesk });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
           
})

 // Route 5: Get Inspector Details 
 router.get('/gethelpdesk/:id', fetchconsultant , async (req, res) => {

    try {
        helpdeskId = req.params.id;
        const helpdesk = await Helpdesk.findById(helpdeskId);
        console.log("I am here"+helpdesk);
        res.json(helpdesk)
       // res.json({ "Success" : "Product Found" , product : product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router;