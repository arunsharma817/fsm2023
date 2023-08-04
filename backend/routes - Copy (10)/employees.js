const express = require('express');
const Employees = require('../models/Employees');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchconsultant = require('../middleware/fetchconsultant');
var fetchowner = require('../middleware/fetchowner')
const bodyParser = require('body-parser');
// parse application/json 
router.use(bodyParser.json());


// Route : Delete Multiple Inspectors , Selected from the list of Inspectors . "/api/inspectors/deletemultipleins"

router.delete('/deletemultipleemployee', fetchowner, async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here in multiinspectors"+ids);
      try {
        await Employees.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Inspectors have been deleted" , employees : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
})

//Route 1 : Get All the Products using: Get Method "/api/consultants/list". Login Required

router.get('/list', fetchowner, async (req, res) => {
    try {
 
        const employees = await Employees.find();
        res.json(employees);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})



router.post('/create', fetchowner, [
    body('employee_name', 'Enter a valid Inspector name').isLength({ min: 3 }),
    body('employee_email', 'Enter a valid email').isEmail(),
    body('employee_password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let employees = await Employees.findOne({ employee_email: req.body.employee_email });
        console.log("I am just after inspector finds".employees);

        if (employees) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const { employee_name, employee_email, employee_password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.employee_password, salt);

        const employee = new Employees({ employee_name, employee_email, employee_password, employee_consultant_id: '1234567' });
        const saveEmployees = await employee.save();

        res.json(saveEmployees);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//Route 3 : Update an existing Client  using: Put Method "/api/clients/update". Login Required


router.put('/update/:id', fetchowner, async (req, res) => {
    console.log("I am here in update"+req.body);
    const { employee_name, employee_email, employee_password } = req.body;

    try {

        // Create a new client object
        const newEmployee =  {};

        if (employee_name) { newEmployee.employee_name = employee_name };

        if (employee_email) { newEmployee.employee_email = employee_email };

        if (employee_password) { newEmployee.employee_password = employee_password };

        // Find the note to be updated and update it .

        let employeeFind = await Employees.findOne({ employee_email: req.body.employee_email });
        console.log("I am just after client finds".employees);

        if (employeeFind) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        let employee = await Employees.findById(req.params.id);

        console.log('Checking Inspectors After Find' + employee );
        if (!employee) { return res.status(404).send("Not Found") }
        {/* it will be used once we setup inspectors with consultant 
        if (inspector.employee_consultant_id.toString() !== req.consultant.id) {
            return res.status(401).send("Not Allowed");
        }*/ }
        console.log('Checking Inspector Id Here '+req.params.id);
        employee = await Employees.findByIdAndUpdate(req.params.id, { $set: newEmployee }, { new: true });
        res.json({ employee });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }

})

//Route 4 : Delete an existing Inspector  using: Delete  Method "/api/inspectors/delete". Login Required

router.delete('/delete/:id', fetchowner, async (req, res) => {

   try {

     // Find the note to be deleted and delete it .
     let employee = await Employees.findById(req.params.id); 
     console.log('Checking Inspector After Find'+employee);
     if(!employee){return res.status(404).send("Not Found")}

    {/* // Allow  deletion only if user owns it 
     if(inspector.employee_consultant_id.toString() !== req.consultant.id){
             return res.status(401).send("Not Allowed");
     }*/}

     employee = await Employees.findByIdAndDelete(req.params.id);
     res.json({ "Success" : "Employee has been deleted" , employee : employee });

   }  
    catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
    }
           
})

 // Route 5: Get Inspector Details 
 router.get('/getemployee/:id', fetchconsultant , async (req, res) => {

    try {
        employeeId = req.params.id;
        const employee = await Employees.findById(employeeId);
        console.log("I am here"+employee);
        res.json(employee)
       // res.json({ "Success" : "Product Found" , product : product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router;