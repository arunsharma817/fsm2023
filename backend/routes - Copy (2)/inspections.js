const express = require('express');
const Inspections = require('../models/Inspections');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');

const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());

router.post('/', (req, res)=>{

    console.log(req.body);
    const inspection = Inspections(req.body);
    inspection.save();
    res.json(req.body);
  
})


//Route 1 : Get All the Inspections using: Get Method "/api/inspections/list". Login Required


router.get('/list', fetchconsultant, async (req, res) => {
    try {


        const inspections = await Inspections.find({ consultant_id: req.consultant.id });
        res.json(inspections)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


router.post('/create', fetchconsultant, [
    body('client_id', 'Enter a valid Inspector name').isLength({ min: 3 }),
    body('inspector_id', 'Password must be atleast 5 characters').isLength({ min: 3 }),
    body('product_id', 'Password must be atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

       
        const { client_id , inspector_id, product_id } = req.body;

        
        const inspection = new Inspections({ client_id, product_id, inspector_id, consultant_id: req.consultant.id });
        const saveInspections = await inspection.save();

        res.json(saveInspections);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchconsultant, async (req, res) => {
    console.log(req.body);
    const { client_id , inspector_id, product_id } = req.body;

    try {

        // Create a new client object
        const newInspection =  {};

        if (client_id) { newInspection.client_id = client_id };

        if (inspector_id) { newInspection.inspector_id = inspector_id };

        if (product_id) { newInspection.product_id = product_id };

        
        let inspection = await Inspections.findById(req.params.id);

        console.log('Checking Client After Find' + inspection);
        if (!inspection) { return res.status(404).send("Not Found") }

        if (inspection.consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }

        inspection = await Inspections.findByIdAndUpdate(req.params.id, { $set: newInspection }, { new: true });
        res.json({ inspection });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing Inspector  using: Delete  Method "/api/inspectors/delete". Login Required


router.delete('/delete/:id', fetchconsultant, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let inspection = await Inspections.findById(req.params.id); 
     console.log('Checking Note After Find'+inspection);
     if(!inspection){return res.status(404).send("Not Found")}

     // Allow  deletion only if user owns it 
     if(inspection.consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }

     inspection = await Inspections.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Inspection has been deleted" , inspection : inspection });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
           
    

   // Route 5: Get Inspection Details 
   router.get('/getinspection/:id', fetchconsultant , async (req, res) => {

        try {
            inspectionId = req.params.id;
            const inspection = await Inspections.findById(inspectionId);
            console.log("I am here"+inspection);
            res.json(inspection)
        // res.json({ "Success" : "Product Found" , product : product });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    })

})


module.exports = router;