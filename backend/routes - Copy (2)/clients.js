const express = require('express');
const Clients = require('../models/Clients');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');

const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());

router.post('/', fetchconsultant, [
    body('client_company_name', 'Enter a Valid Company Name').isLength({ min: 3 }),
    body('client_email', 'Enter a Valid Company Email').isEmail(),
    body('client_password', 'Enter a Valid Password').isLength({ min: 5 }),
], (req, res) => {

    console.log(req.body);
    const client = Clients(req.body);
    client.save();
    res.json(req.body);

    //const Cat = mongoose.model('Cat', { name: String });
    //const client = new Clients(req.body);
    //client.save().then(() => console.log('Client Saved'));
    //res.json(req.body);
})

//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required


router.get('/list', fetchconsultant, async (req, res) => {
    try {


        const clients = await Clients.find({ client_consultant_id: req.consultant.id });
        res.json(clients)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


router.post('/create', fetchconsultant, [
    body('client_company_name', 'Enter a valid Company name').isLength({ min: 3 }),
    body('client_email', 'Enter a valid email').isEmail(),
    body('client_password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let clients = await Clients.findOne({ client_email: req.body.client_email });
        console.log("I am just after client finds".clients);

        if (clients) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { client_company_name, client_email, client_password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.client_password, salt);

        //clients = await Clients.create({
        //    client_company_name : req.body.client_company_name,
        //  client_email : req.body.client_email,
        //   client_password : secPass,
        //      consultants : req.consultants.id
        //})

        const client = new Clients({ client_company_name, client_email, client_password, client_consultant_id: req.consultant.id });
        const saveClients = await client.save();

        res.json(saveClients);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchconsultant, async (req, res) => {
    console.log(req.body);
    const { client_company_name, client_email, client_password } = req.body;

    try {

        // Create a new client object
        const newClient =  {};

        if (client_company_name) { newClient.client_company_name = client_company_name };

        if (client_email) { newClient.client_email = client_email };

        if (client_password) { newClient.client_password = client_password };

        // Find the note to be updated and update it .

        let clientFind = await Clients.findOne({ client_email: req.body.client_email });
        console.log("I am just after client finds".clients);

        if (clientFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let client = await Clients.findById(req.params.id);

        console.log('Checking Client After Find' + client);
        if (!client) { return res.status(404).send("Not Found") }

        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }

        client = await Clients.findByIdAndUpdate(req.params.id, { $set: newClient }, { new: true });
        res.json({ client });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing Clients  using: Delete  Method "/api/clients/delete". Login Required


router.delete('/delete/:id', fetchconsultant, async (req, res) => {
    const { client_company_name, client_email, client_password } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let client = await Clients.findById(req.params.id); 
     console.log('Checking Note After Find'+client);
     if(!client){return res.status(404).send("Not Found")}

     // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }

     client = await Clients.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Client has been deleted" , client : client });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})





module.exports = router;