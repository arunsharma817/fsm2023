const express = require('express');
const Products = require('../models/Products');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');

const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());

router.post('/', (req, res)=>{

    console.log(req.body);
    const product = Products(req.body);
    product.save();
    res.json(req.body);
  
})


//Route 1 : Get All the Products using: Get Method "/api/products/list". Login Required

router.get('/list', fetchconsultant, async (req, res) => {
    try {
 
        const products = await Products.find({ product_consultant_id: req.consultant.id });
        res.json(products)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})

//Route 2 : Create the Product using: Post Method "/api/products/create". Login Required

router.post('/create', fetchconsultant, [
    body('product_name', 'Enter a valid Product name').isLength({ min: 3 }),
    body('product_type', 'Enter a valid Product Type').isLength({ min: 3 }),
    body('product_capacity', 'Enter a Valid Capacity').isLength({ min: 1 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        
        const { product_name, product_type, product_capacity } = req.body;

     
        const product = new Products({ product_name, product_type, product_capacity, product_consultant_id: req.consultant.id });
        const saveProducts = await product.save();

        res.json(saveProducts);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Product  using: Put Method "/api/products/update". Login Required


router.put('/update/:id', fetchconsultant, async (req, res) => {
    console.log(req.body);
    const { product_name, product_type, product_capacity } = req.body;

    try {

        // Create a new client object
        const newProduct =  {};

        if (product_name) { newProduct.product_name = product_name };

        if (product_type) { newProduct.product_type = product_type };

        if (product_capacity) { newProduct.product_capacity = product_capacity };
       
        let product = await Products.findById(req.params.id);

        console.log('Checking Client After Find' + product);
        if (!product) { return res.status(404).send("Not Found") }

        if (product.product_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }

        product = await Products.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });
        res.json({ product });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})

// Route 3: Get Logged In Consultant Details 
router.get('/getproduct/:id', fetchconsultant , async (req, res) => {

    try {
        productId = req.params.id;
        const product = await Products.findById(productId);
        console.log("I am here"+product);
        res.json(product)
       // res.json({ "Success" : "Product Found" , product : product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route 4 : Delete an existing Product  using: Delete  Method "/api/products/delete". Login Required


router.delete('/delete/:id', fetchconsultant, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let product = await Products.findById(req.params.id); 
     console.log('Checking Note After Find'+product);
     if(!product){return res.status(404).send("Not Found")}

     // Allow  deletion only if user owns it 
     if(product.product_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }

     product = await Products.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Product has been deleted" , product : product });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


module.exports = router;