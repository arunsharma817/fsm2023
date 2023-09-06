const CustomersModel = require("../models/Customers.js");
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


exports.addCustomers = async (req, res) => {
        
        //const corpCertificate = req.files['customer_corporation_certificate'];
        //const gumastaCertificate = req.files['customer_gumasta_certificate'];
        //const moaCertificate = req.files['customer_moa_certificate'];
        //const msmeCertificate = req.files['customer_msme_certificate'];
        //const results = await asyncParseCSV(req.file.path);
        
        var obj = {
            customer_company_name: req.body.customer_company_name,
            customer_industry: req.body.customer_industry,
            customer_products: req.body.customer_products,
			customer_mobile: req.body.customer_mobile,
            customer_mobile_alternate: req.body.customer_mobile_alternate,
            customer_email: req.body.customer_email,
            customer_website: req.body.customer_website,
			customer_registered_address: req.body.customer_registered_address,
            customer_zip_code: req.body.customer_zip_code,
			customer_city: req.body.customer_city,
            customer_state: req.body.customer_state,
            customer_country: req.body.customer_country,	
			customer_country_code: req.body.customer_country_code,
			customer_continent: req.body.customer_continent,
            customer_customer_care: req.body.customer_customer_care,
            customer_qr_code: req.body.customer_qr_code,
			customer_barcode_number: req.body.customer_barcode_number,
			customer_foundation_date: req.body.customer_foundation_date,
            customer_license_number: req.body.customer_license_number,
            customer_pan_number: req.body.customer_pan_number,
			customer_gst_number: req.body.customer_gst_number,
			customer_corporation_certificate: req.body.customer_corporation_certificate,
            customer_gumasta_certificate: req.body.customer_gumasta_certificate,
            customer_moa_certificate: req.body.customer_moa_certificate,	
			customer_msme_certificate: req.body.customer_msme_certificate,
			customer_account_details: req.body.customer_account_details,
            customer_cancelled_cheque: req.body.customer_cancelled_cheque,
            customer_number_of_employees: req.body.customer_number_of_employees,
			customer_director_fname: req.body.customer_director_fname,
			customer_director_lname: req.body.customer_director_lname,
            customer_director_email: req.body.customer_director_email,
            customer_director_mobile: req.body.customer_director_mobile,
			customer_director_linkedin: req.body.customer_director_linkedin,
			customer_customer_reviews: req.body.customer_customer_reviews,
            customer_customer_rating: req.body.customer_customer_rating,
            customer_facebook_url: req.body.customer_facebook_url,
			customer_instagram_url: req.body.customer_instagram_url,
			customer_linkedin_url: req.body.customer_linkedin_url,
            customer_youtube_url: req.body.customer_youtube_url,
            customer_made_in_countries: req.body.customer_made_in_countries,
			customer_attributes: req.body.customer_attributes,
            customer_brief_history: req.body.customer_brief_history
        }
        console.log(JSON.stringify(obj, null, 2));
        const newCustomersModel = new CustomersModel(obj);
        
        //const samajmember = new SamajMembers({ samaj_member_fname, samaj_member_lname, samaj_member_mobile});
        //const saveSamajMember = await samajmember.save();
        
        try {
            let result = await newCustomersModel.save();
            res.json({ success: true, status: status.CREATED, msg: result });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Customer failed.' });
        }
        
}


//update by id
exports.updateCustomers = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await CustomersModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        customer_company_name: req.body.customer_company_name,
                        customer_industry: req.body.customer_industry,
                        customer_products: req.body.customer_products,
                        customer_mobile: req.body.customer_mobile,
                        customer_mobile_alternate: req.body.customer_mobile_alternate,
                        customer_email: req.body.customer_email,
                        customer_website: req.body.customer_website,
                        customer_registered_address: req.body.customer_registered_address,            
                        customer_zip_code: req.body.customer_zip_code,
                        customer_city: req.body.customer_city,
                        customer_state: req.body.customer_state,
                        customer_country: req.body.customer_country,                        
                        customer_country_code: req.body.customer_country_code,
                        customer_continent: req.body.customer_continent,
                        customer_customer_care: req.body.customer_customer_care,
                        customer_qr_code: req.body.customer_qr_code,                        
                        customer_barcode_number: req.body.customer_barcode_number,
                        customer_foundation_date: req.body.customer_foundation_date,
                        customer_license_number: req.body.customer_license_number,
                        customer_pan_number: req.body.customer_pan_number,
                        customer_gst_number: req.body.customer_gst_number,
                        customer_corporation_certificate: req.body.customer_corporation_certificate,
                        customer_gumasta_certificate: req.body.customer_gumasta_certificate,
                        customer_moa_certificate: req.body.customer_moa_certificate,                        
                        customer_msme_certificate: req.body.customer_msme_certificate,
                        customer_account_details: req.body.customer_account_details,
                        customer_cancelled_cheque: req.body.customer_cancelled_cheque,
                        customer_number_of_employees: req.body.customer_number_of_employees,
                        customer_director_fname: req.body.customer_director_fname,
                        customer_director_lname: req.body.customer_director_lname,
                        customer_director_email: req.body.customer_director_email,
                        customer_director_mobile: req.body.customer_director_mobile,            
                        customer_director_linkedin: req.body.customer_director_linkedin,
                        customer_customer_reviews: req.body.customer_customer_reviews,
                        customer_customer_rating: req.body.customer_customer_rating,
                        customer_facebook_url: req.body.customer_facebook_url,
                        customer_instagram_url: req.body.customer_instagram_url,
                        customer_linkedin_url: req.body.customer_linkedin_url,
                        customer_youtube_url: req.body.customer_youtube_url,
                        customer_made_in_countries: req.body.customer_made_in_countries,            
                        customer_attributes: req.body.customer_attributes,
                        customer_brief_history: req.body.customer_brief_history 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Customer is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Customer Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Customer failed.' });
        }
   
}

//get all customer link
exports.listCustomers = async (req, res) => {
    
        try {
            const data = await CustomersModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get customer link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete customer link by id
exports.deleteCustomers = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await CustomersModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Customer is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Customer  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Customer failed.' });
        }
   
}

//get all customer link
exports.getList = async (req, res) => {
    try {
        const data = await CustomersModel.find({}).select('customer_company_name customer_industry customer_products customer_mobile customer_mobile_alternate customer_email customer_website customer_company_logo customer_registered_address customer_zip_code customer_city customer_state customer_country  customer_country_code customer_continent customer_customer_care	customer_qr_code customer_barcode_number customer_foundation_date customer_license_number	customer_pan_number customer_gst_number customer_corporation_certificate customer_gumasta_certificate customer_moa_certificate customer_msme_certificate customer_account_details customer_cancelled_cheque customer_number_of_employees customer_director_fname customer_director_lname customer_director_email customer_director_mobile customer_director_linkedin customer_customer_reviews customer_customer_rating  customer_facebook_url customer_instagram_url customer_linkedin_url customer_youtube_url	customer_made_in_countries customer_attributes customer_brief_history').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get customer link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleCustomers = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await CustomersModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Customers  have been deleted" , customers : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importCustomers = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await CustomersModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}