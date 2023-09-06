// routes/Events.js
const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/Events');

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
  { name: 'event_caterer_address', maxCount: 1 }, { name: 'event_electrician', maxCount: 1 },
  { name: 'event_flower_decorater', maxCount: 1 }, { name: 'event_nursery_contractor', maxCount: 1 }
]), 
EventsController.addEvents);*/}

router.post('/create',  EventsController.addEvents);
router.get('/list', EventsController.listEvents);
router.delete('/delete/:id', EventsController.deleteEvents);
router.put('/update/:id', EventsController.updateEvents);
router.delete('/deletemultipleevents/', EventsController.deleteMultipleEvents);
router.post('/bulkimport', upload.single('csvFile') , EventsController.importEvents);


// Define other routes here for updating, deleting, fetching social links, etc.

module.exports = router;