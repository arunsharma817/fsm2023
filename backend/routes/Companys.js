// routes/Companys.js
const express = require('express');
const router = express.Router();
const CompanysController = require('../controllers/Companys');

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
  { name: 'company_director_phone', maxCount: 1 }, { name: 'company_director_linkedin', maxCount: 1 },
  { name: 'company_clients', maxCount: 1 }, { name: 'company_numberof_employees', maxCount: 1 }
]), 
CompanysController.addCompanys);*/}

router.post('/create',  CompanysController.addCompanys);
router.get('/list', CompanysController.listCompanys);
router.delete('/delete/:id', CompanysController.deleteCompanys);
router.put('/update/:id', CompanysController.updateCompanys);
router.delete('/deletemultiplecompanys/', CompanysController.deleteMultipleCompanys);
router.post('/bulkimport', upload.single('csvFile') , CompanysController.importCompanys);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;