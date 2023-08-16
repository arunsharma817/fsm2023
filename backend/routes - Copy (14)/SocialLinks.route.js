// routes/socialLinks.js
const express = require('express');
const router = express.Router();
const socialLinksController = require('../controllers/socialLinks');


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

router.post('/create', socialLinksController.addSocialLink);
router.get('/list', socialLinksController.listSocialLink);
router.delete('/delete/:id', socialLinksController.deleteSocialLink);
router.put('/update/', socialLinksController.updateSocialLink);
router.delete('/deletemultiplesociallinks/', socialLinksController.deleteMultipleSocialLink);
router.post('/bulkimport', upload.single('csvFile') , socialLinksController.importSocialLink);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;