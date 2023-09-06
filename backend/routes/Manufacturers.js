// routes/Manufacturers.js
const express = require('express');
const router = express.Router();
const ManufacturersController = require('../controllers/Manufacturers');

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
  { name: 'manufacturer_corporation_certificate', maxCount: 1 }, { name: 'manufacturer_gumasta_certificate', maxCount: 1 },
  { name: 'manufacturer_moa_certificate', maxCount: 1 }, { name: 'manufacturer_msme_certificate', maxCount: 1 }
]), 
ManufacturersController.addManufacturers);*/}

router.post('/create',  ManufacturersController.addManufacturers);
router.get('/list', ManufacturersController.listManufacturers);
router.delete('/delete/:id', ManufacturersController.deleteManufacturers);
router.put('/update/:id', ManufacturersController.updateManufacturers);
router.delete('/deletemultiplemanufacturers/', ManufacturersController.deleteMultipleManufacturers);
router.post('/bulkimport', upload.single('csvFile') , ManufacturersController.importManufacturers);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;