const express = require('express');
const Reviews = require('../models/Reviews');
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
      await Reviews.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
});





//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('review_description', 'Enter a valid Company name').isLength({ min: 3 }),
    body('review_owner', 'Enter a valid desc').isLength({ min: 3 }),
    body('review_rating', 'Password must be atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { review_description, review_owner, review_rating } = req.body;

        const review = new Reviews({ review_description, review_owner, review_rating});
        const saveReview = await review.save();

        res.json(saveReview);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const review = await Reviews.find();
        res.json(review)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { review_description, review_owner, review_rating } = req.body;

    try {

        // Create a new client object

        const newReview =  {};

        if (review_description) { newReview.review_description = review_description };

        if (review_owner) { newReview.review_owner = review_owner };

        if (review_rating) { newReview.review_rating = review_rating };

        // Find the note to be updated and update it .

        let reviewFind = await Reviews.findOne({ review_owner: req.body.review_owner });
        console.log("I am just after user type  finds".reviewFind);

        if (reviewFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let main_review = await Reviews.findById(req.params.id);

        console.log('Checking User Type After Find' + main_review);
        if (!main_review) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        main_review = await Reviews.findByIdAndUpdate(req.params.id, { $set: newReview }, { new: true });
        res.json({ main_review });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { review_description, review_owner, review_rating } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let main_review = await Reviews.findById(req.params.id); 
     console.log('Checking User Type After Find'+main_review);
     if(!main_review){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     main_review = await Reviews.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , main_review : main_review });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultiplereviews', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multimainproducts"+ids);
      try {
        await Reviews.deleteMany({'_id':{'$in': ids }});
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
            await Reviews.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , enquiry : enquiries }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})

module.exports = router;