const express = require('express');
const Inventory = require('../models/Inventory');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');
var fetchowner = require('../middleware/fetchowner')
const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());


// Route : Delete Multiple Inspectors , Selected from the list of Inspectors . "/api/inspectors/deletemultipleins"

router.post('/deletemultipleinventory', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiinspectors"+ids);
      try {
        await Inventory.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Inspectors have been deleted" , inventory : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})

//Route 1 : Get All the Products using: Get Method "/api/consultants/list". Login Required

router.get('/list', fetchowner, async (req, res) => {
    try {
 
        const inventory = await Inventory.find();
        res.json(inventory);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



router.post('/create', fetchowner, [
    body('inventory_type', 'Enter a valid Inspector name').isLength({ min: 1 }),
    body('inventory_details', 'Enter a valid email').isLength({ min: 1 }),
    body('inventory_quantity', 'Password must be atleast 5 characters').isLength({ min: 1 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        

        const { inventory_type, inventory_details, inventory_quantity } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.inventory_quantity, salt);

        const inventorys = new Inventory({ inventory_type, inventory_details, inventory_quantity, inventory_consultant_id: '1234567' });
        const saveInventory = await inventorys.save();

        res.json(saveInventory);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log("I am here in update"+req.body);
    const { inventory_type, inventory_details, inventory_quantity } = req.body;

    try {

        // Create a new client object
        const newInventory =  {};

        if (inventory_type) { newInventory.inventory_type = inventory_type };

        if (inventory_details) { newInventory.inventory_details = inventory_details };

        if (inventory_quantity) { newInventory.inventory_quantity = inventory_quantity };

        // Find the note to be updated and update it .

        let inventoryFind = await Inventory.findOne({ inventory_details: req.body.inventory_details });
        console.log("I am just after client finds".inventory);

        if (inventoryFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let inventory = await Inventory.findById(req.params.id);

        console.log('Checking Inspectors After Find' + inventory );
        if (!inventory) { return res.status(404).send("Not Found") }
        {/* it will be used once we setup inspectors with consultant 
        if (inspector.inventory_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/ }
        console.log('Checking Inspector Id Here '+req.params.id);
        inventory = await Inventory.findByIdAndUpdate(req.params.id, { $set: newInventory }, { new: true });
        res.json({ inventory });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})

//Route 4 : Delete an existing Inspector  using: Delete  Method "/api/inspectors/delete". Login Required

router.delete('/delete/:id', fetchowner, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let inventory = await Inventory.findById(req.params.id); 
     console.log('Checking Inspector After Find'+inventory);
     if(!inventory){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(inspector.inventory_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }*/}

     inventory = await Inventory.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "inventory has been deleted" , inventory : inventory });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
           
})

 // Route 5: Get Inspector Details 
 router.get('/getinventory/:id', fetchconsultant , async (req, res) => {

    try {
        inventoryId = req.params.id;
        const inventory = await Inventory.findById(inventoryId);
        console.log("I am here"+inventory);
        res.json(inventory)
       // res.json({ "Success" : "Product Found" , product : product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router;