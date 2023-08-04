const express = require('express');
const MainProducts = require('../models/MainProducts');
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
    body('main_products_name', 'Enter a valid Company name').isLength({ min: 3 }),
    body('main_products_description', 'Enter a valid desc').isLength({ min: 3 }),
    body('main_products_capacity', 'Password must be atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { main_products_name, main_products_description, main_products_capacity } = req.body;

        const mainProducts = new MainProducts({ main_products_name, main_products_description, main_products_capacity});
        const saveMainProducts = await mainProducts.save();

        res.json(saveMainProducts);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const mainproducts = await MainProducts.find();
        res.json(mainproducts)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { main_products_name, main_products_description, main_products_capacity } = req.body;

    try {

        // Create a new client object

        const newMainProducts =  {};

        if (main_products_name) { newMainProducts.main_products_name = main_products_name };

        if (main_products_description) { newMainProducts.main_products_description = main_products_description };

        if (main_products_capacity) { newMainProducts.main_products_capacity = main_products_capacity };

        // Find the note to be updated and update it .

        let mainProductsFind = await MainProducts.findOne({ main_products_description: req.body.main_products_description });
        console.log("I am just after user type  finds".mainProductsFind);

        if (mainProductsFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let main_products = await MainProducts.findById(req.params.id);

        console.log('Checking User Type After Find' + main_products);
        if (!main_products) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        main_products = await MainProducts.findByIdAndUpdate(req.params.id, { $set: newMainProducts }, { new: true });
        res.json({ main_products });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { main_products_name, main_products_description, main_products_capacity } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let main_products = await MainProducts.findById(req.params.id); 
     console.log('Checking User Type After Find'+main_products);
     if(!main_products){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     main_products = await MainProducts.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , main_products : main_products });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultiplemainproducts', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multimainproducts"+ids);
      try {
        await MainProducts.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "User Types have been deleted" , mainProducts : ids }); 
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
    const {products}  = req.body;
    console.log("I am here in multimainproducts"+typeof(req.body));
    console.log("I am here in multimainproducts"+req.body);
    
        try {
            //const results = await asyncParseCSV(req.file.path);
            await MainProducts.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , mainProducts : products }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})

module.exports = router;