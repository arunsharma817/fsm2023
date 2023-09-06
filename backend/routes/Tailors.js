// routes/Tailors.js
const express = require('express');
const router = express.Router();
const TailorsController = require('../controllers/Tailors');

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
  { name: 'tailor_investment', maxCount: 1 }, { name: 'tailor_shop', maxCount: 1 },
  { name: 'tailor_services', maxCount: 1 }, { name: 'tailor_male_female', maxCount: 1 }
]), 
TailorsController.addTailors);*/}

router.post('/create',  TailorsController.addTailors);
router.get('/list', TailorsController.listTailors);
router.delete('/delete/:id', TailorsController.deleteTailors);
router.put('/update/:id', TailorsController.updateTailors);
router.delete('/deletemultipletailors/', TailorsController.deleteMultipleTailors);
router.post('/bulkimport', upload.single('csvFile') , TailorsController.importTailors);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;