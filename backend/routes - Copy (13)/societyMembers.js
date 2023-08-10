const express = require('express');
const SocietyMembers = require('../models/SocietyMembers');
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
      await SocietyMembers.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
});





//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('society_member_fname', 'Enter a valid Company name').isLength({ min: 3 }),
    body('society_member_lname', 'Enter a valid desc').isLength({ min: 3 }),
    body('society_member_mobile', 'Password must be atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { society_member_fname, society_member_lname, society_member_mobile } = req.body;
        console.log("I am here for adding Member of Gautra"+society_member_fname+society_member_lname+society_member_mobile);

        const societymember = new SocietyMembers({ society_member_fname, society_member_lname, society_member_mobile});
        const saveSocietyMember = await societymember.save();

        res.json(saveSocietyMember);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const societymember = await SocietyMembers.find();
        res.json(societymember)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { society_member_fname, society_member_lname, society_member_mobile } = req.body;

    try {

        // Create a new client object

        const newSocietyMember =  {};

        if (society_member_fname) { newSocietyMember.society_member_fname = society_member_fname };

        if (society_member_lname) { newSocietyMember.society_member_lname = society_member_lname };

        if (society_member_mobile) { newSocietyMember.society_member_mobile = society_member_mobile };

        // Find the note to be updated and update it .

        let societyMemberFind = await SocietyMembers.findOne({ society_member_lname: req.body.society_member_lname });
        console.log("I am just after user type  finds".societyMemberFind);

        if (societyMemberFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let society_member = await SocietyMembers.findById(req.params.id);

        console.log('Checking User Type After Find' + society_member);
        if (!society_member) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        society_member = await SocietyMembers.findByIdAndUpdate(req.params.id, { $set: newSocietyMember }, { new: true });
        res.json({ society_member });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
   const { society_member_fname, society_member_lname, society_member_mobile } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let society_member = await SocietyMembers.findById(req.params.id); 
     console.log('Checking User Type After Find'+society_member);
     if(!society_member){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     society_member = await SocietyMembers.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , society_member : society_member });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultiplesocietymembers', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await SocietyMembers.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "User Types have been deleted" , societymember : ids }); 
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
    const {societymembers}  = req.body;
    console.log("I am here in multimainproducts"+typeof(req.body));
    console.log("I am here in multimainproducts"+req.body);
    
        try {
            //const results = await asyncParseCSV(req.file.path);
            await SocietyMembers.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , societymember : societymembers }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})

module.exports = router;