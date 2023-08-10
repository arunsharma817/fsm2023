const express = require('express');
const Articles = require('../models/Articles');
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
      await Articles.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
});





//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('article_title', 'Enter a valid Article Title').isLength({ min: 3 }),
    body('article_description', 'Enter a valid desc').isLength({ min: 3 }),
    body('article_author', 'Author must be atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { article_title, article_description, article_author } = req.body;

        const article = new Articles({ article_title, article_description, article_author});
        const saveArticle = await article.save();

        res.json(saveArticle);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const article = await Articles.find();
        res.json(article)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { article_title, article_description, article_author } = req.body;

    try {

        // Create a new client object

        const newArticle =  {};

        if (article_title) { newArticle.article_title = article_title };

        if (article_description) { newArticle.article_description = article_description };

        if (article_author) { newArticle.article_author = article_author };

        // Find the note to be updated and update it .

        let articleFind = await Articles.findOne({ article_description: req.body.article_description });
        console.log("I am just after user type  finds".articleFind);

        if (articleFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let main_article = await Articles.findById(req.params.id);

        console.log('Checking User Type After Find' + main_article);
        if (!main_article) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        main_article = await Articles.findByIdAndUpdate(req.params.id, { $set: newArticle }, { new: true });
        res.json({ main_article });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { article_title, article_description, article_author } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let main_article = await Articles.findById(req.params.id); 
     console.log('Checking User Type After Find'+main_article);
     if(!main_article){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     main_article = await Articles.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "User has been deleted" , main_article : main_article });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultiplearticles', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multimainproducts"+ids);
      try {
        await Articles.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "User Types have been deleted" , article : ids }); 
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
    const {articles}  = req.body;
    console.log("I am here in multimainproducts"+typeof(req.body));
    console.log("I am here in multimainproducts"+req.body);
    
        try {
            //const results = await asyncParseCSV(req.file.path);
            await Articles.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , article : articles }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})





module.exports = router;