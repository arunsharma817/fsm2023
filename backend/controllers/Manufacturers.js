const ManufacturersModel = require("../models/Manufacturers.js");
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


exports.addManufacturers = async (req, res) => {
        
        const corpCertificate = req.files['manufacturer_corporation_certificate'];
        const gumastaCertificate = req.files['manufacturer_gumasta_certificate'];
        const moaCertificate = req.files['manufacturer_moa_certificate'];
        const msmeCertificate = req.files['manufacturer_msme_certificate'];
        //const results = await asyncParseCSV(req.file.path);
        var obj = {
            manufacturer_company_name: req.body.manufacturer_company_name,
            manufacturer_industry: req.body.manufacturer_industry,
            manufacturer_products: req.body.manufacturer_products,
			manufacturer_mobile: req.body.manufacturer_mobile,
            manufacturer_mobile_alternate: req.body.manufacturer_mobile_alternate,
            manufacturer_email: req.body.manufacturer_email,
            manufacturer_website: req.body.manufacturer_website,
			manufacturer_registered_address: req.body.manufacturer_registered_address,
            manufacturer_zip_code: req.body.manufacturer_zip_code,
			manufacturer_city: req.body.manufacturer_city,
            manufacturer_state: req.body.manufacturer_state,
            manufacturer_country: req.body.manufacturer_country,	
			manufacturer_country_code: req.body.manufacturer_country_code,
			manufacturer_continent: req.body.manufacturer_continent,
            manufacturer_customer_care: req.body.manufacturer_customer_care,
            manufacturer_qr_code: req.body.manufacturer_qr_code,
			manufacturer_barcode_number: req.body.manufacturer_barcode_number,
			manufacturer_foundation_date: req.body.manufacturer_foundation_date,
            manufacturer_license_number: req.body.manufacturer_license_number,
            manufacturer_pan_number: req.body.manufacturer_pan_number,
			manufacturer_gst_number: req.body.manufacturer_gst_number,
			manufacturer_corporation_certificate: corpCertificate,
            manufacturer_gumasta_certificate: gumastaCertificate,
            manufacturer_moa_certificate: moaCertificate,	
			manufacturer_msme_certificate: msmeCertificate,
			manufacturer_account_details: req.body.manufacturer_account_details,
            manufacturer_cancelled_cheque: req.body.manufacturer_cancelled_cheque,
            manufacturer_number_of_employees: req.body.manufacturer_number_of_employees,
			manufacturer_director_fname: req.body.manufacturer_director_fname,
			manufacturer_director_lname: req.body.manufacturer_director_lname,
            manufacturer_director_email: req.body.manufacturer_director_email,
            manufacturer_director_mobile: req.body.manufacturer_director_mobile,
			manufacturer_director_linkedin: req.body.manufacturer_director_linkedin,
			manufacturer_customer_reviews: req.body.manufacturer_customer_reviews,
            manufacturer_customer_rating: req.body.manufacturer_customer_rating,
            manufacturer_facebook_url: req.body.manufacturer_facebook_url,
			manufacturer_instagram_url: req.body.manufacturer_instagram_url,
			manufacturer_linkedin_url: req.body.manufacturer_linkedin_url,
            manufacturer_youtube_url: req.body.manufacturer_youtube_url,
            manufacturer_made_in_countries: req.body.manufacturer_made_in_countries,
			manufacturer_attributes: req.body.manufacturer_attributes,
            manufacturer_brief_history: req.body.manufacturer_brief_history
        }
        const newManufacturersModel = new ManufacturersModel(obj);
        try {

            let result = await newManufacturersModel.save();
            res.json({ success: true, status: status.CREATED, msg: 'Manufacturer is created successfully.' });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Manufacturer failed.' });
        }
    
}


//update by id
exports.updateManufacturers = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await ManufacturersModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        manufacturer_company_name: req.body.manufacturer_company_name,
                        manufacturer_industry: req.body.manufacturer_industry,
                        manufacturer_products: req.body.manufacturer_products,
                        manufacturer_mobile: req.body.manufacturer_mobile,
                        manufacturer_mobile_alternate: req.body.manufacturer_mobile_alternate,
                        manufacturer_email: req.body.manufacturer_email,
                        manufacturer_website: req.body.manufacturer_website,
                        manufacturer_registered_address: req.body.manufacturer_registered_address,            
                        manufacturer_zip_code: req.body.manufacturer_zip_code,
                        manufacturer_city: req.body.manufacturer_city,
                        manufacturer_state: req.body.manufacturer_state,
                        manufacturer_country: req.body.manufacturer_country,                        
                        manufacturer_country_code: req.body.manufacturer_country_code,
                        manufacturer_continent: req.body.manufacturer_continent,
                        manufacturer_customer_care: req.body.manufacturer_customer_care,
                        manufacturer_qr_code: req.body.manufacturer_qr_code,                        
                        manufacturer_barcode_number: req.body.manufacturer_barcode_number,
                        manufacturer_foundation_date: req.body.manufacturer_foundation_date,
                        manufacturer_license_number: req.body.manufacturer_license_number,
                        manufacturer_pan_number: req.body.manufacturer_pan_number,
                        manufacturer_gst_number: req.body.manufacturer_gst_number,
                        manufacturer_corporation_certificate: req.body.manufacturer_corporation_certificate,
                        manufacturer_gumasta_certificate: req.body.manufacturer_gumasta_certificate,
                        manufacturer_moa_certificate: req.body.manufacturer_moa_certificate,                        
                        manufacturer_msme_certificate: req.body.manufacturer_msme_certificate,
                        manufacturer_account_details: req.body.manufacturer_account_details,
                        manufacturer_cancelled_cheque: req.body.manufacturer_cancelled_cheque,
                        manufacturer_number_of_employees: req.body.manufacturer_number_of_employees,
                        manufacturer_director_fname: req.body.manufacturer_director_fname,
                        manufacturer_director_lname: req.body.manufacturer_director_lname,
                        manufacturer_director_email: req.body.manufacturer_director_email,
                        manufacturer_director_mobile: req.body.manufacturer_director_mobile,            
                        manufacturer_director_linkedin: req.body.manufacturer_director_linkedin,
                        manufacturer_customer_reviews: req.body.manufacturer_customer_reviews,
                        manufacturer_customer_rating: req.body.manufacturer_customer_rating,
                        manufacturer_facebook_url: req.body.manufacturer_facebook_url,
                        manufacturer_instagram_url: req.body.manufacturer_instagram_url,
                        manufacturer_linkedin_url: req.body.manufacturer_linkedin_url,
                        manufacturer_youtube_url: req.body.manufacturer_youtube_url,
                        manufacturer_made_in_countries: req.body.manufacturer_made_in_countries,            
                        manufacturer_attributes: req.body.manufacturer_attributes,
                        manufacturer_brief_history: req.body.manufacturer_brief_history 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Manufacturer is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Manufacturer Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Manufacturer failed.' });
        }
   
}

//get all manufacturer link
exports.listManufacturers = async (req, res) => {
    
        try {
            const data = await ManufacturersModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get manufacturer link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete manufacturer link by id
exports.deleteManufacturers = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await ManufacturersModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Manufacturer is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Manufacturer  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Manufacturer failed.' });
        }
   
}

//get all manufacturer link
exports.getList = async (req, res) => {
    try {
        const data = await ManufacturersModel.find({}).select('manufacturer_company_name manufacturer_industry manufacturer_products manufacturer_mobile manufacturer_mobile_alternate manufacturer_email manufacturer_website manufacturer_company_logo manufacturer_registered_address manufacturer_zip_code manufacturer_city manufacturer_state manufacturer_country  manufacturer_country_code manufacturer_continent manufacturer_customer_care	manufacturer_qr_code manufacturer_barcode_number manufacturer_foundation_date manufacturer_license_number	manufacturer_pan_number manufacturer_gst_number manufacturer_corporation_certificate manufacturer_gumasta_certificate manufacturer_moa_certificate manufacturer_msme_certificate manufacturer_account_details manufacturer_cancelled_cheque manufacturer_number_of_employees manufacturer_director_fname manufacturer_director_lname manufacturer_director_email manufacturer_director_mobile manufacturer_director_linkedin manufacturer_customer_reviews manufacturer_customer_rating  manufacturer_facebook_url manufacturer_instagram_url manufacturer_linkedin_url manufacturer_youtube_url	manufacturer_made_in_countries manufacturer_attributes manufacturer_brief_history').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get manufacturer link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleManufacturers = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await ManufacturersModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Manufacturers  have been deleted" , manufacturers : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importManufacturers = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await ManufacturersModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}