const express = require('express');
const Categories = require('../models/Categories');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');
var fetchowner = require('../middleware/fetchowner')
const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());


// Route : Delete Multiple Inspectors , Selected from the list of Inspectors . "/api/inspectors/deletemultipleins"

router.delete('/deletemultiplecategory', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiinspectors"+ids);
      try {
        await Categories.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Inspectors have been deleted" , categories : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})

//Route 1 : Get All the Products using: Get Method "/api/consultants/list". Login Required

router.get('/list', fetchowner, async (req, res) => {
    try {
 
        const categories = await Categories.find();
        res.json(categories);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



router.post('/create', fetchowner, [
    body('category_name', 'Enter a valid Inspector name').isLength({ min: 3 }),
    body('category_code', 'Enter a valid email').isLength({ min: 3 }),
    body('category_description', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let categories = await Categories.findOne({ category_code: req.body.category_code });
        console.log("I am just after inspector finds".categories);

        if (categories) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { category_name, category_code, category_description } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.category_description, salt);

        const category = new Categories({ category_name, category_code, category_description, category_consultant_id: '1234567' });
        const saveCategories = await category.save();

        res.json(saveCategories);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log("I am here in update"+req.body);
    const { category_name, category_code, category_description } = req.body;

    try {

        // Create a new client object
        const newCategory =  {};

        if (category_name) { newCategory.category_name = category_name };

        if (category_code) { newCategory.category_code = category_code };

        if (category_description) { newCategory.category_description = category_description };

        // Find the note to be updated and update it .

        let categoryFind = await Categories.findOne({ category_code: req.body.category_code });
        console.log("I am just after client finds".categories);

        if (categoryFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let category = await Categories.findById(req.params.id);

        console.log('Checking Inspectors After Find' + category );
        if (!category) { return res.status(404).send("Not Found") }
        {/* it will be used once we setup inspectors with consultant 
        if (inspector.category_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/ }
        console.log('Checking Inspector Id Here '+req.params.id);
        category = await Categories.findByIdAndUpdate(req.params.id, { $set: newCategory }, { new: true });
        res.json({ category });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})

//Route 4 : Delete an existing Inspector  using: Delete  Method "/api/inspectors/delete". Login Required

router.delete('/delete/:id', fetchowner, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let category = await Categories.findById(req.params.id); 
     console.log('Checking Inspector After Find'+category);
     if(!category){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(inspector.category_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }*/}

     category = await Categories.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Category has been deleted" , category : category });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
           
})

 // Route 5: Get Inspector Details 
 router.get('/getcategory/:id', fetchconsultant , async (req, res) => {

    try {
        categoryId = req.params.id;
        const category = await Categories.findById(categoryId);
        console.log("I am here"+category);
        res.json(category)
       // res.json({ "Success" : "Product Found" , product : product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router;