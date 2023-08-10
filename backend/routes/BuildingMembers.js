const express = require('express');
const BuildingMembers = require('../models/BuildingMembers');
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
      await BuildingMembers.insertMany(results);
      res.json({ message: 'All Building Members Imported Successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
});





//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('building_member_fname', 'Enter a valid Name').isLength({ min: 3 }),
    body('building_member_lname', 'Enter a valid desc').isLength({ min: 3 }),
    body('building_member_mobile', 'Mobile number should be 10 digits').isLength({ min: 3 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { building_member_fname, building_member_lname, building_member_mobile } = req.body;
        console.log("I am here for adding Member of Building"+{building_member_fname});

        const buildingmember = new BuildingMembers({ building_member_fname, building_member_lname, building_member_mobile});
        const saveBuildingMember = await buildingmember.save();

        res.json(saveBuildingMember);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const buildingmember = await BuildingMembers.find();
        res.json(buildingmember)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { building_member_fname, building_member_lname, building_member_mobile } = req.body;

    try {

        // Create a new client object

        const newBuildingMember =  {};

        if (building_member_fname) { newBuildingMember.building_member_fname = building_member_fname };

        if (building_member_lname) { newBuildingMember.building_member_lname = building_member_lname };

        if (building_member_mobile) { newBuildingMember.building_member_mobile = building_member_mobile };

        // Find the note to be updated and update it .

        let buildingMemberFind = await BuildingMembers.findOne({ building_member_lname: req.body.building_member_lname });
        console.log("I am just after user type  finds".buildingMemberFind);

        if (buildingMemberFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let building_member = await BuildingMembers.findById(req.params.id);

        console.log('Checking User Type After Find' + building_member);
        if (!building_member) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        building_member = await BuildingMembers.findByIdAndUpdate(req.params.id, { $set: newBuildingMember }, { new: true });
        res.json({ building_member });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
   const { building_member_fname, building_member_lname, building_member_mobile } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let building_member = await BuildingMembers.findById(req.params.id); 
     console.log('Checking User Type After Find'+building_member);
     if(!building_member){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     building_member = await BuildingMembers.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Member has been deleted" , building_member : building_member });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultiplebuildingmembers', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await BuildingMembers.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Members  have been deleted" , buildingmember : ids }); 
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
    const {buildingmembers}  = req.body;
    console.log("I am here in multimainproducts"+typeof(req.body));
    console.log("I am here in multimainproducts"+req.body);
    
        try {
            //const results = await asyncParseCSV(req.file.path);
            await BuildingMembers.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , buildingmember : buildingmembers }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})

module.exports = router;