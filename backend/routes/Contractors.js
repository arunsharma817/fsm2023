// routes/Contractors.js
const express = require('express');
const router = express.Router();
const ContractorsController = require('../controllers/Contractors');

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
  { name: 'contractor_mentor_phone', maxCount: 1 }, { name: 'contractor_mentor_linkedin', maxCount: 1 },
  { name: 'contractor_clients', maxCount: 1 }, { name: 'contractor_team_size', maxCount: 1 }
]), 
ContractorsController.addContractors);*/}

router.post('/create',  ContractorsController.addContractors);
router.get('/list', ContractorsController.listContractors);
router.delete('/delete/:id', ContractorsController.deleteContractors);
router.put('/update/:id', ContractorsController.updateContractors);
router.delete('/deletemultiplecontractors/', ContractorsController.deleteMultipleContractors);
router.post('/bulkimport', upload.single('csvFile') , ContractorsController.importContractors);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;