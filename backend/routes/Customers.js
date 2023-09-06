// routes/Customers.js
const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/Customers');

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
  { name: 'customer_corporation_certificate', maxCount: 1 }, { name: 'customer_gumasta_certificate', maxCount: 1 },
  { name: 'customer_moa_certificate', maxCount: 1 }, { name: 'customer_msme_certificate', maxCount: 1 }
]), 
CustomersController.addCustomers);*/}

router.post('/create',  CustomersController.addCustomers);
router.get('/list', CustomersController.listCustomers);
router.delete('/delete/:id', CustomersController.deleteCustomers);
router.put('/update/:id', CustomersController.updateCustomers);
router.delete('/deletemultiplecustomers/', CustomersController.deleteMultipleCustomers);
router.post('/bulkimport', upload.single('csvFile') , CustomersController.importCustomers);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;