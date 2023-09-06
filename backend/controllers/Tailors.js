const TailorsModel = require("../models/Tailors.js");
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


exports.addTailors = async (req, res) => {
        
        //const corpCertificate = req.files['tailor_investment'];
        //const gumastaCertificate = req.files['tailor_shop'];
        //const moaCertificate = req.files['tailor_services'];
        //const msmeCertificate = req.files['tailor_male_female'];
        //const results = await asyncParseCSV(req.file.path);
        
        var obj = {
            tailor_name: req.body.tailor_name,
            tailor_lname: req.body.tailor_lname,
            tailor_father_name: req.body.tailor_father_name,
			tailor_mother_name: req.body.tailor_mother_name,
            tailor_age: req.body.tailor_age,
            tailor_grade: req.body.tailor_grade,
            tailor_section: req.body.tailor_section,
			tailor_official_email: req.body.tailor_official_email,
            tailor_official_mobile: req.body.tailor_official_mobile,
			tailor_personal_mobile: req.body.tailor_personal_mobile,
            tailor_blood_group: req.body.tailor_blood_group,
            tailor_dob: req.body.tailor_dob,	
			tailor_address: req.body.tailor_address,
			tailor_city: req.body.tailor_city,
            tailor_state: req.body.tailor_state,
            tailor_country: req.body.tailor_country,
			tailor_continent: req.body.tailor_continent,
			tailor_experience: req.body.tailor_experience,
            tailor_rating: req.body.tailor_rating,
            tailor_reviews: req.body.tailor_reviews,
			tailor_income: req.body.tailor_income,
			tailor_investment: req.body.tailor_investment,
            tailor_shop: req.body.tailor_shop,
            tailor_services: req.body.tailor_services,	
			tailor_male_female: req.body.tailor_male_female,
			tailor_gst: req.body.tailor_gst,
            tailor_course: req.body.tailor_course,
            tailor_branches: req.body.tailor_branches,
			tailor_material: req.body.tailor_material,
			tailor_readymade: req.body.tailor_readymade,
            tailor_contract: req.body.tailor_contract,
            tailor_fee: req.body.tailor_fee,
			tailor_mentor: req.body.tailor_mentor,
			tailor_delivery: req.body.tailor_delivery,
            tailor_overseas: req.body.tailor_overseas,
            tailor_domestic: req.body.tailor_domestic,
			tailor_expenses: req.body.tailor_expenses,
			tailor_vehicle: req.body.tailor_vehicle,
            tailor_shop_time: req.body.tailor_shop_time,
            tailor_shop_days: req.body.tailor_shop_days,
			tailor_awards: req.body.tailor_awards,
            tailor_designing_skills: req.body.tailor_designing_skills
        }
        console.log(JSON.stringify(obj, null, 2));
        const newTailorsModel = new TailorsModel(obj);
        
        //const samajmember = new SamajMembers({ samaj_member_fname, samaj_member_lname, samaj_member_mobile});
        //const saveSamajMember = await samajmember.save();
        
        try {
            let result = await newTailorsModel.save();
            res.json({ success: true, status: status.CREATED, msg: result });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Tailor failed.' });
        }
        
}


//update by id
exports.updateTailors = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await TailorsModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        tailor_name: req.body.tailor_name,
                        tailor_lname: req.body.tailor_lname,
                        tailor_father_name: req.body.tailor_father_name,
                        tailor_mother_name: req.body.tailor_mother_name,
                        tailor_age: req.body.tailor_age,
                        tailor_grade: req.body.tailor_grade,
                        tailor_section: req.body.tailor_section,
                        tailor_official_email: req.body.tailor_official_email,            
                        tailor_official_mobile: req.body.tailor_official_mobile,
                        tailor_personal_mobile: req.body.tailor_personal_mobile,
                        tailor_blood_group: req.body.tailor_blood_group,
                        tailor_dob: req.body.tailor_dob,                        
                        tailor_address: req.body.tailor_address,
                        tailor_city: req.body.tailor_city,
                        tailor_state: req.body.tailor_state,
                        tailor_country: req.body.tailor_country,                        
                        tailor_continent: req.body.tailor_continent,
                        tailor_experience: req.body.tailor_experience,
                        tailor_rating: req.body.tailor_rating,
                        tailor_reviews: req.body.tailor_reviews,
                        tailor_income: req.body.tailor_income,
                        tailor_investment: req.body.tailor_investment,
                        tailor_shop: req.body.tailor_shop,
                        tailor_services: req.body.tailor_services,                        
                        tailor_male_female: req.body.tailor_male_female,
                        tailor_gst: req.body.tailor_gst,
                        tailor_course: req.body.tailor_course,
                        tailor_branches: req.body.tailor_branches,
                        tailor_material: req.body.tailor_material,
                        tailor_readymade: req.body.tailor_readymade,
                        tailor_contract: req.body.tailor_contract,
                        tailor_fee: req.body.tailor_fee,            
                        tailor_mentor: req.body.tailor_mentor,
                        tailor_delivery: req.body.tailor_delivery,
                        tailor_overseas: req.body.tailor_overseas,
                        tailor_domestic: req.body.tailor_domestic,
                        tailor_expenses: req.body.tailor_expenses,
                        tailor_vehicle: req.body.tailor_vehicle,
                        tailor_shop_time: req.body.tailor_shop_time,
                        tailor_shop_days: req.body.tailor_shop_days,            
                        tailor_awards: req.body.tailor_awards,
                        tailor_designing_skills: req.body.tailor_designing_skills 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Tailor is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Tailor Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Tailor failed.' });
        }
   
}

//get all tailor link
exports.listTailors = async (req, res) => {
    
        try {
            const data = await TailorsModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get tailor link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete tailor link by id
exports.deleteTailors = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await TailorsModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Tailor is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Tailor  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Tailor failed.' });
        }
   
}

//get all tailor link
exports.getList = async (req, res) => {
    try {
        const data = await TailorsModel.find({}).select('tailor_name tailor_lname tailor_father_name tailor_mother_name tailor_age tailor_grade tailor_section tailor_mobile tailor_official_email tailor_official_mobile tailor_personal_mobile tailor_blood_group tailor_dob  tailor_address tailor_city tailor_state	tailor_country tailor_continent tailor_experience tailor_rating	tailor_reviews tailor_income tailor_investment tailor_shop tailor_services tailor_male_female tailor_gst tailor_course tailor_branches tailor_material tailor_readymade tailor_contract tailor_fee tailor_mentor tailor_delivery tailor_overseas  tailor_domestic tailor_expenses tailor_vehicle tailor_shop_time	tailor_shop_days tailor_awards tailor_designing_skills').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get tailor link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleTailors = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await TailorsModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Tailors  have been deleted" , tailors : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importTailors = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await TailorsModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}