const express = require('express');
const Inspectors = require('../models/Inspectors');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');

const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());

router.post('/', (req, res)=>{

    console.log(req.body);
    const inspector = Inspectors(req.body);
    inspector.save();
    res.json(req.body);
  
})



//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required


router.get('/list', fetchconsultant, async (req, res) => {
    try {


        const inspectors = await Inspectors.find({ inspector_consultant_id: req.consultant.id });
        res.json(inspectors)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


router.post('/create', fetchconsultant, [
    body('inspector_name', 'Enter a valid Inspector name').isLength({ min: 3 }),
    body('inspector_email', 'Enter a valid email').isEmail(),
    body('inspector_password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let inspectors = await Inspectors.findOne({ inspector_email: req.body.inspector_email });
        console.log("I am just after inspector finds".inspectors);

        if (inspectors) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { inspector_name, inspector_email, inspector_password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.inspector_password, salt);

        const inspector = new Inspectors({ inspector_name, inspector_email, inspector_password, inspector_consultant_id: req.consultant.id });
        const saveInspectors = await inspector.save();

        res.json(saveInspectors);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchconsultant, async (req, res) => {
    console.log(req.body);
    const { inspector_name, inspector_email, inspector_password } = req.body;

    try {

        // Create a new client object
        const newInspector =  {};

        if (inspector_name) { newInspector.inspector_name = inspector_name };

        if (inspector_email) { newInspector.inspector_email = inspector_email };

        if (inspector_password) { newInspector.inspector_password = inspector_password };

        // Find the note to be updated and update it .

        let inspectorFind = await Inspectors.findOne({ inspector_email: req.body.inspector_email });
        console.log("I am just after client finds".inspectors);

        if (inspectorFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let inspector = await Inspectors.findById(req.params.id);

        console.log('Checking Client After Find' + inspector);
        if (!inspector) { return res.status(404).send("Not Found") }

        if (inspector.inspector_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }

        inspector = await Inspectors.findByIdAndUpdate(req.params.id, { $set: newInspector }, { new: true });
        res.json({ inspector });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing Inspector  using: Delete  Method "/api/inspectors/delete". Login Required


router.delete('/delete/:id', fetchconsultant, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let inspector = await Inspectors.findById(req.params.id); 
     console.log('Checking Note After Find'+inspector);
     if(!inspector){return res.status(404).send("Not Found")}

     // Allow  deletion only if user owns it 
     if(inspector.inspector_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }

     inspector = await Inspectors.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Inspector has been deleted" , inspector : inspector });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
           
    // Route 5: Get Inspector Details 
router.get('/getinspector/:id', fetchconsultant , async (req, res) => {

    try {
        inspectorId = req.params.id;
        const inspector = await Inspectors.findById(inspectorId);
        console.log("I am here"+inspector);
        res.json(inspector)
       // res.json({ "Success" : "Product Found" , product : product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})



})



module.exports = router;