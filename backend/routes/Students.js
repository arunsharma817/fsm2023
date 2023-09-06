// routes/Students.js
const express = require('express');
const router = express.Router();
const StudentsController = require('../controllers/Students');

///// For Import Process

const multer = require('multer');

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });
      
const upload = multer({ storage: storage });
{/*
router.post('/create',upload.fields([
  { name: 'student_father_income', maxCount: 1 }, { name: 'student_photo', maxCount: 1 },
  { name: 'student_interests', maxCount: 1 }, { name: 'student_male_female', maxCount: 1 }
]), 
StudentsController.addStudents);*/}

router.post('/create',  StudentsController.addStudents);
router.get('/list', StudentsController.listStudents);
router.delete('/delete/:id', StudentsController.deleteStudents);
router.put('/update/:id', StudentsController.updateStudents);
router.delete('/deletemultiplestudents/', StudentsController.deleteMultipleStudents);
router.post('/bulkimport', upload.single('csvFile') , StudentsController.importStudents);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;