const express = require('express');
const Candidates = require('../models/Candidates');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');
var fetchowner = require('../middleware/fetchowner')
const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());


// Route : Delete Multiple Inspectors , Selected from the list of Inspectors . "/api/inspectors/deletemultipleins"

router.delete('/deletemultiplecandidate', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiinspectors"+ids);
      try {
        await Candidates.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Inspectors have been deleted" , candidates : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})

//Route 1 : Get All the Products using: Get Method "/api/consultants/list". Login Required

router.get('/list', fetchowner, async (req, res) => {
    try {
 
        const candidates = await Candidates.find();
        res.json(candidates);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



router.post('/create', fetchowner, [
    body('candidate_name', 'Enter a valid Inspector name').isLength({ min: 3 }),
    body('candidate_email', 'Enter a valid email').isEmail(),
    body('candidate_password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let candidates = await Candidates.findOne({ candidate_email: req.body.candidate_email });
        console.log("I am just after inspector finds".candidates);

        if (candidates) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { candidate_name, candidate_email, candidate_password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.candidate_password, salt);

        const candidate = new Candidates({ candidate_name, candidate_email, candidate_password, candidate_consultant_id: '1234567' });
        const savecandidates = await candidate.save();

        res.json(savecandidates);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log("I am here in update"+req.body);
    const { candidate_name, candidate_email, candidate_password } = req.body;

    try {

        // Create a new client object
        const newCandidate =  {};

        if (candidate_name) { newCandidate.candidate_name = candidate_name };

        if (candidate_email) { newCandidate.candidate_email = candidate_email };

        if (candidate_password) { newCandidate.candidate_password = candidate_password };

        // Find the note to be updated and update it .

        let candidateFind = await Candidates.findOne({ candidate_email: req.body.candidate_email });
        console.log("I am just after client finds".candidates);

        if (candidateFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let candidate = await Candidates.findById(req.params.id);

        console.log('Checking Inspectors After Find' + candidate );
        if (!candidate) { return res.status(404).send("Not Found") }
        {/* it will be used once we setup inspectors with consultant 
        if (inspector.candidate_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/ }
        console.log('Checking Inspector Id Here '+req.params.id);
        candidate = await Candidates.findByIdAndUpdate(req.params.id, { $set: newCandidate }, { new: true });
        res.json({ candidate });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})

//Route 4 : Delete an existing Inspector  using: Delete  Method "/api/inspectors/delete". Login Required

router.delete('/delete/:id', fetchowner, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let candidate = await Candidates.findById(req.params.id); 
     console.log('Checking Inspector After Find'+candidate);
     if(!candidate){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(inspector.candidate_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }*/}

     candidate = await Candidates.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Candidate has been deleted" , candidate : candidate });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
           
})

 // Route 5: Get Inspector Details 
 router.get('/getcandidate/:id', fetchconsultant , async (req, res) => {

    try {
        candidateId = req.params.id;
        const candidate = await Candidates.findById(candidateId);
        console.log("I am here"+icandidatenspector);
        res.json(candidate)
       // res.json({ "Success" : "Product Found" , product : product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router;