const express = require('express');
const SecurityMembers = require('../models/SecurityMembers');
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
      await SecurityMembers.insertMany(results);
      res.json({ message: 'All Security Members Imported Successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
});





//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('security_member_fname', 'Enter a valid Name').isLength({ min: 3 }),
    body('security_member_lname', 'Enter a valid desc').isLength({ min: 3 }),
    body('security_member_mobile', 'Mobile number should be 10 digits').isLength({ min: 3 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { security_member_fname, security_member_lname, security_member_mobile } = req.body;
        console.log("I am here for adding Member of Security"+{security_member_fname});

        const securitymember = new SecurityMembers({ security_member_fname, security_member_lname, security_member_mobile});
        const saveSecurityMember = await securitymember.save();

        res.json(saveSecurityMember);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const securitymember = await SecurityMembers.find();
        res.json(securitymember)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { security_member_fname, security_member_lname, security_member_mobile } = req.body;

    try {

        // Create a new client object

        const newSecurityMember =  {};

        if (security_member_fname) { newSecurityMember.security_member_fname = security_member_fname };

        if (security_member_lname) { newSecurityMember.security_member_lname = security_member_lname };

        if (security_member_mobile) { newSecurityMember.security_member_mobile = security_member_mobile };

        // Find the note to be updated and update it .

        let securityMemberFind = await SecurityMembers.findOne({ security_member_lname: req.body.security_member_lname });
        console.log("I am just after user type  finds".securityMemberFind);

        if (securityMemberFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let security_member = await SecurityMembers.findById(req.params.id);

        console.log('Checking User Type After Find' + security_member);
        if (!security_member) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        security_member = await SecurityMembers.findByIdAndUpdate(req.params.id, { $set: newSecurityMember }, { new: true });
        res.json({ security_member });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
   const { security_member_fname, security_member_lname, security_member_mobile } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let security_member = await SecurityMembers.findById(req.params.id); 
     console.log('Checking User Type After Find'+security_member);
     if(!security_member){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     security_member = await SecurityMembers.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Member has been deleted" , security_member : security_member });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultiplesecuritymembers', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await SecurityMembers.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Members  have been deleted" , securitymember : ids }); 
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
    const {securitymembers}  = req.body;
    console.log("I am here in multimainproducts"+typeof(req.body));
    console.log("I am here in multimainproducts"+req.body);
    
        try {
            //const results = await asyncParseCSV(req.file.path);
            await SecurityMembers.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , securitymember : securitymembers }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})

module.exports = router;