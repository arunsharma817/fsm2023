const express = require('express');
const ServiceVendor = require('../models/ServiceVendor');
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
    body('service_vendor_fname', 'Enter a valid Company name').isLength({ min: 3 }),
    body('service_vendor_lname', 'Enter a valid desc').isLength({ min: 3 }),
    body('service_vendor_type', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let servicevendors = await ServiceVendor.findOne({ service_vendor_fname: req.body.service_vendor_fname });
        console.log("I am just after client finds".servicevendors); 

        if (servicevendors) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { service_vendor_fname, service_vendor_lname, service_vendor_type } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.service_vendor_type, salt);

        //clients = await UserType.create({
        //    service_vendor_fname : req.body.service_vendor_fname,
        //  service_vendor_lname : req.body.service_vendor_lname,
        //   service_vendor_type : secPass,
        //      consultants : req.consultants.id
        //})

        const servicevendor = new ServiceVendor({ service_vendor_fname, service_vendor_lname, service_vendor_type});
        const saveServicevendors = await servicevendor.save();

        res.json(saveServicevendors);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const servicevendors = await ServiceVendor.find();
        res.json(servicevendors)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { service_vendor_fname, service_vendor_lname, service_vendor_type } = req.body;

    try {

        // Create a new client object

        const newServiceVendor =  {};

        if (service_vendor_fname) { newServiceVendor.service_vendor_fname = service_vendor_fname };

        if (service_vendor_lname) { newServiceVendor.service_vendor_lname = service_vendor_lname };

        if (service_vendor_type) { newServiceVendor.service_vendor_type = service_vendor_type };

        // Find the note to be updated and update it .

        let serviceVendorFind = await ServiceVendor.findOne({ service_vendor_lname: req.body.service_vendor_lname });
        console.log("I am just after user type  finds".serviceVendorFind);

        if (serviceVendorFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let service_vendor = await ServiceVendor.findById(req.params.id);

        console.log('Checking User Type After Find' + service_vendor);
        if (!service_vendor) { return res.status(404).send("Not Found") }
       
        let service_vendor_update  = await ServiceVendor.findByIdAndUpdate(req.params.id, { $set: newServiceVendor }, { new: true });
        res.json({ service_vendor_update });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing UserTypes  using: Delete  Method "/api/usertypes/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { service_vendor_fname, service_vendor_lname, service_vendor_type } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let service_vendor = await ServiceVendor.findById(req.params.id); 
     console.log('Checking User Type After Find'+service_vendor);
     if(!service_vendor){return res.status(404).send("Not Found")}

     let service_vendor_delete = await ServiceVendor.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , service_vendor_delete : service_vendor_delete });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/usertypes/deletemultipleusertypes"

router.delete('/delmultipleservicevendors', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiusertypes"+ids);
      try {
        await ServiceVendor.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "User Types have been deleted" , servicevendors : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})



module.exports = router;