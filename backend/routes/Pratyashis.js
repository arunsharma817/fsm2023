// routes/Pratyashis.js
const express = require('express');
const router = express.Router();
const PratyashisController = require('../controllers/Pratyashis');

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
  { name: 'pratyashi_jankari_charan', maxCount: 1 }, { name: 'pratyashi_manglik', maxCount: 1 },
  { name: 'pratyashi_shani', maxCount: 1 }, { name: 'pratyashi_patrika_milan', maxCount: 1 }
]), 
PratyashisController.addPratyashis);*/}

router.post('/create',  PratyashisController.addPratyashis);
router.get('/list', PratyashisController.listPratyashis);
router.delete('/delete/:id', PratyashisController.deletePratyashis);
router.put('/update/:id', PratyashisController.updatePratyashis);
router.delete('/deletemultiplepratyashis/', PratyashisController.deleteMultiplePratyashis);
router.post('/bulkimport', upload.single('csvFile') , PratyashisController.importPratyashis);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;