const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{

    obj = {
        client_name: 'Jay',
        client_mobile_number: 34
    }
    res.json(obj);

})

module.exports = router;