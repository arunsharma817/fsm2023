const StudentsModel = require("../models/Students.js");
const status = require("../config/status-code.js");

const { promisify } = require('util');
const fs = require('fs');
const csvParser = require('csv-parser');

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


exports.addStudents = async (req, res) => {
        
        //const corpCertificate = req.files['student_father_income'];
        //const gumastaCertificate = req.files['student_photo'];
        //const moaCertificate = req.files['student_interests'];
        //const msmeCertificate = req.files['student_male_female'];
        //const results = await asyncParseCSV(req.file.path);
        
        var obj = {
            student_fname: req.body.student_fname,
            student_lname: req.body.student_lname,
            student_father_name: req.body.student_father_name,
			student_mother_name: req.body.student_mother_name,
            student_age: req.body.student_age,
            student_grade: req.body.student_grade,
            student_section: req.body.student_section,
			student_parrent_email: req.body.student_parrent_email,
            student_parrent_mobile: req.body.student_parrent_mobile,
			student_gaurdian_mobile: req.body.student_gaurdian_mobile,
            student_blood_group: req.body.student_blood_group,
            student_dob: req.body.student_dob,	
			student_address: req.body.student_address,
			student_city: req.body.student_city,
            student_state: req.body.student_state,
            student_country: req.body.student_country,
			student_continent: req.body.student_continent,
			student_admission_date: req.body.student_admission_date,
            student_father_occupation: req.body.student_father_occupation,
            student_mother_occupation: req.body.student_mother_occupation,
			student_mother_income: req.body.student_mother_income,
			student_father_income: req.body.student_father_income,
            student_photo: req.body.student_photo,
            student_interests: req.body.student_interests,	
			student_male_female: req.body.student_male_female,
			student_class_teacher: req.body.student_class_teacher,
            student_stream: req.body.student_stream,
            student_medium: req.body.student_medium,
			student_board: req.body.student_board,
			student_uniform: req.body.student_uniform,
            student_books: req.body.student_books,
            student_bag: req.body.student_bag,
			student_mess: req.body.student_mess,
			student_transportation: req.body.student_transportation,
            student_foreign_tour: req.body.student_foreign_tour,
            student_domestic_tour: req.body.student_domestic_tour,
			student_annual_function: req.body.student_annual_function,
			student_hod: req.body.student_hod,
            student_attendance: req.body.student_attendance,
            student_health: req.body.student_health,
			student_achievements: req.body.student_achievements,
            student_technical_skills: req.body.student_technical_skills
        }
        console.log(JSON.stringify(obj, null, 2));
        const newStudentsModel = new StudentsModel(obj);
        
        //const samajmember = new SamajMembers({ samaj_member_fname, samaj_member_lname, samaj_member_mobile});
        //const saveSamajMember = await samajmember.save();
        
        try {
            let result = await newStudentsModel.save();
            res.json({ success: true, status: status.CREATED, msg: result });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Student failed.' });
        }
        
}


//update by id
exports.updateStudents = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await StudentsModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        student_fname: req.body.student_fname,
                        student_lname: req.body.student_lname,
                        student_father_name: req.body.student_father_name,
                        student_mother_name: req.body.student_mother_name,
                        student_age: req.body.student_age,
                        student_grade: req.body.student_grade,
                        student_section: req.body.student_section,
                        student_parrent_email: req.body.student_parrent_email,            
                        student_parrent_mobile: req.body.student_parrent_mobile,
                        student_gaurdian_mobile: req.body.student_gaurdian_mobile,
                        student_blood_group: req.body.student_blood_group,
                        student_dob: req.body.student_dob,                        
                        student_address: req.body.student_address,
                        student_city: req.body.student_city,
                        student_state: req.body.student_state,
                        student_country: req.body.student_country,                        
                        student_continent: req.body.student_continent,
                        student_admission_date: req.body.student_admission_date,
                        student_father_occupation: req.body.student_father_occupation,
                        student_mother_occupation: req.body.student_mother_occupation,
                        student_mother_income: req.body.student_mother_income,
                        student_father_income: req.body.student_father_income,
                        student_photo: req.body.student_photo,
                        student_interests: req.body.student_interests,                        
                        student_male_female: req.body.student_male_female,
                        student_class_teacher: req.body.student_class_teacher,
                        student_stream: req.body.student_stream,
                        student_medium: req.body.student_medium,
                        student_board: req.body.student_board,
                        student_uniform: req.body.student_uniform,
                        student_books: req.body.student_books,
                        student_bag: req.body.student_bag,            
                        student_mess: req.body.student_mess,
                        student_transportation: req.body.student_transportation,
                        student_foreign_tour: req.body.student_foreign_tour,
                        student_domestic_tour: req.body.student_domestic_tour,
                        student_annual_function: req.body.student_annual_function,
                        student_hod: req.body.student_hod,
                        student_attendance: req.body.student_attendance,
                        student_health: req.body.student_health,            
                        student_achievements: req.body.student_achievements,
                        student_technical_skills: req.body.student_technical_skills 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Student is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Student Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Student failed.' });
        }
   
}

//get all student link
exports.listStudents = async (req, res) => {
    
        try {
            const data = await StudentsModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get student link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete student link by id
exports.deleteStudents = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await StudentsModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Student is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Student  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Student failed.' });
        }
   
}

//get all student link
exports.getList = async (req, res) => {
    try {
        const data = await StudentsModel.find({}).select('student_fname student_lname student_father_name student_mother_name student_age student_grade student_section student_age_mobile student_parrent_email student_parrent_mobile student_gaurdian_mobile student_blood_group student_dob  student_address student_city student_state	student_country student_continent student_admission_date student_father_occupation	student_mother_occupation student_mother_income student_father_income student_photo student_interests student_male_female student_class_teacher student_stream student_medium student_board student_uniform student_books student_bag student_mess student_transportation student_foreign_tour  student_domestic_tour student_annual_function student_hod student_attendance	student_health student_achievements student_technical_skills').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get student link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleStudents = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await StudentsModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Students  have been deleted" , students : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importStudents = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await StudentsModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}