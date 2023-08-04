const express = require('express');
const Courses = require('../models/Courses');
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
      await Courses.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
});





//Route 1 : Get All the Clients using: Get Method "/api/clients/list". Login Required

router.post('/create', fetchowner, [
    body('course_title', 'Enter a valid Course Title').isLength({ min: 3 }),
    body('course_description', 'Enter a valid desc').isLength({ min: 3 }),
    body('course_author', 'Author must be atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    console.log("I am here");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { course_title, course_description, course_author } = req.body;

        const course = new Courses({ course_title, course_description, course_author});
        const saveCourse = await course.save();

        res.json(saveCourse);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 2 : Create API List 

router.get('/list', fetchowner, async (req, res) => {
    try {

        const course = await Courses.find();
        res.json(course)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required

router.put('/update/:id', fetchowner, async (req, res) => {
    console.log(req.body);
    const { course_title, course_description, course_author } = req.body;

    try {

        // Create a new client object

        const newCourse =  {};

        if (course_title) { newCourse.course_title = course_title };

        if (course_description) { newCourse.course_description = course_description };

        if (course_author) { newCourse.course_author = course_author };

        // Find the note to be updated and update it .

        let courseFind = await Courses.findOne({ course_description: req.body.course_description });
        console.log("I am just after user type  finds".courseFind);

        if (courseFind) {
            return res.status(400).json({ error: "Sorry a course with this title already exists" })
        }

        let main_course = await Courses.findById(req.params.id);

        console.log('Checking User Type After Find' + main_course);
        if (!main_course) { return res.status(404).send("Not Found") }
        {/*
        if (client.client_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/}

        main_course = await Courses.findByIdAndUpdate(req.params.id, { $set: newCourse }, { new: true });
        res.json({ main_course });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



//Route 4 : Delete an existing mainproducts  using: Delete  Method "/api/mainproducts/delete". Login Required


router.delete('/delete/:id', fetchowner, async (req, res) => {
    const { course_title, course_description, course_author } = req.body;

   try {

     // Find the note to be deleted and delete it .
     let main_course = await Courses.findById(req.params.id); 
     console.log('Checking User Type After Find'+main_course);
     if(!main_course){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(client.client_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     } */}

     main_course = await Courses.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Course has been deleted" , main_course : main_course });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
                    
})


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

router.delete('/deletemultiplecourses', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multimainproducts"+ids);
      try {
        await Courses.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Course Types have been deleted" , course : ids }); 
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
    const {courses}  = req.body;
    console.log("I am here in multimaincourses"+typeof(req.body));
    console.log("I am here in multimaincourses"+req.body);
    
        try {
            //const results = await asyncParseCSV(req.file.path);
            await Courses.insertMany(req.body);
            res.json({ "Success" : "Checking Products for Import" , course : courses }); 
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        }        
})





module.exports = router;