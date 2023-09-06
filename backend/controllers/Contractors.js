const ContractorsModel = require("../models/Contractors.js");
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


exports.addContractors = async (req, res) => {
        
        //const corpCertificate = req.files['contractor_mentor_phone'];
        //const gumastaCertificate = req.files['contractor_mentor_linkedin'];
        //const moaCertificate = req.files['contractor_clients'];
        //const msmeCertificate = req.files['contractor_team_size'];
        //const results = await asyncParseCSV(req.file.path);
        
        var obj = {
            contractor_industry: req.body.contractor_industry,
            contractor_fname: req.body.contractor_fname,
            contractor_lname: req.body.contractor_lname,
			contractor_products: req.body.contractor_products,
            contractor_experience: req.body.contractor_experience,
            contractor_website: req.body.contractor_website,
            contractor_hr_mail: req.body.contractor_hr_mail,
			contractor_info_mail: req.body.contractor_info_mail,
            contractor_career_mail: req.body.contractor_career_mail,
			contractor_phone_number: req.body.contractor_phone_number,
            contractor_mobile_number: req.body.contractor_mobile_number,
            contractor_wtsap_number: req.body.contractor_wtsap_number,	
			contractor_linkedin_url: req.body.contractor_linkedin_url,
			contractor_facebook_url: req.body.contractor_facebook_url,
            contractor_instgram_url: req.body.contractor_instgram_url,
            contractor_twitter_url: req.body.contractor_twitter_url,
			contractor_youtube_url: req.body.contractor_youtube_url,
			contractor_start_date: req.body.contractor_start_date,
            contractor_mentor_name: req.body.contractor_mentor_name,
            contractor_mentor_email: req.body.contractor_mentor_email,
			contractor_mentor_mobile: req.body.contractor_mentor_mobile,
			contractor_mentor_phone: req.body.contractor_mentor_phone,
            contractor_mentor_linkedin: req.body.contractor_mentor_linkedin,
            contractor_clients: req.body.contractor_clients,	
			contractor_team_size: req.body.contractor_team_size,
			contractor_office_address: req.body.contractor_office_address,
            contractor_branches_countries: req.body.contractor_branches_countries,
            contractor_branches_cities: req.body.contractor_branches_cities,
			contractor_technologies: req.body.contractor_technologies,
			contractor_investors: req.body.contractor_investors,
            contractor_share_price: req.body.contractor_share_price,
            contractor_google_ranking: req.body.contractor_google_ranking,
			contractor_google_reviews: req.body.contractor_google_reviews,
			contractor_scope: req.body.contractor_scope,
            contractor_future_projects: req.body.contractor_future_projects,
            contractor_third_parties: req.body.contractor_third_parties,
			contractor_founder: req.body.contractor_founder,
			contractor_ceo: req.body.contractor_ceo,
            contractor_ceo_linkedin: req.body.contractor_ceo_linkedin,
            contractor_ceo_mobile: req.body.contractor_ceo_mobile,
			contractor_business_model: req.body.contractor_business_model,
            contractor_history: req.body.contractor_history
        }
        console.log(JSON.stringify(obj, null, 2));
        const newContractorsModel = new ContractorsModel(obj);
        
        //const samajmember = new SamajMembers({ samaj_member_fname, samaj_member_lname, samaj_member_mobile});
        //const saveSamajMember = await samajmember.save();
        
        try {
            let result = await newContractorsModel.save();
            res.json({ success: true, status: status.CREATED, msg: result });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Contractor failed.' });
        }
        
}


//update by id
exports.updateContractors = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await ContractorsModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        contractor_industry: req.body.contractor_industry,
                        contractor_fname: req.body.contractor_fname,
                        contractor_lname: req.body.contractor_lname,
                        contractor_products: req.body.contractor_products,
                        contractor_experience: req.body.contractor_experience,
                        contractor_website: req.body.contractor_website,
                        contractor_hr_mail: req.body.contractor_hr_mail,
                        contractor_info_mail: req.body.contractor_info_mail,            
                        contractor_career_mail: req.body.contractor_career_mail,
                        contractor_phone_number: req.body.contractor_phone_number,
                        contractor_mobile_number: req.body.contractor_mobile_number,
                        contractor_wtsap_number: req.body.contractor_wtsap_number,                        
                        contractor_linkedin_url: req.body.contractor_linkedin_url,
                        contractor_facebook_url: req.body.contractor_facebook_url,
                        contractor_instgram_url: req.body.contractor_instgram_url,
                        contractor_twitter_url: req.body.contractor_twitter_url,                        
                        contractor_youtube_url: req.body.contractor_youtube_url,
                        contractor_start_date: req.body.contractor_start_date,
                        contractor_mentor_name: req.body.contractor_mentor_name,
                        contractor_mentor_email: req.body.contractor_mentor_email,
                        contractor_mentor_mobile: req.body.contractor_mentor_mobile,
                        contractor_mentor_phone: req.body.contractor_mentor_phone,
                        contractor_mentor_linkedin: req.body.contractor_mentor_linkedin,
                        contractor_clients: req.body.contractor_clients,                        
                        contractor_team_size: req.body.contractor_team_size,
                        contractor_office_address: req.body.contractor_office_address,
                        contractor_branches_countries: req.body.contractor_branches_countries,
                        contractor_branches_cities: req.body.contractor_branches_cities,
                        contractor_technologies: req.body.contractor_technologies,
                        contractor_investors: req.body.contractor_investors,
                        contractor_share_price: req.body.contractor_share_price,
                        contractor_google_ranking: req.body.contractor_google_ranking,            
                        contractor_google_reviews: req.body.contractor_google_reviews,
                        contractor_scope: req.body.contractor_scope,
                        contractor_future_projects: req.body.contractor_future_projects,
                        contractor_third_parties: req.body.contractor_third_parties,
                        contractor_founder: req.body.contractor_founder,
                        contractor_ceo: req.body.contractor_ceo,
                        contractor_ceo_linkedin: req.body.contractor_ceo_linkedin,
                        contractor_ceo_mobile: req.body.contractor_ceo_mobile,            
                        contractor_business_model: req.body.contractor_business_model,
                        contractor_history: req.body.contractor_history 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Contractor is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Contractor Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Contractor failed.' });
        }
   
}

//get all contractor link
exports.listContractors = async (req, res) => {
    
        try {
            const data = await ContractorsModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get contractor link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete contractor link by id
exports.deleteContractors = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await ContractorsModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Contractor is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Contractor  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Contractor failed.' });
        }
   
}

//get all contractor link
exports.getList = async (req, res) => {
    try {
        const data = await ContractorsModel.find({}).select('contractor_industry contractor_fname contractor_lname contractor_products contractor_experience contractor_website contractor_hr_mail contractor_logo contractor_info_mail contractor_career_mail contractor_phone_number contractor_mobile_number contractor_wtsap_number  contractor_linkedin_url contractor_facebook_url contractor_instgram_url	contractor_twitter_url contractor_youtube_url contractor_start_date contractor_mentor_name	contractor_mentor_email contractor_mentor_mobile contractor_mentor_phone contractor_mentor_linkedin contractor_clients contractor_team_size contractor_office_address contractor_branches_countries contractor_branches_cities contractor_technologies contractor_investors contractor_share_price contractor_google_ranking contractor_google_reviews contractor_scope contractor_future_projects  contractor_third_parties contractor_founder contractor_ceo contractor_ceo_linkedin	contractor_ceo_mobile contractor_business_model contractor_history').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get contractor link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleContractors = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await ContractorsModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Contractors  have been deleted" , contractors : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importContractors = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await ContractorsModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}