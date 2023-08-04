const express = require('express');
const Enquiry = require('../models/Enquiry');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');
var fetchowner = require('../middleware/fetchowner')
const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());



///// Bulk Import 

///// For Import Process

const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const { promisify } = require('util');

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });
      
const upload = multer({ storage: storage });

const asyncParseCSV = promisify((filePath, callback) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        callback(null, results);
      })
      .on('error', (error) => {
        callback(error, null);
      })
});

router.post('/bulkimport', upload.single('csvFile'), async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await Enquiry.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
});





//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('enquiry_name', 'Enter a valid Company name').isLength({ min: 3 }),
    body('enquiry_email', 'Enter a valid desc').isLength({ min: 3 }),
    body('enquiry_mobile', 'Password must be atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { enquiry_name, enquiry_email, enquiry_mobile } = req.body;

        const enquiry = new Enquiry({ enquiry_name, enquiry_email, enquiry_mobile});
        const saveEnquiry = await enquiry.save();

        res.json(saveEnquiry);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const enquiry = await Enquiry.find();
        res.json(enquiry)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { enquiry_name, enquiry_email, enquiry_mobile } = req.body;

    try {

        // Create a new client object

        const newEnquiry =  {};

        if (enquiry_name) { newEnquiry.enquiry_name = enquiry_name };

        if (enquiry_email) { newEnquiry.enquiry_email = enquiry_email };

        if (enquiry_mobile) { newEnquiry.enquiry_mobile = enquiry_mobile };

        // Find the note to be updated and update it .

        let enquiryFind = await Enquiry.findOne({ enquiry_email: req.body.enquiry_email });
        console.log("I am just after user type  finds".enquiryFind);

        if (enquiryFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let main_enquiry = await Enquiry.findById(req.params.id);

        console.log('Checking User Type After Find' + main_enquiry);
        if (!main_enquiry) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        main_enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { $set: newEnquiry }, { new: true });
        res.json({ main_enquiry });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { enquiry_name, enquiry_email, enquiry_mobile } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let main_enquiry = await Enquiry.findById(req.params.id); 
     console.log('Checking User Type After Find'+main_enquiry);
     if(!main_enquiry){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     main_enquiry = await Enquiry.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , main_enquiry : main_enquiry });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultipleenquiry', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multimainproducts"+ids);
      try {
        await Enquiry.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "User Types have been deleted" , enquiry : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})

////////////////////

router.post('/import', fetchowner, async (req, res) => {
    //console.log("req body type "+typeof(req.body));
    //console.log("req body value "+req.body);
    const {enquiries}  = req.body;
    console.log("I am here in multimainproducts"+typeof(req.body));
    console.log("I am here in multimainproducts"+req.body);
    
        try {
            //const results = await asyncParseCSV(req.file.path);
            await Enquiry.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , enquiry : enquiries }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})





module.exports = router;