const CompanysModel = require("../models/Companys.js");
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


exports.addCompanys = async (req, res) => {
        
        //const corpCertificate = req.files['company_director_phone'];
        //const gumastaCertificate = req.files['company_director_linkedin'];
        //const moaCertificate = req.files['company_clients'];
        //const msmeCertificate = req.files['company_numberof_employees'];
        //const results = await asyncParseCSV(req.file.path);
        
        var obj = {
            company_industry: req.body.company_industry,
            company_name: req.body.company_name,
            company_services: req.body.company_services,
			company_products: req.body.company_products,
            company_cmm_level: req.body.company_cmm_level,
            company_website: req.body.company_website,
            company_hr_mail: req.body.company_hr_mail,
			company_info_mail: req.body.company_info_mail,
            company_career_mail: req.body.company_career_mail,
			company_phone_number: req.body.company_phone_number,
            company_mobile_number: req.body.company_mobile_number,
            company_wtsap_number: req.body.company_wtsap_number,	
			company_linkedin_url: req.body.company_linkedin_url,
			company_facebook_url: req.body.company_facebook_url,
            company_instgram_url: req.body.company_instgram_url,
            company_twitter_url: req.body.company_twitter_url,
			company_youtube_url: req.body.company_youtube_url,
			company_start_date: req.body.company_start_date,
            company_director_name: req.body.company_director_name,
            company_director_email: req.body.company_director_email,
			company_director_mobile: req.body.company_director_mobile,
			company_director_phone: req.body.company_director_phone,
            company_director_linkedin: req.body.company_director_linkedin,
            company_clients: req.body.company_clients,	
			company_numberof_employees: req.body.company_numberof_employees,
			company_office_address: req.body.company_office_address,
            company_branches_countries: req.body.company_branches_countries,
            company_branches_cities: req.body.company_branches_cities,
			company_technologies: req.body.company_technologies,
			company_investors: req.body.company_investors,
            company_share_price: req.body.company_share_price,
            company_google_ranking: req.body.company_google_ranking,
			company_google_reviews: req.body.company_google_reviews,
			company_scope: req.body.company_scope,
            company_future_projects: req.body.company_future_projects,
            company_third_parties: req.body.company_third_parties,
			company_founder: req.body.company_founder,
			company_ceo: req.body.company_ceo,
            company_ceo_linkedin: req.body.company_ceo_linkedin,
            company_ceo_mobile: req.body.company_ceo_mobile,
			company_business_model: req.body.company_business_model,
            company_history: req.body.company_history
        }
        console.log(JSON.stringify(obj, null, 2));
        const newCompanysModel = new CompanysModel(obj);
        
        //const samajmember = new SamajMembers({ samaj_member_fname, samaj_member_lname, samaj_member_mobile});
        //const saveSamajMember = await samajmember.save();
        
        try {
            let result = await newCompanysModel.save();
            res.json({ success: true, status: status.CREATED, msg: result });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Company failed.' });
        }
        
}


//update by id
exports.updateCompanys = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await CompanysModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        company_industry: req.body.company_industry,
                        company_name: req.body.company_name,
                        company_services: req.body.company_services,
                        company_products: req.body.company_products,
                        company_cmm_level: req.body.company_cmm_level,
                        company_website: req.body.company_website,
                        company_hr_mail: req.body.company_hr_mail,
                        company_info_mail: req.body.company_info_mail,            
                        company_career_mail: req.body.company_career_mail,
                        company_phone_number: req.body.company_phone_number,
                        company_mobile_number: req.body.company_mobile_number,
                        company_wtsap_number: req.body.company_wtsap_number,                        
                        company_linkedin_url: req.body.company_linkedin_url,
                        company_facebook_url: req.body.company_facebook_url,
                        company_instgram_url: req.body.company_instgram_url,
                        company_twitter_url: req.body.company_twitter_url,                        
                        company_youtube_url: req.body.company_youtube_url,
                        company_start_date: req.body.company_start_date,
                        company_director_name: req.body.company_director_name,
                        company_director_email: req.body.company_director_email,
                        company_director_mobile: req.body.company_director_mobile,
                        company_director_phone: req.body.company_director_phone,
                        company_director_linkedin: req.body.company_director_linkedin,
                        company_clients: req.body.company_clients,                        
                        company_numberof_employees: req.body.company_numberof_employees,
                        company_office_address: req.body.company_office_address,
                        company_branches_countries: req.body.company_branches_countries,
                        company_branches_cities: req.body.company_branches_cities,
                        company_technologies: req.body.company_technologies,
                        company_investors: req.body.company_investors,
                        company_share_price: req.body.company_share_price,
                        company_google_ranking: req.body.company_google_ranking,            
                        company_google_reviews: req.body.company_google_reviews,
                        company_scope: req.body.company_scope,
                        company_future_projects: req.body.company_future_projects,
                        company_third_parties: req.body.company_third_parties,
                        company_founder: req.body.company_founder,
                        company_ceo: req.body.company_ceo,
                        company_ceo_linkedin: req.body.company_ceo_linkedin,
                        company_ceo_mobile: req.body.company_ceo_mobile,            
                        company_business_model: req.body.company_business_model,
                        company_history: req.body.company_history 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Company is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Company Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Company failed.' });
        }
   
}

//get all company link
exports.listCompanys = async (req, res) => {
    
        try {
            const data = await CompanysModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get company link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete company link by id
exports.deleteCompanys = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await CompanysModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Company is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Company  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Company failed.' });
        }
   
}

//get all company link
exports.getList = async (req, res) => {
    try {
        const data = await CompanysModel.find({}).select('company_industry company_name company_services company_products company_cmm_level company_website company_hr_mail company_company_logo company_info_mail company_career_mail company_phone_number company_mobile_number company_wtsap_number  company_linkedin_url company_facebook_url company_instgram_url	company_twitter_url company_youtube_url company_start_date company_director_name	company_director_email company_director_mobile company_director_phone company_director_linkedin company_clients company_numberof_employees company_office_address company_branches_countries company_branches_cities company_technologies company_investors company_share_price company_google_ranking company_google_reviews company_scope company_future_projects  company_third_parties company_founder company_ceo company_ceo_linkedin	company_ceo_mobile company_business_model company_history').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get company link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleCompanys = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await CompanysModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Companys  have been deleted" , companys : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importCompanys = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await CompanysModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}